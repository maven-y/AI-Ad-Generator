package com.aigenerator.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class GeneratedAd {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Brand brand;

    @ManyToOne
    private ReferenceAd referenceAd;

    private String adType;
    private String platform;
    
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
    
    @Column(columnDefinition = "TEXT")
    private String generationPrompt;
    
    private String status; // e.g., "draft", "approved", "rejected"
} 