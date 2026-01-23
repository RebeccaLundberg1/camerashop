package edu.jensen.camerashopapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.lang.NonNull;
import edu.jensen.camerashopapi.dto.CartItemResponse;
import edu.jensen.camerashopapi.entity.CartItem;
import edu.jensen.camerashopapi.entity.Customer;
import edu.jensen.camerashopapi.entity.Product;
import edu.jensen.camerashopapi.repository.CartItemRepository;
import edu.jensen.camerashopapi.repository.CustomerRepository;
import edu.jensen.camerashopapi.repository.ProductRepository;

import java.util.Objects;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Transactional
    public CartItemResponse addItemToCart(@NonNull Long productId, @NonNull Long customerId, @NonNull Integer quantity) {
        // Validera att produkt existerar - konvertera Long till int
        Product product = productRepository.findById(productId.intValue())
                .orElseThrow(() -> new IllegalArgumentException("Produkt inte funnen"));

        // Validera att kund existerar - konvertera Long till int
        Customer customer = customerRepository.findById(customerId.intValue())
                .orElseThrow(() -> new IllegalArgumentException("Kund inte funnen"));

        // Kontrollera om produkten redan finns i kundvagnen - förhindra dubletter
        CartItem existingItem = cartItemRepository.findByCustomerAndProduct(customer, product);

        CartItem cartItem;
        if (existingItem != null) {
            // Uppdatera kvantitet istället för dublett
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            cartItem = cartItemRepository.save(existingItem);
        } else {
            // Skapa ny kundvagnspost
            cartItem = new CartItem();
            cartItem.setCustomer(customer);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem = cartItemRepository.save(cartItem);
        }

        return new CartItemResponse(
                cartItem.getProduct().getId(),
                cartItem.getProduct().getCategory(),
                cartItem.getProduct().getPrice(),
                cartItem.getQuantity());
    }

    @Transactional
    public void removeItemFromCart(@NonNull Long cartItemId) {
        CartItem cartItem = Objects.requireNonNull(
                cartItemRepository.findById(cartItemId)
                        .orElseThrow(() -> new IllegalArgumentException("Kundvagnspost inte funnen")),
                "cartItem");
        cartItemRepository.delete(cartItem);
    }
}
