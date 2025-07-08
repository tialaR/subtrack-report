import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiMap,
  FiCamera,
  FiChevronsLeft,
  FiCloudRain,
  FiEye
} from 'react-icons/fi';

import * as S from './styles';

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggle = () => setExpanded((prev) => !prev);

  useEffect(() => {
    const isSubInspectionRoute = location.pathname.startsWith('/inspecao-subaquatica');
    setOpenSubmenu(isSubInspectionRoute);
  }, [location.pathname]);

  const conjuntoRoutes = Array.from({ length: 10 }, (_, i) => ({
    label: `Conjunto ${i + 1}`,
    path: `/inspecao-subaquatica/conjunto-${i + 1}`
  }));

  return (
    <S.SidebarContainer $expanded={expanded}>
      <div>
        <S.Brand $expanded={expanded}>Submarine</S.Brand>

        <S.Nav role="navigation">
          <S.NavItem to="/" end $expanded={expanded}>
            <FiHome />
            <span>Overview</span>
          </S.NavItem>

          <S.NavItem to="/mapa-conjuntos" $expanded={expanded}>
            <FiMap />
            <span>Mapa dos Conjuntos</span>
          </S.NavItem>

          <S.NavItem to="/registros-do-dia" $expanded={expanded}>
            <FiCamera />
            <span>Registros do dia</span>
          </S.NavItem>

          <S.NavItem to="/tabulacao-do-dia" $expanded={expanded}>
            <FiCloudRain />
            <span>Tabulação do dia</span>
          </S.NavItem>

          {/* Submenu: Inspeção Subaquática */}
          <S.NavItemButton
            type="button"
            $expanded={expanded}
            $active={location.pathname.startsWith('/inspecao-subaquatica')}
            onClick={() => {
              if (!openSubmenu) {
                // Abriu submenu → navega para o primeiro item
                navigate('/inspecao-subaquatica/conjunto-1');
              }
              setOpenSubmenu((prev) => !prev);
            }}
          >
            <FiEye />
            <span>Inspeção Subaquática</span>
          </S.NavItemButton>

          {openSubmenu && (
            <S.SubNav>
              {conjuntoRoutes.map(({ label, path }, index) => {
                const shortLabel = `${label.charAt(0)}-${index + 1}`; // Ex: C-1

                return (
                  <S.SubNavItem
                    key={path}
                    to={path}
                    className={location.pathname === path ? 'active' : ''}
                  >
                    <span>{expanded ? label : shortLabel}</span>
                  </S.SubNavItem>
                );
              })}
            </S.SubNav>
          )}
        </S.Nav>
      </div>

      <S.Toggle onClick={toggle} $expanded={expanded}>
        <FiChevronsLeft />
        <span>Minimizar Menu</span>
      </S.Toggle>
    </S.SidebarContainer>
  );
}
