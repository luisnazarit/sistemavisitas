<template>
  <div class="deptos-index">
    <div class="container">
      <div class="header d-flex p-3">
        <h3 class="h4 mb-0 d-flex align-items-center">Listado de departamentos
          <button class="ml-3 btn btn-light btn-sm" @click="addNew">Agregar Nuevo</button>
        </h3>
        <button class="btn btn-link ml-auto" @click="closePanel">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#FFFFFF" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </button>
      </div>
      <div class="container-table p-5">

        <table class="table">
          <thead>
            <tr>
              <th>Número</th>
              <th>Nombre</th>
              <th>Rut</th>
              <th>Arrendatario</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Estacionamiento</th>
              <th>Autorizados</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="depto in apartments" :key="depto['.key']">
              <td>
                <div v-if="depto.isEditing">
                  <input id="numberForm" type="text" class="form-control" :value="depto.number">
                </div>
                <div v-else>
                  <strong>{{ depto.number }}</strong>
                </div>
              </td>
              <td>
                <div v-if="depto.isEditing">
                  <input id="nameForm" type="text" class="form-control" :value="depto.name">
                </div>
                <div v-else>
                  {{ depto.name }}
                </div>
              </td>
              <td>
                <div v-if="depto.isEditing">
                  <input id="rutForm" type="text" class="form-control" :value="depto.rut">
                </div>
                <div v-else>
                  {{ depto.rut }}
                </div>
              </td>
              <td>
                <div v-if="depto.isEditing">
                  <input id="lesseeForm" type="text" class="form-control" :value="depto.lessee">
                </div>
                <div v-else>
                  {{ depto.lessee }}
                </div>
              </td>
              <td>
                <div v-if="depto.isEditing">
                  <input id="phoneForm" type="text" class="form-control" :value="depto.phone">
                </div>
                <div v-else>
                  {{ depto.phone }}
                </div>
              </td>
              <td>
                <div v-if="depto.isEditing">
                  <input id="emailForm" type="text" class="form-control" :value="depto.email">
                </div>
                <div v-else>
                  {{ depto.email }}
                </div>
              </td>
              <td>
                <div v-if="depto.isEditing">
                  <input id="parkingForm" type="text" class="form-control" :value="depto.parking">
                </div>
                <div v-else>
                  {{ depto.parking }}
                </div>
              </td>
              <td>
                {{ depto.authorized }}
              </td>
              <td>
                <div v-if="depto.isEditing">
                  <button class="btn btn-primary" @click="saveEditing(depto)">Guardar</button>
                  <button class="btn btn-secondary" @click="depto.isEditing = false">Cancelar</button>
                </div>
                <div v-else>
                  <button class="btn btn-secondary" @click="depto.isEditing = true">Editar</button>
                  <button class="ml-1 btn btn-secondary" @click="deleteDepto(depto)">Borrar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../components/configFirebase";
let apartmentsRef = db.ref("apartments");

export default {
  name: "deptosIndex",
  firebase: {
    apartments: apartmentsRef
  },
  data() {
    return {
      hola: ""
    };
  },
  methods: {
    closePanel: function() {
      this.$emit("close", false);
    },
    addNew: function() {
      this.$emit("toggle", false);
    },
    deleteDepto: function(depto) {
      apartmentsRef.child(depto[".key"]).remove();
    },
    saveEditing: function(depto) {
      let updateNumber = document.getElementById("numberForm").value;
      let updateName = document.getElementById("nameForm").value;
      let updateRut = document.getElementById("rutForm").value;
      let updatePhone = document.getElementById("phoneForm").value;
      let updateEmail = document.getElementById("emailForm").value;
      let updateLessee = document.getElementById("lesseeForm").value;
      let updateParking = document.getElementById("parkingForm").value;

      let update = {
        number: updateNumber,
        name: updateName,
        rut: updateRut,
        parking: updateParking,
        lessee: updateLessee,
        phone: updatePhone,
        email: updateEmail
      };

      apartmentsRef.child(depto[".key"]).update(update);
    }
  }
};
</script>


<style lang="scss" scoped>
.deptos-index {
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

  .header {
    background: #3074e2;
    color: #fff;
  }

  .container-table {
    background: #fff;
    height: 80vh;
  }
}
</style>