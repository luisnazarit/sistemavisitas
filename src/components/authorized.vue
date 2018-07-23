<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <select @change="binding" name="" id="" v-model="depto" class="form-control">
          <option v-for="dep in apartments" :key="dep['.key']" :value="dep">{{ dep.number }}</option>
        </select>
      </div>
      <div class="col-md-8">
        <div v-if="depto !== ''">
          <div class="row no-gutters mb-1" v-for="aut in selected" :key="aut['.key']">
            <div class="col-md-6">
              {{ aut.name }}
            </div>
            <div class="col-md-5">
              {{ aut.rut }}
            </div>
            <div class="col-md-1">
              <button title="Eliminar Usuario" class="btn btn-danger p-1 ml-2" @click="removeAut(aut['.key'])">
                <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                  <path fill="#FFFFFF" d="M15,14C17.67,14 23,15.33 23,18V20H7V18C7,15.33 12.33,14 15,14M15,12A4,4 0 0,1 11,8A4,4 0 0,1 15,4A4,4 0 0,1 19,8A4,4 0 0,1 15,12M5,9.59L7.12,7.46L8.54,8.88L6.41,11L8.54,13.12L7.12,14.54L5,12.41L2.88,14.54L1.46,13.12L3.59,11L1.46,8.88L2.88,7.46L5,9.59Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <input type="text" class="form-control" v-model="userNew" placeholder="Nombre">
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control" v-model="rutNew" placeholder="Rut" v-rut>
          </div>
          <div class="col-md-4">
            <button class="btn btn-primary" @click="addNew">Agregar otro</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../components/configFirebase";
import Multiselect from "vue-multiselect";

let apartmentsRef = db.ref("apartments");

export default {
  name: "authorized",
  components: {
    Multiselect
  },
  firebase: {
    apartments: apartmentsRef.orderByChild("number")
  },
  data() {
    return {
      depto: "",
      as: [],
      userNew: "",
      rutNew: ""
    };
  },
  computed: {
    deptos: function() {
      this.apartments.forEach(i => {
        this.as.push(i.number);
      });
      return this.as;
    }
  },
  methods: {
    addNew: function() {
      apartmentsRef
        .child(this.depto[".key"])
        .child("authorizedPeople")
        .push({
          name: this.userNew,
          rut: this.rutNew
        });
      (this.userNew = ""), (this.rutNew = "");
    },
    removeAut: function(au) {
      this.$firebaseRefs.selected.child(au).remove();
    },
    binding: function() {
      if (this.depto !== "") {
        return this.$bindAsArray(
          "selected",
          apartmentsRef.child(this.depto[".key"]).child("authorizedPeople")
        );
      } else {
        return "algo";
      }
    }
  }
};
</script>

