package com.aigenerator.service.impl;

import com.aigenerator.model.GeneratedAd;
import com.aigenerator.repository.GeneratedAdRepository;
import com.aigenerator.service.GeneratedAdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GeneratedAdServiceImpl implements GeneratedAdService {
    private final GeneratedAdRepository generatedAdRepository;

    @Override
    public GeneratedAd saveGeneratedAd(GeneratedAd generatedAd) {
        return generatedAdRepository.save(generatedAd);
    }

    @Override
    public GeneratedAd getGeneratedAd(Long id) {
        return generatedAdRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Generated ad not found with id: " + id));
    }

    @Override
    public List<GeneratedAd> getAllGeneratedAds() {
        return generatedAdRepository.findAll();
    }

    @Override
    public List<GeneratedAd> getGeneratedAdsByBrand(Long brandId) {
        return generatedAdRepository.findByBrandId(brandId);
    }

    @Override
    public List<GeneratedAd> getGeneratedAdsByReferenceAd(Long referenceAdId) {
        return generatedAdRepository.findByReferenceAdId(referenceAdId);
    }

    @Override
    public GeneratedAd updateGeneratedAd(Long id, GeneratedAd generatedAd) {
        GeneratedAd existingAd = getGeneratedAd(id);
        existingAd.setBrand(generatedAd.getBrand());
        existingAd.setReferenceAd(generatedAd.getReferenceAd());
        existingAd.setAdType(generatedAd.getAdType());
        existingAd.setPlatform(generatedAd.getPlatform());
        existingAd.setHeadline(generatedAd.getHeadline());
        existingAd.setSubheadline(generatedAd.getSubheadline());
        existingAd.setCallToAction(generatedAd.getCallToAction());
        existingAd.setBodyText(generatedAd.getBodyText());
        existingAd.setImageUrl(generatedAd.getImageUrl());
        existingAd.setColorScheme(generatedAd.getColorScheme());
        existingAd.setLayoutStructure(generatedAd.getLayoutStructure());
        existingAd.setTargetDemographic(generatedAd.getTargetDemographic());
        existingAd.setGenerationPrompt(generatedAd.getGenerationPrompt());
        existingAd.setStatus(generatedAd.getStatus());
        return generatedAdRepository.save(existingAd);
    }

    @Override
    public void deleteGeneratedAd(Long id) {
        generatedAdRepository.deleteById(id);
    }
} 