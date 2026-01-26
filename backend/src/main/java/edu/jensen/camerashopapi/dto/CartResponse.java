package edu.jensen.camerashopapi.dto;

import java.math.BigDecimal;
import java.util.List;

public class CartResponse {
    private List<CartItemResponse> items;
    private BigDecimal totalPrice;

    public CartResponse(List<CartItemResponse> items, BigDecimal totalPrice) {
        this.items = items;
        this.totalPrice = totalPrice;
    }

    public List<CartItemResponse> getItems() {
        return items;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }
}
