const useImageUploader = () => {
  const uploadImage = async (
    selectedImage: any,
    imageRef: any,
    uploadFile: any,
    saveCoverImageMetaData: any,
    newTweetId: any
  ) => {
    if (selectedImage) {
      const result = await uploadFile(imageRef, selectedImage, {
        contentType: "image/jpeg",
      });

      if (result?.metadata) {
        const fullPath = result.metadata.fullPath;
        saveCoverImageMetaData(fullPath, newTweetId);
      }
    }
  };

  return uploadImage;
};

export default useImageUploader;
