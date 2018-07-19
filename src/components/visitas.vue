<template>
  <div class="container">
    <div class="box-add-visit mb-1 p-5 shadow">
      <h3 class="mb-4">Ingresar visita a depto</h3>
      <div class="row">
        <div class="col-md-3">
          <label for="apartmentNumber">Depto:</label>

          <select id="apartmentNumber" class="form-control form-control-lg d-none" v-model="depto">
            <option disabled :selected="true">Seleccione Depto</option>
            <option v-for="apartment in apartments" :key="apartment['.key']" :value="apartment">{{ apartment.number }}</option>
          </select>

          <multiselect select-label="" class="multiselect-lg" deselect-label="" selected-label="" placeholder="Depto" v-model="depto" :options="deptos" />

        </div>
        <div class="col-md-4">
          <label>Nombre:</label>
          <input :disabled="!depto" class="form-control form-control-lg" type="text" v-model="name" placeholder="Nombre">
        </div>
        <div class="col-md-3">
          <label>Rut:</label>
          <input v-rut:live name="rutname" :disabled="!depto" :class="errors.has('rutname') ? 'error' : ''" class="form-control form-control-lg" type="text" v-model="rut" placeholder="Rut" v-validate="'rut'">
          <small class="text-danger error-form" v-show="errors.has('rutname')">Rut inválido</small>

        </div>

        <div class="col-md-2 d-flex align-items-end">
          <button :disabled="rut === '' || errors.has('rutname')" class="btn btn-primary btn-lg" @click="addVisit">
            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
              <path fill="#FFFFFF" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
            Agregar
          </button>
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
                <span v-if="deptoSelected.parking === ''" class="text-muted">Sin estacionamiento</span>
                <span v-else>{{ deptoSelected.parking }}</span>
              </p>

              <autorized :info="deptoSelected.autorized" />

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
                      <span> {{ visit.rut | rutFilter }}</span>
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
import autorized from "../components/autorized";
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
    autorized: autorized,
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
      depto: "",
      as: [],
      deptoPanel: ""
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
    addVisit: function() {
      const newdate = new Date().toDateString();
      const hour = new Date();

      visitsRef.push(
        {
          apartment: this.deptoSelected.number,
          name: this.name,
          rut: this.rut,
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
</style>
