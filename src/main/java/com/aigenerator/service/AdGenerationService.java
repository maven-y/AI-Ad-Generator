package com.aigenerator.service;

import com.aigenerator.model.Brand;
import com.aigenerator.model.GeneratedAd;
import com.aigenerator.model.ReferenceAd;

import java.util.List;

public interface AdGenerationService {
    GeneratedAd generateAd(ReferenceAd referenceAd, Brand brand, String generationPrompt);
    List<GeneratedAd> generateMultipleAds(ReferenceAd referenceAd, Brand brand, String generationPrompt, int count);
    GeneratedAd refineAd(GeneratedAd ad, String refinementPrompt);
} 