import React, { useState } from 'react';
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
  Container
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

interface Brand {
  id: number;
  name: string;
  description: string;
  brandColors: string[];
  brandFonts: string[];
  toneOfVoice: string;
  targetAudience: string;
}

interface ReferenceAd {
  id: number;
  headline: string;
  subheadline: string;
  bodyText: string;
  callToAction: string;
  platform: string;
  imageUrl: string;
  brand: Brand;
}

interface GeneratedAdResponse {
  id: number;
  headline: string;
  subheadline: string;
  bodyText: string;
  imageUrl: string;
  callToAction: string;
  status: string;
  brand: {
    name: string;
    description: string;
    brandColors: string[];
    brandFonts: string[];
    toneOfVoice: string;
    targetAudience: string;
  };
  referenceAd: {
    platform: string;
    headline: string;
    subheadline: string;
    bodyText: string;
    callToAction: string;
  };
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
    name: "TechFlow Solutions",
    description: "Enterprise AI and Digital Transformation",
    brandColors: ["#2563eb", "#f8fafc"],
    brandFonts: ["Roboto", "Inter"],
    toneOfVoice: "Professional and innovative",
    targetAudience: "Enterprise businesses and tech leaders"
  },
  {
    id: 2,
    name: "GreenEats",
    description: "Sustainable Food Delivery Service",
    brandColors: ["#22c55e", "#f0fdf4"],
    brandFonts: ["Poppins", "Open Sans"],
    toneOfVoice: "Eco-friendly and welcoming",
    targetAudience: "Health-conscious urban professionals"
  },
  {
    id: 3,
    name: "EduMaster",
    description: "Online Learning Platform",
    brandColors: ["#6366f1", "#eef2ff"],
    brandFonts: ["Montserrat", "Lato"],
    toneOfVoice: "Engaging and educational",
    targetAudience: "Students and lifelong learners"
  },
  {
    id: 4,
    name: "FitLife Pro",
    description: "Premium Fitness Equipment and Training",
    brandColors: ["#ec4899", "#fdf2f8"],
    brandFonts: ["Nunito", "Source Sans Pro"],
    toneOfVoice: "Motivational and energetic",
    targetAudience: "Fitness enthusiasts and health-conscious individuals"
  }
];

const predefinedReferenceAds: ReferenceAd[] = [
  {
    id: 1,
    brand: predefinedBrands[0],
    headline: "Transform Your Business with AI-Powered Solutions",
    subheadline: "Streamline Operations & Boost Productivity",
    bodyText: "Leverage cutting-edge AI technology to automate processes and drive growth. Join industry leaders who've achieved 3x ROI with TechFlow.",
    callToAction: "Schedule a Demo",
    platform: "LinkedIn",
    imageUrl: "https://example.com/techflow-ad.jpg"
  },
  {
    id: 2,
    brand: predefinedBrands[1],
    headline: "Sustainable Food Delivery at Your Doorstep",
    subheadline: "Eco-Friendly Packaging, Zero-Emission Delivery",
    bodyText: "Enjoy restaurant-quality meals delivered in 100% biodegradable packaging. Support local restaurants while saving the planet.",
    callToAction: "Order Now",
    platform: "Instagram",
    imageUrl: "https://example.com/greeneats-ad.jpg"
  },
  {
    id: 3,
    brand: predefinedBrands[2],
    headline: "Master New Skills from Industry Experts",
    subheadline: "Learn at Your Own Pace, Anywhere",
    bodyText: "Access over 1000+ courses from top instructors. Interactive learning experience with certificates upon completion.",
    callToAction: "Start Learning",
    platform: "Facebook",
    imageUrl: "https://example.com/edumaster-ad.jpg"
  },
  {
    id: 4,
    brand: predefinedBrands[3],
    headline: "Achieve Your Fitness Goals with Premium Equipment",
    subheadline: "Professional-Grade Gear for Home Workouts",
    bodyText: "Transform your home into a premium gym with our professional-grade equipment. Free training app included!",
    callToAction: "Shop Now",
    platform: "Instagram",
    imageUrl: "https://example.com/fitlife-ad.jpg"
  }
];

