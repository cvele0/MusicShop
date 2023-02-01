<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm" type="dark" variant="info">
        <b-navbar-brand to="/">Music shop</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/">Home</b-nav-item>

            <b-nav-item-dropdown text="Category" right>
              <b-dropdown-item to="/countries">Countries</b-dropdown-item>
              <b-dropdown-item to="/customers">Customers</b-dropdown-item>
              <b-dropdown-item to="/departments">Departments</b-dropdown-item>
              <b-dropdown-item to="/employees">Employees</b-dropdown-item>
              <b-dropdown-item to="/instruments">Instruments</b-dropdown-item>
              <b-dropdown-item to="/manufacturers">Manufacturers</b-dropdown-item>
              <b-dropdown-item to="/orders">Orders</b-dropdown-item>
              <b-dropdown-item to="/products">Products</b-dropdown-item>
              <b-dropdown-item to="/productOrders">Product Orders</b-dropdown-item>
              <b-dropdown-item to="/shops">Shops</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <!-- <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

          </b-navbar-nav> -->
          <b-button v-if="!this.loggedIn" class="me-3" variant="outline-primary" @click="redirectToRegister()">Register</b-button>
          <b-button v-if="!this.loggedIn" variant="outline-success" @click="redirectToLogin()">Log in</b-button>
          <!-- <b-button v-if="this.user" variant="outline-success" @click="redirectToProfile()">{{user.name}}</b-button> -->
          <b-button v-if="this.loggedIn" class="ms-3" variant="outline-danger" @click="log_out()">Log out</b-button>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {

  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState([
      'token',
      'user',
      'loggedIn'
    ])
  },

  mounted() {
    this.logged = false;
    if (localStorage.token) {
      this.setToken(localStorage.token);
    }
  },

  methods: {
    ...mapActions([
      'login',
      'logout'
    ]),
    ...mapMutations([
      'setToken'
    ]),

    log_out() {
      this.logout();
      console.log("radim log out");
      this.$router.push({name: 'Login'});
    },
    redirectToLogin() {
      this.$router.push({name: 'Login'});
    },
    redirectToRegister() {
      this.$router.push({name: 'Register'});
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
