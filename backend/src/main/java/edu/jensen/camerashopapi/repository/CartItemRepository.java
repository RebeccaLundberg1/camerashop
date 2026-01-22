package edu.jensen.camerashopapi.repository;

import edu.jensen.camerashopapi.entity.CartItem;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCustomerId(Long customerId, int productId);

    List<CartItem> findByCustomerId(Long customerId);
}
