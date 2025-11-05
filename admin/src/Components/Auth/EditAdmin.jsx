import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import httpClient from "../../Utils/httpClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditAdmin = () => {
  const { id } = useParams(); // get admin ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confpassword: "",
    role: "",
    status: "Active",
  });

  const roles = ["Super Admin", "Manager", "Editor", "Support"];
  const [loading, setLoading] = useState(false);

  // ✅ Fetch admin details by ID
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setLoading(true);
        const res = await httpClient.get(`/admin/getById/${id}`);
        if (res.data.success) {
          setFormData({
            username: res.data.admin.username,
            email: res.data.admin.email,
            role: res.data.admin.role || "",
            password: "",
            confpassword: "",
            status: res.data.admin.status || "Active",
          });
        } else {
          toast.error("Failed to fetch admin details");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching admin details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAdmin();
  }, [id]);

  // ✅ Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle update form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email) {
      toast.warning("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);
      const res = await httpClient.put(`/admin/update/${id}`, formData);
      if (res.data.success) {
        toast.success("Admin updated successfully!");
        setTimeout(() => navigate("/AdminList"), 1500);
      } else {
        toast.error(res.data.message || "Failed to update admin");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content py-4 px-3">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-11 col-sm-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-light">
                <h4 className="card-title mb-0 text-center text-md-start">
                  Edit Admin
                </h4>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {/* Name */}
                    <div className="col-md-6">
                      <label htmlFor="username" className="form-label">
                        Admin Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter admin name"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter email address"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="*****"
                        required
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="confpassword"
                        value={formData.confpassword}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="*****"
                        required
                      />
                    </div>

                    {/* Role */}
                    <div className="col-md-6">
                      <label htmlFor="role" className="form-label">
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status */}
                    <div className="col-md-6">
                      <label className="form-label d-block">Status</label>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="status"
                            id="active"
                            value="Active"
                            checked={formData.status === "Active"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="active"
                          >
                            Active
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="status"
                            id="inactive"
                            value="Inactive"
                            checked={formData.status === "Inactive"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inactive"
                          >
                            Inactive
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="text-center text-md-end mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary px-4"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Admin"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary ms-2 px-4"
                      onClick={() => navigate("/AdminList")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;
