import { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type StoredImage = {
  id: string;
  image: string;
};

const STORAGE_KEY_RECORD_DAYS_IMAGES = "@maptrack-report:records-day-images";

export const useLocalImagesStorage = () => {
  const [images, setImages] = useState<StoredImage[]>([]);

  // Load images from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY_RECORD_DAYS_IMAGES);
    if (saved) {
      try {
        const parsed: StoredImage[] = JSON.parse(saved);
        setImages(parsed);
      } catch (err) {
        console.error('Erro ao carregar imagens:', err);
      }
    }
  }, [STORAGE_KEY_RECORD_DAYS_IMAGES]);

  const persist = (updated: StoredImage[]) => {
    setImages(updated);
    if (updated.length > 0) {
      localStorage.setItem(STORAGE_KEY_RECORD_DAYS_IMAGES, JSON.stringify(updated));
    } else {
      localStorage.removeItem(STORAGE_KEY_RECORD_DAYS_IMAGES);
    }
  };

  const updateImageAt = useCallback((file: File, index: number) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const newImage: StoredImage = { id: uuidv4(), image: dataUrl };

      persist((prev => {
        const copy = [...prev];
        if (index < copy.length) {
          copy[index] = newImage;
        } else {
          copy.push(newImage);
        }
        return copy;
      })(images));
    };
    reader.readAsDataURL(file);
  }, [images, STORAGE_KEY_RECORD_DAYS_IMAGES]);

  const removeImageById = useCallback((id: string) => {
    const updated = images.filter((img) => img.id !== id);
    persist(updated);
  }, [images, STORAGE_KEY_RECORD_DAYS_IMAGES]);

  const removeAllImages = useCallback(() => {
    persist([]);
  }, [STORAGE_KEY_RECORD_DAYS_IMAGES]);

  return {
    images,
    updateImageAt,
    removeImageById,
    removeAllImages,
  };
};
