package com.aigenerator.repository;

import com.aigenerator.model.ReferenceAd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReferenceAdRepository extends JpaRepository<ReferenceAd, Long> {
    List<ReferenceAd> findByBrandId(Long brandId);
} 