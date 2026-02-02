package edu.jensen.camerashopapi.service;

import edu.jensen.camerashopapi.entity.CartItem;
import edu.jensen.camerashopapi.entity.Order;
import edu.jensen.camerashopapi.entity.Order_item;
import edu.jensen.camerashopapi.repository.CartItemRepository;
import edu.jensen.camerashopapi.repository.CustomerRepository;
import edu.jensen.camerashopapi.repository.OrderItemRepository;
import edu.jensen.camerashopapi.repository.OrderRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Transactional
    public Order createOrderFromCart(Long customerId) {
        int safeCustomerId = customerId.intValue();
        customerRepository.findById(safeCustomerId)
                .orElseThrow(() -> new IllegalArgumentException("Kund inte funnen"));

        List<CartItem> cartItems = cartItemRepository.findByCustomer_Id(safeCustomerId);
        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException("Kundvagn är tom");
        }

        Order order = new Order();
        order.setCustomerId(safeCustomerId);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("CREATED");
        order = orderRepository.save(order);

        for (CartItem cartItem : cartItems) {
            Order_item orderItem = new Order_item();
            orderItem.setOrderId(order.getId());
            orderItem.setProductId(cartItem.getProduct().getId());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getProduct().getPrice());
            orderItemRepository.save(orderItem);
        }

        cartItemRepository.deleteAll(cartItems);
        return order;
    }
}
