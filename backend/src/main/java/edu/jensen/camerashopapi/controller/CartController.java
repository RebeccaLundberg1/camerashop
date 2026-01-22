package edu.jensen.camerashopapi.controller;

import edu.jensen.camerashopapi.dto.*;
import edu.jensen.camerashopapi.entity.Cart;
import edu.jensen.camerashopapi.entity.CartItem;
import edu.jensen.camerashopapi.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/items")
    public CartResponse addItem(@RequestBody AddCartItemRequest req) {
        // Later, replace req.getCustomerId() with the authenticated user id
        Cart cart = cartService.addItem(req.getCustomerId(), req.getProductId(), req.getQty());

        List<CartItemResponse> items = cart.getItems().stream().map(this::toResponse).toList();
        return new CartResponse(cart.getId(), cart.getCustomer().getId(), items);
    }

    private CartItemResponse toResponse(CartItem item) {
        var p = item.getProduct();
        return new CartItemResponse(
                p.getId(),
                p.getBrand(),
                p.getModel(),
                p.getPrice(),
                item.getQuantity()
        );
    }
}
