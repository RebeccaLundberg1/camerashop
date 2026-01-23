package edu.jensen.camerashopapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;
import edu.jensen.camerashopapi.entity.CartItem;
import edu.jensen.camerashopapi.entity.Customer;
import edu.jensen.camerashopapi.entity.Product;
import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Nullable
    CartItem findByCustomerAndProduct(Customer customer, Product product);

    List<CartItem> findByCustomer_Id(int customerId);
}
