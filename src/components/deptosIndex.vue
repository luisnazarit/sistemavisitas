<template>
  <div class="overlay deptos-index">
    <div class="container">
      <div v-if="panel === 'main'">
        <div class="card">
          <div class="card-header d-flex p-3">
            <h3 class="h4 mb-0 d-flex align-items-center">Listado de departamentos
              <button class="ml-3 btn btn-light btn-sm" @click="addNew">
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path fill="#000000" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg> Agregar Nuevo</button>
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
                      <th style="width: 18%;">Informacion depto</th>
                      <th style="width: 23%;">Dueño</th>
                      <th style="width: 23%;">Arrendatario</th>
                      <th>Autorizados</th>
                      <th style="width: 180px;" class="text-right">Acciones</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="table-scroll px-4 pb-4">
                <table class="table">

                  <tbody>

                    <tr v-for="depto in filteredApartments" :key="depto['.key']">
                      <td style="width: 18%">
                        <div v-if="depto.isEditing">
                          <label>Número</label>
                          <input id="numberForm" type="text" class="form-control mb-1" :value="depto.number">
                          <label>Estacionamiento</label>
                          <input id="parkingForm" type="text" class="form-control mb-1" :value="depto.parking">
                          <label>Bodega</label>
                          <input id="cellarForm" type="text" class="form-control mb-0" :value="depto.cellar">
                        </div>
                        <div v-else>
                          <h6 class="mb-1">
                            <strong>{{ depto.number }}</strong>
                          </h6>
                          <p class="mb-1">
                            <strong>Estacionamiento:</strong>
                            <span v-if="depto.parking !== ''" class="ml-2">{{ depto.parking }}</span>
                            <span v-else class="ml-2 text-muted">No posee</span>
                          </p>
                          <p class="mb-0">
                            <strong>Bodega:</strong>
                            <span v-if="depto.cellar !== ''" class="ml-2">{{ depto.cellar }}</span>
                            <span v-else class="text-muted ml-2">No posee</span>
                          </p>
                        </div>
                      </td>

                      <td style="width: 23%">
                        <div v-if="depto.isEditing">
                          <label>Dueño:</label>
                          <input id="nameForm" type="text" class="form-control mb-1" :value="depto.name">
                          <label>Rut:</label>
                          <input id="rutForm" type="text" class="form-control mb-1" :value="depto.rut">
                          <label>Email</label>
                          <input id="emailForm" type="text" class="form-control mb-1" :value="depto.email">
                          <label>Fono</label>
                          <input id="phoneForm" type="text" class="form-control mb-0" :value="depto.phone">
                        </div>
                        <div v-else class="info-table">
                          <p class="mb-1">
                            <strong>Nombre:</strong>
                            <span>{{ depto.name }}</span>
                          </p>
                          <p class="mb-1">
                            <strong>Rut:</strong>
                            <span>{{ depto.rut }}</span>
                          </p>
                          <p class="mb-0">
                            <strong>Email:</strong>
                            <span>{{ depto.email }}</span>
                          </p>
                          <p class="mb-0">
                            <strong>Fono:</strong>
                            <span>{{ depto.phone }}</span>
                          </p>
                        </div>
                      </td>

                      <td style="width: 23%">
                        <div v-if="depto.isEditing">
                          <label>Nombre:</label>
                          <input id="lesseeForm" type="text" class="form-control mb-1" :value="depto.lessee">
                          <label>Rut:</label>
                          <input id="lesseeRutForm" type="text" class="form-control mb-1" :value="depto.lesseeRut">
                          <label>Email</label>
                          <input id="lesseeEmailForm" type="text" class="form-control mb-1" :value="depto.lesseeEmail">
                          <label>Fono</label>
                          <input id="lesseePhoneForm" type="text" class="form-control mb-0" :value="depto.lesseePhone">
                        </div>
                        <div v-else class="info-table">
                          <p class="mb-1">
                            <strong>Nombre:</strong>
                            <span>{{ depto.lessee }}</span>
                          </p>
                          <p class="mb-1">
                            <strong>Rut:</strong>
                            <span>{{ depto.lesseeRut }}</span>
                          </p>
                          <p class="mb-0">
                            <strong>Email:</strong>
                            <span>{{ depto.lesseeEmail }}</span>
                          </p>
                          <p class="mb-0">
                            <strong>Fono:</strong>
                            <span>{{ depto.lesseePhone }}</span>
                          </p>
                        </div>
                      </td>
                      <td class="width: 23%">
                        <div v-for="i in depto.authorizedPeople" :key="i['.key']">
                          <div class="row">
                            <div class="col-md-6">{{ i.name }}</div>
                            <div class="col-md-6">{{ i.rut }}</div>
                          </div>
                        </div>
                        <div v-if="depto.isEditing">
                          <button class="btn btn-outline-secondary mt-3">
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                              <path fill="#666666" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
                            </svg>
                            <span class="ml-1" @click="authorizedPanel(depto)">Editar lista</span>
                          </button>
                        </div>
                      </td>

                      <td class="text-right" style="width: 180px;">
                        <div v-if="depto.isEditing">
                          <button class="btn btn-primary mb-1" @click="saveEditing(depto)">
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24" class="mr-1">
                              <path fill="#FFFFFF" d="M15,5V9H5V19H9.35C8.5,18.27 8,17.19 8,16A4,4 0 0,1 12,12A4,4 0 0,1 16,16C16,17.19 15.5,18.27 14.65,19H19V7.83L16.17,5H15M5,7H13V5H5V7M17,3L21,7V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H17M12,14A2,2 0 0,0 10,16A2,2 0 0,0 12,18A2,2 0 0,0 14,16A2,2 0 0,0 12,14Z" />
                            </svg>
                            Guardar</button>
                          <button class="ml-1 btn btn-outline-secondary" @click="depto.isEditing = false">
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                              <path fill="#666666" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z" />
                            </svg>
                            Cancelar</button>
                        </div>
                        <div v-else>
                          <div class="dropdown">
                            <button class="btn btn-link" data-toggle="dropdown">
                              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="#3982e4" d="M9,4A4,4 0 0,0 5,8A4,4 0 0,0 9,12A4,4 0 0,0 13,8A4,4 0 0,0 9,4M9,14C6.33,14 1,15.33 1,18V20H12.08C12.03,19.67 12,19.34 12,19C12,17.5 12.5,16 13.41,14.8C11.88,14.28 10.18,14 9,14M18,14C17.87,14 17.76,14.09 17.74,14.21L17.55,15.53C17.25,15.66 16.96,15.82 16.7,16L15.46,15.5C15.35,15.5 15.22,15.5 15.15,15.63L14.15,17.36C14.09,17.47 14.11,17.6 14.21,17.68L15.27,18.5C15.25,18.67 15.24,18.83 15.24,19C15.24,19.17 15.25,19.33 15.27,19.5L14.21,20.32C14.12,20.4 14.09,20.53 14.15,20.64L15.15,22.37C15.21,22.5 15.34,22.5 15.46,22.5L16.7,22C16.96,22.18 17.24,22.35 17.55,22.47L17.74,23.79C17.76,23.91 17.86,24 18,24H20C20.11,24 20.22,23.91 20.24,23.79L20.43,22.47C20.73,22.34 21,22.18 21.27,22L22.5,22.5C22.63,22.5 22.76,22.5 22.83,22.37L23.83,20.64C23.89,20.53 23.86,20.4 23.77,20.32L22.7,19.5C22.72,19.33 22.74,19.17 22.74,19C22.74,18.83 22.73,18.67 22.7,18.5L23.76,17.68C23.85,17.6 23.88,17.47 23.82,17.36L22.82,15.63C22.76,15.5 22.63,15.5 22.5,15.5L21.27,16C21,15.82 20.73,15.65 20.42,15.53L20.23,14.21C20.22,14.09 20.11,14 20,14M19,17.5A1.5,1.5 0 0,1 20.5,19A1.5,1.5 0 0,1 19,20.5C18.16,20.5 17.5,19.83 17.5,19A1.5,1.5 0 0,1 19,17.5Z" />
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

      <div v-if="panel === 'addapartment'">
        <deptos @back="backPanel($event)" @close="closePanel($event)" />
      </div>

      <div v-if="panel === 'authorized'">
        <authorized @back="backPanel($event)" @close="closePanel($event)" :datadepto="dataDepto" />
      </div>

    </div>
  </div>
