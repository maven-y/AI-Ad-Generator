package com.aigenerator.service.impl;

import com.aigenerator.model.Brand;
import com.aigenerator.model.GeneratedAd;
import com.aigenerator.model.ReferenceAd;
import com.aigenerator.service.AdGenerationService;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Primary
@ConditionalOnMissingBean(OpenAIAdGenerationService.class)
public class MockAdGenerationService implements AdGenerationService {

    @Override
    public GeneratedAd generateAd(ReferenceAd referenceAd, Brand brand, String generationPrompt) {
        GeneratedAd ad = new GeneratedAd();
        ad.setBrand(brand);
        ad.setReferenceAd(referenceAd);
        ad.setGenerationPrompt(generationPrompt);
        ad.setHeadline("Sample Headline (OpenAI integration not configured)");
        ad.setSubheadline("Sample Subheadline");
        ad.setBodyText("This is a sample ad generated without OpenAI integration. Configure OpenAI to generate real ads.");
        ad.setCallToAction("Click Here");
        ad.setAdType("Sample");
        ad.setPlatform("Web");
        ad.setStatus("draft");
        return ad;
    }

    @Override
    public List<GeneratedAd> generateMultipleAds(ReferenceAd referenceAd, Brand brand, String generationPrompt, int count) {
        List<GeneratedAd> ads = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            GeneratedAd ad = generateAd(referenceAd, brand, generationPrompt);
            ad.setHeadline(ad.getHeadline() + " (Variation " + (i + 1) + ")");
            ads.add(ad);
        }
        return ads;
    }

    @Override
    public GeneratedAd refineAd(GeneratedAd ad, String refinementPrompt) {
        ad.setHeadline(ad.getHeadline() + " (Refined)");
        ad.setBodyText(ad.getBodyText() + "\n\nRefinement note: " + refinementPrompt);
        return ad;
    }
} 