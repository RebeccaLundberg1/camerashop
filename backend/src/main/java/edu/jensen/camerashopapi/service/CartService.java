package edu.jensen.camerashopapi.service;

import edu.jensen.camerashopapi.dto.CartItemResponse;
import edu.jensen.camerashopapi.entity.*;
import edu.jensen.camerashopapi.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
public class CartService {

    private final CartItemRepository itemRepo;
    private final CustomerRepository customerRepo;
    private final ProductRepository productRepo;

    public CartService(CartItemRepository itemRepo,
            CustomerRepository customerRepo, ProductRepository productRepo) {
        this.itemRepo = itemRepo;
        this.customerRepo = customerRepo;
        this.productRepo = productRepo;
    }

    public List<CartItemResponse> getItemsForCustomer(Long customerId) {
        return itemRepo.findByCustomer_Id(customerId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public CartItem addItem(int customerId, int productId, int qty) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem existingItem = itemRepo.findByCustomerIdAndProductId(customerId, productId);
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + qty);
            return itemRepo.save(existingItem);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setCustomer(customer);
            cartItem.setProduct(product);
            cartItem.setQuantity(qty);
            return itemRepo.save(cartItem);
        }
    }

    private CartItemResponse toResponse(CartItem cartItem) {
        Product product = cartItem.getProduct();

        return new CartItemResponse(
            product.getId(),
            product.getBrand(),
            product.getModel(),
            product.getCategory(),
            product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())),
            cartItem.getQuantity()
        );
    }

    public BigDecimal totalPriceOfCart(Long customerId) {
        return itemRepo.findByCustomer_Id(customerId)
                .stream()
                .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
