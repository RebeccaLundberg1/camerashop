package edu.jensen.camerashopapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import edu.jensen.camerashopapi.dto.CartItemResponse;
import edu.jensen.camerashopapi.entity.CartItem;
import edu.jensen.camerashopapi.entity.Customer;
import edu.jensen.camerashopapi.entity.Product;
import edu.jensen.camerashopapi.repository.CartItemRepository;
import edu.jensen.camerashopapi.repository.CustomerRepository;
import edu.jensen.camerashopapi.repository.ProductRepository;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Transactional
    public CartItemResponse addItemToCart(Long productId, Long customerId, Integer quantity) {
        // Validera att produkt existerar
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Produkt inte funnen"));

        // Validera att kund existerar
        Customer customer = customerRepository.findById(customerId)
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

    public List<CartItemResponse> getItemsForCustomer(Long customerId) {
        return itemRepo.findByCustomer_Id(customerId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public void removeItemFromCart(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("Kundvagnspost inte funnen"));
        cartItemRepository.delete(cartItem);
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
