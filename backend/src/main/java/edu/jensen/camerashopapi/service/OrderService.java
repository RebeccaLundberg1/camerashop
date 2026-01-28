package edu.jensen.camerashopapi.service;

import edu.jensen.camerashopapi.entity.Order;
import edu.jensen.camerashopapi.repository.CartItemRepository;
import edu.jensen.camerashopapi.repository.OrderRepository;
import org.springframework.transaction.annotation.Transactional;

public class OrderService {

    private OrderRepository orderRepository;
    private CartItemRepository cartItemRepository;

    @Transactional
    public Order createOrderFromCart() {
        return null;
    }
}
