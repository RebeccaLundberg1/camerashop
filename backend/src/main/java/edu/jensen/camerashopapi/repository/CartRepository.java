package edu.jensen.camerashopapi.repository;

import edu.jensen.camerashopapi.entity.Cart;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByCustomerIdAndStatus(Integer customerId, String status);
}
