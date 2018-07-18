<template>
  <div class="overlay deptos-index">
    <div class="container">
      <div class="card">
        <div class="card-header d-flex p-3">
          <h3 class="h4 mb-0 d-flex align-items-center">Listado de departamentos
            <button class="ml-3 btn btn-light btn-sm" @click="addNew">Agregar Nuevo</button>
          </h3>
          <button class="btn btn-link ml-auto" @click="closePanel">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="#FFFFFF" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </button>
        </div>
        <div class="card-body p-0">
          <div class="container-table">
            <div class="top-container px-4 pt-4">
              <input type="text" class="form-control mb-3" v-model="search" placeholder="Buscar persona...">
              <table class="table">
                <thead>
                  <tr>
                    <th style="width: 8%;">Número</th>
                    <th style="width: 14%;">Nombre</th>
                    <th style="width: 9%;">Rut</th>
                    <th style="width: 14%;">Arrendatario</th>
                    <th style="width: 9%;">Teléfono</th>
                    <th style="width: 15%;">Email</th>
                    <th style="width: 7%">Est.</th>
                    <th>Autorizados</th>
                    <th style="width: 220px;" class="text-right">Acciones</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="table-scroll px-4 pb-4">
              <table class="table">

                <tbody>

                  <tr v-for="depto in filteredApartments" :key="depto['.key']">
                    <td style="width: 8%">
                      <div v-if="depto.isEditing">
                        <input id="numberForm" type="text" class="form-control" :value="depto.number">
                      </div>
                      <div v-else>
                        <strong>{{ depto.number }}</strong>
                      </div>
                    </td>
                    <td style="width: 14%;">
                      <div v-if="depto.isEditing">
                        <input id="nameForm" type="text" class="form-control" :value="depto.name">
                      </div>
                      <div v-else>
                        <span>{{ depto.name }}</span>
                      </div>
                    </td>
                    <td style="width: 9%;">
                      <div v-if="depto.isEditing">
                        <input id="rutForm" type="text" class="form-control" :value="depto.rut">
                      </div>
                      <div v-else>
                        {{ depto.rut }}
                      </div>
                    </td>
                    <td style="width: 14%;" class="overflow-text">
                      <div v-if="depto.isEditing">
                        <input id="lesseeForm" type="text" class="form-control" :value="depto.lessee">
                      </div>
                      <div v-else>
                        <span>{{ depto.lessee }}</span>
                      </div>
                    </td>
                    <td style="width: 9%;">
                      <div v-if="depto.isEditing">
                        <input id="phoneForm" type="text" class="form-control" :value="depto.phone">
                      </div>
                      <div v-else>
                        {{ depto.phone }}
                      </div>
                    </td>
                    <td style="width: 15%;" class="overflow-text">
                      <div v-if="depto.isEditing">
                        <input id="emailForm" type="text" class="form-control" :value="depto.email">
                      </div>
                      <div v-else>
                        <span>{{ depto.email }}</span>
                      </div>
                    </td>
                    <td style="width: 7%;">
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
                    <td class="text-right" style="width: 220px;">
                      <div v-if="depto.isEditing">
                        <button class="btn btn-primary" @click="saveEditing(depto)">Guardar</button>
                        <button class="ml-1 btn btn-outline-secondary" @click="depto.isEditing = false">Cancelar</button>
                      </div>
                      <div v-else>
                        <div class="dropdown">
                          <button class="btn btn-link" data-toggle="dropdown">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                              <path fill="#000000" d="M9,4A4,4 0 0,0 5,8A4,4 0 0,0 9,12A4,4 0 0,0 13,8A4,4 0 0,0 9,4M9,14C6.33,14 1,15.33 1,18V20H12.08C12.03,19.67 12,19.34 12,19C12,17.5 12.5,16 13.41,14.8C11.88,14.28 10.18,14 9,14M18,14C17.87,14 17.76,14.09 17.74,14.21L17.55,15.53C17.25,15.66 16.96,15.82 16.7,16L15.46,15.5C15.35,15.5 15.22,15.5 15.15,15.63L14.15,17.36C14.09,17.47 14.11,17.6 14.21,17.68L15.27,18.5C15.25,18.67 15.24,18.83 15.24,19C15.24,19.17 15.25,19.33 15.27,19.5L14.21,20.32C14.12,20.4 14.09,20.53 14.15,20.64L15.15,22.37C15.21,22.5 15.34,22.5 15.46,22.5L16.7,22C16.96,22.18 17.24,22.35 17.55,22.47L17.74,23.79C17.76,23.91 17.86,24 18,24H20C20.11,24 20.22,23.91 20.24,23.79L20.43,22.47C20.73,22.34 21,22.18 21.27,22L22.5,22.5C22.63,22.5 22.76,22.5 22.83,22.37L23.83,20.64C23.89,20.53 23.86,20.4 23.77,20.32L22.7,19.5C22.72,19.33 22.74,19.17 22.74,19C22.74,18.83 22.73,18.67 22.7,18.5L23.76,17.68C23.85,17.6 23.88,17.47 23.82,17.36L22.82,15.63C22.76,15.5 22.63,15.5 22.5,15.5L21.27,16C21,15.82 20.73,15.65 20.42,15.53L20.23,14.21C20.22,14.09 20.11,14 20,14M19,17.5A1.5,1.5 0 0,1 20.5,19A1.5,1.5 0 0,1 19,20.5C18.16,20.5 17.5,19.83 17.5,19A1.5,1.5 0 0,1 19,17.5Z" />
                            </svg>
                          </button>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" @click="depto.isEditing = true" href="#">
                              <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                                <path fill="#999999" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
                              </svg>

                              Editar</a>
                            <a class="dropdown-item text-danger" @click="deleteDepto(depto)" href="#">
                              <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                                <path fill="#dc3545" d="M15,14C17.67,14 23,15.33 23,18V20H7V18C7,15.33 12.33,14 15,14M15,12A4,4 0 0,1 11,8A4,4 0 0,1 15,4A4,4 0 0,1 19,8A4,4 0 0,1 15,12M5,9.59L7.12,7.46L8.54,8.88L6.41,11L8.54,13.12L7.12,14.54L5,12.41L2.88,14.54L1.46,13.12L3.59,11L1.46,8.88L2.88,7.46L5,9.59Z" />
                              </svg>
                              Borrar</a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
      search: ""
    };
  },
  computed: {
    filteredApartments: function() {
      return this.apartments.filter(apartment => {
        return apartment.name.match(this.search);
      });
    }
  },
  methods: {
    closePanel: function() {
      this.$emit("close", false);
    },
    addNew: function() {
      this.$emit("toggle", false);
    },
    deleteDepto: function(depto) {
      let opcion = confirm(
        `Está seguro que desea eliminar el departamento ${depto.number} ?`
      );
      if (opcion == true) {
        apartmentsRef.child(depto[".key"]).remove();
      }
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
      depto.isEditing = false;
    }
  }
};
</script>


<style lang="scss" scoped>
.deptos-index {
  > .container {
    width: 90%;
    max-width: none;
  }
}
.dropdown-item.text-danger {
  &:hover {
    background: #dc3545;
    color: #fff !important;
    path {
      fill: #fff !important;
    }
  }
}

.table th {
  border-top: 0;
}
.container-table {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.card-body {
  position: relative;
}
.table-scroll {
  flex: 1 1 auto;
  overflow: auto;
  font-size: 13px;

  tr:first-child {
    td {
      border-top: 0;
    }
  }
}

.overflow-text {
  position: relative;
  overflow: hidden;
  > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    top: 13px;
    right: 0;
    left: 0;
    span {
      display: inline-block;
      padding: 0.5rem;
    }
  }
  &:hover {
    overflow: visible;
    > div {
      overflow: visible;
      span {
        background: #f4f4f4;
      }
    }
  }
}
td {
  vertical-align: middle;
}
</style>