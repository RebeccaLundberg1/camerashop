package edu.jensen.camerashopapi.dto;

import java.math.BigDecimal;

public class ProductResponse {
    private int id;
    private String brand;
    private String model;
    private String category;
    private BigDecimal price;
    private String description;
    private int stock;

    public ProductResponse(int id, String brand, String model, String category, BigDecimal price, String description, int stock) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.category = category;
        this.price = price;
        this.description = description;
        this.stock = stock;
    }

    public int getId() { return id; }
    public String getBrand() { return brand; }
    public String model() { return model; }
    public String getCategory() { return category; }
    public BigDecimal getPrice() { return price; }
    public String getDescription() { return description; }
    public int getStock() { return stock; }
}