// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { useLocation, useNavigate } from "react-router-dom";
// import { usePostSubMap } from "@services/hooks/subMaps/usePostSubMap";
// import { useSubMapStore } from "@hooks/useSubMapStore"

// export const useUploadSubMap = (basePath: string) => {
//   const [showModal, setShowModal] = useState(false);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const { postSubMap } = usePostSubMap();
//   const { subMaps, addSubMap } = useSubMapStore();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleUpload = async () => {
//     if (!imageFile) return;
//     const reader = new FileReader();

//     reader.onloadend = async () => {
//       const base64Image = reader.result as string;
//       const nextIndex = subMaps.length + 1;
//       const newTitle = `sub-mapa-${nextIndex}`;

//       const newSubMap = {
//         id: uuidv4(),
//         title: newTitle,
//         image: base64Image,
//         uploaded: false,
//         markers: [],
//       };

//       const result = await postSubMap(newSubMap);
//       if (result) {
//         addSubMap(result);
//         setShowModal(false);
//         setImageFile(null);
//         navigate(`${basePath}/${newTitle}`, { replace: true });
//       }
//     };

//     reader.readAsDataURL(imageFile);
//   };

//   const shouldOpenModal =
//     (location.pathname === basePath || location.pathname === `${basePath}/`) &&
//     subMaps.length === 0;

//   return {
//     showModal,
//     setShowModal,
//     imageFile,
//     setImageFile,
//     handleUpload,
//     shouldOpenModal,
//   };
// };