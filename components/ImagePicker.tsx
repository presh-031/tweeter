import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import { MdOutlineImage } from "react-icons/md";

const ImagePicker: React.FC = ({ getSelectedImage }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setSelectedImage(URL.createObjectURL(selectedFile));
    }
    getSelectedImage(selectedImage);
  };

  return (
    <div>
      <label htmlFor="picker">
        <MdOutlineImage className="mr-[.673] h-[1.5rem] w-[1.5rem] " />
      </label>
      <input
        type="file"
        id="picker"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      {/* {selectedImage && (
        <Image src={selectedImage} alt="Selected" width={20} height={20} />
      )} */}
    </div>
  );
};

export default ImagePicker;
