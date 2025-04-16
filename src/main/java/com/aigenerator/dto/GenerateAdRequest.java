package com.aigenerator.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GenerateAdRequest {
    @NotNull(message = "Reference Ad ID is required")
    private Long referenceAdId;
    
    @NotNull(message = "Brand ID is required")
    private Long brandId;
    
    @NotNull(message = "Generation prompt is required")
    private String generationPrompt;
} 