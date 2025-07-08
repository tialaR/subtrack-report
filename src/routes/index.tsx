import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "@layouts/MainLayout";
import { ReportStorageViewer } from "@pages/ReportStorageViewer";
import { MapSets } from "@pages/MapSets";
import { RecordsOfDay } from "@pages/RecordsOfDay";
import { TabulationDay } from "@pages/TabulationDay";
import { UnderwaterInspection } from "@pages/UnderwaterInspection";
import { NotFound } from "@pages/NotFound";
// import { useSubMapRoutes } from "@hooks/useSubMapRoutes";

export const AppRoutes: React.FC = () => {
  // const { routes: dynamicSubRoutes } = useSubMapRoutes();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <ReportStorageViewer />,
          handle: { pageTitle: " ReportStorageViewer" },
        },
        {
          path: "mapa-geral",
          element: <MapSets />,
          handle: { pageTitle: "Mapa Geral" },
        },
        {
          path: "registros-do-dia",
          element: <RecordsOfDay />,
          handle: { pageTitle: "Registros do Dia" },
        },
        {
          path: "tabulacao-do-dia",
          element: <TabulationDay />,
          handle: { pageTitle: "Tabulação do Dia" },
        },
        // {
        //   path: "inspecao-atuacao-granular",
        //   element: <UnderwaterInspection />,
        //   handle: { pageTitle: "Inspeção de Atuação Granular" },
        //   children: dynamicSubRoutes,
        // },
        {
          path: "*",
          element: <NotFound />,
          handle: { pageTitle: "404 - Not Found" },
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
