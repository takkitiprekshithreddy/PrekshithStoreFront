<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container text-center">
        <h1 class="display-4 fw-bold">Get In Touch</h1>
        <p class="lead">We'd love to hear from you. Here's how you can reach us.</p>
      </div>
    </section>

    <!-- Contact Info Cards -->
    <section class="py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 text-center contact-info-card">
              <div class="card-body">
                <i class="fas fa-map-marker-alt fa-3x text-primary mb-3"></i>
                <h5 class="card-title">Visit Us</h5>
                <p class="card-text">Kapil Kavuri Hub<br />Gachibowli, TS 500032</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 text-center contact-info-card">
              <div class="card-body">
                <i class="fas fa-phone fa-3x text-primary mb-3"></i>
                <h5 class="card-title">Call Us</h5>
                <h5 class="card-title">Receptionist : Vijay</h5>
                <p class="card-text">+91 77803 79226<br />Monday-Friday: 9am-5pm</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 text-center contact-info-card">
              <div class="card-body">
                <i class="fas fa-envelope fa-3x text-primary mb-3"></i>
                <h5 class="card-title">Email Us</h5>
                <p class="card-text">
                  prekshithstorefront@company.com<br />prekshithstorefrontsupport@company.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.hero-section {
  background: linear-gradient(135deg, #1a1a1a, #333);
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 2rem;
  color: #fff;
}
.contact-info-card {
  transition: transform 0.3s ease;
}
.contact-info-card:hover {
  transform: translateY(-5px);
}
.contact-form {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
.map-container {
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
}
</style>
