<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm" type="dark" variant="dark">
        <b-navbar-brand to="/">Music shop</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>

            <b-nav-item-dropdown text="Category" right>
              <b-dropdown-item to="/instruments">Instruments</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item class="Shop" to="/shop">Shop</b-nav-item>
          </b-navbar-nav>


          <!-- Right aligned nav items -->
          <!-- <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

          </b-navbar-nav> -->
          <div class="buttonSettings">
            <b-button v-if="!this.loggedIn" variant="outline-success" @click="redirectToLogin()">Log in</b-button>
          </div>
          <div class="buttonSettings">
            <b-button v-if="!this.loggedIn" class="me-3" variant="outline-primary" @click="redirectToRegister()">Register</b-button>
          </div>
          <div class="buttonSettings">
            <b-button v-if="this.loggedIn" class="ms-3" variant="outline-danger" @click="log_out()">Log out</b-button>
          </div>
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

.buttonSettings {
  margin-left: 10px;
  margin-right: 10px;
  justify-content: end;
}

</style>
