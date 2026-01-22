package edu.jensen.camerashopapi.controller;

import edu.jensen.camerashopapi.dto.*;
import edu.jensen.camerashopapi.service.CartService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
        public CartItemResponse addItem(@RequestBody AddCartItemRequest req) {
        return null;
    }

    @GetMapping("/{customerId}")
        public List<CartItemResponse> getItems(Long customerId) {
        return cartService.getItemsForCustomer(customerId);
    }
}
