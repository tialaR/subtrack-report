import { useState } from "react";
import {
  FiHome,
  FiMap,
  FiCamera,
  FiChevronsLeft,
  FiCloudRain,
  FiEye,
  // FiMapPin,
} from "react-icons/fi";
import Logo from "@assets/svg/Logo.svg?react";
import LogoIcon from "@assets/svg/LogoIcon.svg?react";
import { SidebarNavItem } from "@components/SidebarNavItem";
// import { SideBarSubMenu } from "@components/SideBarSubMenu";
import * as S from "./styles";

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  const toggle = () => setExpanded((prev) => !prev);

  return (
    <S.SidebarContainer $expanded={expanded}>
      <div>
        <S.Brand $expanded={expanded}>
          {expanded ? <Logo /> : <LogoIcon />}
        </S.Brand>

        <S.Nav role="navigation">
          <SidebarNavItem
            exact
            basePath="/"
            icon={<FiHome />}
            label="Overview"
            expanded={expanded}
          />
          <SidebarNavItem
            basePath="/mapa-geral"
            icon={<FiMap />}
            label="Mapa Geral"
            expanded={expanded}
          />
          <SidebarNavItem
            basePath="/registros-do-dia"
            icon={<FiCamera />}
            label="Registros do dia"
            expanded={expanded}
          />
          <SidebarNavItem
            basePath="/tabulacao-do-dia"
            icon={<FiCloudRain />}
            label="Tabulação do dia"
            expanded={expanded}
          />
          {/* <SidebarNavItem
            basePath="/inspecao-atuacao-granular"
            icon={<FiEye />}
            label="Inspeção Granular"
            expanded={expanded}
          >
            <SideBarSubMenu
              basePath="/inspecao-atuacao-granular"
              labelFormat="upperCase"
              itemIcon={<FiMapPin />}
              expanded={expanded}
            />
          </SidebarNavItem> */}
        </S.Nav>
      </div>

      <S.Toggle onClick={toggle} $expanded={expanded}>
        <FiChevronsLeft />
        <span>Minimizar Menu</span>
      </S.Toggle>
    </S.SidebarContainer>
  );
};

export { Sidebar };
