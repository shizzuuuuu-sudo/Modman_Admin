import React from 'react';

const Dashboard = () => {
  return (
    <section className='wrapper'>
    <div className="page-content">
      {/* Start Container Fluid */}
      <div className="container-fluid">
        {/* Start here.... */}
        <div className="row">
          <div className="col-xxl-12">
            <div className="row">
              <div className="col-12">
                <div className="alert alert-primary text-truncate mb-3" role="alert">
                  We regret to inform you that our server is currently experiencing technical difficulties.
                </div>
              </div>

              <div className="col-md-3">
                <div className="card overflow-hidden">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <div className="avatar-md bg-soft-primary rounded">
                          <iconify-icon icon="solar:cart-5-bold-duotone" className="avatar-title fs-32 text-primary"></iconify-icon>
                        </div>
                      </div> {/* end col */}
                      <div className="col-6 text-end">
                        <p className="text-muted mb-0 text-truncate">Total Orders</p>
                        <h3 className="text-dark mt-1 mb-0">13, 647</h3>
                      </div> {/* end col */}
                    </div> {/* end row*/}
                  </div> {/* end card body */}
                  <div className="card-footer py-2 bg-light bg-opacity-50">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <span className="text-success"> <i className="bx bxs-up-arrow fs-12"></i> 2.3%</span>
                        <span className="text-muted ms-1 fs-12">Last Week</span>
                      </div>
                      <a href="#!" className="text-reset fw-semibold fs-12">View More</a>
                    </div>
                  </div> {/* end card body */}
                </div> {/* end card */}
              </div> {/* end col */}
              
              <div className="col-md-3">
                <div className="card overflow-hidden">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <div className="avatar-md bg-soft-primary rounded">
                          <iconify-icon icon="bx:award" className="avatar-title fs-24 text-primary"></iconify-icon>

                        </div>
                      </div> {/* end col */}
                      <div className="col-6 text-end">
                        <p className="text-muted mb-0 text-truncate">New Leads</p>
                        <h3 className="text-dark mt-1 mb-0">9, 526</h3>
                      </div> {/* end col */}
                    </div> {/* end row*/}
                  </div> {/* end card body */}
                  <div className="card-footer py-2 bg-light bg-opacity-50">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <span className="text-success"> <i className="bx bxs-up-arrow fs-12"></i> 8.1%</span>
                        <span className="text-muted ms-1 fs-12">Last Month</span>
                      </div>
                      <a href="#!" className="text-reset fw-semibold fs-12">View More</a>
                    </div>
                  </div> {/* end card body */}
                </div> {/* end card */}
              </div> {/* end col */}
              
              <div className="col-md-3">
                <div className="card overflow-hidden">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <div className="avatar-md bg-soft-primary rounded">
<iconify-icon icon="bx:bxs-backpack" className="avatar-title fs-24 text-primary"></iconify-icon>
                        </div>
                      </div> {/* end col */}
                      <div className="col-6 text-end">
                        <p className="text-muted mb-0 text-truncate">Deals</p>
                        <h3 className="text-dark mt-1 mb-0">976</h3>
                      </div> {/* end col */}
                    </div> {/* end row*/}
                  </div> {/* end card body */}
                  <div className="card-footer py-2 bg-light bg-opacity-50">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <span className="text-danger"> <i className="bx bxs-down-arrow fs-12"></i> 0.3%</span>
                        <span className="text-muted ms-1 fs-12">Last Month</span>
                      </div>
                      <a href="#!" className="text-reset fw-semibold fs-12">View More</a>
                    </div>
                  </div> {/* end card body */}
                </div> {/* end card */}
              </div> {/* end col */}
              
              <div className="col-md-3">
                <div className="card overflow-hidden">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <div className="avatar-md bg-soft-primary rounded">
                          
<iconify-icon icon="bx:bx-dollar-circle" className="avatar-title fs-24 text-primary"></iconify-icon>
                        </div>
                      </div> {/* end col */}
                      <div className="col-6 text-end">
                        <p className="text-muted mb-0 text-truncate">Booked Revenue</p>
                        <h3 className="text-dark mt-1 mb-0">$123.6k</h3>
                      </div> {/* end col */}
                    </div> {/* end row*/}
                  </div> {/* end card body */}
                  <div className="card-footer py-2 bg-light bg-opacity-50">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <span className="text-danger"> <i className="bx bxs-down-arrow fs-12"></i> 10.6%</span>
                        <span className="text-muted ms-1 fs-12">Last Month</span>
                      </div>
                      <a href="#!" className="text-reset fw-semibold fs-12">View More</a>
                    </div>
                  </div> {/* end card body */}
                </div> {/* end card */}
              </div> {/* end col */}
            </div> {/* end row */}
          </div> {/* end col */}

       
        </div> {/* end row */}


        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="card-title">
                    Recent Orders
                  </h4>
                  <a href="#!" className="btn btn-sm btn-soft-primary">
                    <i className="bx bx-plus me-1"></i>Create Order
                  </a>
                </div>
              </div>
              {/* end card body */}
              <div className="table-responsive table-centered">
                <table className="table mb-0">
                  <thead className="bg-light bg-opacity-50">
                    <tr>
                      <th className="ps-3">Order ID.</th>
                      <th>Date</th>
                      <th>Product</th>
                      <th>Customer Name</th>
                      <th>Email ID</th>
                      <th>Phone No.</th>
                      <th>Address</th>
                      <th>Payment Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  {/* end thead*/}
                  <tbody>
                    <tr>
                      <td className="ps-3">
                        <a href="order-detail.html">#RB5625</a>
                      </td>
                      <td>29 April 2024</td>
                      <td>
                        <img src="assets/images/products/product-1(1).png" alt="product-1(1)" className="img-fluid avatar-sm" />
                      </td>
                      <td>
                        <a href="#!">Anna M. Hines</a>
                      </td>
                      <td>anna.hines@mail.com</td>
                      <td>(+1)-555-1564-261</td>
                      <td>Burr Ridge/Illinois</td>
                      <td>Credit Card</td>
                      <td>
                        <i className="bx bxs-circle text-success me-1"></i>Completed
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-3">
                        <a href="order-detail.html">#RB9652</a>
                      </td>
                      <td>25 April 2024</td>
                      <td>
                        <img src="assets/images/products/product-4.png" alt="product-4" className="img-fluid avatar-sm" />
                      </td>
                      <td>
                        <a href="#!">Judith H. Fritsche</a>
                      </td>
                      <td>judith.fritsche.com</td>
                      <td>(+57)-305-5579-759</td>
                      <td>SULLIVAN/Kentucky</td>
                      <td>Credit Card</td>
                      <td>
                        <i className="bx bxs-circle text-success me-1"></i>Completed
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-3">
                        <a href="order-detail.html">#RB5984</a>
                      </td>
                      <td>25 April 2024</td>
                      <td>
                        <img src="assets/images/products/product-5.png" alt="product-5" className="img-fluid avatar-sm" />
                      </td>
                      <td>
                        <a href="#!">Peter T. Smith</a>
                      </td>
                      <td>peter.smith@mail.com</td>
                      <td>(+33)-655-5187-93</td>
                      <td>Yreka/California</td>
                      <td>Pay Pal</td>
                      <td>
                        <i className="bx bxs-circle text-success me-1"></i>Completed
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-3">
                        <a href="order-detail.html">#RB3625</a>
                      </td>
                      <td>21 April 2024</td>
                      <td>
                        <img src="assets/images/products/product-6.png" alt="product-6" className="img-fluid avatar-sm" />
                      </td>
                      <td>
                        <a href="#!">Emmanuel J. Delcid</a>
                      </td>
                      <td>emmanuel.delicid@mail.com</td>
                      <td>(+30)-693-5553-637</td>
                      <td>Atlanta/Georgia</td>
                      <td>Pay Pal</td>
                      <td>
                        <i className="bx bxs-circle text-primary me-1"></i>Processing
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-3">
                        <a href="order-detail.html">#RB8652</a>
                      </td>
                      <td>18 April 2024</td>
                      <td>
                        <img src="assets/images/products/product-1(2).png" alt="product-1(2)" className="img-fluid avatar-sm" />
                      </td>
                      <td>
                        <a href="#!">William J. Cook</a>
                      </td>
                      <td>william.cook@mail.com</td>
                      <td>(+91)-855-5446-150</td>
                      <td>Rosenberg/Texas</td>
                      <td>Credit Card</td>
                      <td>
                        <i className="bx bxs-circle text-primary me-1"></i>Processing
                      </td>
                    </tr>
                  </tbody>
                  {/* end tbody */}
                </table>
                {/* end table */}
              </div>
              {/* table responsive */}

              <div className="card-footer border-top">
                <div className="row g-3">
                  <div className="col-sm">
                    <div className="text-muted">
                      Showing
                      <span className="fw-semibold">5</span>
                      of
                      <span className="fw-semibold">90,521</span>
                      orders
                    </div>
                  </div>
                  <div className="col-sm-auto">
                    <ul className="pagination m-0">
                      <li className="page-item">
                        <a href="#" className="page-link"><i className="bx bx-left-arrow-alt"></i></a>
                      </li>
                      <li className="page-item active">
                        <a href="#" className="page-link">1</a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">2</a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">3</a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link"><i className="bx bx-right-arrow-alt"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* end card */}
          </div>
          {/* end col */}
        </div> {/* end row */}
      </div>
      {/* End Container Fluid */}
    </div>
    </section>
  );
};

export default Dashboard;