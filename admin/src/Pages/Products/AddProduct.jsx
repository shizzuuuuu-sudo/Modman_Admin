import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import httpClient from "../../Utils/httpClient";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const sizesList = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  // 🧩 Main Product Data
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    brandName: "",
    gender: "",
    fabric: "",
    pattern: "",
    description: "",
    tagNumber: "",
    oldPrice: "",
    discount: "",
    tax: "",
    isNewArrival: false,
    isLatestTrend: false,
  });

  // 🧩 Color Variants
  const [variants, setVariants] = useState([
    {
      colorName: "",
      colorCode: "#000000",
      images: [],
      previews: [],
      stock: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0, "3XL": 0 },
    },
  ]);

  // 🧮 Calculated price
  const calculatedPrice =
    product.oldPrice && product.discount
      ? product.oldPrice - (product.oldPrice * product.discount) / 100
      : 0;

  // 🧭 Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await httpClient.get("/categories/getCategory");
        if (data.success) setCategories(data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // 📂 Handle variant image upload
  const handleVariantImages = (e, index) => {
    const files = Array.from(e.target.files);
    const newVariants = [...variants];
    newVariants[index].images = [...newVariants[index].images, ...files];
    newVariants[index].previews = [
      ...newVariants[index].previews,
      ...files.map((f) => URL.createObjectURL(f)),
    ];
    setVariants(newVariants);
  };

  // ➕ Add or Remove Variant
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        colorName: "",
        colorCode: "#000000",
        images: [],
        previews: [],
        stock: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0, "3XL": 0 },
      },
    ]);
  };

  const removeVariant = (index) => {
    const updated = variants.filter((_, i) => i !== index);
    setVariants(updated);
  };

  // 🔢 Update Stock Quantity
  const handleStockChange = (index, size, value) => {
    const newVariants = [...variants];
    newVariants[index].stock[size] = value;
    setVariants(newVariants);
  };

  // ✏️ Handle Product Field Changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // 🧾 Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append simple fields
      Object.entries(product).forEach(([key, value]) =>
        formData.append(key, value)
      );

      // Append variants JSON
      formData.append(
        "variants",
        JSON.stringify(
          variants.map((v) => ({
            colorName: v.colorName,
            colorCode: v.colorCode,
            stock: v.stock,
          }))
        )
      );

      // Append variant images under colorName key
      variants.forEach((variant) => {
        variant.images.forEach((file) => {
          formData.append(variant.colorName, file);
        });
      });

      const res = await httpClient.post("/products/createProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("✅ Product Created Successfully!");
        navigate("/ProductList");
      } else {
        toast.error(res.data.message || "Failed to create product");
      }
    } catch (error) {
      console.error("❌ Product create error:", error);
      toast.error(error.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <div className="container-xxl">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* LEFT SIDE PREVIEW */}
            <div className="col-xl-3 col-lg-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5>{product.productName || "Product Preview"}</h5>
                  <p className="text-muted">
                    {product.category || "Select category"}
                  </p>
                  <p className="fw-semibold text-dark">
                    ₹{calculatedPrice.toFixed(0)}{" "}
                    <small className="text-muted">
                      ({product.discount || 0}% Off)
                    </small>
                  </p>
                </div>
                <div className="card-footer bg-light-subtle">
                  <button
                    type="submit"
                    className="btn btn-outline-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Product"}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="col-xl-9 col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Product Information</h4>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-lg-6">
                      <label>Product Name</label>
                      <input
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <label>Category</label>
                      <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="form-control"
                        required
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
                      <label>Brand</label>
                      <input
                        name="brandName"
                        value={product.brandName}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-lg-4">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={product.gender}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="">Select</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>
                    <div className="col-lg-4">
                      <label>Old Price</label>
                      <input
                        name="oldPrice"
                        type="number"
                        value={product.oldPrice}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-lg-4">
                      <label>Discount (%)</label>
                      <input
                        name="discount"
                        type="number"
                        value={product.discount}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-lg-4">
                      <label>Tax (%)</label>
                      <input
                        name="tax"
                        type="number"
                        value={product.tax}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-lg-4">
                      <label>Tag Number</label>
                      <input
                        name="tagNumber"
                        value={product.tagNumber}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-lg-4">
                      <label>Fabric *</label>
                      <input
                        name="fabric"
                        value={product.fabric}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-lg-4">
                      <label>Pattern *</label>
                      <input
                        name="pattern"
                        value={product.pattern}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>

                    {/* 🔴 Color Variants */}
                    <div className="col-lg-12 mt-4">
                      <h5 className="fw-bold text-dark">Color Variants</h5>
                      {variants.map((variant, index) => (
                        <div
                          key={index}
                          className="border p-3 rounded mb-3 bg-light"
                        >
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="d-flex gap-2 align-items-center">
                              <input
                                type="text"
                                placeholder="Color Name"
                                value={variant.colorName}
                                onChange={(e) => {
                                  const updated = [...variants];
                                  updated[index].colorName = e.target.value;
                                  setVariants(updated);
                                }}
                                className="form-control w-auto"
                                required
                              />
                              <input
                                type="color"
                                value={variant.colorCode}
                                onChange={(e) => {
                                  const updated = [...variants];
                                  updated[index].colorCode = e.target.value;
                                  setVariants(updated);
                                }}
                                className="form-control form-control-color"
                              />
                            </div>
                            {variants.length > 1 && (
                              <FaTrash
                                color="red"
                                onClick={() => removeVariant(index)}
                                style={{ cursor: "pointer" }}
                              />
                            )}
                          </div>

                          {/* 🖼️ Images */}
                          <div className="d-flex flex-wrap gap-2 mb-2">
                            {variant.previews.map((src, i) => (
                              <img
                                key={i}
                                src={src}
                                alt="preview"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                }}
                              />
                            ))}
                            <div
                              className="border rounded d-flex align-items-center justify-content-center"
                              style={{
                                width: "70px",
                                height: "70px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                document
                                  .getElementById(`file-${index}`)
                                  .click()
                              }
                            >
                              <FaPlus color="#0d6efd" />
                            </div>
                            <input
                              type="file"
                              id={`file-${index}`}
                              multiple
                              accept="image/*"
                              className="d-none"
                              onChange={(e) => handleVariantImages(e, index)}
                            />
                          </div>

                          {/* 📦 Stock per size */}
                          <div className="d-flex flex-wrap gap-3">
                            {sizesList.map((size) => (
                              <div key={size}>
                                <label>{size}</label>
                                <input
                                  type="number"
                                  value={variant.stock[size]}
                                  onChange={(e) =>
                                    handleStockChange(
                                      index,
                                      size,
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                  style={{ width: "80px" }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm mt-2"
                        onClick={addVariant}
                      >
                        + Add Color Variant
                      </button>
                    </div>

                    {/* ✍️ Description */}
                    <div className="col-lg-12 mt-3">
                      <label>Description *</label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={product.description}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setProduct({ ...product, description: data });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
