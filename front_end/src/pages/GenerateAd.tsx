import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Stack,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Slider,
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
  Container,
  Popover,
  Autocomplete
} from '@mui/material';
import {
  FormatColorFill,
  FormatColorText,
  TextFields,
  Save,
  Close
} from '@mui/icons-material';
import axios from 'axios';
import { Category, SubCategory, adCategories } from '../types/Category';
import { generateAd } from '../services/api';
import { Brand, ReferenceAd, GenerationRequest, GeneratedAdResponse } from '../types';
import { ChromePicker } from 'react-color';

interface FormData {
  brand: Brand | null;
  referenceAd: ReferenceAd | null;
  generationPrompt: string;
}

interface AdCustomization {
  textColor: string;
  backgroundColor: string;
  fontSize: number;
  textPosition: 'top' | 'bottom' | 'center';
}

const predefinedBrands: Brand[] = [
  {
    id: 1,
    name: 'TechFlow',
    description: 'Innovative tech solutions for modern businesses',
    brandColors: ['#2196F3', '#1976D2', '#0D47A1'],
    brandFonts: ['Roboto', 'Open Sans'],
    toneOfVoice: 'Professional and innovative',
    targetAudience: 'Tech-savvy professionals',
    brandPersonality: 'Forward-thinking and reliable',
    styleKeywords: ['modern', 'clean', 'professional']
  },
  {
    id: 2,
    name: 'EcoLife',
    description: 'Sustainable living products for conscious consumers',
    brandColors: ['#4CAF50', '#2E7D32', '#1B5E20'],
    brandFonts: ['Montserrat', 'Lato'],
    toneOfVoice: 'Eco-friendly and inspiring',
    targetAudience: 'Environmentally conscious consumers',
    brandPersonality: 'Sustainable and caring',
    styleKeywords: ['natural', 'eco-friendly', 'sustainable']
  },
  {
    id: 3,
    name: 'FitFuel',
    description: 'Premium nutrition for active lifestyles',
    brandColors: ['#FF5722', '#F4511E', '#BF360C'],
    brandFonts: ['Poppins', 'Raleway'],
    toneOfVoice: 'Energetic and motivational',
    targetAudience: 'Fitness enthusiasts',
    brandPersonality: 'Dynamic and health-focused',
    styleKeywords: ['energetic', 'vibrant', 'motivational']
  }
];

const predefinedReferenceAds: ReferenceAd[] = [
  {
    id: 1,
    brand: predefinedBrands[0],
    headline: "Transform Your Business with AI",
    subheadline: "Streamline operations and boost productivity",
    bodyText: "Our AI-powered solutions help businesses automate tasks and make data-driven decisions.",
    callToAction: "Get Started Today",
    platform: "LinkedIn",
    imageUrl: "https://example.com/tech-ad.jpg",
    adType: "Sponsored Post",
    colorScheme: ["#007bff", "#6c757d"],
    layoutStructure: "Image with overlay text",
    targetDemographic: "Business decision makers"
  },
  {
    id: 2,
    brand: predefinedBrands[1],
    headline: "Fresh, Local, Delivered",
    subheadline: "Support local restaurants and farmers",
    bodyText: "Order from your favorite local restaurants and get fresh, sustainable meals delivered.",
    callToAction: "Order Now",
    platform: "Instagram",
    imageUrl: "https://example.com/food-ad.jpg",
    adType: "Story Ad",
    colorScheme: ["#28a745", "#ffffff"],
    layoutStructure: "Full-screen image",
    targetDemographic: "Food enthusiasts"
  },
  {
    id: 3,
    brand: predefinedBrands[2],
    headline: "Learn From Industry Experts",
    subheadline: "Master new skills with our courses",
    bodyText: "Access high-quality courses taught by industry professionals and advance your career.",
    callToAction: "Start Learning",
    platform: "Facebook",
    imageUrl: "https://example.com/edu-ad.jpg",
    adType: "Carousel Ad",
    colorScheme: ["#17a2b8", "#ffffff"],
    layoutStructure: "Multiple images with text",
    targetDemographic: "Professional learners"
  },
  {
    id: 4,
    brand: predefinedBrands[3],
    headline: "Your Fitness Journey Starts Here",
    subheadline: "Professional equipment for every goal",
    bodyText: "Get the right equipment and guidance to achieve your fitness goals.",
    callToAction: "Shop Now",
    platform: "Facebook",
    imageUrl: "https://example.com/fitness-ad.jpg",
    adType: "Image Ad",
    colorScheme: ["#dc3545", "#ffffff"],
    layoutStructure: "Product showcase",
    targetDemographic: "Fitness enthusiasts"
  }
];

