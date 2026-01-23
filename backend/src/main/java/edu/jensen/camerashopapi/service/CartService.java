package edu.jensen.camerashopapi.service;

import edu.jensen.camerashopapi.dto.CartItemResponse;
import edu.jensen.camerashopapi.entity.*;
import edu.jensen.camerashopapi.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
public class CartService {


    private final CartItemRepository itemRepo;
    private final CustomerRepository customerRepo;
    private final ProductRepository productRepo;

    public List<CartItemResponse> getItemsForCustomer(Long customerId) {
        return itemRepo.findByCustomer_Id(customerId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public CartService(CartItemRepository itemRepo,
                       CustomerRepository customerRepo, ProductRepository productRepo) {
        this.itemRepo = itemRepo;
        this.customerRepo = customerRepo;
        this.productRepo = productRepo;
    }

    @Transactional
    public CartItem addItem(Integer customerId, int productId, int qty) {
        return null;
    }


    private CartItemResponse toResponse(CartItem cartItem) {
        Product product = cartItem.getProduct();

        return new CartItemResponse(
            product.getId(),
            product.getBrand(),
            product.getModel(),
            product.getCategory(),
            product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())),
            cartItem.getQuantity()
        );
    }
}
