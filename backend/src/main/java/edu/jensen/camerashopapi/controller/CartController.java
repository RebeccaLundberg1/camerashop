package edu.jensen.camerashopapi.controller;

import edu.jensen.camerashopapi.dto.*;
import edu.jensen.camerashopapi.entity.CartItem;
import edu.jensen.camerashopapi.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public CartItem addItem(@RequestBody AddCartItemRequest req) {
        return cartService.addItem(req.getCustomerId(), req.getProductId(), req.getQty());
    }

}
