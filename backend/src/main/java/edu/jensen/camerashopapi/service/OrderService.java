package edu.jensen.camerashopapi.service;

import edu.jensen.camerashopapi.dto.OrderDetailsResponse;
import edu.jensen.camerashopapi.dto.OrderItemDetailResponse;
import edu.jensen.camerashopapi.entity.CartItem;
import edu.jensen.camerashopapi.entity.Order;
import edu.jensen.camerashopapi.entity.Order_item;
import edu.jensen.camerashopapi.entity.Product;
import edu.jensen.camerashopapi.repository.CartItemRepository;
import edu.jensen.camerashopapi.repository.CustomerRepository;
import edu.jensen.camerashopapi.repository.OrderItemRepository;
import edu.jensen.camerashopapi.repository.OrderRepository;
import edu.jensen.camerashopapi.repository.ProductRepository;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
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

    @Autowired
    private ProductRepository productRepository;

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

    @Transactional(readOnly = true)
    public OrderDetailsResponse getOrderDetails(Long orderId) {
        int safeOrderId = Objects.requireNonNull(orderId, "orderId").intValue();
        Order order = orderRepository.findById(safeOrderId)
                .orElseThrow(() -> new IllegalArgumentException("Order inte funnen"));

        List<OrderItemDetailResponse> items = orderItemRepository.findByOrderId(safeOrderId)
                .stream()
                .map(this::toItemResponse)
                .toList();

        BigDecimal totalPrice = items.stream()
                .map(OrderItemDetailResponse::getLineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new OrderDetailsResponse(
                order.getId(),
                order.getCustomerId(),
                order.getOrderDate(),
                order.getStatus(),
                items,
                totalPrice);
    }

    @Transactional
    public void cancelOrder(Long orderId) {
        int safeOrderId = Objects.requireNonNull(orderId, "orderId").intValue();
        Order order = orderRepository.findById(safeOrderId)
                .orElseThrow(() -> new IllegalArgumentException("Order inte funnen"));
        orderItemRepository.deleteByOrderId(order.getId());
        orderRepository.delete(order);
    }

    private OrderItemDetailResponse toItemResponse(Order_item orderItem) {
        Product product = productRepository.findById(orderItem.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Produkt inte funnen"));
        BigDecimal lineTotal = orderItem.getUnitPrice()
                .multiply(BigDecimal.valueOf(orderItem.getQuantity()));
        return new OrderItemDetailResponse(
                product.getId(),
                product.getBrand(),
                product.getModel(),
                product.getCategory(),
                orderItem.getQuantity(),
                orderItem.getUnitPrice(),
                lineTotal);
    }
}
