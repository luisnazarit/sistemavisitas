<template>
    <div>
        <div class="row no-gutters mb-1" v-for="(aut, index) in autorizados" :key="index">
            <div class="col-md-5">
                <input class="form-control" type="text" v-model="aut.name">
            </div>
            <div class="col-md-5">
                <input class="form-control" type="text" v-model="aut.rut">
            </div>
            <div class="col-md-1">
                <button class="btn btn-danger p-1 ml-2" @click="removeAut(aut)">
                    <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                        <path fill="#FFFFFF" d="M15,14C17.67,14 23,15.33 23,18V20H7V18C7,15.33 12.33,14 15,14M15,12A4,4 0 0,1 11,8A4,4 0 0,1 15,4A4,4 0 0,1 19,8A4,4 0 0,1 15,12M5,9.59L7.12,7.46L8.54,8.88L6.41,11L8.54,13.12L7.12,14.54L5,12.41L2.88,14.54L1.46,13.12L3.59,11L1.46,8.88L2.88,7.46L5,9.59Z" />
                    </svg>
                </button>
            </div>
        </div>
        <button class="mt-2 btn btn-secondary" @click="addNew">Agregar otro</button>

    </div>
</template>

<script>
export default {
  name: "autorized",
  data() {
    return {
      autorizados: [
        {
          name: "Larry",
          rut: "11.111.111-1"
        },
        {
          name: "Nadie",
          rut: "11.111.111-1"
        },
        {
          name: "MMMM",
          rut: "11.111.111-1"
        }
      ]
    };
  },
  methods: {
    addNew: function() {
      this.autorizados.push({
        name: "",
        rut: ""
      });
    },
    removeAut: function(i) {
      this.autorizados.splice(i, 1);
    }
  }
};
</script>

