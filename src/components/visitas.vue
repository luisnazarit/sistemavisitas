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
                    <input v-rut :disabled="!depto" class="form-control" type="text" v-model="rut" placeholder="Rut">
                </div>

                <div class="col-md-2 d-flex align-items-end">
                    <button :disabled="!depto" class="btn btn-primary" @click="addVisit">Agregar</button>
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
                        <h4>Visitas en depto {{ depto.number }}</h4>

                        <ul>
                            <li v-for="visit in visitFiltered" :key="visit['.key']">
                                <p class="mb-0">{{ visit.name }}, {{ visit.rut}}</p>
                                <small class="text-muted">{{ visit.date }}</small>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import autorized from "../components/autorized";
import { db } from "../components/configFirebase";

let apartmentsRef = db.ref("apartments");
let visitsRef = db.ref("visits");

export default {
  name: "visitas",
  components: {
    autorized: autorized
  },
  firebase: {
    apartments: apartmentsRef,
    visits: visitsRef
  },
  data() {
    return {
      depto: "Seleccione Depto",
      name: "",
      rut: ""
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
    }
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
</style>
