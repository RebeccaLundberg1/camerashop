package edu.jensen.camerashopapi.repository;

import edu.jensen.camerashopapi.entity.Order_item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<Order_item, Integer> {
}
