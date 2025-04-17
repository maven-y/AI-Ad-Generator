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
  DialogActions
} from '@mui/material';
import {
  FormatColorFill,
  FormatColorText,
  TextFields,
  Save,
  Close
} from '@mui/icons-material';
import axios from 'axios';

interface Brand {
  id: number;
  name: string;
}

interface ReferenceAd {
  id: number;
  headline: string;
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
}

interface AdCustomization {
  textColor: string;
  backgroundColor: string;
  fontSize: number;
  textPosition: 'top' | 'bottom' | 'center';
}

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
    generationPrompt: ''
  });
  const [customization, setCustomization] = useState<AdCustomization>({
    textColor: '#000000',
    backgroundColor: 'transparent',
    fontSize: 16,
    textPosition: 'bottom'
  });
  const adPreviewRef = React.useRef<HTMLDivElement>(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      const [brandsRes, adsRes] = await Promise.all([
        axios.get('http://localhost:8084/api/brands'),
        axios.get('http://localhost:8084/api/reference-ads')
      ]);
      console.log('Brands:', brandsRes.data);
      console.log('Reference Ads:', adsRes.data);
      setBrands(brandsRes.data);
      setReferenceAds(adsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load brands and reference ads');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!formData.brandId || !formData.referenceAdId) {
      setError('Please select both a brand and a reference ad');
      return;
    }

    if (!formData.generationPrompt.trim()) {
      setError('Please enter a generation prompt');
      return;
    }

    setGenerating(true);
    setError(null);
    try {
      console.log('Sending generate request with data:', {
        referenceAdId: Number(formData.referenceAdId),
        brandId: Number(formData.brandId),
        generationPrompt: formData.generationPrompt
      });
      const response = await axios.post('http://localhost:8084/api/generate', {
        referenceAdId: Number(formData.referenceAdId),
        brandId: Number(formData.brandId),
        generationPrompt: formData.generationPrompt
      });
      console.log('Generate response:', response.data);
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Generate New Ad
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Brand</InputLabel>
                <Select
                  value={formData.brandId}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  label="Brand"
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
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
                  {referenceAds
                    .filter(ad => !formData.brandId || ad.brand.id === Number(formData.brandId))
                    .map((ad) => (
                      <MenuItem key={ad.id} value={ad.id}>
                        {ad.headline}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

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
                placeholder="Enter specific requirements or preferences for the generated ad..."
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

      <Box sx={{ flex: 1 }}>
        {generatedAd && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Generated Ad Preview
            </Typography>
            
            {/* Customization Controls */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Customize Ad
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
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

            {/* Ad Preview */}
            <Box
              ref={adPreviewRef}
              sx={{
                position: 'relative',
                backgroundColor: customization.backgroundColor,
                borderRadius: 1,
                overflow: 'hidden'
              }}
            >
              {generatedAd.imageUrl && (
                <img
                  src={generatedAd.imageUrl}
                  alt="Generated ad"
                  style={{ width: '100%', height: 'auto' }}
                />
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
  );
};

export default GenerateAd; 