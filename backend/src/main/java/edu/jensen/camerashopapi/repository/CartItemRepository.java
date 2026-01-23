package edu.jensen.camerashopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import edu.jensen.camerashopapi.entity.CartItem;
import edu.jensen.camerashopapi.entity.Customer;
import edu.jensen.camerashopapi.entity.Product;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem findByCustomerAndProduct(Customer customer, Product product);
}