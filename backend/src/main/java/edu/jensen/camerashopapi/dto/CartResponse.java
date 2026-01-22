package edu.jensen.camerashopapi.dto;

import java.util.List;

public class CartResponse {
    private Long cartId;
    private Long customerId;
    private List<CartItemResponse> items;

    public CartResponse(Long cartId, Long customerId, List<CartItemResponse> items) {
        this.cartId = cartId;
        this.customerId = customerId;
        this.items = items;
    }

    public Long getCartId() { return cartId; }
    public Long getCustomerId() { return customerId; }
    public List<CartItemResponse> getItems() { return items; }
}
