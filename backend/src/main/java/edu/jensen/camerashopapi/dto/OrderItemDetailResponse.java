package edu.jensen.camerashopapi.dto;

import java.math.BigDecimal;

public class OrderItemDetailResponse {
    private int productId;
    private String brand;
    private String model;
    private String category;
    private int quantity;
    private BigDecimal unitPrice;
    private BigDecimal lineTotal;

    public OrderItemDetailResponse(int productId, String brand, String model, String category,
                                   int quantity, BigDecimal unitPrice, BigDecimal lineTotal) {
        this.productId = productId;
        this.brand = brand;
        this.model = model;
        this.category = category;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.lineTotal = lineTotal;
    }

    public int getProductId() { return productId; }
    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public String getCategory() { return category; }
    public int getQuantity() { return quantity; }
    public BigDecimal getUnitPrice() { return unitPrice; }
    public BigDecimal getLineTotal() { return lineTotal; }
}
