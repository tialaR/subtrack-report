import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@layouts/MainLayout';
import { Overview } from '@pages/Overview';
import { MapSets } from '@pages/MapSets';
import { RecordsDay } from '@pages/RecordsDay';
import { TabulationDay } from '@pages/TabulationDay';
import { UnderwaterInspection } from '@pages/UnderwaterInspection';
import { NotFound } from '@pages/NotFound';

// Conjuntos 1 a 10
import { Set1 } from '@pages/UnderwaterInspection/Set1';
import { Set2 } from '@pages/UnderwaterInspection/Set2';
import { Set3 } from '@pages/UnderwaterInspection/Set3';
import { Set4 } from '@pages/UnderwaterInspection/Set4';
import { Set5 } from '@pages/UnderwaterInspection/Set5';
import { Set6 } from '@pages/UnderwaterInspection/Set6';
import { Set7 } from '@pages/UnderwaterInspection/Set7';
import { Set8 } from '@pages/UnderwaterInspection/Set8';
import { Set9 } from '@pages/UnderwaterInspection/Set9';
import { Set10 } from '@pages/UnderwaterInspection/Set10';

const sets = [Set1, Set2, Set3, Set4, Set5, Set6, Set7, Set8, Set9, Set10];

const underwaterChildren = sets?.map((Component, index) => ({
  path: `conjunto-${index + 1}`,
  element: <Component />,
  handle: {
    pageTitle: `Inspeção Subaquática - Conjunto ${index + 1}`,
  },
}));

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
        path: 'mapa-conjuntos',
        element: <MapSets />,
        handle: { pageTitle: 'Mapa dos Conjuntos' },
      },
      {
        path: 'registros-do-dia',
        element: <RecordsDay />,
        handle: { pageTitle: 'Registros do dia' },
      },
      {
        path: 'tabulacao-do-dia',
        element: <TabulationDay />,
        handle: { pageTitle: 'Tabulação do dia' },
      },
      {
        path: 'inspecao-subaquatica',
        element: <UnderwaterInspection />,
        handle: { pageTitle: 'Inspeção Subaquática' },
        children: underwaterChildren,
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
