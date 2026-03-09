package com.homeappliance_commerce.sale_service.repository;

import com.homeappliance_commerce.sale_service.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ISaleRepository extends JpaRepository<Sale,Long> {
    List<Sale> findByDate(LocalDate date);
}
