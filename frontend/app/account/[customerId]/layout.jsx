import AccountNavBar from "@/app/account/[customerId]/AccountNavBar";

export default async function AccountLayout({children, params}) {
    const { customerId } = params;

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-900 text-white p-6">
                <AccountNavBar customerId={customerId} />
            </aside>
            <main className="flex-1 bg-[#172e34] text-gray-950">
                {children}
            </main>
        </div>
    );

}