package edu.jensen.camerashopapi.controller;

import edu.jensen.camerashopapi.dto.*;
import edu.jensen.camerashopapi.entity.CartItem;
import edu.jensen.camerashopapi.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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
    public CartResponse getItems(@PathVariable Long customerId) {
        List<CartItemResponse> items = cartService.getItemsForCustomer(customerId);
        BigDecimal totalPrice = cartService.totalPriceOfCart(customerId);
        return new CartResponse(items, totalPrice);
    }
}
