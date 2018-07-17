<template>
  <div id="app">
    <notifications group="foo" position="top center" />
    <div class="is-loged" v-if="login.isLoged">

      <div class="top d-flex align" :class="login.isAdmin ?'is-admin':''">
        Usuario logeado:
        <strong class="ml-1">{{ login.user.email }}</strong>
        <span class="mx-3">|</span>
        <a class="ml-2" href="#" @click="logOut">
          <svg style="width:18px;height:18px" viewBox="0 0 24 24">
            <path fill="#FFFFFF" d="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13" />
          </svg>
          Desconectar</a>

        <div class="ml-auto" v-if="login.isAdmin">
          <a href="#" @click="deptosIndexPanel = true">Ver Deptos</a>
          <span class="mx-3">|</span>
          <a href="#" @click="addApartmentPanel = true">Agregar Depto</a>
        </div>

      </div>

      <div v-if="addApartmentPanel">
        <deptos @close="closePanel($event)" />
      </div>

      <div v-if="deptosIndexPanel">
        <deptosIndex @close="closePanel($event)" @toggle="toggleApartment($event)" />
      </div>

      <div class="container">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a href="#" @click="panelAddVisit = true" class="nav-link" :class="panelAddVisit ? 'active':''">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
              </svg>
              Ingresar visitas</a>
          </li>
          <li class="nav-item">
            <a href="#" @click="panelAddVisit = false" class="nav-link" :class="panelAddVisit ? '':'active'">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3" />
              </svg>
              Historial</a>
          </li>
        </ul>
      </div>
      <div v-if="panelAddVisit">
        <visitas />
      </div>
      <div v-else>
        <historial />
      </div>
    </div>
    <div class="login-box" v-else>
      <div class="container d-flex justify-content-center">
        <form class="box p-5 w-50 bg-white" @submit.prevent="signIn">
          <div class="form-group">
            <label for="">Usuario</label>
            <input id="emailLogin" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="">Clave</label>
            <input id="passLogin" type="password" class="form-control" />
          </div>
          <button class="btn btn-primary btn-lg btn-block" type="submit">Ingresar</button>
        </form>
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
    deptosIndex: deptosIndex
  },
  data() {
    return {
      login: {
        isLoged: false,
        user: "",
        isAdmin: false
      },
      panelAddVisit: true,
      addApartmentPanel: false,
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
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  text-align: right;
  color: #7586a0;
  padding: 0.3rem;
  font-size: 14px;
  a {
    color: #fff;
  }
}

.nav-tabs {
  border: 0;
  background: #fff;
  margin: 0;
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
