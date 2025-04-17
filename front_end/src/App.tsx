import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import GenerateAd from './pages/GenerateAd';

// Create pages
const Dashboard = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Welcome to AI Ad Generator
    </Typography>
    <Typography variant="body1" paragraph>
      Generate creative and engaging ads using AI technology.
    </Typography>
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                AI Ad Generator
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/brands">
                Brands
              </Button>
              <Button color="inherit" component={Link} to="/reference-ads">
                Reference Ads
              </Button>
              <Button color="inherit" component={Link} to="/generate">
                Generate Ad
              </Button>
            </Toolbar>
          </AppBar>

          <Container 
            maxWidth={false}
            sx={{ 
              mt: 4,
              px: 0,
              width: '100%',
              maxWidth: '100% !important',
              '@media (min-width: 2000px)': {
                maxWidth: '100%',
                paddingLeft: 0,
                paddingRight: 0
              }
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/brands" element={<div>Brands Page</div>} />
              <Route path="/reference-ads" element={<div>Reference Ads Page</div>} />
              <Route path="/generate" element={<GenerateAd />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
