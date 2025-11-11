import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import httpClient from "../../Utils/httpClient";
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
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        console.log("Unexpected response:", data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
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
                      <th>Colors</th>
                      <th>Stock</th>
                      <th>Tag No</th>
                      <th>Price</th>
                      <th>Old Price</th>
                      <th>Discount</th>
                      <th>Tax</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((prod, index) => {
                        // Get first image from first variant if available
                        const firstImage =
                          prod.variants?.[0]?.images?.[0]?.url || "/placeholder.jpg";

                        // Get all color names
                        const colorNames =
                          prod.variants?.map((v) => v.colorName).join(", ") || "—";

                        // Calculate total stock (sum of all stock quantities)
                        const totalStock = prod.variants
                          ?.reduce((sum, variant) => {
                            return (
                              sum +
                              Object.values(variant.stock || {}).reduce(
                                (a, b) => a + (Number(b) || 0),
                                0
                              )
                            );
                          }, 0)
                          .toString();

                        return (
                          <tr key={prod._id}>
                            <td>{index + 1}</td>
                            <td>{prod.category?.Categoryname || "—"}</td>
                            <td>{prod.productName || "—"}</td>
                            <td>
                              <img
                                src={firstImage}
                                alt={prod.productName}
                                className="rounded"
                                style={{
                                  width: 70,
                                  height: 70,
                                  objectFit: "cover",
                                  border: "1px solid #ddd",
                                }}
                              />
                            </td>
                            <td>{prod.brandName || "—"}</td>
                            <td>{prod.gender || "—"}</td>
                            <td>{colorNames}</td>
                            <td>{totalStock || "0"}</td>
                            <td>{prod.tagNumber || "—"}</td>
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
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="14" className="text-center text-muted py-3">
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
