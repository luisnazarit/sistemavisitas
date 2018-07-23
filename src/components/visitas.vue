<template>
  <div class="container">
    <div class="box-add-visit mb-1 p-5 shadow">
      <h3 class="mb-4">Ingresar visita a depto</h3>
      <div class="row">
        <div class="col-md-2">
          <label for="apartmentNumber">Depto:</label>

          <select id="apartmentNumber" class="form-control form-control-lg d-none" v-model="depto">
            <option disabled :selected="true">Seleccione Depto</option>
            <option v-for="apartment in apartments" :key="apartment['.key']" :value="apartment">{{ apartment.number }}</option>
          </select>

          <multiselect select-label="" class="multiselect-lg" deselect-label="" selected-label="" placeholder="Depto" v-model="depto" :options="deptos" />

        </div>
        <div class="col-md-3">
          <label>Nombre:</label>
          <input :disabled="!depto" class="form-control form-control-lg" type="text" v-model="name" placeholder="Nombre">
        </div>
        <div class="col-md-3">
          <div class="d-flex mb-2">Rut:
            <div class="form-check ml-auto">
              <input class="form-check-input" v-model="noRut" :disabled="!depto" type="checkbox" @change="changeRut">
              <label class="form-check-label" for="defaultCheck1">
                No desea ingresarlo
              </label>
            </div>
          </div>
          <input v-rut:live name="rutname" :disabled="!depto || noRut === true" :class="errors.has('rutname') ? 'error' : ''" class="form-control form-control-lg" type="text" v-model="rut" placeholder="Rut" v-validate="'rut'">
          <small class="text-danger error-form" v-show="errors.has('rutname')">Rut inválido</small>

        </div>

        <div class="col-md-2">
          <div class="form-check check-absolute">
            <input class="form-check-input" :disabled="!depto" type="checkbox" v-model="parkingStatus" @change="parking = ''">
            <label class="form-check-label" for="defaultCheck1">
              ¿ necesita estacionamiento de visitas?
            </label>
          </div>
          <input :disabled="!depto || !parkingStatus" class="form-control form-control-lg" type="text" :value="parking.toUpperCase()" @input="parking = $event.target.value.toUpperCase()" placeholder="Patente">
        </div>

        <div class="col-md-2 d-flex align-items-end">
          <button :disabled="rut === '' || errors.has('rutname')" class="btn btn-primary btn-lg" @click="addVisit">
            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
              <path fill="#FFFFFF" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
            Agregar
          </button>
          <small> </small>
        </div>

      </div>
    </div>
    <transition name="fade">
      <div class="info-visitas" v-if="deptoSelected.number">
        <div class="container shadow">
          <div class="row p-0">
            <div class="col-md-4 p-4 border-right">
              <h3 class="h4">Información del depto</h3>
              <hr />
              <h5>
                <span class="highlight d-inline-flex align-items-center">
                  <svg style="width:18;height:18px" class="mr-2" viewBox="0 0 24 24">
                    <path style="opacity: 0.9" fill="#212529" d="M5,3V21H11V17.5H13V21H19V3H5M7,5H9V7H7V5M11,5H13V7H11V5M15,5H17V7H15V5M7,9H9V11H7V9M11,9H13V11H11V9M15,9H17V11H15V9M7,13H9V15H7V13M11,13H13V15H11V13M15,13H17V15H15V13M7,17H9V19H7V17M15,17H17V19H15V17Z" />
                  </svg>
                  {{ deptoSelected.number }}</span>
              </h5>
              <small class="d-block text-muted mb-3">La información es de la persona que reside en el departamento, puede ser el dueño o arrendatario</small>
              <p class="mb-1">
                <strong>Nombre: </strong>
                <span>{{ deptoSelected.lessee }}</span>
              </p>
              <p class="mb-1">
                <strong>Teléfono: </strong>
                <span v-if="deptoSelected.lesseePhone === ''" class="text-muted">Sin info</span>
                <span v-else>{{ deptoSelected.lesseePhone }}</span>
              </p>
              <p class="mb-1">
                <strong>Email: </strong>
                <span v-if="deptoSelected.lesseeEmail === ''" class="text-muted">Sin info</span>
                <span v-else>{{ deptoSelected.lesseeEmail }}</span>
              </p>
              <p class="mb-0">
                <strong>Estacionamiento: </strong>
                <span v-if="deptoSelected.parking === ''" class="text-muted">No posee estacionamiento</span>
                <span v-else>{{ deptoSelected.parking }}</span>
              </p>
              <div class="people-authorized mt-5 p-3 border" v-if="deptoSelected.authorizedPeople">
                <h4 class="h6 font-weight-bold mb-3">Personas Autorizadas</h4>
                <div class="media mb-2 align-items-center" v-for="aut in deptoSelected.authorizedPeople" :key="aut['.key']">
                  <div class="mr-3">
                    <div v-if="aut.cover !== ''" class="wrapper-img" :style="{backgroundImage: 'url(' + aut.cover + ')'}">

                    </div>
                    <div v-else class="wrapper-img-no-cover">
                      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="#FFFFFF" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                      </svg>
                    </div>
                  </div>
                  <div class="media-body">
                    <strong>{{ aut.name }}</strong>, {{ aut.rut}}
                  </div>
                </div>
              </div>
              <div v-else class="mt-5 p-3 border text-center">
                No hay personas autorizadas para ingresar
              </div>

            </div>
            <div class="col-md-8 p-5">
              <h4 class="mb-3">Visitas en depto {{ deptoSelected.number }}</h4>
              <div v-if="visitFiltered.length === 0">
                Este departamento no registra visitas
              </div>
              <div v-else>
                <transition-group name="fade" class="reverse-order">
                  <div class="well-light mb-1" v-for="visit in visitFiltered" :key="visit['.key']">
                    <div class="mb-0 d-flex">
                      <p class="mb-0 mr-3">
                        <strong>{{ visit.name }} </strong>
                      </p>
                      <span v-if="visit.rut === 'No desea informar'">
                        No desea informar RUT
                      </span>
                      <span v-else>
                        {{ visit.rut | rutFilter }}
                      </span>
                      <span class="ml-3" v-if="visit.parking !== ''">
                        <svg style="width:18;height:18px" viewBox="0 0 24 24" class="mr-1">
                          <path fill="#000000" d="M16,6H6L1,12V15H3A3,3 0 0,0 6,18A3,3 0 0,0 9,15H15A3,3 0 0,0 18,18A3,3 0 0,0 21,15H23V12C23,10.89 22.11,10 21,10H19L16,6M6.5,7.5H10.5V10H4.5L6.5,7.5M12,7.5H15.5L17.46,10H12V7.5M6,13.5A1.5,1.5 0 0,1 7.5,15A1.5,1.5 0 0,1 6,16.5A1.5,1.5 0 0,1 4.5,15A1.5,1.5 0 0,1 6,13.5M18,13.5A1.5,1.5 0 0,1 19.5,15A1.5,1.5 0 0,1 18,16.5A1.5,1.5 0 0,1 16.5,15A1.5,1.5 0 0,1 18,13.5Z" />
                        </svg>
                        {{ visit.parking }}</span>

                      <span class="text-muted ml-auto">{{ visit.date }}</span>

                    </div>
                  </div>
                </transition-group>
              </div>

            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { db, auth } from "../components/configFirebase";
