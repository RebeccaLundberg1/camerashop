package edu.jensen.camerashopapi.dto;

public class CustomerIdResponse {
    private final int customerId;

    public CustomerIdResponse(int customerId) {
        this.customerId = customerId;
    }

    public int getCustomerId() {
        return customerId;
    }
}
