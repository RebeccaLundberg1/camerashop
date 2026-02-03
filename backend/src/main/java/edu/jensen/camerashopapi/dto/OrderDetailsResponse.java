package edu.jensen.camerashopapi.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDetailsResponse {
    private int orderId;
    private int customerId;
    private LocalDateTime orderDate;
    private String status;
    private List<OrderItemDetailResponse> items;
    private BigDecimal totalPrice;

    public OrderDetailsResponse(int orderId, int customerId, LocalDateTime orderDate, String status,
                                List<OrderItemDetailResponse> items, BigDecimal totalPrice) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.orderDate = orderDate;
        this.status = status;
        this.items = items;
        this.totalPrice = totalPrice;
    }

    public int getOrderId() { return orderId; }
    public int getCustomerId() { return customerId; }
    public LocalDateTime getOrderDate() { return orderDate; }
    public String getStatus() { return status; }
    public List<OrderItemDetailResponse> getItems() { return items; }
    public BigDecimal getTotalPrice() { return totalPrice; }
}