const fontSuggestions = [
  'Roboto',
  'Open Sans',
  'Montserrat',
  'Lato',
  'Poppins',
  'Raleway',
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia'
];

const brandNameSuggestions = [
  'TechFlow',
  'EcoLife',
  'FitFuel',
  'GreenLeaf',
  'SmartHome',
  'FreshBite',
  'UrbanStyle',
  'CloudTech',
  'WellnessPlus',
  'CreativeHub',
  'NatureCare',
  'FutureFit',
  'EcoStyle',
  'HealthFirst',
  'SmartLife'
];

const brandDescriptionSuggestions = [
  'Innovative tech solutions for modern businesses',
  'Sustainable living products for conscious consumers',
  'Premium nutrition for active lifestyles',
  'Eco-friendly products for a better tomorrow',
  'Smart home solutions for modern living',
  'Fresh and healthy food delivery service',
  'Urban fashion for the modern lifestyle',
  'Cloud-based solutions for businesses',
  'Holistic wellness products and services',
  'Creative solutions for digital needs',
  'Natural and organic personal care products',
  'Fitness and wellness for everyone',
  'Sustainable fashion for conscious consumers',
  'Healthcare solutions for better living',
  'Smart technology for everyday life'
];

const toneSuggestions = [
  'Professional',
  'Casual',
  'Friendly',
  'Formal',
  'Humorous',
  'Serious',
  'Energetic',
  'Calm',
  'Authoritative',
  'Empathetic'
];

const audienceSuggestions = [
  'Young Professionals',
  'Students',
  'Parents',
  'Tech Enthusiasts',
  'Business Owners',
  'Creative Professionals',
  'Health Conscious',
  'Fashion Forward',
  'Gamers',
  'Foodies'
];

const personalitySuggestions = [
  'Innovative',
  'Reliable',
  'Adventurous',
  'Sophisticated',
  'Playful',
  'Trustworthy',
  'Dynamic',
  'Elegant',
  'Authentic',
  'Modern'
];

const styleSuggestions = [
  'Minimalist',
  'Bold',
  'Clean',
  'Vibrant',
  'Classic',
  'Modern',
  'Elegant',
  'Playful',
  'Professional',
  'Creative'
];

