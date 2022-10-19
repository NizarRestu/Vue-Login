<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="#">Navbar</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="adminAcces">
            <router-link class="nav-link active" aria-current="page" to="/home"
              >Home</router-link
            >
          </li>
          <li class="nav-item" v-if="adminAcces ">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item" v-if="adminAcces ">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/product">Produk</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/detail">Detail</router-link>
          </li>

        </ul>
      </div>
      <form class="d-flex" role="search">
                  <a class="nav-link" @click="out" href="/"
              ><i class="fas fa-sign-out-alt" style="color: white"></i> Log
              Out</a
            >
    </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SideComp",
  computed :{
    adminAcces() {
      return sessionStorage.getItem("role") === "admin" || "";
    }
  },
  methods: {
    out() {
      sessionStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
a {
  color: white;
}
.logout {
  padding-left: 840px;
}
</style>
