package com.aigenerator.config;

import com.aallam.openai.client.OpenAI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAIConfig {
    
    @Value("${openai.api.key}")
    private String apiKey;

    @Bean
    public OpenAI openAI() {
        return OpenAI.builder()
                .apiKey(apiKey)
                .build();
    }
} 