const GenerateAd: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [referenceAds, setReferenceAds] = useState<ReferenceAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedAd, setGeneratedAd] = useState<GeneratedAdResponse | null>(null);
  const [formData, setFormData] = useState<FormData>({
    brand: null,
    referenceAd: null,
    generationPrompt: ''
  });
  const [editableBrand, setEditableBrand] = useState<Brand | null>(null);
  const [customization, setCustomization] = useState<AdCustomization>({
    textColor: '#000000',
    backgroundColor: 'transparent',
    fontSize: 16,
    textPosition: 'bottom'
  });
  const adPreviewRef = React.useRef<HTMLDivElement>(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLDivElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#000000');

  React.useEffect(() => {
    setBrands(predefinedBrands);
    setReferenceAds(predefinedReferenceAds);
    setLoading(false);
    // Initialize with the first brand and reference ad
    if (predefinedBrands.length > 0 && predefinedReferenceAds.length > 0) {
      const initialBrand = { ...predefinedBrands[0] };
      const initialReferenceAd = { ...predefinedReferenceAds[0] };
      setFormData({ 
        brand: initialBrand,
        referenceAd: initialReferenceAd,
        generationPrompt: ''
      });
      setEditableBrand(initialBrand);
      setSelectedColor(initialBrand.brandColors[0]);
    }
  }, []);

  React.useEffect(() => {
    if (formData.brand) {
      setEditableBrand({ ...formData.brand });
      setSelectedColor(formData.brand.brandColors[0]);
    }
  }, [formData.brand]);

  const handleCreateNewBrand = () => {
    const newBrand: Brand = {
      id: brands.length + 1,
      name: '',
      description: '',
      brandColors: ['#000000'],
      brandFonts: ['', ''],
      toneOfVoice: '',
      targetAudience: '',
      brandPersonality: '',
      styleKeywords: []
    };
    setBrands([...brands, newBrand]);
    setFormData({ ...formData, brand: newBrand });
    setEditableBrand(newBrand);
    setSelectedColor('#000000');
  };

  const handleBrandChange = (field: keyof Brand, value: string | string[]) => {
    if (editableBrand) {
      const updatedBrand = { ...editableBrand, [field]: value };
      setEditableBrand(updatedBrand);
      setFormData({ ...formData, brand: updatedBrand });
      
      // Update the brands array with the edited brand
      const updatedBrands = brands.map(brand => 
        brand.id === editableBrand.id ? updatedBrand : brand
      );
      setBrands(updatedBrands);
    }
  };

  const handleGenerate = async () => {
    try {
      if (!formData.brand?.id || !formData.referenceAd?.id) {
        setError('Please select a brand and reference ad');
        return;
      }

      setGenerating(true);
      setError(null);
      
      const request: GenerationRequest = {
        brandId: formData.brand.id,
        referenceAdId: formData.referenceAd.id,
        generationPrompt: formData.generationPrompt || ''
      };

      console.log('Sending request:', JSON.stringify(request, null, 2));
      console.log('Brand:', JSON.stringify(formData.brand, null, 2));
      console.log('Reference Ad:', JSON.stringify(formData.referenceAd, null, 2));
      
      try {
        const response = await generateAd(request);
        console.log('Received response:', JSON.stringify(response, null, 2));
        
        if (!response || !response.data) {
          throw new Error('Invalid response from server');
        }
        
        setGeneratedAd(response.data as unknown as GeneratedAdResponse);
      } catch (apiError: any) {
        console.error('API Error:', apiError);
        if (apiError.code === 'ERR_NETWORK') {
          setError('Network error: Please check if the backend server is running at http://localhost:8084');
        } else {
          setError(apiError.response?.data?.message || apiError.message || 'Failed to generate ad. Please try again.');
        }
        throw apiError;
      }
      
      setGenerating(false);
    } catch (error: any) {
      console.error('Error generating ad:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        code: error.code
      });
      setGenerating(false);
    }
  };

  const handleSaveAd = () => {
    if (generatedAd?.imageUrl) {
      setIsImagePopupOpen(true);
    } else {
      setError('No image available to save.');
    }
  };

  const handleClosePopup = () => {
    setIsImagePopupOpen(false);
  };

  const handleOpenInNewTab = () => {
    if (generatedAd?.imageUrl) {
      window.open(generatedAd.imageUrl, '_blank');
      handleClosePopup();
    }
  };

  const handleDownload = () => {
    if (!generatedAd?.imageUrl) return;
    
    // Create an invisible iframe to trigger the browser's save dialog
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Set the iframe source to the image URL
    iframe.src = generatedAd.imageUrl;
    
    // Remove the iframe after a short delay
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  const getPromptPlaceholder = (category: string, subcategory: string) => {
    const cat = adCategories.find(c => c.id === category);
    const sub = cat?.subcategories.find(s => s.id === subcategory);
    if (cat && sub) {
      return `Enter specific requirements for your ${sub.name} ad in the ${cat.name} category...`;
    }
    return 'Enter specific requirements or preferences for the generated ad...';
  };

  const getBrandDetails = (brandId: string) => {
    return predefinedBrands.find(b => b.id === Number(brandId));
  };

  const getReferenceAdDetails = (adId: string) => {
    return predefinedReferenceAds.find(ad => ad.id === Number(adId));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        p: 0,
        '@media (min-width: 2000px)': {  // Changed from 1200px to 2000px
          maxWidth: '100%',
          paddingLeft: 0,
          paddingRight: 0
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        gap: 2,
        p: 0,
        m: 0,
        width: '100%',
        '& > *': {
          m: 0,
          p: 0
        }
      }}>
        <Box sx={{ 
          flex: '0 0 480px',
          width: '100%',
          minWidth: '280px',
          p: 0
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 2,
              width: '100%',
              textAlign: 'left',
              pl: 0
            }}
          >
            Generate New Ad
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Card sx={{ mb: 3, width: '100%' }}>
            <CardContent sx={{ p: 2 }}>
              <Stack spacing={2}>
                {/* Brand Information Section */}
                <Typography variant="h6" color="primary" gutterBottom>
                  Brand Information
                </Typography>
                <Autocomplete
                  freeSolo
                  options={brandNameSuggestions}
                  value={editableBrand?.name || ''}
                  onChange={(_, newValue) => handleBrandChange('name', newValue || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Brand Name"
                      fullWidth
                      required
                    />
                  )}
                />
                <Autocomplete
                  freeSolo
                  options={brandDescriptionSuggestions}
                  value={editableBrand?.description || ''}
                  onChange={(_, newValue) => handleBrandChange('description', newValue || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Brand Description"
                      fullWidth
                      required
                    />
                  )}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography>Brand Color</Typography>
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => {
                      const newColor = e.target.value;
                      setSelectedColor(newColor);
                      if (editableBrand) {
                        const updatedBrand = { ...editableBrand, brandColors: [newColor] };
                        setEditableBrand(updatedBrand);
                        setFormData({ ...formData, brand: updatedBrand });
                      }
                    }}
                    style={{ width: 50, height: 30, padding: 0 }}
                  />
                </Box>
                <Autocomplete
                  freeSolo
                  options={fontSuggestions}
                  value={editableBrand?.brandFonts[0] || ''}
                  onChange={(_, newValue) => handleBrandChange('brandFonts', [newValue || ''])}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Brand Font"
                      fullWidth
                      required
                    />
                  )}
                />
                <Autocomplete
                  freeSolo
                  options={toneSuggestions}
                  value={editableBrand?.toneOfVoice || ''}
                  onChange={(_, newValue) => handleBrandChange('toneOfVoice', newValue || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tone of Voice"
                      fullWidth
                      required
                    />
                  )}
                />
                <Autocomplete
                  freeSolo
                  options={audienceSuggestions}
                  value={editableBrand?.targetAudience || ''}
                  onChange={(_, newValue) => handleBrandChange('targetAudience', newValue || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Target Audience"
                      fullWidth
                      required
                    />
                  )}
                />
                <Autocomplete
                  freeSolo
                  options={personalitySuggestions}
                  value={editableBrand?.brandPersonality || ''}
                  onChange={(_, newValue) => handleBrandChange('brandPersonality', newValue || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Brand Personality"
                      fullWidth
                      required
                    />
                  )}
                />
                <Autocomplete
                  freeSolo
                  multiple
                  options={styleSuggestions}
                  value={editableBrand?.styleKeywords || []}
                  onChange={(_, newValue) => handleBrandChange('styleKeywords', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Style Keywords"
                      fullWidth
                      required
                      helperText="Separate keywords with commas"
                    />
                  )}
                />

                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedSubCategory('');
                    }}
                    label="Category"
                  >
                    {adCategories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {selectedCategory && (
                  <FormControl fullWidth>
                    <InputLabel>Subcategory</InputLabel>
                    <Select
                      value={selectedSubCategory}
                      onChange={(e) => setSelectedSubCategory(e.target.value)}
                      label="Subcategory"
                    >
                      {adCategories
                        .find(cat => cat.id === selectedCategory)
                        ?.subcategories.map((sub) => (
                          <MenuItem key={sub.id} value={sub.id}>
                            {sub.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}

                <TextField
                  label="Generation Prompt"
                  value={formData.generationPrompt}
                  onChange={(e) => setFormData({
                    ...formData,
                    generationPrompt: e.target.value
                  })}
                  fullWidth
                  multiline
                  rows={3}
                  required
                  placeholder={getPromptPlaceholder(selectedCategory, selectedSubCategory)}
                  helperText={
                    selectedCategory && selectedSubCategory
                      ? `Creating ad for ${adCategories.find(c => c.id === selectedCategory)?.subcategories.find(s => s.id === selectedSubCategory)?.name}`
                      : 'Select a category and subcategory to get started'
                  }
                />

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleGenerate}
                  disabled={generating}
                  sx={{ height: 48 }}
                >
                  {generating ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'GENERATE AD'
                  )}
                </Button>

                {/* Built Prompt Display */}
                {formData.brand?.name && formData.referenceAd?.platform && formData.generationPrompt && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom color="primary">
                      Generated Prompt Preview
                    </Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {`Create an advertisement with the following specifications:

Brand: ${formData.brand.name}
Brand Description: ${formData.brand.description}
Brand Colors: ${formData.brand.brandColors.join(', ')}
Brand Fonts: ${formData.brand.brandFonts.join(', ')}
Tone of Voice: ${formData.brand.toneOfVoice}
Target Audience: ${formData.brand.targetAudience}

Reference Ad:
Platform: ${formData.referenceAd.platform}
Headline: ${formData.referenceAd.headline}
Subheadline: ${formData.referenceAd.subheadline}
Call to Action: ${formData.referenceAd.callToAction}

Category: ${adCategories.find(cat => cat.id === selectedCategory)?.name || ''}
Subcategory: ${adCategories.find(cat => cat.id === selectedCategory)?.subcategories.find(sub => sub.id === selectedSubCategory)?.name || ''}

Custom Requirements:
${formData.generationPrompt}`}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 auto', minWidth: 0, maxWidth: '100%' }}>
          {generatedAd && (
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3,
                width: '100%',
                maxWidth: '100%',
                margin: '0 auto',
                boxSizing: 'border-box',
                overflowX: 'hidden'
              }}
            >
              <Typography variant="h5" gutterBottom>
                Generated Ad Preview
              </Typography>
              
              {/* Customization Controls */}
              <Box sx={{ 
                mb: 3,
                width: '100%',
                overflowX: 'auto'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  alignItems: 'center', 
                  flexWrap: 'wrap', 
                  mb: 3,
                  width: '100%'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title="Text Color">
                      <span>
                        <IconButton
                          size="small"
                          onClick={() => setCustomization((prev: AdCustomization) => ({
                            ...prev,
                            textColor: '#000000'
                          }))}
                        >
                          <FormatColorText />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <input
                      type="color"
                      value={customization.textColor}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomization(prev => ({
                        ...prev,
                        textColor: e.target.value
                      }))}
                      style={{ width: 30, height: 30, padding: 0 }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title="Background Color">
                      <IconButton
                        size="small"
                        onClick={() => setCustomization(prev => ({
                          ...prev,
                          backgroundColor: 'transparent'
                        }))}
                      >
                        <FormatColorFill />
                      </IconButton>
                    </Tooltip>
                    <input
                      type="color"
                      value={customization.backgroundColor}
                      onChange={(e) => setCustomization(prev => ({
                        ...prev,
                        backgroundColor: e.target.value
                      }))}
                      style={{ width: 30, height: 30, padding: 0 }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200 }}>
                    <Tooltip title="Font Size">
                      <TextFields fontSize="small" />
                    </Tooltip>
                    <Slider
                      value={customization.fontSize}
                      onChange={(_, value) => setCustomization(prev => ({
                        ...prev,
                        fontSize: value as number
                      }))}
                      min={12}
                      max={32}
                      step={1}
                      size="small"
                    />
                  </Box>

                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Position</InputLabel>
                    <Select
                      value={customization.textPosition}
                      onChange={(e) => setCustomization(prev => ({
                        ...prev,
                        textPosition: e.target.value as 'top' | 'bottom' | 'center'
                      }))}
                      label="Position"
                    >
                      <MenuItem value="top">Top</MenuItem>
                      <MenuItem value="center">Center</MenuItem>
                      <MenuItem value="bottom">Bottom</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* Ad Preview and API Response Data Container */}
              <Box sx={{ 
                display: 'flex', 
                gap: 3,
                width: '100%'
              }}>
                {/* Ad Preview */}
                <Box
                  ref={adPreviewRef}
                  sx={{
                    position: 'relative',
                    backgroundColor: customization.backgroundColor,
                    borderRadius: 1,
                    overflow: 'hidden',
                    flex: '0 0 65%',
                    maxWidth: '65%'
                  }}
                >
                  {generatedAd.imageUrl && (
                    <Box sx={{ width: '100%', position: 'relative' }}>
                      <img
                        src={generatedAd.imageUrl}
                        alt="Generated ad"
                        style={{ 
                          width: '100%', 
                          height: 'auto',
                          display: 'block'
                        }}
                      />
                    </Box>
                  )}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      padding: 2,
                      ...(customization.textPosition === 'top' && { top: 0 }),
                      ...(customization.textPosition === 'center' && { top: '50%', transform: 'translateY(-50%)' }),
                      ...(customization.textPosition === 'bottom' && { bottom: 0 }),
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: customization.textColor,
                        fontSize: `${customization.fontSize}px`,
                        fontWeight: 'bold',
                        mb: 1
                      }}
                    >
                      {generatedAd.headline}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: customization.textColor,
                        fontSize: `${customization.fontSize - 2}px`,
                        mb: 1
                      }}
                    >
                      {generatedAd.subheadline}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: customization.textColor,
                        fontSize: `${customization.fontSize - 4}px`,
                        mb: 2
                      }}
                    >
                      {generatedAd.bodyText}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        fontSize: `${customization.fontSize - 4}px`,
                      }}
                    >
                      {generatedAd.callToAction}
                    </Button>
                  </Box>
                </Box>

                {/* API Response Data */}
                <Box sx={{ 
                  flex: '0 0 35%',
                  maxWidth: '35%',
                  maxHeight: '600px', 
                  overflowY: 'auto'
                }}>
                  <Typography variant="h6" gutterBottom>
                    API Response Data
                  </Typography>
                  <Paper sx={{ 
                    p: 2, 
                    bgcolor: '#f5f5f5',
                    width: '100%'
                  }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Brand Information:
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Name: {generatedAd.brand.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Description: {generatedAd.brand.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Colors: {generatedAd.brand.brandColors.join(', ')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Fonts: {generatedAd.brand.brandFonts.join(', ')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Tone: {generatedAd.brand.toneOfVoice}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Target Audience: {generatedAd.brand.targetAudience}
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom>
                      Reference Ad Information:
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Platform: {generatedAd.referenceAd.platform}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Headline: {generatedAd.referenceAd.headline}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Subheadline: {generatedAd.referenceAd.subheadline}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Body Text: {generatedAd.referenceAd.bodyText}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Call to Action: {generatedAd.referenceAd.callToAction}
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom>
                      Generated Ad Information:
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Status: {generatedAd.status}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Generation Prompt: {generatedAd.generationPrompt}
                    </Typography>
                  </Paper>
                </Box>
              </Box>

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Status: {generatedAd.status}
                </Typography>
                <Tooltip title="Save Customized Ad">
                  <IconButton 
                    color="primary"
                    onClick={handleSaveAd}
                  >
                    <Save />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          )}
        </Box>

        <Dialog
          open={isImagePopupOpen}
          onClose={handleClosePopup}
          maxWidth="md"
          fullWidth
        >
          <DialogContent sx={{ p: 0, position: 'relative' }}>
            <IconButton
              onClick={handleClosePopup}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
              }}
            >
              <Close />
            </IconButton>
            {generatedAd?.imageUrl && (
              <img
                src={generatedAd.imageUrl}
                alt="Generated ad"
                style={{ width: '100%', height: 'auto' }}
              />
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClosePopup}>Close</Button>
            <Button
              variant="contained"
              onClick={handleOpenInNewTab}
            >
              Open in New Tab
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default GenerateAd; 