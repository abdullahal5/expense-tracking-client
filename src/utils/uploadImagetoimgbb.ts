export const uploadImageToImgBB = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const apiKey = "f32203b8746dd424e3792458fdbb4165";

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    if (result.success) {
      return result.data.url;
    } else {
      console.error("Image upload failed:", result.error);
      return null;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
