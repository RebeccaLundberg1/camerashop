package edu.jensen.camerashopapi.controller;

import edu.jensen.camerashopapi.dto.OrderDetailsResponse;
import edu.jensen.camerashopapi.service.OrderService;
import java.util.Objects;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDetailsResponse> getOrder(@PathVariable Long orderId) {
        Long safeOrderId = Objects.requireNonNull(orderId, "orderId");
        OrderDetailsResponse response = orderService.getOrderDetails(safeOrderId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        Long safeOrderId = Objects.requireNonNull(orderId, "orderId");
        orderService.cancelOrder(safeOrderId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
