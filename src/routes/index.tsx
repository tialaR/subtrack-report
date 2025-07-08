import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@layouts/MainLayout';
import { Overview } from '@pages/Overview';
import { MapSets } from '@pages/MapSets';
import { RecordsDay } from '@pages/RecordsDay';
import { TabulationDay } from '@pages/TabulationDay';
import { UnderwaterInspection } from '@pages/UnderwaterInspection';
import { NotFound } from '@pages/NotFound';
import { subMapRoutes } from '@routes/SubMapRoutes';

const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Overview />,
        handle: { pageTitle: 'Overview' },
      },
      {
        path: 'mapa-geral',
        element: <MapSets />,
        handle: { pageTitle: 'Mapa Geral' },
      },
      {
        path: 'registros-do-dia',
        element: <RecordsDay />,
        handle: { pageTitle: 'Registros do Dia' },
      },
      {
        path: 'tabulacao-do-dia',
        element: <TabulationDay />,
        handle: { pageTitle: 'Tabulação do Dia' },
      },
      {
        path: 'inspecao-atuacao-granular',
        element: <UnderwaterInspection />,
        handle: { pageTitle: 'Inspeção de Atuação Granular' },
        children: subMapRoutes,
      },
      {
        path: '*',
        element: <NotFound />,
        handle: { pageTitle: '404 - Not Found' },
      },
    ],
  },
]);

export const AppRoutes: React.FC = () => {
  return <RouterProvider router={appRoutes} />;
};
