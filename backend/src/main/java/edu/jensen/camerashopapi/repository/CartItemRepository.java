package edu.jensen.camerashopapi.repository;

import edu.jensen.camerashopapi.entity.CartItem;
import org.springframework.data.repository.CrudRepository;

public interface CartItemRepository extends CrudRepository<CartItem, Integer> {
    CartItem findByCustomer_IdAndProduct_Id(int customerId, int productId);
}