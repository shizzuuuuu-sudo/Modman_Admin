import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import httpClient from "../../Utils/httpClient";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    productName: "",
    category: "",
    brandName: "",
    gender: "",
    sizes: [],
    description: "",
    tagNumber: "",
    inStock: "",
    oldPrice: "",
    discount: "",
    tax: "",
    isNewArrival: false,
    isLatestTrend: false,
  });

const [images, setImages] = useState([]);
const [previews, setPreviews] = useState([]);

  const sizesList = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  const calculatedPrice =
    product.oldPrice && product.discount
      ? product.oldPrice - (product.oldPrice * product.discount) / 100
      : 0;

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const toggleSelection = (type, value) => {
    setProduct((prev) => {
      const list = prev[type];
      if (list.includes(value)) {
        return { ...prev, [type]: list.filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...list, value] };
      }
    });
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  //   setPreview(URL.createObjectURL(file));
  // };

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);

  // Add new files to existing ones
  setImages((prev) => [...prev, ...files]);

  // Generate and append new previews
  const newPreviews = files.map((file) => URL.createObjectURL(file));
  setPreviews((prev) => [...prev, ...newPreviews]);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v));
        } else {
          formData.append(key, value);
        }
      });

      // if (image) formData.append("image", image);
   for (let i = 0; i < images.length; i++) {
    formData.append("image", images[i]); // "image" — must match multer field name
  }


      const res = await httpClient.post("/products/createProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data) {
        toast.success("Product Created Successfully!");
        setProduct({
          productName: "",
          category: "",
          brandName: "",
          gender: "",
          sizes: [],
          description: "",
          tagNumber: "",
          inStock: "",
          oldPrice: "",
          discount: "",
          tax: "",
          isNewArrival: false,
          isLatestTrend: false,
        });
        setImages([]);
        setPreviews([]);
        setTimeout(() => navigate("/ProductList"), 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await httpClient.get("/categories/getCategory");
      if (data.success) setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="page-content">
      <div className="container-xxl">
        <div className="row">
          {/* LEFT CARD PREVIEW */}
          <div className="col-xl-3 col-lg-4">
            <div className="card">
              <div className="card-body">
                <img
                  src={previews || "/assets/images/product/p-1.png"}
                  alt="Preview"
                  className="img-fluid rounded bg-light"
                />
                <div className="mt-3">
                  <h4>
                    {product.productName || "Product Name"}{" "}
                    <span className="fs-14 text-muted ms-1">
                      ({product.category || "Category"})
                    </span>
                  </h4>
                  <h5 className="text-dark fw-medium mt-3">Price :</h5>
                  <h4 className="fw-semibold text-dark mt-2 d-flex align-items-center gap-2">
                    <span className="text-muted text-decoration-line-through">
                      ₹{product.oldPrice || "0"}
                    </span>{" "}
                    ₹{calculatedPrice.toFixed(0)}{" "}
                    <small className="text-muted">
                      ({product.discount || 0}% Off)
                    </small>
                  </h4>
                </div>
              </div>
              <div className="card-footer bg-light-subtle">
                <div className="row g-2">
                  <div className="col-lg-6">
                    <button
                      type="submit"
                      className="btn btn-outline-secondary w-100"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Product"}
                    </button>
                  </div>
                  <div className="col-lg-6">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-xl-9 col-lg-8">
            <form onSubmit={handleSubmit}>
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Add Product Photo</h4>
                </div>
                <div className="card-body">
  <div className="d-flex flex-wrap gap-3">
    {/* Image Previews */}
    {previews.map((src, index) => (
      <div
        key={index}
        className="position-relative"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <img
          src={src}
          alt={`Preview ${index}`}
          className="img-thumbnail"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
          }}
        />
      </div>
    ))}

    {/* Add Image Icon */}
    <div
      onClick={() => document.getElementById("imageInput").click()}
      className="d-flex align-items-center justify-content-center border border-2 border-dashed rounded bg-light"
      style={{
        width: "80px",
        height: "80px",
        cursor: "pointer",
        transition: "0.2s",
      }}
      title="Add Images"
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "#f1f1f1")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "#f8f9fa")
      }
    >
      <FaPlus size={22} color="#0d6efd" />
    </div>

    {/* Hidden Input */}
    <input
      id="imageInput"
      type="file"
      accept="image/*"
      multiple
      className="d-none"
      onChange={handleFileChange}
    />
  </div>
</div>

              </div>

              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Product Information</h4>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-lg-6">
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter product name"
                      />
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label">Category</label>
                      <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.Categoryname}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-lg-4">
                      <label className="form-label">Brand</label>
                      <input
                        type="text"
                        name="brandName"
                        value={product.brandName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Brand Name"
                      />
                    </div>

                    <div className="col-lg-4">
                      <label className="form-label">Gender</label>
                      <select
                        name="gender"
                        value={product.gender}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="">Select Gender</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>

                    <div className="col-lg-4">
                      <label className="form-label">Old Price</label>
                      <input
                        type="number"
                        name="oldPrice"
                        value={product.oldPrice}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter MRP"
                      />
                    </div>

                    <div className="col-lg-4">
                      <label className="form-label">Discount (%)</label>
                      <input
                        type="number"
                        name="discount"
                        value={product.discount}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Discount %"
                      />
                    </div>

                    <div className="col-lg-4">
                      <label className="form-label">Tax (%)</label>
                      <input
                        type="number"
                        name="tax"
                        value={product.tax}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Tax %"
                      />
                    </div>

                    <div className="col-lg-4">
                      <label className="form-label">Stock Quantity</label>
                      <input
                        type="number"
                        name="inStock"
                        value={product.inStock}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Quantity"
                      />
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Tag Number</label>
                      <input
                        type="text"
                        name="tagNumber"
                        value={product.tagNumber}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="#12345"
                      />
                    </div>

                    <div className="col-lg-12 mt-4">
                      <h5 className="fw-bold text-dark">Available Sizes</h5>
                      <div className="d-flex flex-wrap gap-3">
                        {sizesList.map((size) => (
                          <div key={size} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`size-${size}`}
                              checked={product.sizes.includes(size)}
                              onChange={() => toggleSelection("sizes", size)}
                            />
                            <label className="form-check-label" htmlFor={`size-${size}`}>
                              {size}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-lg-6 mt-3">
                      <label className="form-label">Display Options</label>
                      <div className="d-flex gap-3 align-items-center">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            id="newArrival"
                            className="form-check-input"
                            checked={product.isNewArrival}
                            onChange={(e) =>
                              setProduct({
                                ...product,
                                isNewArrival: e.target.checked,
                              })
                            }
                          />
                          <label htmlFor="newArrival" className="form-check-label">
                            New Arrival
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            id="latestTrend"
                            className="form-check-input"
                            checked={product.isLatestTrend}
                            onChange={(e) =>
                              setProduct({
                                ...product,
                                isLatestTrend: e.target.checked,
                              })
                            }
                          />
                          <label htmlFor="latestTrend" className="form-check-label">
                            Latest Trend
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
