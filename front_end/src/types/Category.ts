export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
}

export const adCategories: Category[] = [
  {
    id: 'ecommerce',
    name: 'E-Commerce & Retail',
    icon: '🛍️',
    subcategories: [
      { id: 'fashion', name: 'Fashion & Apparel' },
      { id: 'electronics', name: 'Electronics & Gadgets' },
      { id: 'home', name: 'Home & Kitchen' },
      { id: 'beauty', name: 'Beauty & Personal Care' },
      { id: 'fitness', name: 'Fitness & Wellness' },
      { id: 'toys', name: 'Toys & Games' },
      { id: 'pets', name: 'Pet Supplies' },
      { id: 'jewelry', name: 'Jewelry & Accessories' }
    ]
  },
  {
    id: 'business',
    name: 'Business & Services',
    icon: '🏢',
    subcategories: [
      { id: 'realestate', name: 'Real Estate' },
      { id: 'legal', name: 'Legal Services' },
      { id: 'financial', name: 'Financial Services' },
      { id: 'consulting', name: 'Consulting' },
      { id: 'hr', name: 'Recruitment & HR' },
      { id: 'saas', name: 'SaaS / B2B Software' },
      { id: 'events', name: 'Event Planning' }
    ]
  },
  {
    id: 'education',
    name: 'Education & Learning',
    icon: '📚',
    subcategories: [
      { id: 'courses', name: 'Online Courses' },
      { id: 'coaching', name: 'Coaching / Tutoring' },
      { id: 'institutions', name: 'Educational Institutions' },
      { id: 'testprep', name: 'Test Prep' },
      { id: 'language', name: 'Language Learning' }
    ]
  },
  {
    id: 'tech',
    name: 'Apps & Tech',
    icon: '📱',
    subcategories: [
      { id: 'mobileapps', name: 'Mobile Apps' },
      { id: 'software', name: 'Software Tools' },
      { id: 'productivity', name: 'Productivity Apps' },
      { id: 'startups', name: 'Tech Startups' },
      { id: 'ai', name: 'AI & Automation Tools' }
    ]
  },
  {
    id: 'travel',
    name: 'Travel & Hospitality',
    icon: '🧳',
    subcategories: [
      { id: 'hotels', name: 'Hotels & Resorts' },
      { id: 'airlines', name: 'Airlines' },
      { id: 'agencies', name: 'Travel Agencies' },
      { id: 'tours', name: 'Experiences & Tours' },
      { id: 'carrentals', name: 'Car Rentals' }
    ]
  },
  {
    id: 'food',
    name: 'Food & Beverages',
    icon: '🍔',
    subcategories: [
      { id: 'restaurants', name: 'Restaurants' },
      { id: 'delivery', name: 'Food Delivery' },
      { id: 'coffee', name: 'Coffee Shops' },
      { id: 'health', name: 'Health Foods' },
      { id: 'packaged', name: 'Packaged Goods' }
    ]
  }
]; 