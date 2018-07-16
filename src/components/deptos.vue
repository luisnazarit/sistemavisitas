<template>
  <div class="add-apartment">
    <div class="app-apartment-inner">
      <div class="header d-flex p-3 border-bottom mb-3">
        <h3 class="h4 mb-0">Agregar Departamento</h3>
        <div class="close-modal ml-auto">
          <button @click="closePanel" class="btn btn-link">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </button>
        </div>
      </div>

      <div class="p-4 body-form">
        <div class="form-group row">
          <label class="col-sm-3 col-form-label" for="apartment-number">Apartment Number</label>
          <div class="col-md-9">
            <input class="form-control" type="text" v-model="newApartment.number" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label" for="apartment-name">Owner Name</label>
          <div class="col-md-9">
            <input class="form-control" id="apartment-name" type="text" v-model="newApartment.name" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label" for="apartment-parking">Parking Number</label>
          <div class="col-md-9">
            <input class="form-control" id="apartmetn-parking" type="text" v-model="newApartment.parking" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label" for="apartment-lesse">Lesse Name</label>
          <div class="col-md-9">
            <input class="form-control" id="apartment-lesse" type="text" v-model="newApartment.lessee" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label" for="apartment-rut">Rut</label>
          <div class="col-md-9">
            <input class="form-control" id="apartment-rut" type="text" v-model="newApartment.rut" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label" for="apartment-mail">Email</label>
          <div class="col-md-9">
            <input class="form-control" id="apartment-mail" type="mail" v-model="newApartment.email" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label" for="apartment-phone">Phone</label>
          <div class="col-md-9">
            <input class="form-control" id="apartment-phone" type="text" v-model="newApartment.phone" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label" for="apartment-password">Password</label>
          <div class="col-md-9">
            <input class="form-control" id="apartment-password" type="password" v-model="newApartment.password" />
          </div>
        </div>

      </div>

      <div class="actions p-4 d-flex justify-content-end">
        <button class="btn btn-outline-secondary" @click="closePanel">Cancelar</button>
        <button class="ml-3 btn btn-primary" @click.prevent="addApartment">Agregar</button>
      </div>

    </div>
  </div>
</template>

<script>
import { db } from "../components/configFirebase";
let apartmentsRef = db.ref("apartments");

export default {
  name: "deptos",
  firebase: {
    apartments: apartmentsRef
  },
  data() {
    return {
      newApartment: {
        isEditing: false,
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
      }
    };
  },
  methods: {
    addNotification: function(title, msg) {
      this.$notify({
        group: "foo",
        title: title,
        text: msg
      });
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
      this.addNotification(
        "Departamento Agregado",
        "Departamento agregado exitosamente"
      );
    },
    closePanel: function() {
      this.$emit("close", false);
    }
  }
};
</script>


<style lang="scss" scoped>
.add-apartment {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  background: rgba(0, 0, 0, 0.7);

  .app-apartment-inner {
    background: #fff;
    width: 600px;
    height: 80vh;
    display: flex;
    flex-direction: column;

    .body-form {
      overflow: auto;
      flex: 1;
    }
  }
}
</style>