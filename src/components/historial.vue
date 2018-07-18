<template>
  <div class="history">
    <div class="container">

      <div class="box-historycal p-5 shadow bg-white">

        <div class="filter-bar mb-4 border-bottom pb-3">
          <div class="row">
            <div class="col-md-6">
              <h3 class="h4">Últimas visitas: {{ status }}</h3>
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-6">
                  <select id="apartmentNumber" class="form-control" v-model="depto">
                    <option :selected="true">Todas</option>
                    <option v-for="apartment in apartments" :key="apartment['.key']" :value="apartment">{{ apartment.number }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <input type="text" class="form-control" v-model="search" placeholder="Buscar Persona">
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="list-historycal sb">
          <div class="media mb-3" v-for="visit in visitsFiltered" :key="visit['.key']">
            <div class="mr-3">
              <h3 class="highlight">{{ visit.apartment }}</h3>
            </div>
            <div class="media-body">
              <p class="mb-0">{{ visit.name }}, {{ visit.rut | rutFilter }}</p>
              <small class="text-muted">{{ visit.date }}</small>
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
let visitsRef = db.ref("visits");

export default {
  name: "historial",
  firebase: {
    apartments: apartmentsRef.orderByChild("number"),
    visits: visitsRef
  },
  data() {
    return {
      depto: "Todas",
      search: ""
    };
  },
  computed: {
    visitsFiltered: function() {
      let a = [];
      if (this.depto === "Todas") {
        return this.visits.filter(visit => {
          return visit.name.match(this.search);
        });
      } else {
        this.visits.forEach(child => {
          if (child.apartment === this.depto.number) {
            a.push(child);
          }
        });
        return a.filter(visit => {
          return visit.name.match(this.search);
        });
      }
    },
    status: function() {
      if (this.depto === "Todas") {
        return "Todas";
      } else {
        return this.depto.number;
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
    }
  }
};
</script>


<style lang="scss" scoped>
.box-historycal {
  max-height: 70vh;
  display: flex;
  flex-direction: column;
}
.list-historycal {
  flex: 1 1 auto;
  overflow: auto;
}
</style>
