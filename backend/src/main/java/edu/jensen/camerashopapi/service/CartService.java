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
    public CartItem addItem(Integer customerId, int productId, int qty) {
        return null;
    }
}
