import { useState, useEffect } from 'react';
import { Product } from '../types/vaporizer';

// Dummy data that matches the Product type structure
const dummyProduct: Product = {
  id: '1',
  name: 'Mighty+',
  manufacturer: 'Storz & Bickel',
  msrp: 399,
  imageUrl: '/vape.webp',
  ratings: {
    vaporPotency: 9,
    vaporComfort: 8,
    portability: 7,
    batteryLife: 8,
    buildQuality: 9,
    easeOfUse: 8,
    maintenance: 7,
    value: 8,
  },
  features: [
    'Hybrid Heating System',
    'USB-C Charging',
    'Fast Heat-Up Time (60s)',
    'Ceramic Coated Filling Chamber',
  ],
  pros: [
    'Excellent vapor quality',
    'Long battery life',
    'Easy to use and clean',
  ],
  cons: [
    'Bulky compared to competitors',
    'Higher price point',
  ],
  bestFor: [
    'Users prioritizing vapor quality',
    'At-home and group sessions',
    'Medical users',
  ],
  notIdealFor: [
    'Discreet, on-the-go use',
    'Budget-conscious buyers',
  ],
  description: 'The Mighty+ is a top-tier portable vaporizer known for its exceptional vapor quality and robust performance.',
  warranty: '3 Years',
  maintenanceLevel: 'Low',
  learningCurve: 'Easy',
};

export const useProduct = (productId: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    if (!productId) {
      setIsLoading(false);
      setIsError(true);
      setError({ message: 'No product ID provided.' });
      return;
    }

    // Simulate an API call
    const fetchProduct = () => {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      setTimeout(() => {
        // In a real app, you would fetch from an API based on productId
        // For now, we return the dummy product regardless of ID
        if (productId === 'error') { // Simulate an error case
          setProduct(null);
          setIsError(true);
          setError({ message: 'Failed to fetch product data.' });
        } else {
          setProduct(dummyProduct);
        }
        setIsLoading(false);
      }, 1000); // Simulate network delay
    };

    fetchProduct();

  }, [productId]);

  return { product, isLoading, isError, error };
};
