import { Outlet, useMatches } from 'react-router-dom';
import { Sidebar } from '@components/Sidebar';
import { MainTitle } from '@components/MainTitle';
import * as S from './styles';

const MainLayout: React.FC = () => {
  const matches     = useMatches();
  const activeMatch = matches[matches.length - 1];
  const pageTitle   =
    (activeMatch.handle as { pageTitle?: string })?.pageTitle ?? '';
    
  return (
    <S.Wrapper>
      <Sidebar />
      <S.Content>
        {pageTitle && <MainTitle>{pageTitle}</MainTitle>}
        <Outlet />
      </S.Content>
    </S.Wrapper>
  );
}

export { MainLayout }
