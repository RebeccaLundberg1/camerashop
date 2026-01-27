package edu.jensen.camerashopapi.repository;

import edu.jensen.camerashopapi.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository <Order, Integer> {

}
