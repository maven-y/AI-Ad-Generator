package com.aigenerator.service.impl;

import com.aallam.openai.api.chat.*;
import com.aallam.openai.api.image.Image;
import com.aallam.openai.api.image.ImageCreation;
import com.aallam.openai.api.image.ImageUrl;
import com.aallam.openai.client.OpenAI;
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
    private final OpenAI openAI;

    @Override
    public GeneratedAd generateAd(ReferenceAd referenceAd, Brand brand, String generationPrompt) {
        // Create a prompt that incorporates brand guidelines and reference ad
        String prompt = buildPrompt(referenceAd, brand, generationPrompt);
        
        // Generate ad copy using GPT
        ChatCompletion chatCompletion = openAI.chatCompletion(ChatCompletionRequest.builder()
                .model("gpt-4")
                .messages(List.of(
                    new ChatMessage(ChatRole.SYSTEM, "You are an expert advertising copywriter."),
                    new ChatMessage(ChatRole.USER, prompt)
                ))
                .build());

        String generatedText = chatCompletion.choices().get(0).message().content();
        
        // Parse the generated text and create a new ad
        GeneratedAd generatedAd = parseGeneratedText(generatedText);
        generatedAd.setBrand(brand);
        generatedAd.setReferenceAd(referenceAd);
        generatedAd.setGenerationPrompt(generationPrompt);
        generatedAd.setStatus("draft");
        
        // Generate image if needed
        if (referenceAd.getImageUrl() != null) {
            String imagePrompt = buildImagePrompt(referenceAd, brand, generatedAd);
            ImageCreation imageCreation = openAI.imageCreation(ImageCreationRequest.builder()
                    .prompt(imagePrompt)
                    .n(1)
                    .size("1024x1024")
                    .build());
            
            Image generatedImage = imageCreation.data().get(0);
            generatedAd.setImageUrl(generatedImage.url().toString());
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
        
        ChatCompletion chatCompletion = openAI.chatCompletion(ChatCompletionRequest.builder()
                .model("gpt-4")
                .messages(List.of(
                    new ChatMessage(ChatRole.SYSTEM, "You are an expert advertising copywriter."),
                    new ChatMessage(ChatRole.USER, prompt)
                ))
                .build());

        String refinedText = chatCompletion.choices().get(0).message().content();
        
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