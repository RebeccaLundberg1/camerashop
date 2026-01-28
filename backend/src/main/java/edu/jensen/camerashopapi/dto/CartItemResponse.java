package edu.jensen.camerashopapi.dto;

import java.math.BigDecimal;

public class CartItemResponse {
    private long cartItemId;
    private int productId;
    private String brand;
    private String model;
    private String category;
    private BigDecimal totalPrice;
    private int quantity;

    public CartItemResponse(long cartItemId, int productId, String brand, String model, String category, BigDecimal totalPrice, int quantity) {
        this.cartItemId = cartItemId;
        this.productId = productId;
        this.brand = brand;
        this.model = model;
        this.category = category;
        this.totalPrice = totalPrice;
        this.quantity = quantity;
    }

    public long getCartItemId() { return cartItemId; }
    public int getProductId() { return productId; }
    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public String getCategory() { return category; }
    public BigDecimal getTotalPrice() { return totalPrice; }
    public int getQuantity() { return quantity; }
}
