<template>
  <div id="app">
    <notifications group="foo" position="top center" />
    <div class="is-loged" v-if="login.isLoged">

      <div class="top d-flex" :class="login.isAdmin ?'is-admin':''">
        Usuario logeado:
        <strong class="ml-1">{{ login.user.email }}</strong>
        <span class="mx-3">|</span>
        <a class="ml-2" href="#" @click="logOut">
          <svg style="width:18px;height:18px" viewBox="0 0 24 24">
            <path fill="#FFFFFF" d="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13" />
          </svg>
          Desconectar</a>

        <div class="ml-auto" v-if="login.isAdmin">
          <a href="#" @click="deptosIndexPanel = true">
            <svg style="width:16;height:16px" viewBox="0 0 24 24">
              <path fill="#FFFFFF" d="M5,3V21H11V17.5H13V21H19V3H5M7,5H9V7H7V5M11,5H13V7H11V5M15,5H17V7H15V5M7,9H9V11H7V9M11,9H13V11H11V9M15,9H17V11H15V9M7,13H9V15H7V13M11,13H13V15H11V13M15,13H17V15H15V13M7,17H9V19H7V17M15,17H17V19H15V17Z" />
            </svg>
            <span> Administrar Deptos</span>
          </a>

        </div>

      </div>

      <div v-if="deptosIndexPanel">
        <deptosIndex @close="closePanel($event)" @toggle="toggleApartment($event)" />
      </div>

      <div class="container">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a href="#" @click.prevent="panel = 'addVisit'" class="nav-link" :class="panel === 'addVisit' ? 'active':''">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
              </svg>
              Ingresar visitas</a>
          </li>
          <li class="nav-item">
            <a href="#" @click.prevent="panel = 'historical'" class="nav-link" :class="panel === 'historical' ? 'active':''">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3" />
              </svg>
              Historial</a>
          </li>
          <li class="nav-item">
            <a href="#" @click.prevent="panel = 'search'" class="nav-link" :class="panel === 'search' ? 'active':''">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M10,13C9.65,13.59 9.36,14.24 9.19,14.93C6.5,15.16 3.9,16.42 3.9,17V18.1H9.2C9.37,18.78 9.65,19.42 10,20H2V17C2,14.34 7.33,13 10,13M10,4A4,4 0 0,1 14,8C14,8.91 13.69,9.75 13.18,10.43C12.32,10.75 11.55,11.26 10.91,11.9L10,12A4,4 0 0,1 6,8A4,4 0 0,1 10,4M10,5.9A2.1,2.1 0 0,0 7.9,8A2.1,2.1 0 0,0 10,10.1A2.1,2.1 0 0,0 12.1,8A2.1,2.1 0 0,0 10,5.9M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14Z" />
              </svg>
              Buscar Persona</a>
          </li>
        </ul>
      </div>
      <div v-if="panel === 'addVisit'">
        <visitas />
      </div>
      <div v-else-if="panel === 'historical'">
        <historial />
      </div>
      <div v-else>
        <search />
      </div>
    </div>
    <div class="login-box" v-else>
      <div class="container d-flex justify-content-center">
        <div class="card card-login">
          <div class="card-header">
            <h3 class="h4">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#FFFFFF" d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
              </svg>
              Ingresar</h3>
          </div>
          <div class="card-body p-5">
            <form @submit.prevent="signIn">
              <div class="form-group">
                <label for="">
                  <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                    <path fill="#999999" d="M12,13C9.33,13 4,14.33 4,17V20H20V17C20,14.33 14.67,13 12,13M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4M12,14.9C14.97,14.9 18.1,16.36 18.1,17V18.1H5.9V17C5.9,16.36 9,14.9 12,14.9M12,5.9A2.1,2.1 0 0,1 14.1,8A2.1,2.1 0 0,1 12,10.1A2.1,2.1 0 0,1 9.9,8A2.1,2.1 0 0,1 12,5.9Z" />
                  </svg>
                  Usuario (email)</label>
                <input placeholder="tuemail@mail.com" v-model="login.user" id="emailLogin" type="text" class="form-control form-control-lg" />
              </div>
              <div class="form-group">
                <label for="">
                  <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                    <path fill="#999999" d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z" />
                  </svg>

                  Clave</label>
                <input placeholder="tupassword" v-model="login.pass" id="passLogin" type="password" class="form-control form-control-lg" />
              </div>
              <button :disabled="login.user === '' || login.pass === ''" class="btn btn-primary btn-lg btn-block" type="submit">Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "./components/configFirebase";
