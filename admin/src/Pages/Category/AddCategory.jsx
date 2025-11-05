import React, { useState } from "react";
import httpClient from "../../Utils/httpClient";
import { ImageHandler } from "../../Utils/ImageHandler";
import "bootstrap/dist/css/bootstrap.min.css";

const AddCategory = () => {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); // store uploaded image info
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle file selection and upload
  const handleImageChange = async (e) => {
    setImageFile(e.target.files[0]);
    const result = await ImageHandler(e);

    if (result.clientStatus) {
      setUploadedImage(result.data); // backend response, maybe contains path/url
    } else {
      setError("Image upload failed: " + result.data);
    }
  };

  const handleSubmit = async () => {
    if (!title) {
      setError("Category title is required");
      return;
    }
    if (!uploadedImage) {
      setError("Please upload a category image");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        Categoryname: title,
        image: uploadedImage, // send uploaded image info, not raw File
      };

      const { data } = await httpClient.post("/categories/CreateCategory", payload);

      if (data.success) {
        setSuccess("Category created successfully!");
        setTitle("");
        setImageFile(null);
        setUploadedImage(null);
      } else {
        setError(data.message || "Failed to create category");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

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
                      src={
                        imageFile
                          ? URL.createObjectURL(imageFile)
                          : "assets/images/product/p-1.png"
                      }
                      alt="Category Thumbnail"
                      className="img-fluid avatar-xxl"
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
                    {loading ? "Saving..." : "Create Category"}
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
                  <h4 className="card-title">Add Thumbnail Photo</h4>
                </div>
                <div className="card-body text-center p-4">
                  <div className="border p-5 rounded bg-light">
                    <h5 className="mt-3">
                      Drop your images here, or{" "}
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

export default AddCategory;
