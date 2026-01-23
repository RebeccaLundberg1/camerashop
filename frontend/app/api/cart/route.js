import { NextResponse } from "next/server";
import getDb from "@/lib/db.js";

export async function POST(req) {
    try {
        const { cartId, productId, quantity = 1 } = await req.json();
        if (!cartId || !productId) {
            return NextResponse.json({ message: "cartId and productId required" }, { status: 400 });
        }

        const db = getDb();
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            const [rows] = await conn.query(
                "SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ? FOR UPDATE",
                [cartId, productId]
            );
            if (rows.length > 0) {
                const existing = rows[0];
                const newQty = existing.quantity + Number(quantity);
                await conn.query("UPDATE cart_items SET quantity = ? WHERE id = ?", [newQty, existing.id]);
                await conn.commit();
                conn.release();
                return NextResponse.json({ ok: true, item: { id: existing.id, cart_id: cartId, product_id: productId, quantity: newQty } });
            } else {
                const [res] = await conn.query(
                    "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
                    [cartId, productId, Number(quantity)]
                );
                await conn.commit();
                conn.release();
                return NextResponse.json({ ok: true, item: { id: res.insertId, cart_id: cartId, product_id: productId, quantity: Number(quantity) } });
            }
        } catch (e) {
            await conn.rollback();
            conn.release();
            console.error(e);
            return NextResponse.json({ message: "DB error" }, { status: 500 });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
}
