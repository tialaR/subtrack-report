import { useLocation, useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import * as S from "./styles";
import { useSubMapModalGuard } from "@hooks/useSubMapModalGuard";

type SidebarNavItemProps = {
  basePath: string;
  icon: React.ReactNode;
  label: string;
  expanded?: boolean;
  exact?: boolean;
  children?: React.ReactNode;
  replaceOnNavigate?: boolean;
};

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  basePath,
  icon,
  label,
  expanded = false,
  exact = false,
  children,
  replaceOnNavigate = false,
}) => {
  useSubMapModalGuard("/inspecao-atuacao-granular");
  
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [openChildren, setOpenChildren] = useState(false);

  useEffect(() => {
    if (exact) {
      setIsActive(location.pathname === basePath);
    } else {
      setIsActive(location.pathname.startsWith(basePath));
    }
  }, [location.pathname, basePath, exact]);

  useEffect(() => {
    if (!location.pathname.startsWith(basePath)) {
      setOpenChildren(false);
    }
  }, [location.pathname, basePath]);

  const handleClick = useCallback(() => {
    const shouldNavigate = location.pathname !== basePath;

    if (children) {
      if (!openChildren && basePath && shouldNavigate) {
        navigate(basePath, { replace: replaceOnNavigate });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setOpenChildren((prev) => !prev);
    } else {
      if (shouldNavigate) {
        navigate(basePath, { replace: replaceOnNavigate });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [children, openChildren, basePath, navigate, location.pathname, replaceOnNavigate]);

  return (
    <>
      <S.NavItemButton
        type="button"
        onClick={handleClick}
        $expanded={expanded}
        $active={isActive}
        aria-expanded={openChildren}
      >
        {icon}
        <span>{label}</span>
        {children && expanded && (
          <S.Caret $open={openChildren}>
            <FiChevronDown />
          </S.Caret>
        )}
      </S.NavItemButton>

      {openChildren && children}
    </>
  );
};

export { SidebarNavItem };
