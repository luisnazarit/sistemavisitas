<template>
  <div id="app">

    <div class="d-none">
      <form @submit.prevent="addUser">
        <input type="text" v-model="newUser.name" />
        <input type="mail" v-model="newUser.email" />
        <button>Add</button>
      </form>

      <h3>Listado de admins</h3>
      <ul>
        <li v-for="user in users" :key="user['.key']">
          {{ user.name }}
        </li>
      </ul>
    </div>

    <button class="btn btn-secondary" @click="addApartmentPanel = true">Agregar Depto</button>

    <div class="add-apartment" v-if="addApartmentPanel">
      <div class="app-apartment-inner p-4">
        <div class="close">
          <button @click="addApartmentPanel = false">cerrar</button>
        </div>

        <form @submit.prevent="addApartment">
          <div>
            <label for="apartment-number">Apartment Number</label>
            <input type="text" v-model="newApartment.number" />
          </div>
          <div class="form-group">
            <label for="apartment-name">Owner Name</label>
            <input id="apartment-name" type="text" v-model="newApartment.name" />
          </div>
          <div class="form-group">
            <label for="apartment-parking">Parking Number</label>
            <input id="apartmetn-parking" type="text" v-model="newApartment.parking" />
          </div>
          <div class="form-group">
            <label for="apartment-lesse">Lesse Name</label>
            <input id="apartment-lesse" type="text" v-model="newApartment.lessee" />
          </div>
          <div class="form-group">
            <label for="apartment-rut">Rut</label>
            <input id="apartment-rut" type="text" v-model="newApartment.rut" />
          </div>
          <div class="form-group">
            <label for="apartment-mail">Email</label>
            <input id="apartment-mail" type="mail" v-model="newApartment.email" />
          </div>
          <div class="form-group">
            <label for="apartment-phone">Phone</label>
            <input id="apartment-phone" type="text" v-model="newApartment.phone" />
          </div>
          <div class="form-group">
            <label for="apartment-password">Password</label>
            <input id="apartment-password" type="password" v-model="newApartment.password" />
          </div>

          <button class="btn btn-primary">Add</button>
        </form>
      </div>
    </div>

    <div class="container">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a href="#" @click="panelAddVisit = true" class="nav-link" :class="panelAddVisit ? 'active':''">Ingresar visitas</a>
        </li>
        <li class="nav-item">
          <a href="#" @click="panelAddVisit = false" class="nav-link" :class="panelAddVisit ? '':'active'">Historial</a>
        </li>
      </ul>
    </div>
    <visitas />

  </div>
</template>

<script>
import { db } from "./components/configFirebase";
import visitas from "./components/visitas";
let usersRef = db.ref("users");
let apartmentsRef = db.ref("apartments");

export default {
  name: "app",
  firebase: {
    users: usersRef,
    apartments: apartmentsRef
  },
  components: {
    visitas: visitas
  },
  data() {
    return {
      panelAddVisit: true,
      addApartmentPanel: false,
      newApartment: {
        number: "",
        name: "",
        rut: "",
        lessee: "",
        parking: "",
        email: "",
        phone: "",
        password: "",
        visits: "",
        peopleAuthorized: ""
      },
      newUser: {
        name: "",
        email: ""
      },
      depto: "",
      deptoKey: "",
      deptos: []
    };
  },
  methods: {
    addUser: function() {
      usersRef.push(this.newUser);
      this.newUser.name = "";
      this.newUser.email = "";
    },
    deleteUser: function(user) {
      usersRef.child(user["key"]).remove();
    },
    addApartment: function() {
      apartmentsRef.push(this.newApartment);
      (this.newApartment.number = ""),
        (this.newApartment.name = ""),
        (this.newApartment.rut = ""),
        (this.newApartment.lessee = ""),
        (this.newApartment.parking = ""),
        (this.newApartment.email = ""),
        (this.newApartment.phone = ""),
        (this.newApartment.password = ""),
        (this.addApartmentPanel = false);
    }
  },
  watch: {}
};
</script>

