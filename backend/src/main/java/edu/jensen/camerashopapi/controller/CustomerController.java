package edu.jensen.camerashopapi.controller;

import edu.jensen.camerashopapi.dto.CustomerIdResponse;
import edu.jensen.camerashopapi.dto.OrderDetailsResponse;
import edu.jensen.camerashopapi.dto.OrderIdResponse;
import edu.jensen.camerashopapi.entity.Customer;
import edu.jensen.camerashopapi.entity.Order;
import edu.jensen.camerashopapi.service.CustomerService;
import edu.jensen.camerashopapi.service.OrderService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
  private final CustomerService customerService;
  private final OrderService orderService;

  public CustomerController(CustomerService customerService, OrderService orderService) {
    this.customerService = customerService;
    this.orderService = orderService;
  }

  @PostMapping
  public CustomerIdResponse createCustomer() {
    Customer customer = customerService.createCustomer();
    return new CustomerIdResponse(customer.getId());
  }

  @PostMapping("/validate/{customerId}")
  public CustomerIdResponse validateCustomer(@PathVariable("customerId") int customerId) {
    int resolvedCustomerId = customerService.getOrCreateCustomerId(customerId);
    return new CustomerIdResponse(resolvedCustomerId);
  }

  @PostMapping("/{customerId}/orders")
  public ResponseEntity<OrderIdResponse> createOrderForCustomer(
      @PathVariable("customerId") Long customerId) {
    Order order = orderService.createOrderFromCart(customerId);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(new OrderIdResponse(order.getId()));
  }

  @GetMapping("/{customerId}/orders")
  public ResponseEntity<List<OrderDetailsResponse>> getOrdersForCustomer(
      @PathVariable("customerId") Long customerId) {
    List<OrderDetailsResponse> orders = orderService.getOrdersForCustomer(customerId);
    return ResponseEntity.ok(orders);
  }
}
