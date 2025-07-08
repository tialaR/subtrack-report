export type ToastInfoProps = {
    type: "success" | "error" | "info";
    message: string;
    description: string;
    onClose: () => void;
}