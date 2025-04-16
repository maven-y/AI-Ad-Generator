package com.aigenerator.service;

import com.aigenerator.model.ReferenceAd;
import java.util.List;

public interface ReferenceAdService {
    ReferenceAd createReferenceAd(ReferenceAd referenceAd);
    ReferenceAd getReferenceAd(Long id);
    List<ReferenceAd> getAllReferenceAds();
    List<ReferenceAd> getReferenceAdsByBrand(Long brandId);
    ReferenceAd updateReferenceAd(Long id, ReferenceAd referenceAd);
    void deleteReferenceAd(Long id);
} 