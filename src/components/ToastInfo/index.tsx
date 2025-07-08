import { useCallback, useEffect, useState } from "react";
import { FiCheckCircle, FiDelete, FiInfo } from "react-icons/fi";
import type { ToastInfoProps } from "./types";
import * as S from "./styles";

const ToastInfo = ({ type, message, description, onClose }: ToastInfoProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Animation time
    }, 3000); // 3 seconds timeout for the toast to be visible

    return () => clearTimeout(timer);
  }, [onClose]);

  const renderIcon = useCallback(() => {
    if (type === "success") {
      return <FiCheckCircle size={40} />;
    } else if (type === "error") {
      return <FiDelete size={40} />;
    }
    return <FiInfo size={40} />;
  }, [type]);

  return (
    <S.ToastWrapper visible={visible}>
      <S.ToastInfoContainer $type={type}>
        {renderIcon()}

        <S.ToastInfoContent>
          <p>{message}</p>
          {description && <small>{description}</small>}
        </S.ToastInfoContent>
      </S.ToastInfoContainer>
    </S.ToastWrapper>
  );
};

export { ToastInfo };
