package com.aigenerator.service.impl;

import com.aigenerator.model.Brand;
import com.aigenerator.repository.BrandRepository;
import com.aigenerator.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;

    @Override
    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    @Override
    public Brand getBrand(Long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found with id: " + id));
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public Brand updateBrand(Long id, Brand brand) {
        Brand existingBrand = getBrand(id);
        existingBrand.setName(brand.getName());
        existingBrand.setDescription(brand.getDescription());
        existingBrand.setBrandColors(brand.getBrandColors());
        existingBrand.setBrandFonts(brand.getBrandFonts());
        existingBrand.setToneOfVoice(brand.getToneOfVoice());
        existingBrand.setTargetAudience(brand.getTargetAudience());
        existingBrand.setBrandPersonality(brand.getBrandPersonality());
        existingBrand.setStyleKeywords(brand.getStyleKeywords());
        return brandRepository.save(existingBrand);
    }

    @Override
    public void deleteBrand(Long id) {
        brandRepository.deleteById(id);
    }
} 