const GenerateAd: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [referenceAds, setReferenceAds] = useState<ReferenceAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedAd, setGeneratedAd] = useState<GeneratedAdResponse | null>(null);
  const [formData, setFormData] = useState({
    brandId: '',
    referenceAdId: '',
    generationPrompt: '',
    category: '',
    subcategory: ''
  });
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

  React.useEffect(() => {
    setBrands(predefinedBrands);
    setReferenceAds(predefinedReferenceAds);
    setLoading(false);
  }, []);

  const handleGenerate = async () => {
    if (!formData.brandId || !formData.referenceAdId) {
      setError('Please select both a brand and a reference ad');
      return;
    }

    if (!formData.generationPrompt.trim()) {
      setError('Please enter a generation prompt');
      return;
    }

    if (!selectedCategory || !selectedSubCategory) {
      setError('Please select both a category and subcategory');
      return;
    }

    setGenerating(true);
    setError(null);
    try {
      console.log('Sending generate request with data:', {
        referenceAdId: Number(formData.referenceAdId),
        brandId: Number(formData.brandId),
        generationPrompt: formData.generationPrompt,
        category: selectedCategory,
        subcategory: selectedSubCategory
      });
      const response = await axios.post('http://localhost:8084/api/generate', {
        referenceAdId: Number(formData.referenceAdId),
        brandId: Number(formData.brandId),
        generationPrompt: formData.generationPrompt,
        category: selectedCategory,
        subcategory: selectedSubCategory
      });
      
      // Structure the response data for better logging
      const responseData = {
        brand: {
          name: response.data.brand.name,
          description: response.data.brand.description,
          colors: response.data.brand.brandColors,
          fonts: response.data.brand.brandFonts,
          tone: response.data.brand.toneOfVoice,
          audience: response.data.brand.targetAudience
        },
        referenceAd: {
          platform: response.data.referenceAd.platform,
          headline: response.data.referenceAd.headline,
          subheadline: response.data.referenceAd.subheadline,
          bodyText: response.data.referenceAd.bodyText,
          callToAction: response.data.referenceAd.callToAction
        },
        generatedAd: {
          imageUrl: response.data.imageUrl,
          status: response.data.status,
          prompt: response.data.generationPrompt
        }
      };
      
      console.log('Generate response:', responseData);
      setGeneratedAd(response.data);
    } catch (error) {
      console.error('Error generating ad:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
      }
      setError('Failed to generate ad. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleBrandChange = (brandId: string) => {
    setFormData({
      ...formData,
      brandId,
      referenceAdId: '' // Reset reference ad when brand changes
    });
  };

  const handleSaveAd = () => {
    if (!generatedAd?.imageUrl) {
      setError('No image to save');
      return;
    }
    setIsImagePopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsImagePopupOpen(false);
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
                <FormControl fullWidth>
                  <InputLabel>Brand</InputLabel>
                  <Select
                    value={formData.brandId}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    label="Brand"
                  >
                    {predefinedBrands.map((brand) => (
                      <MenuItem key={brand.id} value={brand.id}>
                        <Box>
                          <Typography variant="subtitle2">{brand.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {brand.description}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Reference Ad</InputLabel>
                  <Select
                    value={formData.referenceAdId}
                    onChange={(e) => setFormData({
                      ...formData,
                      referenceAdId: e.target.value
                    })}
                    label="Reference Ad"
                  >
                    {predefinedReferenceAds
                      .filter(ad => !formData.brandId || ad.brand.id === Number(formData.brandId))
                      .map((ad) => (
                        <MenuItem key={ad.id} value={ad.id}>
                          <Box>
                            <Typography variant="subtitle2">{ad.headline}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              Platform: {ad.platform}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

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
                  onClick={handleGenerate}
                  disabled={generating || !formData.brandId || !formData.referenceAdId}
                  fullWidth
                >
                  {generating ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                      Generating...
                    </>
                  ) : (
                    'Generate Ad'
                  )}
                </Button>
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
                      <IconButton
                        size="small"
                        onClick={() => setCustomization(prev => ({
                          ...prev,
                          textColor: '#000000'
                        }))}
                      >
                        <FormatColorText />
                      </IconButton>
                    </Tooltip>
                    <input
                      type="color"
                      value={customization.textColor}
                      onChange={(e) => setCustomization(prev => ({
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
              variant="outlined"
              onClick={handleDownload}
            >
              Download
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                window.open(generatedAd?.imageUrl, '_blank');
                handleClosePopup();
              }}
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