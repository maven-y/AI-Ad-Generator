package com.aigenerator.service.impl;

import com.aigenerator.model.ReferenceAd;
import com.aigenerator.repository.ReferenceAdRepository;
import com.aigenerator.service.ReferenceAdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReferenceAdServiceImpl implements ReferenceAdService {
    private final ReferenceAdRepository referenceAdRepository;

    @Override
    public ReferenceAd createReferenceAd(ReferenceAd referenceAd) {
        return referenceAdRepository.save(referenceAd);
    }

    @Override
    public ReferenceAd getReferenceAd(Long id) {
        return referenceAdRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reference ad not found with id: " + id));
    }

    @Override
    public List<ReferenceAd> getAllReferenceAds() {
        return referenceAdRepository.findAll();
    }

    @Override
    public List<ReferenceAd> getReferenceAdsByBrand(Long brandId) {
        return referenceAdRepository.findByBrandId(brandId);
    }

    @Override
    public ReferenceAd updateReferenceAd(Long id, ReferenceAd referenceAd) {
        ReferenceAd existingAd = getReferenceAd(id);
        existingAd.setBrand(referenceAd.getBrand());
        existingAd.setAdType(referenceAd.getAdType());
        existingAd.setPlatform(referenceAd.getPlatform());
        existingAd.setHeadline(referenceAd.getHeadline());
        existingAd.setSubheadline(referenceAd.getSubheadline());
        existingAd.setCallToAction(referenceAd.getCallToAction());
        existingAd.setBodyText(referenceAd.getBodyText());
        existingAd.setImageUrl(referenceAd.getImageUrl());
        existingAd.setColorScheme(referenceAd.getColorScheme());
        existingAd.setLayoutStructure(referenceAd.getLayoutStructure());
        existingAd.setTargetDemographic(referenceAd.getTargetDemographic());
        return referenceAdRepository.save(existingAd);
    }

    @Override
    public void deleteReferenceAd(Long id) {
        referenceAdRepository.deleteById(id);
    }
} 