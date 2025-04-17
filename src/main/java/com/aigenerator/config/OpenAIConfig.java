package com.aigenerator.config;

import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.Duration;

@Configuration
public class OpenAIConfig {
    
    @Value("${openai.api.key}")
    private String openaiApiKey;
    
    @Value("${openai.api.timeout:30000}")
    private int timeout;
    
    @Value("${openai.api.connect-timeout:10000}")
    private int connectTimeout;
    
    @Value("${openai.api.read-timeout:30000}")
    private int readTimeout;
    
    @Bean
    public OpenAiService openAiService() {
        return new OpenAiService(openaiApiKey, Duration.ofMillis(timeout));
    }
} 