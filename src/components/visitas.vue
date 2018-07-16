<template>
    <div>
        <div class="box-add-visit container mb-1 p-5 shadow">
            <h3 class="mb-4">Ingresar visita a depto</h3>
            <div class="row">
                <div class="col-md-2">
                    <label for="apartmentNumber">Depto:</label>
                    <select id="apartmentNumber" class="form-control" v-model="depto">
                        <option disabled :selected="true">Seleccione Depto</option>
                        <option v-for="apartment in apartments" :key="apartment['.key']" :value="apartment">{{ apartment.number }}</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label>Nombre:</label>
                    <input :disabled="!depto" class="form-control" type="text" v-model="name" placeholder="Nombre">
                </div>
                <div class="col-md-4">
                    <label>Rut:</label>
                    <input v-rut @keyup="validaterut" :disabled="!depto" :class="classRut ? '' : 'error'" class="form-control" type="text" v-model="rut" placeholder="Rut">
                    <small class="text-danger error-form" v-if="classRut === false">Rut inválido</small>
                </div>

                <div class="col-md-2 d-flex align-items-end">
                    <button :disabled="validateForm" class="btn btn-primary" @click="addVisit">Agregar</button>
                </div>

            </div>
        </div>

        <div class="info-visitas">
            <div class="container shadow">
                <div class="row p-0" v-if="depto.number">
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
                    <div class="col-md-8 p-4">
                        <h4 class="mb-3">Visitas en depto {{ depto.number }}</h4>
                        <div v-if="visitFiltered.length === 0">
                            Este departamento no registra visitas
                        </div>
                        <div v-else>
                            <div class="well-light mb-1" v-for="visit in visitFiltered" :key="visit['.key']">
                                <div class="mb-0 d-flex">
                                    <p class="mb-0 mr-3">
                                        <strong>{{ visit.name }} </strong>
                                    </p>
                                    <span> {{ visit.rut | rut }}</span>
                                    <span class="text-muted ml-auto">{{ visit.date }}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

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
      depto: "",
      name: "",
      rut: "",
      classRut: true
    };
  },
  computed: {
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
    formatDate: function(date) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const time = date.getTime();

      return (
        day +
        " " +
        monthNames[monthIndex] +
        " " +
        year +
        " " +
        hour +
        ":" +
        minutes
      );
    },
    addVisit: function() {
      const newdate = this.formatDate(new Date());
      visitsRef.push({
        apartment: this.depto.number,
        name: this.name,
        rut: this.rut,
        date: newdate
      });
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
