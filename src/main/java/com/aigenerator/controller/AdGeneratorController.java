package com.aigenerator.controller;

import com.aigenerator.dto.GenerateAdRequest;
import com.aigenerator.model.Brand;
import com.aigenerator.model.GeneratedAd;
import com.aigenerator.model.ReferenceAd;
import com.aigenerator.service.AdGenerationService;
import com.aigenerator.service.BrandService;
import com.aigenerator.service.ReferenceAdService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AdGeneratorController {
    private final AdGenerationService adGenerationService;
    private final BrandService brandService;
    private final ReferenceAdService referenceAdService;

    @PostMapping("/generate")
    public ResponseEntity<GeneratedAd> generateAd(@Valid @RequestBody GenerateAdRequest request) {
        log.info("Received generate ad request: {}", request);
        try {
            ReferenceAd referenceAd = referenceAdService.getReferenceAd(request.getReferenceAdId());
            log.info("Found reference ad: {}", referenceAd);
            
            Brand brand = brandService.getBrand(request.getBrandId());
            log.info("Found brand: {}", brand);
            
            GeneratedAd generatedAd = adGenerationService.generateAd(referenceAd, brand, request.getGenerationPrompt());
            log.info("Generated ad: {}", generatedAd);
            
            return ResponseEntity.ok(generatedAd);
        } catch (Exception e) {
            log.error("Error generating ad: {}", e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping("/generate/multiple")
    public ResponseEntity<List<GeneratedAd>> generateMultipleAds(
            @Valid @RequestBody GenerateAdRequest request,
            @RequestParam(defaultValue = "3") int count) {
        log.info("Received generate multiple ads request: {}, count: {}", request, count);
        try {
            ReferenceAd referenceAd = referenceAdService.getReferenceAd(request.getReferenceAdId());
            log.info("Found reference ad: {}", referenceAd);
            
            Brand brand = brandService.getBrand(request.getBrandId());
            log.info("Found brand: {}", brand);
            
            List<GeneratedAd> generatedAds = adGenerationService.generateMultipleAds(referenceAd, brand, request.getGenerationPrompt(), count);
            log.info("Generated {} ads", generatedAds.size());
            
            return ResponseEntity.ok(generatedAds);
        } catch (Exception e) {
            log.error("Error generating multiple ads: {}", e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping("/refine")
    public ResponseEntity<GeneratedAd> refineAd(
            @RequestBody GeneratedAd ad,
            @RequestParam String refinementPrompt) {
        log.info("Received refine ad request for ad: {}, prompt: {}", ad, refinementPrompt);
        try {
            GeneratedAd refinedAd = adGenerationService.refineAd(ad, refinementPrompt);
            log.info("Refined ad: {}", refinedAd);
            return ResponseEntity.ok(refinedAd);
        } catch (Exception e) {
            log.error("Error refining ad: {}", e.getMessage(), e);
            throw e;
        }
    }
} 