<template>
  <div class="kotak_login">
    <h4 class="tulisan_login">Login</h4>
    <form @submit="login">
      <label>Username</label>
      <input
        type="text"
        required
        name="username"
        v-model="form.username"
        class="form_login"
        placeholder="Masukan Username Anda"
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        required
        v-model="form.password"
        class="form_login"
        placeholder="Masukan Password Anda"
      />
      <button type="submit" class="btn btn-primary poll">
        Login
      </button>
      <center>
        <p class="f00ter">
          <a href="/register" class="registerdonk">Register </a>
          <span class="notReg">Jika Belum Memiliki Akun</span>
        </p>
      </center>
    </form>
  </div>
</template>
<script>
// Import Axios
import axios from "axios";
export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        username: "",
        password: "",
        role:"",
      },
    };
  },
  methods: {
    async getUser() {
      const user = await axios.get("  http://localhost:3000/akuns");
      this.users = user.data;
    },
    login(e) {
      e.preventDefault();
      const login = this.users.find(
        (data) =>
          data.username === this.form.username &&
          data.password === this.form.password
      );
//  kondisi jika akun benar akan langsung masuk ke page home kalo salah muncul alert
      if (login === undefined) {
        alert("Username Or Password Not Found");
      } else {
        var converToString = JSON.stringify(login);
        sessionStorage.setItem("USER_DATA", converToString);
        sessionStorage.setItem("role", login.role);
        this.$router.push("/home");
        window.location.reload();
      }
    },
  },
  mounted() {
    this.getUser();
    // fungsi toggle pada app vue
    this.$emit("toggleBar");
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
  /*ketebalan font*/
  font-weight: 300;
}
.tulisan_login {
  text-align: center;
  /*membuat semua huruf menjadi kapital*/
  text-transform: uppercase;
}
label {
  font-size: 11pt;
}
.kotak_login {
  border: 1px solid #232323;
  border-radius: 10%;
  width: 350px;
  background-color: white;
  /*meletakkan form ke tengah*/
  margin: 80px auto;
  padding: 30px 20px;
  overflow: hidden;
  /* height: 60vh; */
}
.form_login {
  /*membuat lebar form penuh*/
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  font-size: 11pt;
  margin-bottom: 20px;
}
.link {
  color: #232323;
  text-decoration: none;
  font-size: 10pt;
}
.aa {
  border: 1px solid black;
  border-radius: 10px;
  background-color: aliceblue;
  margin-left: 50px;
  margin-right: 50px;
  padding: 5px;
  text-align: center;
}
.f00ter {
  text-align: end;
  margin-top: 20px;
  margin-bottom: -20px;
}
.f00ter a {
  text-decoration: none;
}
.registerdonk:hover {
  text-decoration: underline;
}
.poll {
  width: 100%;
}
.notReg {
  padding-left: 2px;
}
</style>
