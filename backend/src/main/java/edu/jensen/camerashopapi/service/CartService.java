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

    public CartService(CartRepository cartRepo, CartItemRepository itemRepo,
                       CustomerRepository customerRepo, ProductRepository productRepo) {
        this.cartRepo = cartRepo;
        this.itemRepo = itemRepo;
        this.customerRepo = customerRepo;
        this.productRepo = productRepo;
    }

    @Transactional
    public Cart addItem(Integer customerId, int productId, int qty) {
        if (qty == 0) throw new IllegalArgumentException("qty must not be 0");

        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found: " + customerId));

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found: " + productId));

        // 1) Find or create OPEN cart
        Cart cart = cartRepo.findByCustomerIdAndStatus(customerId, "OPEN")
                .orElseGet(() -> {
                    Cart c = new Cart();
                    c.setCustomer(customer);
                    c.setStatus("OPEN");
                    return cartRepo.save(c);
                });

        // 2) Find existing item or create new
        CartItem item = itemRepo.findByCartIdAndProductId(cart.getId(), productId)
                .orElseGet(() -> {
                    CartItem ci = new CartItem();
                    ci.setCart(cart);
                    ci.setProduct(product);
                    ci.setQuantity(0);
                    return ci;
                });

        int newQty = item.getQuantity() + qty;

        if (newQty <= 0) {
            if (item.getId() != null) itemRepo.delete(item);
        } else {
            item.setQuantity(newQty);
            itemRepo.save(item);
        }

        return cart;
    }
}
