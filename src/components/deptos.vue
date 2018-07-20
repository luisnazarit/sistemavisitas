<template>

  <div class="card">
    <div class="card-header d-flex p-3">
      <h3 class="h4 mb-0">
        <strong class="back" @click="back">
          <svg style="width:18px;height:18px" viewBox="0 0 24 24">
            <path fill="#FFFFFF" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg> Volver</strong> Agregar Departamento</h3>
      <button class="btn btn-link ml-auto" @click="closePanel">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="#FFFFFF" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
      </button>
    </div>

    <div class="card-body p-5 body-form">
      <h6 class="mb-3">
        <strong>Información del Departamento</strong>
      </h6>

      <div class="row">

        <div class="form-group col">
          <label for="apartment-number">Número Departamento</label>
          <div class="  ">
            <input class="form-control" type="text" v-model="newApartment.number" />
          </div>
        </div>
        <div class="form-group col">
          <label for="apartment-parking">Número Estacionamiento</label>
          <div class="  ">
            <input class="form-control" id="apartmetn-parking" type="text" v-model="newApartment.parking" />
            <small class="form-text text-muted">Dejar vacío si no tiene</small>
          </div>
        </div>
        <div class="form-group col">
          <label for="apartment-number">Número Bodega</label>
          <div class="  ">
            <input class="form-control" type="text" v-model="newApartment.cellar" />
            <small class="form-text text-muted">Dejar vacío si no tiene</small>
          </div>
        </div>

      </div>

      <h6 class="mb-3">
        <strong>Información del dueño</strong>
      </h6>

      <div class="row">

        <div class="form-group col">
          <label for="apartment-name">Nombre Dueño</label>
          <div class="  ">
            <input class="form-control" id="apartment-name" type="text" v-model="newApartment.name" />
          </div>
        </div>

        <div class="form-group col">
          <label for="apartment-rut">Rut</label>
          <div class="  ">
            <input class="form-control" id="apartment-rut" type="text" v-model="newApartment.rut" />
          </div>
        </div>

        <div class="form-group col">
          <label for="apartment-mail">Email</label>
          <div class="  ">
            <input class="form-control" id="apartment-mail" type="mail" v-model="newApartment.email" />
          </div>
        </div>

        <div class="form-group col">
          <label for="apartment-phone">Teléfono</label>
          <div class="  ">
            <input class="form-control" id="apartment-phone" type="text" v-model="newApartment.phone" />
          </div>
        </div>

      </div>

      <h6 class="mt-3 mb-0">
        <strong>Información del Arrendatario</strong>
      </h6>

      <div class="py-2">
        <div class="form-group form-check">
          <input @change="copyData" v-model="isSame" type="checkbox" class="form-check-input" id="sameInfo">
          <label class="form-check-label" for="sameInfo">Si no existe arrendatario, marcar esta casilla</label>
        </div>
      </div>

      <div class="row" id="lessee">

        <div class="form-group col mb-0">
          <label for="apartment-name">Nombre Arrendatario</label>
          <div class="  ">
            <input class="form-control" :disabled="disabledAttr" id="apartment-lessee" type="text" v-model="newApartment.lessee" />
          </div>
        </div>

        <div class="form-group col mb-0">
          <label for="apartment-lesserut">Rut</label>
          <div class="  ">
            <input class="form-control" :disabled="disabledAttr" id="apartment-lesserut" type="text" v-model="newApartment.lesseeRut" />
          </div>
        </div>

        <div class="form-group col mb-0">
          <label for="apartment-mail">Email</label>
          <div class="  ">
            <input class="form-control" :disabled="disabledAttr" id="apartment-mail" type="mail" v-model="newApartment.lesseeEmail" />
          </div>
        </div>

        <div class="form-group col mb-0">
          <label for="apartment-phone">Teléfono</label>
          <div class="  ">
            <input class="form-control" :disabled="disabledAttr" id="apartment-phone" type="text" v-model="newApartment.lesseePhone" />
          </div>
        </div>

      </div>

    </div>

    <div class="card-footer p-4 d-flex justify-content-end">
      <button class="btn btn-outline-secondary" @click="back">Cancelar</button>
      <button class="ml-3 btn btn-primary" @click.prevent="addApartment">Agregar</button>
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
        parking: "",
        cellar: "",
        name: "",
        rut: "",
        email: "",
        phone: "",
        lessee: "",
        lesseeRut: "",
        lesseeEmail: "",
        lesseePhone: "",
        peopleAuthorized: []
      },
      isSame: false,
      disabledAttr: false
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
    copyData: function() {
      if (this.isSame) {
        this.disabledAttr = true;
        this.newApartment.lessee = this.newApartment.name;
        this.newApartment.lesseeRut = this.newApartment.rut;
        this.newApartment.lesseeEmail = this.newApartment.email;
        this.newApartment.lesseePhone = this.newApartment.phone;
      } else {
        this.disabledAttr = false;
        this.newApartment.lessee = "";
        this.newApartment.lesseeRut = "";
        this.newApartment.lesseeEmail = "";
        this.newApartment.lesseePhone = "";
      }
    },
    addApartment: function() {
      apartmentsRef.push(this.newApartment);
      (this.newApartment.number = ""),
        (this.newApartment.parking = ""),
        (this.newApartment.cellar = ""),
        (this.newApartment.name = ""),
        (this.newApartment.rut = ""),
        (this.newApartment.email = ""),
        (this.newApartment.phone = ""),
        (this.newApartment.lessee = ""),
        (this.newApartment.lesseeRut = ""),
        (this.newApartment.lesseeEmail = ""),
        (this.newApartment.lesseePhone = ""),
        this.addNotification(
          "Departamento Agregado",
          "Departamento agregado exitosamente"
        );
      this.isSame = false;
      this.disabledAttr = false;
    },
    closePanel: function() {
      this.$emit("close", false);
    },
    back: function() {
      this.$emit("back", false);
    }
  },
  mounted() {
    this.copyData;
  }
};
</script>

<style lang="scss" scoped>
strong.back {
  font-size: 16px;
  background: rgba(0, 0, 0, 0.1);
  display: inline-block;
  padding: 25px;
  border-radius: 4px 0 0 0;
  margin: -16px;
  margin-right: 1rem;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>
