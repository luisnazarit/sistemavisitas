<template>
  <div class="mb-4">
    <div class="container">
      <div class="p-5 bg-white">
        <div class="mb-4">
          <input class="form-control form-control-lg" type="text" v-model="search" placeholder="Buscar persona" />
          <p class="text-muted mt-1">Buscar por nombre a dueño para identificar rápidamente a que departamento pertenece</p>
        </div>
        <div v-if="filteredApartments.length !== 0">
          <div class="list-users" v-if="search !== ''">
            <div v-for="apartment in filteredApartments" :key="apartment['.key']">
              <h3>{{ apartment.lessee }} -
                <strong>{{ apartment.number }}</strong>
              </h3>

            </div>
          </div>
        </div>
        <div v-else>
          <div class="bg-warning p-4 text-center mt-5">
            No hay personas asociadas a los departamentos con el nombre
            <strong>{{ search }}</strong>
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
  name: "search",
  firebase: {
    apartments: apartmentsRef.orderByChild("number")
  },
  data() {
    return {
      depto: "Todas",
      search: ""
    };
  },
  computed: {
    filteredApartments: function() {
      return this.apartments.filter(apartment => {
        return apartment.lessee.match(this.search);
      });
    }
  }
};
</script>
