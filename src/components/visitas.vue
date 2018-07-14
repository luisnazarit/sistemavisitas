<template>
    <div>
        <div class="box-add-visit container mb-1 p-5 shadow">
            <h3 class="mb-4">Agregar visita a depto</h3>
            <div class="row">
                <div class="col-md-2">
                    <label for="apartmentNumber">Depto:</label>
                    <select id="apartmentNumber" class="form-control" v-model="depto">
                        <option disabled :selected="true">Seleccione Depto</option>
                        <option v-for="apartment in datadeptos" :key="apartment['.key']" :value="apartment">{{ apartment.number }}</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label>Nombre:</label>
                    <input :disabled="!depto" class="form-control" type="text" v-model="nombrevisita" placeholder="Nombre">
                </div>
                <div class="col-md-4">
                    <label>Rut:</label>
                    <input v-rut :disabled="!depto" class="form-control" type="text" v-model="rutvisita" placeholder="Rut">
                </div>

                <div class="col-md-2 d-flex align-items-end">
                    <button :disabled="!depto" class="btn btn-primary" @click="upvisita">Agregar</button>
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
                        <ul v-if="depto.visits">
                            <li v-for="visita in depto.visits" :key="visita['.key']">
                                <p class="mb-0">{{ visita.nombre }}, {{ visita.rut}}</p>
                                <small class="text-muted">{{ visita.date }}</small>
                            </li>
                        </ul>
                        <div v-else>
                            Este depto aún no tiene visitas
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import autorized from "../components/autorized";

export default {
  name: "visitas",
  components: {
    autorized: autorized
  },
  props: {
    datadeptos: Array
  },
  data() {
    return {
      depto: "Seleccione Depto",
      nombrevisita: "",
      rutvisita: ""
    };
  },
  methods: {
    upvisita: function() {
      this.$emit("datosvisita", {
        nombre: this.nombrevisita,
        rut: this.rutvisita,
        depto: this.depto,
        date: new Date()
      });
    }
  }
};
</script>

