<template>
  <div id="app">
    <h1>Hello</h1>

    <form @submit.prevent="addUser">
      <input type="text" v-model="newUser.name" />
      <input type="mail" v-model="newUser.email" />
      <button>Add</button>
    </form>

    <h3>Listado de admins</h3>
    <ul>
      <li v-for="user in users">
        {{ user.name }}
      </li>
    </ul>


    <form @submit.prevent="addApartment">
      <div>
        <label for="apartment-number">Apartment Number</label>
        <input type="text" v-model="newApartment.number" />
      </div>
      <div class="form-group">
        <label for="apartment-name">Owner Name</label>
        <input id="apartment-name" type="text" v-model="newApartment.name" />
      </div>
      <div class="form-group">
        <label for="apartment-parking">Parking Number</label>
        <input id="apartmetn-parking" type="text" v-model="newApartment.parking" />
      </div>
      <div class="form-group">
        <label for="apartment-lesse">Lesse Name</label>
        <input id="apartment-lesse" type="text" v-model="newApartment.lessee" />
      </div>
      <div class="form-group">
        <label for="apartment-rut">Rut</label>
        <input id="apartment-rut" type="text" v-model="newApartment.rut" />
      </div>
      <div class="form-group">
        <label for="apartment-password">Password</label>
        <input id="apartment-password" type="password" v-model="newApartment.password" />
      </div>
      <div class="form-group">
        <label for="apartment-mail">Email</label>
        <input id="apartment-mail" type="mail" v-model="newApartment.email" />
      </div>
      <button>Add</button>
    </form>


    <h3>Listado de departamentos</h3>

    <ul>
      <li v-for="apartment in apartments">
        {{ apartment.name}} {{ apartment.number}}
        <form>
          <button @click.prevent="addVisit(apartment)">Agregar Visita</button>
          </form>
      </li>
    </ul>


    <h3>Agregar visita a depto</h3>

    <fieldset>
    <select v-model="depto">
      <option v-for="apartment in apartments" :value="apartment['.key']">{{ apartment.number }}</option>
    </select>

    <p>modelo: {{ depto }}</p>
    <input type="text" v-model="nombrevisita" placeholder="Nombre">
    <input type="text" v-model="rutvisita" placeholder="Rut">
    <button @click="agregarVisita">Agregar</button>
    </fieldset>



  </div>
</template>

<script>
import Firebase from 'firebase';

let config = {
    apiKey: "AIzaSyCKNQtsKdvZwhERm1tvsEk_3AxrkEjSiLk",
    authDomain: "forward-scion-158612.firebaseapp.com",
    databaseURL: "https://forward-scion-158612.firebaseio.com",
    projectId: "forward-scion-158612",
    storageBucket: "forward-scion-158612.appspot.com",
    messagingSenderId: "688448162982"
  };

  let app = Firebase.initializeApp(config);
  let db = app.database()

  let usersRef = db.ref('users');
  let apartmentsRef = db.ref('apartments');

export default {
  name: 'app',
  firebase: {
    users: usersRef,
    apartments: apartmentsRef
  },
  data() {
    return {
      newApartment: {
        number: '',
        name: '',
        rut: '',
        arrendatario: '',
        parking: '',
        email: '',
        password: '',
        visits: [
          {
            nombre: '',
            rut: '',
            hora: new Date()
          }
        ],
        peopleAutorizated: ''
      },
      newUser: {
        name: '',
        email: ''
      },
      depto: '',
      deptoKey: '',
      deptos: [],
      nombrevisita: '',
      rutvisita: '',
    }
  },
  methods: {
    addUser: function() {
      usersRef.push(this.newUser);
      this.newUser.name = '';
      this.newUser.email = '';
    },
    deleteUser: function(user) {
      usersRef.child(user['key']).remove();
    },
    addApartment: function() {
      apartmentsRef.push(this.newApartment);
      this.newApartment.number = '',
      this.newApartment.name = '',
      this.newApartment.rut = '',
      this.newApartment.arrendatario = '',
      this.newApartment.parking = '',
      this.newApartment.email = '',
      this.newApartment.password = '',
      this.newApartment.visits = [],
      this.newApartment.peopleAutorizated = []
    },
    
    addVisit: function (apartment) {
      apartmentsRef.child(apartment['.key']).child('visits').push({
        hola: 'holi'
      });
    },
    agregarVisita: function() {
      apartmentsRef.child(this.depto).child('visits').push({
        nombre: this.nombrevisita,
        rut: this.rutvisita
      });
    }
  },
  mounted() {
    //this.deptosFun();
  }
}
</script>

<style <style lang="sass" scoped>

</style>