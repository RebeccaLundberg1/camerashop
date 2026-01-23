package edu.jensen.camerashopapi.service;

import edu.jensen.camerashopapi.entity.*;
import edu.jensen.camerashopapi.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public CartItem addItem(int customerId, int productId, int qty) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem existingItem = itemRepo.findByCustomer_IdAndProduct_Id(customerId, productId);
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
}
