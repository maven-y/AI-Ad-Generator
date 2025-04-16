package com.aigenerator.service;

import com.aigenerator.model.GeneratedAd;
import java.util.List;

public interface GeneratedAdService {
    GeneratedAd saveGeneratedAd(GeneratedAd generatedAd);
    GeneratedAd getGeneratedAd(Long id);
    List<GeneratedAd> getAllGeneratedAds();
    List<GeneratedAd> getGeneratedAdsByBrand(Long brandId);
    List<GeneratedAd> getGeneratedAdsByReferenceAd(Long referenceAdId);
    GeneratedAd updateGeneratedAd(Long id, GeneratedAd generatedAd);
    void deleteGeneratedAd(Long id);
} 