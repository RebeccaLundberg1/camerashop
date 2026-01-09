package edu.jensen.camerashopapi.repository;

import edu.jensen.camerashopapi.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Integer, Product> {
}
