// import { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { useGetSubMaps } from "@services/hooks/subMaps/useGetSubMaps";
// import { useSubMapStore } from "@hooks/useSubMapStore";

export const UnderwaterInspection: React.FC = () => {
  // const { getSubMaps } = useGetSubMaps();
  // const { setSubMaps } = useSubMapStore();
  // const location = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fetched = await getSubMaps();
  //     if (Array.isArray(fetched)) {
  //       setSubMaps(fetched);

  //       const isOnBasePath = [
  //         "/inspecao-atuacao-granular",
  //         "/inspecao-atuacao-granular/",
  //       ].includes(location.pathname);

  //       if (fetched.length > 0 && isOnBasePath) {
  //         const lastSubMap = fetched[fetched.length - 1];
  //         navigate(`/inspecao-atuacao-granular/${lastSubMap.title}`, {
  //           replace: true,
  //         });
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [getSubMaps, setSubMaps, location.pathname, navigate]);

  return <Outlet />;
};
