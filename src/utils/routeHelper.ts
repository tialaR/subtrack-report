export const defaultFormatRouteLabel = ({ 
    label, 
    labelFormat, 
}: { 
    label: string;
    labelFormat?: 'upperCase' | "lowerCase" | "deafult";
}) => {
    if (!label) return '';

    if (labelFormat === "upperCase") return label?.replace("-", " ")?.toUpperCase();
    if (labelFormat === "lowerCase") return label?.replace("-", " ")?.toLowerCase();
    if (labelFormat === "deafult") return label?.replace("-", " ");

    return label;
}
