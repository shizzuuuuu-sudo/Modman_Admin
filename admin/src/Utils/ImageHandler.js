import httpClient from "./httpClient";

const ImageHandler = async (e) => {
  const formData = new FormData();
  formData.append("image", e.target.files[0]); // ✅ match backend field name

  try {
    const res = await httpClient.post("/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Image uploaded:", res.data);
    return { clientStatus: true, data: res.data };
  } catch (error) {
    console.error("❌ Upload failed:", error);
    return { clientStatus: false, data: error };
  }
};

export { ImageHandler };
