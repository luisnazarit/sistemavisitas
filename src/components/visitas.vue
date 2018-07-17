<template>
  <div class="container">
    <div class="box-add-visit mb-1 p-5 shadow">
      <h3 class="mb-4">Ingresar visita a depto</h3>
      <div class="row">
        <div class="col-md-2">
          <label for="apartmentNumber">Depto:</label>
          <select id="apartmentNumber" class="form-control form-control-lg" v-model="depto">
            <option disabled :selected="true">Seleccione Depto</option>
            <option v-for="apartment in apartments" :key="apartment['.key']" :value="apartment">{{ apartment.number }}</option>
          </select>

        </div>
        <div class="col-md-4">
          <label>Nombre:</label>
          <input :disabled="!depto" class="form-control form-control-lg" type="text" v-model="name" placeholder="Nombre">
        </div>
        <div class="col-md-4">
          <label>Rut:</label>
          <input v-rut @keyup="validaterut" :disabled="!depto" :class="classRut ? '' : 'error'" class="form-control form-control-lg" type="text" v-model="rut" placeholder="Rut">
          <small class="text-danger error-form" v-if="classRut === false">Rut inválido</small>
        </div>

        <div class="col-md-2 d-flex align-items-end">
          <button :disabled="validateForm" class="btn btn-primary btn-lg" @click="addVisit">
            <svg style="width:18px;height:18px" viewBox="0 0 24 24">
              <path fill="#FFFFFF" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
            Agregar
          </button>
        </div>

      </div>
    </div>
    <transition name="fade">
      <div class="info-visitas" v-if="depto.number">
        <div class="container shadow">
          <div class="row p-0">
            <div class="col-md-4 p-4 border-right">
              <h3 class="h4">Información del depto</h3>
              <hr />
              <h5>{{ depto.number }}</h5>
              <p class="mb-0">
                <strong>Dueño:</strong> {{ depto.name }}</p>
              <p class="mb-0">
                <strong>Teléfono:</strong> {{ depto.phone }}</p>
              <p class="mb-0">
                <strong>Estacionamiento:</strong> {{ depto.parking }}</p>

              <autorized :info="depto.autorized" />

            </div>
            <div class="col-md-8 p-5">
              <h4 class="mb-3">Visitas en depto {{ depto.number }}</h4>
              <div v-if="visitFiltered.length === 0">
                Este departamento no registra visitas
              </div>
              <div v-else>
                <transition-group name="fade">
                  <div class="well-light mb-1" v-for="visit in visitFiltered" :key="visit['.key']">
                    <div class="mb-0 d-flex">
                      <p class="mb-0 mr-3">
                        <strong>{{ visit.name }} </strong>
                      </p>
                      <span> {{ visit.rut | rut }}</span>
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
import _ from "lodash";

let apartmentsRef = db.ref("apartments");
let visitsRef = db.ref("visits");

export default {
  name: "visitas",
  components: {
    autorized: autorized
  },
  firebase: {
    apartments: apartmentsRef.orderByChild("number"),
    visits: visitsRef
  },
  data() {
    return {
      name: "",
      depto: "",
      rut: "",
      classRut: true
    };
  },
  computed: {
    deptos: function() {
      let a = [];
      this.apartments.forEach(i => {
        a.push(i.number);
      });
      return a;
    },
    visitFiltered: function() {
      var a = [];
      this.visits.forEach(child => {
        if (child.apartment === this.depto.number) {
          a.push(child);
        }
      });
      return a;
    },
    validateForm: function() {
      if (this.name !== "" && this.rut !== null) {
        return false;
      } else {
        return true;
      }
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
      const newdate = new Date().toString();

      visitsRef.push(
        {
          apartment: this.depto.number,
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
    },
    validaterut: _.debounce(function() {
      if (this.rut === null) {
        this.classRut = false;
      } else {
        this.classRut = true;
      }
    }, 1500)
  },
  mounted() {
    //console.log(this.apartments);
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
    z-index: 9;
  }
}
.error-form {
  position: absolute;
  bottom: -23px;
}
</style>
