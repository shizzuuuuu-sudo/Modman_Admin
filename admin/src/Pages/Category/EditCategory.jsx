import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import httpClient from "../../Utils/httpClient";
import { BASE_URL } from "../../Utils/httpClient";
import "bootstrap/dist/css/bootstrap.min.css";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState(""); // existing image URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch existing category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await httpClient.get(`/categories/${id}`);
        if (data.success) {
          setTitle(data.category.Categoryname);
          setExistingImage(data.category.image); // image path from DB
        } else {
          setError(data.message || "Failed to load category");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };
    fetchCategory();
  }, [id]);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImageFile(file);
  //     setExistingImage(null); // hide old image preview
  //   }
  // };

  // const handleSubmit = async () => {
  //   if (!title) {
  //     setError("Category title is required");
  //     return;
  //   }

  //   setLoading(true);
  //   setError("");
  //   setSuccess("");

  //   try {
  //     const formData = new FormData();
  //     formData.append("Categoryname", title);
  //     if (imageFile) formData.append("image", imageFile);

  //     const { data } = await httpClient.put(
  //       `/categories/${id}`,
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );

  //     if (data.success) {
  //       setSuccess("Category updated successfully!");
  //       setTimeout(() => navigate("/CategoryList"), 1500);
  //     } else {
  //       setError(data.message || "Failed to update category");
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   const handleImageChange = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   setLoading(true);
//   const result = await uploadToCloudinary(file);

//   if (result.success) {
//     setExistingImage(result.url); // directly replace old image
//     setImageFile(file);
//     setError("");
//   } else {
//     setError("Image upload failed: " + result.error);
//   }
//   setLoading(false);
// };

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setImageFile(file);
  setExistingImage(URL.createObjectURL(file)); // preview only
};


const handleSubmit = async () => {
  if (!title) {
    setError("Category title is required");
    return;
  }

  setLoading(true);
  setError("");
  setSuccess("");

  try {
    const formData = new FormData();
    formData.append("Categoryname", title);
    if (imageFile) formData.append("image", imageFile);

    const { data } = await httpClient.put(`/categories/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (data.success) {
      setSuccess("Category updated successfully!");
      setTimeout(() => navigate("/CategoryList"), 1500);
    } else {
      setError(data.message || "Failed to update category");
    }
  } catch (err) {
    setError(err.response?.data?.message || err.message);
  } finally {
    setLoading(false);
  }
};
  

// const handleSubmit = async () => {
//   if (!title || !existingImage) {
//     setError("Title and image are required");
//     return;
//   }

//   setLoading(true);
//   setError("");
//   setSuccess("");

//   try {
//     const { data } = await httpClient.put(`/categories/${id}`, {
//       Categoryname: title,
//       image: existingImage, // Cloudinary URL
//     });

//     if (data.success) {
//       setSuccess("Category updated successfully!");
//       setTimeout(() => navigate("/CategoryList"), 1500);
//     } else {
//       setError(data.message || "Failed to update category");
//     }
//   } catch (err) {
//     setError(err.response?.data?.message || err.message);
//   } finally {
//     setLoading(false);
//   }
// };


  return (
    <section>
      <div className="page-content py-4">
        <div className="container-xxl">
          <div className="row">
            {/* Left Card */}
            <div className="col-xl-3 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="bg-light rounded p-3">
                    <img
                      src= {existingImage}
                      alt="Category Thumbnail"
                      className="img-fluid avatar-xxl rounded"
                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />

                  </div>
                  <div className="mt-3 text-center">
                    <h4>{title || "Category Title"}</h4>
                  </div>
                </div>
                <div className="card-footer border-top">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Category"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-xl-9 col-lg-8">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              {/* Upload Card */}
              <div className="card mb-4">
                <div className="card-header">
                  <h4 className="card-title">Update Thumbnail Photo</h4>
                </div>
                <div className="card-body text-center p-4">
                  <div className="border p-3 rounded bg-light">
                    <h5 className="mt-3">
                      Drop your image here, or{" "}
                      <span className="text-primary">click to browse</span>
                    </h5>
                    <p className="text-muted fs-6 mt-2 mb-0">
                      1600x1200 (4:3) recommended. PNG, JPG, and GIF files are allowed.
                    </p>
                    <input
                      type="file"
                      className="form-control mt-3"
                      style={{ maxWidth: "300px", margin: "0 auto" }}
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>

              {/* General Info */}
              <div className="card mb-4">
                <div className="card-header">
                  <h4 className="card-title">General Information</h4>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-12">
                      <label className="form-label">Category Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditCategory;
