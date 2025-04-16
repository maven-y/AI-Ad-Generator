package com.aigenerator.controller;

import com.aigenerator.model.ReferenceAd;
import com.aigenerator.service.ReferenceAdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reference-ads")
@RequiredArgsConstructor
public class ReferenceAdController {
    private final ReferenceAdService referenceAdService;

    @PostMapping
    public ResponseEntity<ReferenceAd> createReferenceAd(@RequestBody ReferenceAd referenceAd) {
        return ResponseEntity.ok(referenceAdService.createReferenceAd(referenceAd));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReferenceAd> getReferenceAd(@PathVariable Long id) {
        return ResponseEntity.ok(referenceAdService.getReferenceAd(id));
    }

    @GetMapping
    public ResponseEntity<List<ReferenceAd>> getAllReferenceAds() {
        return ResponseEntity.ok(referenceAdService.getAllReferenceAds());
    }

    @GetMapping("/brand/{brandId}")
    public ResponseEntity<List<ReferenceAd>> getReferenceAdsByBrand(@PathVariable Long brandId) {
        return ResponseEntity.ok(referenceAdService.getReferenceAdsByBrand(brandId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReferenceAd> updateReferenceAd(@PathVariable Long id, @RequestBody ReferenceAd referenceAd) {
        return ResponseEntity.ok(referenceAdService.updateReferenceAd(id, referenceAd));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReferenceAd(@PathVariable Long id) {
        referenceAdService.deleteReferenceAd(id);
        return ResponseEntity.ok().build();
    }
} 