import { createContext, useContext, useEffect, useRef } from "react";
import type { AxiosError } from "axios";
import { useGetSubMaps } from "@services/hooks/subMaps/useGetSubMaps";
import type { SubMap } from "@services/hooks/subMaps/types";

type SubMapContextType = {
  subMaps: SubMap[];
  isSubMapsLoading: boolean;
  isSubMapError: unknown | AxiosError;
};

const SubMapContext = createContext<SubMapContextType>({
  subMaps: [],
  isSubMapsLoading: false,
  isSubMapError: null,
});

export const SubMapProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    subMaps,
    getSubMaps,
    loading: isSubMapsLoading,
    error: isSubMapError,
  } = useGetSubMaps();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      getSubMaps();
    }
  }, []);

  return (
    <SubMapContext.Provider
      value={{ subMaps, isSubMapsLoading, isSubMapError }}
    >
      {children}
    </SubMapContext.Provider>
  );
};

// Hook para acessar o contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useSubMapsContext = (): SubMapContextType => {
  const context = useContext(SubMapContext);
  if (!context) {
    throw new Error("useSubMapsContext must be used within a SubMapProvider");
  }
  return context;
};
