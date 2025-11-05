import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import httpClient, { BASE_URL } from "../../Utils/httpClient";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await httpClient.get("/products/getAllProducts");
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (error) {
      console.error("Error fetching Products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await httpClient.delete(`/products/${id}`);
          if (data.message === "Product deleted successfully") {
            Swal.fire("Deleted!", "Product has been deleted.", "success");
            fetchProducts();
          } else {
            Swal.fire("Error!", data.message || "Failed to delete.", "error");
          }
        } catch (err) {
          Swal.fire("Error!", err.response?.data?.message || err.message, "error");
        }
      }
    });
  };

  if (loading) return <div className="text-center mt-5">Loading Products...</div>;

  return (
    <div className="page-content">
      <div className="container-xxl">
        <div className="row">
          <div className="col-xl-12">
            <div className="card shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Products List</h4>
                <Link to="/AddProducts" className="btn btn-primary">
                  + Add Product
                </Link>
              </div>

              <div className="table-responsive">
                <table className="table table-striped align-middle table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Category</th>
                      <th>Product Name</th>
                      <th>Image</th>
                      <th>Brand</th>
                      <th>Gender</th>
                      <th>Sizes</th>
                      {/* <th>Colours</th>
                      <th>Description</th> */}
                      <th>Tag No</th>
                      <th>Stock</th>
                      <th>Price</th>
                      <th>Old Price</th>
                      <th>Discount</th>
                      <th>Tax</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((prod, index) => (
                        <tr key={prod._id}>
                          <td>{index + 1}</td>
                          <td>{prod.category?.Categoryname || "—"}</td>
                          <td>{prod.productName || "—"}</td>
                          <td>
                            {prod.image ? (
                              <img
                                src={`${BASE_URL}${prod.image}`}
                                alt={prod.productName}
                                className="rounded"
                                style={{
                                  width: 70,
                                  height: 70,
                                  objectFit: "cover",
                                  border: "1px solid #ddd",
                                }}
                              />
                            ) : (
                              <span className="text-muted">No Image</span>
                            )}
                          </td>
                          <td>{prod.brandName || "—"}</td>
                          <td>{prod.gender || "—"}</td>
                          <td>
                            {Array.isArray(prod.sizes) && prod.sizes.length
                              ? prod.sizes.join(", ")
                              : "—"}
                          </td>
                          {/* <td>
                            {Array.isArray(prod.colours) && prod.colours.length
                              ? prod.colours.join(", ")
                              : "—"}
                          </td> */}
                          {/* <td style={{ maxWidth: 180, whiteSpace: "normal" }}>
                            {prod.description?.slice(0, 80) || "—"}
                            {prod.description?.length > 80 && "..."}
                          </td> */}
                          <td>{prod.tagNumber || "—"}</td>
                          <td>{prod.inStock ? "Yes" : "No"}</td>
                          <td>₹{prod.price || "—"}</td>
                          <td>₹{prod.oldPrice || "—"}</td>
                          <td>{prod.discount ? `${prod.discount}%` : "—"}</td>
                          <td>{prod.tax ? `${prod.tax}%` : "—"}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link to={`/EditProduct/${prod._id}`}>
                                <button className="btn btn-outline-primary btn-sm">
                                  Edit
                                </button>
                              </Link>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDelete(prod._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="16" className="text-center text-muted py-3">
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
