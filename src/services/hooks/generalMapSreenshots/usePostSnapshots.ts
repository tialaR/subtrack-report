import { useState } from "react";
import type { ImageAnnotatorData } from "@components/ImageAnnotator/types";
import { api } from "@services/api";

export const usePostSnapshots = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const postSnapshot = async (snapshot: ImageAnnotatorData & { subMapId: string; title: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post("/general_map_screenshot_markers", snapshot);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    postSnapshot,
    isLoading,
    error,
  };
};
