import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import httpClient, { BASE_URL } from "../../Utils/httpClient";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [existingImage, setExistingImage] = useState("");

  const [product, setProduct] = useState({
    productName: "",
    category: "",
    brandName: "",
    gender: "",
    sizes: [],
    tagNumber: "",
    inStock: "",
    oldPrice: "",
    price: "",
    discount: "",
    tax: "",
    isNewArrival: false,
    isLatestTrend: false,
    image: null,
  });

  const sizesList = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await httpClient.get("/categories/getCategory");
      if (data.success) setCategories(data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch single product
  const fetchProduct = async () => {
    try {
      const { data } = await httpClient.get(`/products/getProductById/${id}`);
      if (data.success && data.data) {
        const p = data.data;
        setProduct({
          productName: p.productName || "",
          category: p.category?._id || "",
          brandName: p.brandName || "",
          gender: p.gender || "",
          sizes: p.sizes || [],
          tagNumber: p.tagNumber || "",
          inStock: p.inStock || "",
          oldPrice: p.oldPrice || "",
          price: p.price || "",
          discount: p.discount || "",
          tax: p.tax || "",
          isNewArrival: p.isNewArrival || false,
          isLatestTrend: p.isLatestTrend || false,
          image: null,
        });
        setExistingImage(p.image || "");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product details.");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const toggleSize = (s) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(s)
        ? prev.sizes.filter((x) => x !== s)
        : [...prev.sizes, s],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      [
        "productName",
        "category",
        "brandName",
        "gender",
        "tagNumber",
        "inStock",
        "oldPrice",
        "price",
        "discount",
        "tax",
      ].forEach((k) => formData.append(k, product[k] || ""));

      (product.sizes || []).forEach((s) => formData.append("sizes", s));

      if (product.image) formData.append("image", product.image);

      const { data } = await httpClient.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success("Product updated successfully!");
        navigate("/ProductList");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <div className="container-xxl">
        <form onSubmit={handleSubmit}>
          <div className="row gy-4">
            {/* Left Panel */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5>Product Preview</h5>
                  {existingImage && !product.image && (
                    <img
                      src={`${BASE_URL}${existingImage}`}
                      alt="Product"
                      style={{
                        width: "100%",
                        height: 200,
                        objectFit: "contain",
                        borderRadius: 8,
                      }}
                    />
                  )}
                  {product.image && (
                    <img
                      src={URL.createObjectURL(product.image)}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  )}
                  <div className="mt-3">
                  <h4>
                    {product.productName || "Product Name"}{" "}
                    {/* <span className="fs-14 text-muted ms-1">
                      ({product.category || "Category"})
                    </span> */}
                  </h4>
                  <div className="d-flex align-items-center gap-2">
                  <div className="text-dark fw-medium">Price :</div>
                  <h4 className="fw-semibold text-dark mt-2">
                    <span className="text-muted text-decoration-line-through">
                      ₹{product.oldPrice || "0"}
                    </span>{" "}
                    ₹{product.price || "0"}
                    <small className="text-muted">
                      ({product.discount || 0}% Off)
                    </small>
                  </h4>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <h4 className="fw-medium  text-dark">Size : <span className="">{product.sizes?.join(", ") || "N/A"}</span></h4>
                  </div>
                </div>
                  
                </div>
                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="row g-3">
                    <div className="mt-3">
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={handleImageChange}
                    />
                  </div>
                    <div className="col-md-6">
                      <label className="form-label">Product Name</label>
                      <input
                        className="form-control"
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <select
                        className="form-control"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                      >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.Categoryname}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Brand</label>
                      <input
                        className="form-control"
                        name="brandName"
                        value={product.brandName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-control"
                        name="gender"
                        value={product.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">In Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        name="inStock"
                        value={product.inStock}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 mt-3">
                      <h6>Sizes</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {sizesList.map((s) => (
                          <label
                            key={s}
                            className={`btn btn-sm btn-light ${
                              product.sizes.includes(s)
                                ? "border border-primary"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              hidden
                              checked={product.sizes.includes(s)}
                              onChange={() => toggleSize(s)}
                            />
                            {s}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="col-md-4 mt-3">
                      <label className="form-label">Tag Number</label>
                      <input
                        className="form-control"
                        name="tagNumber"
                        value={product.tagNumber}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mt-3">
                      <label className="form-label">Old Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="oldPrice"
                        value={product.oldPrice}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mt-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mt-3">
                      <label className="form-label">Discount (%)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="discount"
                        value={product.discount}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mt-3">
                      <label className="form-label">Tax (%)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="tax"
                        value={product.tax}
                        onChange={handleChange}
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
}
