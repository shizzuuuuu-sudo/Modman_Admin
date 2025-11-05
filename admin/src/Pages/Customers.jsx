// components/Customers.js
import React, { useState, useEffect } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { userService } from '../Utils/Service';

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsersThisMonth: 0
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users data
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      setUsers(response.users || response.data || []);
      
      // Calculate stats
      const totalUsers = response.users?.length || 0;
      const activeUsers = response.users?.filter(user => user.status === 'active').length || 0;
      const newUsersThisMonth = response.users?.filter(user => {
        const userDate = new Date(user.createdAt);
        const currentDate = new Date();
        return (
          userDate.getMonth() === currentDate.getMonth() &&
          userDate.getFullYear() === currentDate.getFullYear()
        );
      }).length || 0;

      setStats({
        totalUsers,
        activeUsers,
        newUsersThisMonth
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(userId);
        fetchUsers(); // Refresh data
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.includes(searchTerm)
  );

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className='wrapper'>
        <div className="page-content">
          <div className="container-xxl">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading users...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='wrapper'>
      <div className="page-content">
        <div className="container-xxl">
          
          {/* Error Alert */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}

          {/* Stats Cards */}
          <div className="row">
            <div className="col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body">                                
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="avatar-md bg-primary bg-opacity-10 rounded">
                      <iconify-icon icon="solar:users-group-two-rounded-bold-duotone" className="fs-32 text-primary avatar-title"></iconify-icon>
                    </div>
                    <div>
                      <h4 className="mb-0">All Customers</h4>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="text-muted fw-medium fs-22 mb-0">+{stats.totalUsers}</p>            
                    <div>
                      <span className="badge text-success bg-success-subtle fs-12">
                        <i className="bx bx-up-arrow-alt"></i>34.4%
                      </span>
                    </div>        
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body">                                
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="avatar-md bg-primary bg-opacity-10 rounded">
                      <iconify-icon icon="solar:user-check-bold-duotone" className="fs-32 text-primary avatar-title"></iconify-icon>
                    </div>
                    <div>
                      <h4 className="mb-0">Active Users</h4>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="text-muted fw-medium fs-22 mb-0">+{stats.activeUsers}</p>            
                    <div>
                      <span className="badge text-success bg-success-subtle fs-12">
                        <i className="bx bx-up-arrow-alt"></i>12.6%
                      </span>
                    </div>        
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body">                                
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="avatar-md bg-primary bg-opacity-10 rounded">
                      <iconify-icon icon="solar:user-plus-bold-duotone" className="fs-32 text-primary avatar-title"></iconify-icon>
                    </div>
                    <div>
                      <h4 className="mb-0">New This Month</h4>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="text-muted fw-medium fs-22 mb-0">+{stats.newUsersThisMonth}</p>            
                    <div>
                      <span className="badge text-success bg-success-subtle fs-12">
                        <i className="bx bx-up-arrow-alt"></i>45.9%
                      </span>
                    </div>        
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="d-flex card-header justify-content-between align-items-center">
                  <div>
                    <h4 className="card-title">All Customers List</h4>
                    <p className="text-muted mb-0">Total {filteredUsers.length} users found</p>
                  </div>
                  <div className="d-flex gap-2">
                    <Form.Group className="mb-0">
                      <Form.Control
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ minWidth: '250px' }}
                      />
                    </Form.Group>
                    
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-light" size="sm" className="rounded">
                        This Month
                      </Dropdown.Toggle>
                      <Dropdown.Menu align="end">
                        <Dropdown.Item onClick={() => fetchUsers()}>Refresh Data</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#!">Download CSV</Dropdown.Item>
                        <Dropdown.Item href="#!">Export PDF</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered">
                    <thead className="bg-light-subtle">
                      <tr>
                        <th style={{ width: "20px" }}>
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="customCheck1" />
                            <label className="form-check-label" htmlFor="customCheck1"></label>
                          </div>
                        </th>
                        <th>Customer Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Joined Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            <div className="text-muted">
                              <iconify-icon icon="solar:user-check-bold-duotone" className="fs-48"></iconify-icon>
                              <p className="mt-2">No users found</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user, index) => (
                          <tr key={user._id}>
                            <td>
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" id={`customCheck${index + 2}`} />
                                <label className="form-check-label" htmlFor={`customCheck${index + 2}`}>&nbsp;</label>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm bg-soft-primary rounded-circle me-2 d-flex align-items-center justify-content-center">
                                  <span className="text-primary fw-semibold">
                                    {user.username?.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <div className="fw-semibold">{user.username}</div>
                                  <small className="text-muted">ID: {user._id?.substring(0, 8)}...</small>
                                </div>
                              </div>
                            </td>
                            <td>{user.phone || 'N/A'}</td>
                            <td>{user.email}</td>
                            <td>{formatDate(user.createdAt)}</td>
                            <td>
                              <span className={`badge ${user.status === 'active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} py-1 px-2`}>
                                {user.status || 'active'}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-soft-danger btn-sm"
                                  onClick={() => handleDeleteUser(user._id)}
                                >
                                  <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18"></iconify-icon>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="card-footer border-top">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end mb-0">
                      <li className="page-item"><a className="page-link" href="javascript:void(0);">Previous</a></li>
                      <li className="page-item active"><a className="page-link" href="javascript:void(0);">1</a></li>
                      <li className="page-item"><a className="page-link" href="javascript:void(0);">2</a></li>
                      <li className="page-item"><a className="page-link" href="javascript:void(0);">3</a></li>
                      <li className="page-item"><a className="page-link" href="javascript:void(0);">Next</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customers;
