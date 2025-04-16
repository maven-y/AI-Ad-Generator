package com.aigenerator.repository;

import com.aigenerator.model.GeneratedAd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeneratedAdRepository extends JpaRepository<GeneratedAd, Long> {
    List<GeneratedAd> findByBrandId(Long brandId);
    List<GeneratedAd> findByReferenceAdId(Long referenceAdId);
} 