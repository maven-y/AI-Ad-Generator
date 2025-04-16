package com.aigenerator.service;

import com.aigenerator.model.Brand;
import java.util.List;

public interface BrandService {
    Brand createBrand(Brand brand);
    Brand getBrand(Long id);
    List<Brand> getAllBrands();
    Brand updateBrand(Long id, Brand brand);
    void deleteBrand(Long id);
} 