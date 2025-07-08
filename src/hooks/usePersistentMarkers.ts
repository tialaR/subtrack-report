import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type Point = {
  x: number;
  y: number;
  color: string;
};

const STORAGE_KEY = "@maptrack-report:image-markers-objects";

export type MarkerImageData = {
  id: string;
  title: string;
  image: string; // base64 da imagem original
  markers: Point[];
  uploaded: boolean;
};

type MarkerDataMap = Record<string, MarkerImageData>;

export function usePersistentMarkers(
  imageSrc: string,
  title: string,
  uploaded: boolean = false
) {
  const [data, setData] = useState<MarkerImageData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed: MarkerDataMap = stored ? JSON.parse(stored) : {};

    if (parsed[imageSrc]) {
      setData(parsed[imageSrc]);
    } else {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result as string;
            const initialData: MarkerImageData = {
              id: uuidv4(),
              title,
              image: base64,
              markers: [],
              uploaded,
            };
            parsed[imageSrc] = initialData;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
            setData(initialData);
          };
          reader.readAsDataURL(blob);
        });
    }
  }, [imageSrc, title, uploaded]);

  const updateMarkers = (newMarkers: Point[]) => {
    if (!data) return;
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed: MarkerDataMap = stored ? JSON.parse(stored) : {};

    const updated: MarkerImageData = {
      ...data,
      markers: newMarkers,
    };

    parsed[imageSrc] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    setData(updated);
  };

  return {
    markerData: data,
    markers: data?.markers || [],
    updateMarkers,
  };
}
