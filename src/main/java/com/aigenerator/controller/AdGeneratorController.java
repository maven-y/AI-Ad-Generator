package com.aigenerator.controller;

import com.aigenerator.model.Brand;
import com.aigenerator.model.GeneratedAd;
import com.aigenerator.model.ReferenceAd;
import com.aigenerator.service.AdGenerationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AdGeneratorController {
    private final AdGenerationService adGenerationService;

    @PostMapping("/generate")
    public ResponseEntity<GeneratedAd> generateAd(
            @RequestBody ReferenceAd referenceAd,
            @RequestBody Brand brand,
            @RequestParam String generationPrompt) {
        GeneratedAd generatedAd = adGenerationService.generateAd(referenceAd, brand, generationPrompt);
        return ResponseEntity.ok(generatedAd);
    }

    @PostMapping("/generate/multiple")
    public ResponseEntity<List<GeneratedAd>> generateMultipleAds(
            @RequestBody ReferenceAd referenceAd,
            @RequestBody Brand brand,
            @RequestParam String generationPrompt,
            @RequestParam(defaultValue = "3") int count) {
        List<GeneratedAd> generatedAds = adGenerationService.generateMultipleAds(referenceAd, brand, generationPrompt, count);
        return ResponseEntity.ok(generatedAds);
    }

    @PostMapping("/refine")
    public ResponseEntity<GeneratedAd> refineAd(
            @RequestBody GeneratedAd ad,
            @RequestParam String refinementPrompt) {
        GeneratedAd refinedAd = adGenerationService.refineAd(ad, refinementPrompt);
        return ResponseEntity.ok(refinedAd);
    }
} 