import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";
import httpClient from "../../Utils/httpClient";

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showPastels, setShowPastels] = useState(false);

const pastelColours = [
  { name: "Peach", color: "#FFDAB9" },
  { name: "Mint", color: "#AAF0D1" },
  { name: "Lavender", color: "#E6E6FA" },
  { name: "Beige", color: "#F5F5DC" },
  { name: "SkyBlue", color: "#87CEEB" },
];

  const [product, setProduct] = useState({
    productName: "",
    category: "",
    brandName: "",
    gender: "",
    sizes: [],
    colours: [],
    description: "",
    tagNumber: "",
    inStock: "",
    price: "",
    discount: "",
    tax: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const sizesList = ["XS", "S", "M", "XL", "XXL", "3XL"];
  const colourOptions = [
    { name: "Dark", class: "text-dark" },
    { name: "Yellow", class: "text-warning" },
    { name: "White", class: "text-white border" },
    { name: "Red", class: "text-danger" },
    { name: "Green", class: "text-success" },
    { name: "Blue", class: "text-primary" },
    { name: "Sky", class: "text-info" },
    { name: "Gray", class: "text-secondary" },
  ];

  // Handle Input Change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle checkbox toggle (for sizes and colours)
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

  // Handle file upload preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v));
        } else {
          formData.append(key, value);
        }
      });
      if (image) formData.append("image", image);

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
          colours: [],
          description: "",
          tagNumber: "",
          inStock: "",
          price: "",
          discount: "",
          tax: "",
        });
        setImage(null);
        setPreview(null);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create product");
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
                  src={preview || "/assets/images/product/p-1.png"}
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
                      ${product.price || "0"}
                    </span>{" "}
                    ${product.discount || "0"}{" "}
                    <small className="text-muted">(30% Off)</small>
                  </h4>

                  <div className="mt-3">
                    <h5 className="text-dark fw-medium">Sizes:</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <span key={s} className="badge bg-light text-dark">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <h5 className="text-dark fw-medium">Colours:</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {product.colours.map((c) => (
                        <i key={c} className={`bx bxs-circle fs-18 ${c}`}></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-light-subtle">
                <div className="row g-2">
                  <div className="col-lg-6">
                    <button className="btn btn-outline-secondary w-100" onClick={handleSubmit}>
                      Create Product
                    </button>
                  </div>
                  <div className="col-lg-6">
                    <button
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
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileChange}
                  />
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

                    <div className="col-lg-6 mt-3">
                      <h5 className="text-dark fw-medium">Sizes</h5>
                      <div className="d-flex flex-wrap gap-2">
                        {sizesList.map((s) => (
                          <label
                            key={s}
                            className={`btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center ${
                              product.sizes.includes(s) ? "border border-primary" : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={product.sizes.includes(s)}
                              onChange={() => toggleSelection("sizes", s)}
                              hidden
                            />
                            {s}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="col-lg-6 mt-3">
  <h5 className="text-dark fw-medium">Colours</h5>
  <div className="d-flex flex-wrap gap-2">
    {/* Predefined Colours */}
    {colourOptions.map((c) => (
      <label
        key={c.name}
        className={`btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center ${
          product.colours.includes(c.class) ? "border border-primary" : ""
        }`}
      >
        <input
          type="checkbox"
          checked={product.colours.includes(c.class)}
          onChange={() => toggleSelection("colours", c.class)}
          hidden
        />
        <i className={`bx bxs-circle fs-18 ${c.class}`}></i>
      </label>
    ))}

    {/* Custom Pastel Colours Toggle */}
    <button
      type="button"
      className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center"
      onClick={() => setShowPastels(!showPastels)}
    >
      <i className="bx bx-plus fs-18"></i>
    </button>
  </div>

  {/* Pastel Swatches */}
  {showPastels && (
    <div className="d-flex flex-wrap gap-2 mt-2">
      {pastelColours.map((p) => (
        <label
          key={p.name}
          className={`btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center ${
            product.colours.includes(p.color) ? "border border-primary" : ""
          }`}
          style={{ backgroundColor: p.color }}
        >
          <input
            type="checkbox"
            checked={product.colours.includes(p.color)}
            onChange={() => toggleSelection("colours", p.color)}
            hidden
          />
        </label>
      ))}
    </div>
  )}
</div>


                    <div className="col-lg-12 mt-3">
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        rows="5"
                        className="form-control bg-light-subtle"
                        placeholder="Short description about product"
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
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="000"
                      />
                    </div>

                    <div className="col-lg-4">
                      <label className="form-label">Discount</label>
                      <input
                        type="number"
                        name="discount"
                        value={product.discount}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="000"
                      />
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">Tax</label>
                      <input
                        type="number"
                        name="tax"
                        value={product.tax}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-light mb-3 rounded">
                <div className="row justify-content-end g-2">
                  <div className="col-lg-2">
                    <button type="submit" className="btn btn-outline-secondary w-100">
                      Create Product
                    </button>
                  </div>
                  <div className="col-lg-2">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
