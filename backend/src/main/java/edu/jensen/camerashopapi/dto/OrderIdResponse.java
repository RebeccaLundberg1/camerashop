package edu.jensen.camerashopapi.dto;

public class OrderIdResponse {
    private final int orderId;

    public OrderIdResponse(int orderId) {
        this.orderId = orderId;
    }

    public int getOrderId() {
        return orderId;
    }
}
