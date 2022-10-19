<template>
<div>
  <div id="product">
    <Navbar />
    <h1 style="text-align: center">Ini Halaman Product Page</h1>
    <!-- Data Motor -->
    <div class="data-motor">
        <table class="table table-striped tableData">
          <thead>
            <tr>
              <th>No</th>
              <th class="th">Nama Motor</th>
              <th class="th">Merek Motor</th>
              <th class="th">Tahun Buatan</th>
              <th class="th">Kapasitas Tangki</th>
              <th class="th">CC Motor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(motor, index) in motors" :key="motor.id">
              <!-- perulangan nomer otomatis dengan {{index +1}} -->
              <td>{{ index + 1 }}</td>
              <td>{{ motor.motor }}</td>
              <td>{{ motor.merk }}</td>
              <td>{{ motor.tahun }}</td>
              <td>{{ motor.bahanbakar }}</td>
              <td>{{ motor.jenis }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- End Motor -->

    <!-- Mobil -->
    <div class="data-mobil">
        <table class="table table-striped tableData">
          <thead>
            <tr>
              <th>No</th>
              <th class="th">Nama Mobil</th>
              <th class="th">Merek Mobil</th>
              <th class="th">Tahun Buatan</th>
              <th class="th">Bahan Bakar</th>
              <th class="th">Jenis</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(mobil, index) in mobils" :key="mobil.id">
              <!-- perulangan nomer otomatis dengan {{index +1}} -->
              <td>{{ index + 1 }}</td>
              <td>{{ mobil.mobil }}</td>
              <td>{{ mobil.merk }}</td>
              <td>{{ mobil.tahun }}</td>
              <td>{{ mobil.bahanbakar }}</td>
              <td>{{ mobil.jenis }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    <!-- End Mobil -->

</template>
<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
export default {
  name: "ProductPage",
  components: {
    Navbar,
  },
  mounted() {
    if (!sessionStorage.getItem("USER_DATA")) {
      this.$router.push("/");
    }
       this.load();
     this.load1();
  },
  data() {
    return {
      form: {
        id: "",
        motor: "",
        merk: "",
        tahun: "",
        bahanbakar: "",
        jenis: "",
        image: "",
        // mobil
         id: "",
        mobil: "",
        merk: "",
        tahun: "",
        bahanbakar: "",
        jenis: "",
        image: "",
      },
      motors: "",
      updateSubmitMotor: false,
      mobils: "",
      updateSubmit: false,
    };
  },
  methods: {
    load() {
      axios
        .get("  http://localhost:3000/motors")
        .then((res) => {
          this.motors = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
     load1() {
      axios
        .get("http://localhost:3000/mobils")
        .then((res) => {
          this.mobils = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
      addmobil() {
      axios.post("http://localhost:3000/mobils/", this.form).then((res) => {
        this.load1();
        this.form.mobil = "";
        this.form.merk = "";
        this.form.tahun = "";
        this.form.bahanbakar = "";
        this.form.jenis = "";
        this.form.image = "";
      });
      window.location.reload();
    },
     edit(mobil) {
      this.updateSubmit = true;
      this.form.id = mobil.id;
      this.form.motor = mobil.motor;
      this.form.merk = mobil.merk;
      this.form.tahun = mobil.tahun;
      this.form.bahanbakar = mobil.bahanbakar;
      this.form.jenis = mobil.jenis;
      this.form.image = mobil.image;
    },

    add() {
      axios.post("  http://localhost:3000/motors/", this.form).then((res) => {
        this.load();
        this.form.motor = "";
        this.form.merk = "";
        this.form.tahun = "";
        this.form.bahanbakar = "";
        this.form.jenis = "";
        this.form.image = "";
      });
      window.location.reload();
    },
    edit(motor) {
      this.updateSubmitMotor = true;
      this.form.id = motor.id;
      this.form.motor = motor.motor;
      this.form.merk = motor.merk;
      this.form.tahun = motor.tahun;
      this.form.bahanbakar = motor.bahanbakar;
      this.form.jenis = motor.jenis;
      this.form.image = motor.image;
    },
        update(form) {
      return axios
        .put("  http://localhost:3000/mobils/" + form.id, {
          mobil: this.form.mobil,
          merk: this.form.merk,
          tahun: this.form.tahun,
          bahanbakar: this.form.bahanbakar,
          jenis: this.form.jenis,
          image: this.form.image,
        })
        .then((res) => {
          this.load();
          this.form.id = "";
          this.form.mobil = "";
          this.form.merk = "";
          this.form.tahun = "";
          this.form.bahanbakar = "";
          this.form.jenis = "";
          this.form.image = "";
          this.updateSubmit = false;
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    update(form) {
      return axios
        .put("  http://localhost:3000/motors/" + form.id, {
          motor: this.form.motor,
          merk: this.form.merk,
          tahun: this.form.tahun,
          bahanbakar: this.form.bahanbakar,
          jenis: this.form.jenis,
          image: this.form.image,
        })
        .then((res) => {
          this.load();
          this.form.id = "";
          this.form.motor = "";
          this.form.merk = "";
          this.form.tahun = "";
          this.form.bahanbakar = "";
          this.form.jenis = "";
          this.form.image = "";
          this.updateSubmit = false;
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
      del(mobil) {
      axios.delete("  http://localhost:3000/mobils/" + mobil.id).then((res) => {
        this.load1();
        let index = this.mobils.indexOf(form.mobil);
        this.mobils.splice(index, 1);
      });
    },
    del(motor) {
      axios.delete("  http://localhost:3000/motors/" + motor.id).then((res) => {
        this.load();
        let index = this.motors.indexOf(form.motor);
        this.motors.splice(index, 1);
      });
    },
    close() {
      window.location.reload();
    },
  },
};
</script>
<style scoped>
.button_close {
  margin-left: 300px;
}
.button_add {
  margin-left: 20px;
}
.add {
  margin-left: 1180px;
}
.data-motor {
  margin-left: 30px;
  margin-right: 30px;
}
.data-mobil {
  margin-left: 30px;
  margin-right: 30px;
}
.th {
  text-align: center;
}
.td {
  text-align: center;
}
.button {
  background-color: #0384fc;
  color: white;
  border: none;
  width: 100%;
  height: 30px !important;
  border-radius: 5px;
  padding-bottom: 35px;
  transition: background-color 2s, color 2s, border 2s;
}
.input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  font-size: 11pt;
  margin-bottom: 20px;
}
i {
  color: white;
}
.del {
  width: 50px;
  border: none;
  padding: 5px;
  background-color: rgb(252, 33, 33);
  border-radius: 5px;
  margin-right: 3px;
}
.edit {
  width: 50px;
  border: none;
  padding: 5px;
  background-color: rgb(24, 24, 245);
  border-radius: 5px;
  margin-right: 30px;
}
th {
  text-align: left;
  line-height: 35px;
}
.tableData {
  scroll-behavior: smooth;
}
</style>
