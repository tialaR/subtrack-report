import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetSubMaps } from "@services/hooks/subMaps/useGetSubMaps";
import type { SubMap } from "@services/hooks/subMaps/types";

export const SubMapDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { subMaps, getSubMaps } = useGetSubMaps();
  const [subMap, setSubMap] = useState<SubMap | null>(null);

  useEffect(() => {
    getSubMaps();
  }, []);

  useEffect(() => {
    const found = subMaps.find((s) => s.id === id);
    if (found) setSubMap(found);
  }, [subMaps, id]);

  if (!subMap) return <p>Carregando sub mapa...</p>;

  return (
    <div>
      <h1>{subMap.title}</h1>
      {subMap.image && (
        <img
          src={subMap.image}
          alt={`Imagem de ${subMap.title}`}
          style={{ maxWidth: "100%", borderRadius: "8px" }}
        />
      )}
    </div>
  );
};
