package com.aigenerator.service.impl;

import com.theokanning.openai.service.OpenAiService;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.image.CreateImageRequest;
import com.theokanning.openai.image.ImageResult;
import com.aigenerator.model.Brand;
import com.aigenerator.model.GeneratedAd;
import com.aigenerator.model.ReferenceAd;
import com.aigenerator.service.AdGenerationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OpenAIAdGenerationService implements AdGenerationService {
    private final OpenAiService openAiService;

    @Override
    public GeneratedAd generateAd(ReferenceAd referenceAd, Brand brand, String generationPrompt) {
        // Create a prompt that incorporates brand guidelines and reference ad
        String prompt = buildPrompt(referenceAd, brand, generationPrompt);
        
        // Generate ad copy using GPT
        CompletionRequest completionRequest = CompletionRequest.builder()
                .model("gpt-4")
                .prompt(prompt)
                .maxTokens(500)
                .temperature(0.7)
                .build();

        String generatedText = openAiService.createCompletion(completionRequest)
                .getChoices().get(0).getText();
        
        // Parse the generated text and create a new ad
        GeneratedAd generatedAd = parseGeneratedText(generatedText);
        generatedAd.setBrand(brand);
        generatedAd.setReferenceAd(referenceAd);
        generatedAd.setGenerationPrompt(generationPrompt);
        generatedAd.setStatus("draft");
        
        // Generate image if needed
        if (referenceAd.getImageUrl() != null) {
            String imagePrompt = buildImagePrompt(referenceAd, brand, generatedAd);
            CreateImageRequest imageRequest = CreateImageRequest.builder()
                    .prompt(imagePrompt)
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
        String prompt = buildRefinementPrompt(ad, refinementPrompt);
        
        CompletionRequest completionRequest = CompletionRequest.builder()
                .model("gpt-4")
                .prompt(prompt)
                .maxTokens(500)
                .temperature(0.7)
                .build();

        String refinedText = openAiService.createCompletion(completionRequest)
                .getChoices().get(0).getText();
        
        // Update the ad with refined content
        updateAdWithRefinedText(ad, refinedText);
        return ad;
    }

    private String buildPrompt(ReferenceAd referenceAd, Brand brand, String generationPrompt) {
        return String.format("""
            Create a new advertisement based on the following:
            
            Brand Guidelines:
            - Name: %s
            - Tone of Voice: %s
            - Target Audience: %s
            - Brand Personality: %s
            - Style Keywords: %s
            
            Reference Ad:
            - Type: %s
            - Platform: %s
            - Headline: %s
            - Subheadline: %s
            - Call to Action: %s
            - Body Text: %s
            
            Additional Requirements:
            %s
            
            Please generate a new ad that maintains brand consistency while being creative and unique.
            """,
            brand.getName(),
            brand.getToneOfVoice(),
            brand.getTargetAudience(),
            brand.getBrandPersonality(),
            String.join(", ", brand.getStyleKeywords()),
            referenceAd.getAdType(),
            referenceAd.getPlatform(),
            referenceAd.getHeadline(),
            referenceAd.getSubheadline(),
            referenceAd.getCallToAction(),
            referenceAd.getBodyText(),
            generationPrompt
        );
    }

    private String buildImagePrompt(ReferenceAd referenceAd, Brand brand, GeneratedAd generatedAd) {
        return String.format("""
            Create an advertisement image with the following characteristics:
            
            Brand Colors: %s
            Style: %s
            
            The image should complement this ad copy:
            Headline: %s
            Subheadline: %s
            
            Reference layout: %s
            """,
            String.join(", ", brand.getBrandColors()),
            String.join(", ", brand.getStyleKeywords()),
            generatedAd.getHeadline(),
            generatedAd.getSubheadline(),
            referenceAd.getLayoutStructure()
        );
    }

    private String buildRefinementPrompt(GeneratedAd ad, String refinementPrompt) {
        return String.format("""
            Refine this advertisement based on the following requirements:
            
            Current Ad:
            Headline: %s
            Subheadline: %s
            Call to Action: %s
            Body Text: %s
            
            Refinement Request:
            %s
            
            Please provide an improved version that addresses the refinement request while maintaining brand consistency.
            """,
            ad.getHeadline(),
            ad.getSubheadline(),
            ad.getCallToAction(),
            ad.getBodyText(),
            refinementPrompt
        );
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