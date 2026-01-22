package edu.jensen.camerashopapi.dto;

import java.math.BigDecimal;

public class CartItemResponse {
    private int productId;
    private String brand;
    private String model;
    private BigDecimal price;
    private int quantity;

    public CartItemResponse(int productId, String brand, String model, BigDecimal price, int quantity) {
        this.productId = productId;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.quantity = quantity;
    }

    public int getProductId() { return productId; }
    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public BigDecimal getPrice() { return price; }
    public int getQuantity() { return quantity; }
}
