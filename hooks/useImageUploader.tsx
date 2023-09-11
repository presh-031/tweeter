const useImageUploader = () => {
  const uploadImage = async (
    selectedImage: any,
    imageRef: any,
    uploadFile: any,
    saveCoverImageMetaData: any,
    newTweetId?: any
  ) => {
    if (selectedImage) {
      const result = await uploadFile(imageRef, selectedImage, {
        contentType: "image/jpeg",
      });

      if (result?.metadata) {
        const fullPath = result.metadata.fullPath;

        // newTweetId might be falsy as profilepic and cover img uploads use the same hook.
        if (newTweetId) {
          saveCoverImageMetaData(fullPath, newTweetId);
        } else {
          saveCoverImageMetaData(fullPath);
        }
      }
    }
  };

  return uploadImage;
};

export default useImageUploader;
