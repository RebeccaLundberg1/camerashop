package edu.jensen.camerashopapi.controller;

import edu.jensen.camerashopapi.dto.*;
import edu.jensen.camerashopapi.entity.CartItem;
import edu.jensen.camerashopapi.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartItemResponse> addCart(@RequestBody AddCartItemRequest request) {
        CartItemResponse response = cartService.addItemToCart(
                request.getProductId(),
                request.getCustomerId(),
                request.getQuantity());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long cartItemId) {
        cartService.removeItemFromCart(cartItemId);
        return ResponseEntity.noContent().build();
    }

}
