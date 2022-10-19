<template>
  <div id="home">
    <Navbar />
    <h1 style="text-align: center">Ini Halaman Home Page</h1>
    <div class="data">
      <div class="input" id="input"></div>
      <div class="data">
        <button
          type="button"
          class="btn btn-success add"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          ADD
        </button>

        <!-- Modal -->
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Form <span v-show="!updateSubmit">Tambah</span><span v-show="updateSubmit">Update</span>
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                   @click="close"
                ></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="add">
                  <input type="hidden" v-model="form.id" required />
                  <label>Nama Motor</label>
                  <input
                    placeholder="Masukan Nama Motor.."
                    class="input"
                    type="text"
                    v-model="form.motor"
                    required
                  />
                  <label>Merek Motor</label>
                  <input
                    placeholder="Masukan Merek Motor.."
                    class="input"
                    type="text"
                    v-model="form.merk"
                    required
                  />
                  <label>Tahun Buatan</label>
                  <input
                    placeholder="Masukan Tahun Buatan.."
                    class="input"
                    type="text"
                    v-model="form.tahun"
                    required
                  />
                  <label class="bb">Kapasitas Tangki</label>
                  <input
                    placeholder="Masukan Kapasitas Tangki.."
                    class="input"
                    type="text"
                    v-model="form.bahanbakar"
                    required
                  />
                  <label class="jenis">CC</label>
                  <input
                    placeholder="Masukan CC Motor.."
                    class="input"
                    type="text"
                    v-model="form.jenis"
                    required
                  />
                  <button
                    type="button"
                    class="btn btn-secondary button_close"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    class="btn btn-primary button_add"
                    type="submit"
                    v-show="!updateSubmit"
                  >
                    ADD
                  </button>
                  <button
                    class="btn btn-primary button_add"
                    type="button"
                    v-show="updateSubmit"
                    @click="update(form)"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <table class="table table-striped tableData">
          <thead>
            <tr>
              <th>No</th>
              <th class="th">Nama Motor</th>
              <th class="th">Merek Motor</th>
              <th class="th">Tahun Buatan</th>
              <th class="th">Kapasitas Tangki</th>
              <th class="th">CC Motor</th>
              <th class="th">Action</th>
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
              <td>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  class="edit"
                  @click="edit(motor)"
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="del" @click="del(motor)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
export default {
  name: "HomePage",
  components: {
    Navbar,
  },
  mounted() {
    if (!sessionStorage.getItem("USER_DATA")) {
      this.$router.push("/");
    }
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
      },
      motors: "",
      updateSubmit: false,
    };
  },
  mounted() {
    this.load();
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
      this.updateSubmit = true;
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
    del(motor) {
      axios.delete("  http://localhost:3000/motors/" + motor.id).then((res) => {
        this.load();
        let index = this.motors.indexOf(form.motor);
        this.motors.splice(index, 1);
      });
    },
    close() {
      window.location.reload();
    }
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
.data {
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
