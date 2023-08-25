import { ChangeEvent, useState } from "react";

const useSelectedImage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : undefined;
    if (selectedFile) {
      setSelectedImage(selectedFile);
    }
  };
  const deleteSelectedImage = () => {
    setSelectedImage(null);
  };
  return { selectedImage, handleImageChange, deleteSelectedImage };
};

export default useSelectedImage;
