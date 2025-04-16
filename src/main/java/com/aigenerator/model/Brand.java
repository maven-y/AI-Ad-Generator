package com.aigenerator.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    
    @ElementCollection
    private List<String> brandColors;
    
    @ElementCollection
    private List<String> brandFonts;
    
    private String toneOfVoice;
    private String targetAudience;
    private String brandPersonality;
    
    @ElementCollection
    private List<String> styleKeywords;
} 