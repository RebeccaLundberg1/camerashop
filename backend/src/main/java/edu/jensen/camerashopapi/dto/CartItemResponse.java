package edu.jensen.camerashopapi.dto;

import java.math.BigDecimal;

public class CartItemResponse {
    private int productId;
    private String category;
    private BigDecimal price;
    private int quantity;

    public CartItemResponse(int productId, String category, BigDecimal price, int quantity) {
        this.productId = productId;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }

    public int getProductId() { return productId; }
    public String getCategory() { return category; }
    public BigDecimal getPrice() { return price; }
    public int getQuantity() { return quantity; }
}