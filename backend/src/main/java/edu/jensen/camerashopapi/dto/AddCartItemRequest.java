package edu.jensen.camerashopapi.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class AddCartItemRequest {
    @NotNull
    @Positive
    private Long productId;
    @NotNull
    @Positive
    private Long customerId;
    @NotNull
    @Positive
    private Integer quantity;

    public AddCartItemRequest() {
    }

    public AddCartItemRequest(Long productId, Long customerId, Integer quantity) {
        this.productId = productId;
        this.customerId = customerId;
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
