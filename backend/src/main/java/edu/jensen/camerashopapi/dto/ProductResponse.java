package edu.jensen.camerashopapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.math.BigDecimal;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductResponse {
    private int id;
    private String brand;
    private String model;
    private String category;
    private String description;
    private BigDecimal price;
    private int stock;

    public ProductResponse(int id, String brand, String model, String category, String description, BigDecimal price, int stock) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.category = category;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }

    public int getId() { return id; }
    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public String getCategory() { return category; }
    public String getDescription() {return description; }
    public BigDecimal getPrice() { return price; }
    public int getStock() { return stock; }
}