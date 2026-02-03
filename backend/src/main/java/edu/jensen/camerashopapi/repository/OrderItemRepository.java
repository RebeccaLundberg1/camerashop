package edu.jensen.camerashopapi.repository;

import edu.jensen.camerashopapi.entity.Order_item;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<Order_item, Integer> {
    List<Order_item> findByOrderId(int orderId);
    void deleteByOrderId(int orderId);
}
