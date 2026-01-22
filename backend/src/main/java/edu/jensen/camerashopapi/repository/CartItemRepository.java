package edu.jensen.camerashopapi.repository;

import edu.jensen.camerashopapi.entity.CartItem;
import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCustomer_IdAndProduct_Id(Long customerId, int productId);

    List<CartItem> findByCustomerId(Long customerId);
}
