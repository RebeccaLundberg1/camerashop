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

import java.math.BigDecimal;
import java.util.List;
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
        public CartItemResponse addItemToCart(@NonNull Long productId, @NonNull Long customerId,
                        @NonNull Integer quantity) {
                // Validera att produkt existerar - konvertera Long till int
                Product product = productRepository.findById(productId.intValue())
                                .orElseThrow(() -> new IllegalArgumentException("Produkt inte funnen"));

                // Validera att kund existerar - konvertera Long till int
                Customer customer = customerRepository.findById(customerId.intValue())
                                .orElseThrow(() -> new IllegalArgumentException("Kund inte funnen"));

                // Kontrollera om produkten redan finns i kundvagnen - förhindra dubletter
                CartItem existingItem = cartItemRepository.findByCustomer_IdAndProduct_Id(customerId, product.getId());

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

                Product itemProduct = cartItem.getProduct();
                BigDecimal totalPrice = itemProduct.getPrice()
                                .multiply(BigDecimal.valueOf(cartItem.getQuantity()));
                return new CartItemResponse(
                                cartItem.getId(),
                                itemProduct.getId(),
                                itemProduct.getBrand(),
                                itemProduct.getModel(),
                                itemProduct.getCategory(),
                                totalPrice,
                                cartItem.getQuantity());
        }

        @Transactional
        public void removeItemFromCart(@NonNull Long cartItemId) {
                CartItem cartItem = Objects.requireNonNull(
                                cartItemRepository.findById(cartItemId)
                                                .orElseThrow(() -> new IllegalArgumentException(
                                                                "Kundvagnspost inte funnen")),
                                "cartItem");
                cartItemRepository.delete(cartItem);
        }

        @Transactional
        public void removeItemFromCartByCustomerAndProduct(@NonNull Long customerId, @NonNull Long productId) {
                CartItem cartItem = cartItemRepository.findByCustomer_IdAndProduct_Id(
                                customerId,
                                productId.intValue());
                if (cartItem == null) {
                        throw new IllegalArgumentException("Kundvagnspost inte funnen");
                }
                cartItemRepository.delete(cartItem);
        }

        @Transactional(readOnly = true)
        public List<CartItemResponse> getItemsForCustomer(@NonNull Long customerId) {
                int id = Objects.requireNonNull(customerId, "customerId").intValue();
                return cartItemRepository.findByCustomer_Id(id)
                                .stream()
                                .map(this::toResponse)
                                .toList();
        }

        private CartItemResponse toResponse(CartItem cartItem) {
                Product product = cartItem.getProduct();
                BigDecimal totalPrice = product.getPrice()
                                .multiply(BigDecimal.valueOf(cartItem.getQuantity()));
                return new CartItemResponse(
                                cartItem.getId(),
                                product.getId(),
                                product.getBrand(),
                                product.getModel(),
                                product.getCategory(),
                                totalPrice,
                                cartItem.getQuantity());
        }
}
