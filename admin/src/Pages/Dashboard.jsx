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
                  </div> 
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
                  </div>  {/* end card body */}
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
                  </div>  {/* end card body */}
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
                  </div>  {/* end card body */}
                </div> {/* end card */}
              </div> {/* end col */}
            </div> {/* end row */}
          </div> {/* end col */}

       
        </div>
      </div>
      {/* End Container Fluid */}
    </div>
    </section>
  );
};

export default Dashboard;