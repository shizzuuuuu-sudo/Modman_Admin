import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus, FaTrash } from "react-icons/fa";
import httpClient from "../../Utils/httpClient";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const sizesList = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // main product fields
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
    price: "",
    discount: "",
    tax: "",
    isNewArrival: false,
    isLatestTrend: false,
  });

  // Variants: each variant = { colorName, colorCode, images: [{url, public_id, _id}], newFiles: [], newPreviews: [], stock: {...} }
  const [variants, setVariants] = useState([]);

  // Keep list of public_ids removed so backend can delete them
  const [removedPublicIds, setRemovedPublicIds] = useState([]);

  // computed price
  useEffect(() => {
    const oldPriceNum = parseFloat(product.oldPrice) || 0;
    const discountNum = parseFloat(product.discount) || 0;
    const newPrice = oldPriceNum && discountNum ? oldPriceNum - (oldPriceNum * discountNum) / 100 : oldPriceNum;
    if (!isNaN(newPrice) && newPrice.toFixed(2) !== (product.price || "").toString()) {
      setProduct((prev) => ({ ...prev, price: newPrice.toFixed(2) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.oldPrice, product.discount]);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await httpClient.get("/categories/getCategory");
        if (data.success) setCategories(data.categories);
      } catch (err) {
        console.error("Fetch categories error:", err);
      }
    };
    fetchCategories();
  }, []);

  // fetch product
  useEffect(() => {
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
            fabric: p.fabric || "",
            pattern: p.pattern || "",
            description: p.description || "",
            tagNumber: p.tagNumber || "",
            oldPrice: p.oldPrice || "",
            price: p.price || "",
            discount: p.discount || "",
            tax: p.tax || "",
            isNewArrival: p.isNewArrival || false,
            isLatestTrend: p.isLatestTrend || false,
          });

          // build variants state from API
          const loadedVariants = (p.variants || []).map((v) => ({
            colorName: v.colorName || "",
            colorCode: v.colorCode || "#000000",
            images: Array.isArray(v.images)
              ? v.images.map((img) =>
                  typeof img === "string" ? { url: img, public_id: null } : img
                )
              : [],
            newFiles: [], // newly selected files (File objects)
            newPreviews: [], // object URLs for newly selected files
            stock: {
              XS: (v.stock && v.stock.XS) || 0,
              S: (v.stock && v.stock.S) || 0,
              M: (v.stock && v.stock.M) || 0,
              L: (v.stock && v.stock.L) || 0,
              XL: (v.stock && v.stock.XL) || 0,
              XXL: (v.stock && v.stock.XXL) || 0,
              "3XL": (v.stock && v.stock["3XL"]) || 0,
            },
            __id: v._id || null, // variant id if present
          }));
          setVariants(loadedVariants);
          setRemovedPublicIds([]);
        }
      } catch (err) {
        console.error("Fetch product error:", err);
        toast.error("Failed to fetch product details.");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // generic product field change
  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setProduct((prev) => ({ ...prev, [name]: checked }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  // variant field changes
  const updateVariant = (index, patch) => {
    setVariants((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...patch };
      return copy;
    });
  };

  // add variant
  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        colorName: "",
        colorCode: "#000000",
        images: [],
        newFiles: [],
        newPreviews: [],
        stock: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0, "3XL": 0 },
        __id: null,
      },
    ]);
  };

  // remove variant
  const removeVariant = (index) => {
    // collect public_ids from existing images so backend can delete them
    const v = variants[index];
    const existingPublics = (v.images || []).map((img) => img.public_id).filter(Boolean);
    if (existingPublics.length) {
      setRemovedPublicIds((prev) => [...prev, ...existingPublics]);
    }
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  // handle removing single existing image from a variant
  const removeExistingImage = (vIndex, imgIndex) => {
    const v = variants[vIndex];
    const img = v.images[imgIndex];
    if (!img) return;
    // record public_id for deletion if exists
    if (img.public_id) setRemovedPublicIds((prev) => [...prev, img.public_id]);
    // remove image from state
    const updatedImages = v.images.filter((_, i) => i !== imgIndex);
    updateVariant(vIndex, { images: updatedImages });
  };

  // handle adding new image files to variant
  const handleVariantNewFiles = (vIndex, e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const previews = files.map((f) => URL.createObjectURL(f));
    setVariants((prev) => {
      const copy = [...prev];
      copy[vIndex].newFiles = [...copy[vIndex].newFiles, ...files];
      copy[vIndex].newPreviews = [...copy[vIndex].newPreviews, ...previews];
      return copy;
    });
  };

  // remove one newly added file (before upload)
  const removeNewFile = (vIndex, nfIndex) => {
    setVariants((prev) => {
      const copy = [...prev];
      copy[vIndex].newFiles = copy[vIndex].newFiles.filter((_, i) => i !== nfIndex);
      copy[vIndex].newPreviews = copy[vIndex].newPreviews.filter((_, i) => i !== nfIndex);
      return copy;
    });
  };

  // update stock cell
  const handleStockChange = (vIndex, size, value) => {
    const num = Number(value) || 0;
    setVariants((prev) => {
      const copy = [...prev];
      copy[vIndex].stock = { ...copy[vIndex].stock, [size]: num };
      return copy;
    });
  };

  // update color name/code
  const handleVariantColorName = (vIndex, value) => updateVariant(vIndex, { colorName: value });
  const handleVariantColorCode = (vIndex, value) => updateVariant(vIndex, { colorCode: value });

  // On submit: build FormData, append variants JSON (without newFiles), append new files under fieldname = colorName
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic validation
      if (!product.productName || !product.category) {
        toast.error("Please fill product name and category.");
        setLoading(false);
        return;
      }
      if (variants.length === 0) {
        toast.error("Please add at least one color variant.");
        setLoading(false);
        return;
      }
      // ensure colorNames not empty
      for (const v of variants) {
        if (!v.colorName || !v.colorCode) {
          toast.error("Each variant must have a color name and color code.");
          setLoading(false);
          return;
        }
      }

      const formData = new FormData();

      // Append product fields
      Object.entries(product).forEach(([k, v]) => {
        // booleans as strings ok for backend
        formData.append(k, v ?? "");
      });

      // Build variants payload: include existing images (url & public_id) and stock/color fields.
      const variantsPayload = variants.map((v) => ({
        colorName: v.colorName,
        colorCode: v.colorCode,
        images: (v.images || []).map((img) => ({
          url: img.url,
          public_id: img.public_id || img.publicId || null,
        })), // existing images' metadata
        stock: v.stock || {},
        __id: v.__id || null,
      }));

      formData.append("variants", JSON.stringify(variantsPayload));

      // append removed public ids (so backend can delete them)
      if (removedPublicIds.length) {
        formData.append("removedPublicIds", JSON.stringify(removedPublicIds));
      }

      // Append newly added files under the field name equal to the variant colorName
      // If multiple files for same colorName, append in multiple formData entries; backend sees fieldname
      variants.forEach((v) => {
        const fieldName = v.colorName || "unknown_color";
        (v.newFiles || []).forEach((file) => {
          formData.append(fieldName, file);
        });
      });

      // send request
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
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // small helper to render image (existing or preview)
  const renderExistingImage = (img) => img?.url || img;

  return (
    <div className="page-content">
      <div className="container-xxl">
        <form onSubmit={handleSubmit}>
          <div className="row gy-4">
            {/* LEFT PREVIEW */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5>{product.productName || "Product Preview"}</h5>
                  <p className="text-muted">{product.category || "Select category"}</p>
                  <div className="mb-3">
                    <strong>Price: </strong>
                    <div>
                      <span className="text-muted text-decoration-line-through">₹{product.oldPrice || 0}</span>{" "}
                      <span className="fw-bold">₹{product.price ? parseFloat(product.price).toFixed(0) : 0}</span>
                    </div>
                    <small className="text-muted">({product.discount || 0}% Off)</small>
                  </div>

                  {/* Show first variant images if exist */}
                  {variants[0] && (
                    <div className="d-flex gap-2 justify-content-center flex-wrap">
                      {/* show existing images first */}
                      {(variants[0].images || []).map((img, i) => (
                        <img
                          key={`preview-existing-${i}`}
                          src={renderExistingImage(img)}
                          alt={`v0-${i}`}
                          style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }}
                        />
                      ))}
                      {/* show new previews */}
                      {(variants[0].newPreviews || []).map((p, i) => (
                        <img
                          key={`preview-new-${i}`}
                          src={p}
                          alt={`v0-new-${i}`}
                          style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="card-footer">
                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Product Name</label>
                      <input className="form-control" name="productName" value={product.productName} onChange={handleProductChange} required />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <select className="form-control" name="category" value={product.category} onChange={handleProductChange} required>
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
                      <input className="form-control" name="brandName" value={product.brandName} onChange={handleProductChange} />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Gender</label>
                      <select className="form-control" name="gender" value={product.gender} onChange={handleProductChange}>
                        <option value="">Select</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Tag Number</label>
                      <input className="form-control" name="tagNumber" value={product.tagNumber} onChange={handleProductChange} />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Old Price</label>
                      <input type="number" className="form-control" name="oldPrice" value={product.oldPrice} onChange={handleProductChange} />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Discount (%)</label>
                      <input type="number" className="form-control" name="discount" value={product.discount} onChange={handleProductChange} />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Tax (%)</label>
                      <input type="number" className="form-control" name="tax" value={product.tax} onChange={handleProductChange} />
                    </div>

                    <div className="col-12 mt-3">
                      <h6>Variants (Color wise)</h6>

                      {variants.map((v, vi) => (
                        <div key={`variant-${vi}`} className="border p-3 rounded mb-3 bg-light">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="d-flex gap-2 align-items-center">
                              <input
                                type="text"
                                placeholder="Color Name"
                                value={v.colorName}
                                onChange={(e) => handleVariantColorName(vi, e.target.value)}
                                className="form-control"
                                style={{ width: 180 }}
                                required
                              />
                              <input
                                type="color"
                                value={v.colorCode}
                                onChange={(e) => handleVariantColorCode(vi, e.target.value)}
                                className="form-control form-control-color"
                                title="Pick color"
                              />
                            </div>

                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => {
                                  // focus file input
                                  const el = document.getElementById(`variant-files-${vi}`);
                                  if (el) el.click();
                                }}
                              >
                                Add Images
                              </button>

                              {variants.length > 1 && (
                                <button type="button" className="btn btn-sm btn-danger" onClick={() => removeVariant(vi)}>
                                  <FaTrash />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* images area */}
                          <div className="d-flex flex-wrap gap-2 mb-2">
                            {/* existing images with remove button */}
                            {(v.images || []).map((img, i) => (
                              <div key={`existing-${vi}-${i}`} style={{ position: "relative" }}>
                                <img
                                  src={img.url}
                                  alt={`v${vi}-ex-${i}`}
                                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6 }}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeExistingImage(vi, i)}
                                  className="btn btn-sm btn-danger"
                                  style={{ position: "absolute", top: 4, right: 4, padding: "3px 6px" }}
                                >
                                  ✕
                                </button>
                              </div>
                            ))}

                            {/* new previews */}
                            {(v.newPreviews || []).map((p, ni) => (
                              <div key={`new-${vi}-${ni}`} style={{ position: "relative" }}>
                                <img src={p} alt={`v${vi}-new-${ni}`} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6 }} />
                                <button
                                  type="button"
                                  onClick={() => removeNewFile(vi, ni)}
                                  className="btn btn-sm btn-danger"
                                  style={{ position: "absolute", top: 4, right: 4, padding: "3px 6px" }}
                                >
                                  ✕
                                </button>
                              </div>
                            ))}

                            {/* add image placeholder */}
                            <div
                              className="border rounded d-flex align-items-center justify-content-center"
                              style={{ width: 80, height: 80, cursor: "pointer" }}
                              onClick={() => {
                                const el = document.getElementById(`variant-files-${vi}`);
                                if (el) el.click();
                              }}
                            >
                              <FaPlus color="#0d6efd" />
                            </div>

                            <input
                              id={`variant-files-${vi}`}
                              type="file"
                              multiple
                              accept="image/*"
                              className="d-none"
                              onChange={(e) => handleVariantNewFiles(vi, e)}
                            />
                          </div>

                          {/* stock grid */}
                          <div className="d-flex flex-wrap gap-3">
                            {sizesList.map((size) => (
                              <div key={`${vi}-${size}`} style={{ minWidth: 80 }}>
                                <label className="form-label">{size}</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={v.stock[size]}
                                  onChange={(e) => handleStockChange(vi, size, e.target.value)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      <button type="button" className="btn btn-outline-primary btn-sm" onClick={addVariant}>
                        + Add Color Variant
                      </button>
                    </div>

                    {/* Description */}
                    <div className="col-12 mt-3">
                      <label className="form-label">Description</label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={product.description}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setProduct((prev) => ({ ...prev, description: data }));
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
}
