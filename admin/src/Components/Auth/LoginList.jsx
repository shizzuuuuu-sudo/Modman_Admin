import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { adminService } from "../../Utils/Service"; // Your custom API functions
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllUsers(); // should call your backend
      const data = response?.admins || response?.data?.admins || [];
      setAdmins(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Delete Admin
  const handleDeleteAdmin = async (adminId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await adminService.deleteAdmin(adminId);
          toast.success("Admin deleted successfully!");
          fetchAdmins();
        } catch (err) {
          toast.error("Failed to delete admin");
        }
      }
    });
  };

  //  Edit Admin (navigate to edit page)
  const handleEditAdmin = (id) => {
    navigate(`/EditAdmin/${id}`);
  };

  //  Filter admins by search
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading admins...</p>
      </div>
    );
  }

  return (
    <section className="wrapper">
      <div className="page-content">
        <div className="container-xxl">
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="d-flex card-header justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Admin List</h4>
                  <div className="d-flex gap-2">
                    <Form.Group className="mb-0">
                      <Form.Control
                        type="text"
                        placeholder="Search admin..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ minWidth: "250px" }}
                      />
                    </Form.Group>
                    <Link to="/CreateAdmin">
                      <button className="btn btn-primary">
                        Create Admin
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered">
                    <thead className="bg-light-subtle">
                      <tr>
                        <th>#</th>
                        <th>Admin Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAdmins.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center py-4 text-muted">
                            No admins found
                          </td>
                        </tr>
                      ) : (
                        filteredAdmins.map((admin, index) => (
                          <tr key={admin._id}>
                            <td>{index + 1}</td>
                            <td>{admin.username}</td>
                            <td>{admin.email}</td>
                            <td>{admin.role || "Admin"}</td>
                            <td>
                              <span
                                className={`badge ${
                                  admin.status === "Inactive"
                                    ? "bg-danger-subtle text-danger"
                                    : "bg-success-subtle text-success"
                                } py-1 px-2`}
                              >
                                {admin.status || "Active"}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-soft-info btn-sm"
                                  onClick={() => handleEditAdmin(admin._id)}
                                >
                                  <iconify-icon
                                    icon="solar:pen-bold"
                                    className="align-middle fs-18"
                                  ></iconify-icon>
                                </button>

                                <button
                                  className="btn btn-soft-danger btn-sm"
                                  onClick={() => handleDeleteAdmin(admin._id)}
                                >
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    className="align-middle fs-18"
                                  ></iconify-icon>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="card-footer border-top text-end">
                  <span className="text-muted">
                    Showing {filteredAdmins.length} of {admins.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </section>
  );
};

export default LoginList;
