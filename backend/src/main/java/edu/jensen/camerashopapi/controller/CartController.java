package edu.jensen.camerashopapi.controller;

import edu.jensen.camerashopapi.dto.*;
import edu.jensen.camerashopapi.entity.CartItem;
import edu.jensen.camerashopapi.service.CartService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartItemResponse> addCart(@Valid @RequestBody AddCartItemRequest request) {
        Long productId = Objects.requireNonNull(request.getProductId(), "productId");
        Long customerId = Objects.requireNonNull(request.getCustomerId(), "customerId");
        Integer quantity = Objects.requireNonNull(request.getQuantity(), "quantity");

        CartItemResponse response = cartService.addItemToCart(
                productId,
                customerId,
                quantity);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long cartItemId) {
        Long safeCartItemId = Objects.requireNonNull(cartItemId, "cartItemId");
        cartService.removeItemFromCart(safeCartItemId);
        return ResponseEntity.noContent().build();
    }

}
