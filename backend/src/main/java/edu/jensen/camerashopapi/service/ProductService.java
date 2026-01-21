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
                .map(this::toResponse)
                .toList();
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
            product.getId(),
            product.getBrand(),
            product.getModel(),
            product.getCategory(),
            product.getPrice(),
            product.getStock()
        );
    }
}
