package edu.jensen.camerashopapi.dto;

public class AddCartItemRequest {
    private Long customerId; // temporary if no auth yet
    private int productId;
    private int qty;

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public int getQty() { return qty; }
    public void setQty(int qty) { this.qty = qty; }
}