</template>

<script>
import { db } from "../components/configFirebase";
import deptos from "../components/deptos";
import authorized from "../components/authorized";
let apartmentsRef = db.ref("apartments");

export default {
  name: "deptosIndex",
  components: {
    deptos,
    authorized
  },
  firebase: {
    apartments: apartmentsRef.orderByChild("number")
  },
  data() {
    return {
      search: "",
      panel: "main",
      dataDepto: ""
    };
  },
  computed: {
    filteredApartments: function() {
      return this.apartments.filter(apartment => {
        return apartment.lessee.match(this.search);
      });
    }
  },
  methods: {
    closePanel: function() {
      this.$emit("close", false);
    },
    addNew: function() {
      this.panel = "addapartment";
    },
    authorizedPanel: function(dep) {
      this.panel = "authorized";
      this.dataDepto = dep;
    },
    backPanel: function() {
      this.panel = "main";
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
      let updateParking = document.getElementById("parkingForm").value;
      let updateCellar = document.getElementById("cellarForm").value;
      let updateName = document.getElementById("nameForm").value;
      let updateRut = document.getElementById("rutForm").value;
      let updatePhone = document.getElementById("phoneForm").value;
      let updateEmail = document.getElementById("emailForm").value;
      let updateLessee = document.getElementById("lesseeForm").value;
      let updateLesseeRut = document.getElementById("lesseeRutForm").value;
      let updateLesseeEmail = document.getElementById("lesseeEmailForm").value;
      let updateLesseePhone = document.getElementById("lesseePhoneForm").value;

      let update = {
        number: updateNumber,
        parking: updateParking,
        cellar: updateCellar,
        name: updateName,
        rut: updateRut,
        phone: updatePhone,
        email: updateEmail,
        lessee: updateLessee,
        lesseeRut: updateLesseeRut,
        lesseeEmail: updateLesseeEmail,
        lesseePhone: updateLesseePhone
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

.info-table > p {
  display: flex;
  strong {
    text-align: right;
    width: 60px;
  }
  span {
    margin-left: 1rem;
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
  vertical-align: top;
}
</style>