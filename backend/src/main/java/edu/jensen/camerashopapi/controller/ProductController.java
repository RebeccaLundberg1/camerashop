package edu.jensen.camerashopapi.controller;

import edu.jensen.camerashopapi.dto.ProductResponse;
import edu.jensen.camerashopapi.service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping
  public List<ProductResponse> getProducts() {
    System.out.println("Fetched products");
    return productService.getAllProducts();
  }
}
