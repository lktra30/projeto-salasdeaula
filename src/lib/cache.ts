'use client';

import { Sala } from '@/types/auditorio';

const CACHE_KEY = 'salas-vox2you-cache';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutos em millisegundos

interface CacheData {
  data: Sala[];
  timestamp: number;
}

export const saveToCache = (salas: Sala[]): void => {
  try {
    const cacheData: CacheData = {
      data: salas,
      timestamp: Date.now()
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    }
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

export const loadFromCache = (): Sala[] | null => {
  try {
    if (typeof window === 'undefined') {
      return null;
    }

    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) {
      return null;
    }

    const cacheData: CacheData = JSON.parse(cached);
    const now = Date.now();
    const isExpired = (now - cacheData.timestamp) > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return cacheData.data;
  } catch (error) {
    console.error('Error loading from cache:', error);
    return null;
  }
};

export const clearCache = (): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CACHE_KEY);
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

export const isCacheValid = (): boolean => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }

    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) {
      return false;
    }

    const cacheData: CacheData = JSON.parse(cached);
    const now = Date.now();
    return (now - cacheData.timestamp) <= CACHE_DURATION;
  } catch (error) {
    console.error('Error checking cache validity:', error);
    return false;
  }
};