import { Validator } from "vee-validate";
import { rutValidator } from "vue-dni";
import Multiselect from "vue-multiselect";
import moment from "moment";

let apartmentsRef = db.ref("apartments");
let visitsRef = db.ref("visits");

export default {
  name: "visitas",
  components: {
    Multiselect
  },
  firebase: {
    apartments: apartmentsRef.orderByChild("number"),
    visits: visitsRef
  },
  data() {
    return {
      name: "",
      rut: "",
      noRut: false,
      depto: "",
      as: [],
      deptoPanel: "",
      parking: "",
      parkingStatus: false
    };
  },
  computed: {
    deptos: function() {
      this.apartments.forEach(i => {
        this.as.push(i.number);
      });
      return this.as;
    },
    deptoSelected: function() {
      let b = {};
      this.apartments.forEach(i => {
        if (this.depto === i.number) {
          b = i;
        }
      });
      return b;
    },
    visitFiltered: function() {
      var a = [];
      this.visits.forEach(child => {
        if (child.apartment === this.deptoSelected.number) {
          a.push(child);
        }
      });
      return a;
    }
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
    changeRut: function() {
      if (this.noRut === false) {
        this.rut = "";
      } else {
        this.rut = "No desea informar";
      }
    },
    addVisit: function() {
      const newdate = new Date().toDateString();
      const hour = new Date();

      visitsRef.push(
        {
          apartment: this.deptoSelected.number,
          name: this.name,
          rut: this.rut,
          parking: this.parking,
          date: newdate
        },
        error => {
          if (error) {
            this.addNotification(
              "Error",
              "No se pudo agregar la visita",
              "error"
            );
          } else {
            this.addNotification(
              "Ingreso exitoso",
              "Se agregó la visita correctamente",
              "success"
            );
          }
        }
      );

      this.name = "";
      this.rut = "";
      this.parkingStatus = false;
      this.parking = "";
    }
  },
  mounted() {
    //console.log(this.apartments);
  },
  created() {
    Validator.extend("rut", rutValidator);
  }
};
</script>


<style lang="scss" scoped>
.box-add-visit {
  background: #fff;
  position: relative;
  z-index: 8;
}

.info-visitas {
  .container {
    background: #fff;
    position: relative;
    border-radius: 0 0 0.5rem 0.5rem;
  }
}
.error-form {
  position: absolute;
  bottom: -23px;
}

.reverse-order {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column-reverse;
}

.check-absolute {
  width: 300px;
  margin-bottom: 8px;
}

.wrapper-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
}

.wrapper-img-no-cover {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
