import { createContext, useContext, useState, useCallback } from "react";
import { ToastInfo } from "@components/ToastInfo";

type ToastInfoProps = {
    type: "success" | "error" | "info";
    message: string;
    description?: string;
}

type ToastInfoContextProps = {
    showToast: (toast: ToastInfoProps) => void;
}

const ToastInfoContext = createContext<ToastInfoContextProps| undefined>(undefined);

export const ToastInfoProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastInfoProps | null>(null);

    const showToast = useCallback((toastData: ToastInfoProps) => {
        setToast(toastData);
    }, []);

    return (
        <ToastInfoContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <ToastInfo
                    type={toast.type}
                    message={toast.message}
                    description={toast.description ?? ''}
                    onClose={() => setToast(null)}
                />
            )}
        </ToastInfoContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToastInfo = () => {
    const context = useContext(ToastInfoContext);
    if (!context) {
        throw new Error("useToastInfo deve ser usado dentro de um ToastInfoProvider");
    }
    return context;
};