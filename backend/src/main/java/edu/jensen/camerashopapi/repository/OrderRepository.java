package edu.jensen.camerashopapi.repository;

import edu.jensen.camerashopapi.entity.Order;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository <Order, Integer> {
    List<Order> findByCustomerIdOrderByOrderDateDesc(int customerId);
}
