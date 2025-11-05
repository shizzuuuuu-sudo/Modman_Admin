import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import httpClient from "../../Utils/httpClient";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all categories from backend
  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await httpClient.delete(`/categories/deleteCategory/${id}`);
          if (data.success) {
            Swal.fire("Deleted!", "Category has been deleted.", "success");
            fetchCategories(); // Refresh list
          } else {
            Swal.fire("Error!", data.message || "Failed to delete category.", "error");
          }
        } catch (err) {
          Swal.fire("Error!", err.response?.data?.message || err.message, "error");
        }
      }
    });
  };

  if (loading) return <div className="text-center mt-5">Loading categories...</div>;

  return (
    <div className="page-content">
      <div className="container-xxl">
        {/* Categories Table */}
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">All Categories List</h4>
                <Link to="/AddCategory" className="btn btn-sm btn-primary">Add Product</Link>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>#</th>
                      <th>Categories</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat, index) => (
                      <tr key={cat._id}>
                        <td>{index + 1}</td>
                        <td>{cat.Categoryname}</td>
                        <td>
                          <img src={cat.image} alt={cat.Categoryname} className="avatar-md rounded" />
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link to={`/EditCategory/${cat._id}`}>
                              <button className="btn btn-soft-primary btn-sm">Edit</button>
                            </Link>
                            <button
                              className="btn btn-soft-danger btn-sm"
                              onClick={() => handleDelete(cat._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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

export default CategoryList;
