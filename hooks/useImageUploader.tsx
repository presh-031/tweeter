const useImageUploader = () => {
  const uploadImage = async (
    selectedImage: any,
    imageRef: any,
    uploadFile: any,
    saveCoverImageMetaData: any
  ) => {
    if (selectedImage) {
      const result = await uploadFile(imageRef, selectedImage, {
        contentType: "image/jpeg",
      });

      if (result?.metadata) {
        const fullPath = result.metadata.fullPath;
        saveCoverImageMetaData(fullPath);
      }
    }
  };

  return uploadImage;
};

export default useImageUploader;
