package edu.jensen.camerashopapi.service;

import edu.jensen.camerashopapi.dto.ProductResponse;
import edu.jensen.camerashopapi.entity.Product;
import edu.jensen.camerashopapi.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

  private ProductRepository productRepository;

  public ProductService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  public List<ProductResponse> getAllProducts() {
    return productRepository.findAll()
        .stream()
        .map(this::toCardResponse)
        .toList();
  }

  public ProductResponse getProductInfo(Integer productId) {
    System.out.println("Fetching product: " + productId);
    Product product = productRepository.findById(productId)
        .orElseThrow(() -> new RuntimeException("Product not found"));
    // Product product = productRepository.findById(productId).orElseThrow(() -> new
    // RuntimeException("Product not found"));
    return toInfoPageResponse(product);
  }

  public List<ProductResponse> getProductsByCategory(String category) {
    return productRepository.findByCategoryIgnoreCase(category)
        .stream()
        .map(this::toCardResponse)
        .toList();
  }

  private ProductResponse toCardResponse(Product product) {
    return new ProductResponse(
        product.getId(),
        product.getBrand(),
        product.getModel(),
        product.getCategory(),
        null, // product.description()
        product.getPrice(),
        null // product.getStock()
    );
  }

  private ProductResponse toInfoPageResponse(Product product) {
    return new ProductResponse(
        product.getId(),
        product.getBrand(),
        product.getModel(),
        product.getCategory(),
        product.getDescription(),
        product.getPrice(),
        null // product.getStock()
    );
  }
}
