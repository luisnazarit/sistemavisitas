<template>
  <div class="card">
    <div class="card-header d-flex p-3">
      <h3 class="h4 mb-0">
        <strong class="back" @click="back">
          <svg style="width:18px;height:18px" viewBox="0 0 24 24">
            <path fill="#FFFFFF" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg> Volver</strong> Editar lista de autorizados departamento {{ datadepto.number}}</h3>
      <button class="btn btn-link ml-auto" @click="closePanel">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="#FFFFFF" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
      </button>
    </div>
    <div class="card-body p-4">
      <div class="p-5">
        <div v-if="selected.length > 0">
          <div class="row no-gutters list-authorized-header">
            <div class="col-md-3 p-2">
              <strong>Nombre</strong>
            </div>
            <div class="col-md-3 p-2">
              <strong>Rut</strong>
            </div>
            <div class="col-md-4 p-2">
              <strong>Imagen</strong>
            </div>
            <div class="col-md-2 p-2 text-right">
              <strong>Acciones</strong>
            </div>
          </div>
          <div class="row no-gutters list-authorized mb-1" v-for="aut in selected" :key="aut['.key']">
            <div class="col-md-3 p-2  d-flex align-items-center">
              {{ aut.name }}
            </div>
            <div class="col-md-3 p-2 d-flex align-items-center">
              {{ aut.rut }}
            </div>
            <div class="col-md-4 p-2 d-flex align-items-center">
              <div v-if="aut.cover !== ''" class="wrapper-img" :style="{backgroundImage: 'url(' + aut.cover + ')'}">

              </div>
              <div v-else class="text-muted">
                No posee imagen
              </div>
            </div>
            <div class="col-md-2 p-2 justify-content-end  d-flex align-items-center">
              <button title="Eliminar Usuario" class="btn btn-danger btn-sm p-1 ml-2" @click="removeAut(aut['.key'])">
                ELIMINAR
              </button>
            </div>
          </div>

        </div>
        <div v-else>
          <div class="highlight p-5 text-center">
            <h5>No hay personas autorizadas aún </h5>
            <p>ingresa desde el panel de abajo.</p>
          </div>
        </div>
        <h4 class="mt-4">Agregar nueva persona</h4>
        <div class="row mt-3">
          <div class="col-md-3">
            <input type="text" class="form-control form-control-lg" v-model="userNew" placeholder="Nombre">
          </div>
          <div class="col-md-3">
            <input v-rut:live name="rutname" :class="errors.has('rutname') ? 'error' : ''" class="form-control form-control-lg" type="text" v-model="rutNew" placeholder="Rut" v-validate="'rut'">
            <small class="text-danger error-form" v-show="errors.has('rutname')">Rut inválido</small>
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control form-control-lg" v-model="cover" placeholder="URL de imagen">
          </div>
          <div class="col-md-2 text-right">
            <button :disabled="rutNew === '' || errors.has('rutname') || userNew === ''" class="btn btn-primary btn-lg btn-block" @click="addNew">
              <svg style="width:16px;height:16px" viewBox="0 0 24 24" class="mr-2">
                <path fill="#FFFFFF" d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
              </svg>
              Agregar</button>
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
  name: "authorized",
  props: ["datadepto"],
  firebase: {
    apartments: apartmentsRef.orderByChild("number")
  },
  data() {
    return {
      as: [],
      userNew: "",
      rutNew: "",
      cover: ""
    };
  },
  methods: {
    addNew: function() {
      apartmentsRef
        .child(this.datadepto[".key"])
        .child("authorizedPeople")
        .push({
          name: this.userNew,
          rut: this.rutNew,
          cover: this.cover
        });
      (this.userNew = ""), (this.rutNew = ""), (this.cover = "");
    },
    removeAut: function(au) {
      this.$firebaseRefs.selected.child(au).remove();
    },
    closePanel: function() {
      this.$emit("close", false);
    },
    back: function() {
      this.$emit("back", "main");
    }
  },
  created() {
    this.$bindAsArray(
      "selected",
      apartmentsRef.child(this.datadepto[".key"]).child("authorizedPeople")
    );
  }
};
</script>

<style lang="scss" scoped>
strong.back {
  font-size: 16px;
  background: rgba(0, 0, 0, 0.1);
  display: inline-block;
  padding: 25px;
  border-radius: 4px 0 0 0;
  margin: -16px;
  margin-right: 1rem;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
}

.list-authorized {
  background: #f4f4f4;
  margin-bottom: 2px;
}
.btn-danger {
  font-size: 10px;
}
.list-authorized-header {
  background: #e4eaf1;
}

.wrapper-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
}
</style>