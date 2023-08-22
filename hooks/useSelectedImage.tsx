import { ChangeEvent, useState } from "react";

const useSelectedImage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setSelectedImage(URL.createObjectURL(selectedFile));
    }
  };
  const deleteSelectedImage = () => {
    setSelectedImage(null);
  };
  return { selectedImage, handleImageChange, deleteSelectedImage };
};

export default useSelectedImage;
