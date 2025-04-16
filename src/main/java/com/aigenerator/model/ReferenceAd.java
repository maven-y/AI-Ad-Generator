package com.aigenerator.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ReferenceAd {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Brand brand;

    private String adType; // e.g., "social_media", "banner", "email"
    private String platform; // e.g., "facebook", "instagram", "linkedin"
    
    @Column(columnDefinition = "TEXT")
    private String headline;
    
    @Column(columnDefinition = "TEXT")
    private String subheadline;
    
    @Column(columnDefinition = "TEXT")
    private String callToAction;
    
    @Column(columnDefinition = "TEXT")
    private String bodyText;
    
    private String imageUrl;
    private String colorScheme;
    private String layoutStructure;
    private String targetDemographic;
} 