export interface Brand {
    id: number;
    name: string;
    description: string;
    brandColors: string[];
    brandFonts: string[];
    toneOfVoice: string;
    targetAudience: string;
    brandPersonality: string;
    styleKeywords: string[];
}

export interface ReferenceAd {
    id: number;
    brand: Brand;
    headline: string;
    subheadline: string;
    bodyText: string;
    callToAction: string;
    platform: string;
    imageUrl: string;
    adType?: string;
    colorScheme?: string[];
    layoutStructure?: string;
    targetDemographic?: string;
}

export interface GeneratedAd extends ReferenceAd {
    status: 'draft' | 'approved' | 'rejected';
    generationPrompt: string;
    referenceAd: {
        id: number;
    };
}

export interface GenerationRequest {
    referenceAdId: number;
    brandId: number;
    generationPrompt: string;
}

export interface RefinementRequest {
    id: number;
    refinementPrompt: string;
}

export interface GeneratedAdResponse {
    id?: number;
    adType: string;
    platform: string;
    headline: string;
    subheadline: string;
    callToAction: string;
    bodyText: string;
    imageUrl: string;
    colorScheme: string;
    layoutStructure: string;
    targetDemographic: string;
    status: 'draft' | 'approved' | 'rejected';
    generationPrompt: string;
    brand: Brand;
    referenceAd: ReferenceAd;
} 