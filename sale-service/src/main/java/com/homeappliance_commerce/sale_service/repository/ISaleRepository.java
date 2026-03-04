package com.homeappliance_commerce.sale_service.repository;

import com.homeappliance_commerce.sale_service.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ISaleRepository extends JpaRepository<Sale,Long> {
    List<Sale> findByDate(LocalDate date);
}
