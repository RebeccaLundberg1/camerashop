package edu.jensen.camerashopapi.repository;

import edu.jensen.camerashopapi.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}
