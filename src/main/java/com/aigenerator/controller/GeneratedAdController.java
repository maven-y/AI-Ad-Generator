package com.aigenerator.controller;

import com.aigenerator.model.GeneratedAd;
import com.aigenerator.service.GeneratedAdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/generated-ads")
@RequiredArgsConstructor
public class GeneratedAdController {
    private final GeneratedAdService generatedAdService;

    @PostMapping
    public ResponseEntity<GeneratedAd> saveGeneratedAd(@RequestBody GeneratedAd generatedAd) {
        return ResponseEntity.ok(generatedAdService.saveGeneratedAd(generatedAd));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GeneratedAd> getGeneratedAd(@PathVariable Long id) {
        return ResponseEntity.ok(generatedAdService.getGeneratedAd(id));
    }

    @GetMapping
    public ResponseEntity<List<GeneratedAd>> getAllGeneratedAds() {
        return ResponseEntity.ok(generatedAdService.getAllGeneratedAds());
    }

    @GetMapping("/brand/{brandId}")
    public ResponseEntity<List<GeneratedAd>> getGeneratedAdsByBrand(@PathVariable Long brandId) {
        return ResponseEntity.ok(generatedAdService.getGeneratedAdsByBrand(brandId));
    }

    @GetMapping("/reference/{referenceAdId}")
    public ResponseEntity<List<GeneratedAd>> getGeneratedAdsByReferenceAd(@PathVariable Long referenceAdId) {
        return ResponseEntity.ok(generatedAdService.getGeneratedAdsByReferenceAd(referenceAdId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GeneratedAd> updateGeneratedAd(@PathVariable Long id, @RequestBody GeneratedAd generatedAd) {
        return ResponseEntity.ok(generatedAdService.updateGeneratedAd(id, generatedAd));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGeneratedAd(@PathVariable Long id) {
        generatedAdService.deleteGeneratedAd(id);
        return ResponseEntity.ok().build();
    }
} 