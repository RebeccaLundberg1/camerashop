package edu.jensen.camerashopapi.controller;

import edu.jensen.camerashopapi.dto.CustomerIdResponse;
import edu.jensen.camerashopapi.entity.Customer;
import edu.jensen.camerashopapi.service.CustomerService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
  private final CustomerService customerService;

  public CustomerController(CustomerService customerService) {
    this.customerService = customerService;
  }

  @PostMapping
  public CustomerIdResponse createCustomer() {
    Customer customer = customerService.createCustomer();
    return new CustomerIdResponse(customer.getId());
  }
}