import visitas from "./components/visitas";
import historial from "./components/historial";
import deptos from "./components/deptos";
import deptosIndex from "./components/deptosIndex";
import search from "./components/search";
import authorized from "./components/authorized";

let usersRef = db.ref("users");
let apartmentsRef = db.ref("apartments");

export default {
  name: "app",
  firebase: {
    users: usersRef,
    apartments: apartmentsRef
  },
  components: {
    visitas: visitas,
    historial: historial,
    deptos: deptos,
    deptosIndex: deptosIndex,
    search: search,
    authorized: authorized
  },
  data() {
    return {
      login: {
        isLoged: false,
        user: "",
        isAdmin: false,
        pass: ""
      },
      panel: "addVisit",
      deptosIndexPanel: false,
      depto: "",
      deptoKey: "",
      deptos: []
    };
  },
  methods: {
    addNotification: function(title, msg, type) {
      let typeA;
      if (type === null) {
        typeA = "success";
      } else {
        typeA = type;
      }
      this.$notify({
        group: "foo",
        title: title,
        text: msg,
        type: typeA
      });
    },
    toggleApartment(res) {
      this.addApartmentPanel = true;
      this.deptosIndexPanel = res;
    },
    closePanel(res) {
      console.log(this.deptosIndexPanel);
      this.addApartmentPanel = res;
      this.deptosIndexPanel = false;
    },
    signIn: function() {
      let email = document.getElementById("emailLogin").value;
      let password = document.getElementById("passLogin").value;

      auth
        .signInWithEmailAndPassword(email, password)
        .then(result => {
          this.login.isLoged = true;
          this.ifConected;
          this.addNotification(
            "Ingreso exitoso",
            `Ingresando con cuenta ${email} `,
            "success"
          );
        })
        .catch(error => {
          console.log(this.deptosIndexPanel);
          this.addNotification(
            "Error",
            "Usuario o contraseña incorrecta",
            "error"
          );
        });
    },
    ifConected: function() {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.login.isLoged = true;
          this.login.user = user;
          if (user.email === "culero@gmail.com") {
            this.login.isAdmin = true;
          }
        } else {
          this.login.isLoged = false;
          return console.log("no conectado");
        }
      });
    },
    logOut: function() {
      auth.onAuthStateChanged(user => {
        if (user) {
          auth
            .signOut()
            .then(() => {
              this.login.isLoged = false;
              this.addNotification(
                "Desconectado",
                "Se ha desconectado de la sessión"
              );
              location.reload();
            })
            .catch(function(error) {
              // An error happened.
            });
        }
      });
    }
  },
  mounted() {
    this.ifConected();
  }
};
</script>

<style lang="scss" scoped>
.top {
  background: #192329;
  padding: 0.3rem;
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  text-align: right;
  color: #7586a0;
  padding: 0.3rem;
  font-size: 14px;
  &.is-admin {
    background: #bd0f34;
    color: rgba(255, 255, 255, 0.6);
    .ml-auto {
      background: rgba(0, 0, 0, 0.2);
      margin: -0.3rem;
      padding: 0.3rem 1rem;
    }
  }
  a {
    color: #fff;
  }
}

.card-login {
  width: 500px;
}

.nav-tabs {
  border: 0;
  background: #fdfcfc;
  margin: 0;
  border-radius: 0.5rem 0.5rem 0 0;
  .nav-item {
    margin: 0;
  }
  .nav-link {
    border: 0;
    padding: 1rem 2rem;
    color: #999;
    border-radius: 0;
    border-bottom: 2px solid transparent;
    font-size: 1.1rem;
    background: none;
    path {
      fill: #999;
    }
    &.active {
      border-color: #3982e4;
      color: #3982e4;
      font-weight: bold;
      path {
        fill: #3982e4 !important;
      }
    }
  }
}
</style>
