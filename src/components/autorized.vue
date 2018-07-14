<template>
    <div>
        <div v-if="info">
            <h5 class="mt-3 mb-0">Personas autorizadas</h5>
            <p class="mb-4 text-muted">Autorización para ingresar al departamento sin registro</p>
        </div>
        <div v-else class="mt-3">
            No hay personas autorizadas
        </div>
    </div>
</template>

<script>
export default {
  name: "autorized",
  props: {
    info: Array
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

