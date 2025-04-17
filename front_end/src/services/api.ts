import axios from 'axios';
import { Brand, ReferenceAd, GeneratedAd, GenerationRequest, RefinementRequest } from '../types';

const API_BASE_URL = 'http://localhost:8084/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Brand APIs
export const getBrands = () => api.get<Brand[]>('/brands');
export const getBrand = (id: number) => api.get<Brand>(`/brands/${id}`);
export const createBrand = (brand: Brand) => api.post<Brand>('/brands', brand);
export const updateBrand = (id: number, brand: Brand) => api.put<Brand>(`/brands/${id}`, brand);
export const deleteBrand = (id: number) => api.delete(`/brands/${id}`);

// Reference Ad APIs
export const getReferenceAds = () => api.get<ReferenceAd[]>('/reference-ads');
export const getReferenceAd = (id: number) => api.get<ReferenceAd>(`/reference-ads/${id}`);
export const createReferenceAd = (ad: ReferenceAd) => api.post<ReferenceAd>('/reference-ads', ad);
export const updateReferenceAd = (id: number, ad: ReferenceAd) => api.put<ReferenceAd>(`/reference-ads/${id}`, ad);
export const deleteReferenceAd = (id: number) => api.delete(`/reference-ads/${id}`);
export const getReferenceAdsByBrand = (brandId: number) => api.get<ReferenceAd[]>(`/reference-ads/brand/${brandId}`);

// Generated Ad APIs
export const getGeneratedAds = () => api.get<GeneratedAd[]>('/generated-ads');
export const getGeneratedAd = (id: number) => api.get<GeneratedAd>(`/generated-ads/${id}`);
export const getGeneratedAdsByBrand = (brandId: number) => api.get<GeneratedAd[]>(`/generated-ads/brand/${brandId}`);
export const getGeneratedAdsByReference = (referenceId: number) => api.get<GeneratedAd[]>(`/generated-ads/reference/${referenceId}`);
export const updateGeneratedAd = (id: number, ad: GeneratedAd) => api.put<GeneratedAd>(`/generated-ads/${id}`, ad);
export const deleteGeneratedAd = (id: number) => api.delete(`/generated-ads/${id}`);

// Ad Generation APIs
export const generateAd = (request: GenerationRequest) => api.post<GeneratedAd>('/generate', request);
export const generateMultipleAds = (request: GenerationRequest, count: number) => 
    api.post<GeneratedAd[]>(`/generate/multiple?count=${count}`, request);
export const refineAd = (request: RefinementRequest) => api.post<GeneratedAd>('/refine', request); 