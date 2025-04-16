-- Insert Brands
INSERT INTO brand (name, description, tone_of_voice, target_audience, brand_personality) 
VALUES ('TechFlow', 'Innovative tech solutions for modern businesses', 'Professional and friendly', 'Tech-savvy professionals', 'Innovative and reliable');

INSERT INTO brand (name, description, tone_of_voice, target_audience, brand_personality) 
VALUES ('EcoLife', 'Sustainable living products', 'Eco-friendly and inspiring', 'Environmentally conscious consumers', 'Sustainable and caring');

-- Insert Brand Colors
INSERT INTO brand_brand_colors (brand_id, brand_colors) VALUES (1, 'Blue');
INSERT INTO brand_brand_colors (brand_id, brand_colors) VALUES (1, 'White');
INSERT INTO brand_brand_colors (brand_id, brand_colors) VALUES (2, 'Green');
INSERT INTO brand_brand_colors (brand_id, brand_colors) VALUES (2, 'Brown');

-- Insert Brand Fonts
INSERT INTO brand_brand_fonts (brand_id, brand_fonts) VALUES (1, 'Roboto');
INSERT INTO brand_brand_fonts (brand_id, brand_fonts) VALUES (1, 'Open Sans');
INSERT INTO brand_brand_fonts (brand_id, brand_fonts) VALUES (2, 'Montserrat');
INSERT INTO brand_brand_fonts (brand_id, brand_fonts) VALUES (2, 'Lato');

-- Insert Style Keywords
INSERT INTO brand_style_keywords (brand_id, style_keywords) VALUES (1, 'Modern');
INSERT INTO brand_style_keywords (brand_id, style_keywords) VALUES (1, 'Innovative');
INSERT INTO brand_style_keywords (brand_id, style_keywords) VALUES (2, 'Natural');
INSERT INTO brand_style_keywords (brand_id, style_keywords) VALUES (2, 'Sustainable');

-- Insert Reference Ads
INSERT INTO reference_ad (ad_type, platform, headline, subheadline, call_to_action, body_text, image_url, color_scheme, layout_structure, target_demographic, brand_id) 
VALUES ('social_media', 'Facebook', 'Transform Your Business with TechFlow', 'Streamline operations and boost productivity', 'Get Started Today', 'Experience the power of AI-driven solutions that revolutionize your business processes.', 'https://example.com/techflow-ad.jpg', 'Blue and White', 'Modern Grid', 'Business Professionals', 1);

INSERT INTO reference_ad (ad_type, platform, headline, subheadline, call_to_action, body_text, image_url, color_scheme, layout_structure, target_demographic, brand_id) 
VALUES ('social_media', 'Instagram', 'Live Sustainably with EcoLife', 'Join the green revolution', 'Shop Now', 'Discover our eco-friendly products that make a difference for our planet.', 'https://example.com/ecolife-ad.jpg', 'Green and Brown', 'Natural Flow', 'Environmentally Conscious', 2);

-- Insert Generated Ads
INSERT INTO generated_ad (ad_type, platform, headline, subheadline, call_to_action, body_text, image_url, color_scheme, layout_structure, target_demographic, status, brand_id, reference_ad_id, generation_prompt) 
VALUES ('social_media', 'LinkedIn', 'Elevate Your Business with TechFlow AI', 'Smart solutions for modern challenges', 'Learn More', 'Harness the power of artificial intelligence to transform your business operations.', 'https://example.com/techflow-generated.jpg', 'Blue and White', 'Professional Layout', 'Tech Leaders', 'approved', 1, 1, 'Create a professional LinkedIn ad focusing on AI solutions');

INSERT INTO generated_ad (ad_type, platform, headline, subheadline, call_to_action, body_text, image_url, color_scheme, layout_structure, target_demographic, status, brand_id, reference_ad_id, generation_prompt) 
VALUES ('social_media', 'Twitter', 'Go Green with EcoLife Products', 'Sustainable living made easy', 'Join Now', 'Make a positive impact on our planet with our eco-friendly product line.', 'https://example.com/ecolife-generated.jpg', 'Green and Brown', 'Clean Design', 'Eco-Conscious', 'draft', 2, 2, 'Create an engaging Twitter ad about sustainable living'); 