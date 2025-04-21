package com.aigenerator.service.impl;

import com.theokanning.openai.service.OpenAiService;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.image.CreateImageRequest;
import com.theokanning.openai.image.ImageResult;
import com.aigenerator.model.Brand;
import com.aigenerator.model.GeneratedAd;
import com.aigenerator.model.ReferenceAd;
import com.aigenerator.service.AdGenerationService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@ConditionalOnProperty(name = "openai.api.key")
public class OpenAIAdGenerationService implements AdGenerationService {
    private final OpenAiService openAiService;

    @Override
    public GeneratedAd generateAd(ReferenceAd referenceAd, Brand brand, String generationPrompt) {
        // Use the generation prompt directly
        ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest.builder()
                .model("gpt-4.1")
                .messages(List.of(new ChatMessage("user", generationPrompt)))
                .maxTokens(500)
                .temperature(0.7)
                .build();

        String generatedText = openAiService.createChatCompletion(chatCompletionRequest)
                .getChoices().get(0).getMessage().getContent();
        
        // Parse the generated text and create a new ad
        GeneratedAd generatedAd = parseGeneratedText(generatedText);
        generatedAd.setBrand(brand);
        generatedAd.setReferenceAd(referenceAd);
        generatedAd.setGenerationPrompt(generationPrompt);
        generatedAd.setStatus("draft");
        
        // Generate image if needed
        if (referenceAd.getImageUrl() != null) {
            CreateImageRequest imageRequest = CreateImageRequest.builder()
                    .prompt(generationPrompt)
                    .n(1)
                    .size("1024x1024")
                    .build();
            
            ImageResult generatedImage = openAiService.createImage(imageRequest);
            generatedAd.setImageUrl(generatedImage.getData().get(0).getUrl());
        }
        
        return generatedAd;
    }

    @Override
    public List<GeneratedAd> generateMultipleAds(ReferenceAd referenceAd, Brand brand, String generationPrompt, int count) {
        List<GeneratedAd> generatedAds = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            generatedAds.add(generateAd(referenceAd, brand, generationPrompt));
        }
        return generatedAds;
    }

    @Override
    public GeneratedAd refineAd(GeneratedAd ad, String refinementPrompt) {
        ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest.builder()
                .model("gpt-3.5-turbo")
                .messages(List.of(new ChatMessage("user", refinementPrompt)))
                .maxTokens(500)
                .temperature(0.7)
                .build();

        String refinedText = openAiService.createChatCompletion(chatCompletionRequest)
                .getChoices().get(0).getMessage().getContent();
        
        // Update the ad with refined content
        updateAdWithRefinedText(ad, refinedText);
        return ad;
    }

    private GeneratedAd parseGeneratedText(String generatedText) {
        // TODO: Implement parsing logic to extract ad components from the generated text
        GeneratedAd ad = new GeneratedAd();
        // Parse the text and set the appropriate fields
        return ad;
    }

    private void updateAdWithRefinedText(GeneratedAd ad, String refinedText) {
        // TODO: Implement logic to update the ad with refined content
    }
} 