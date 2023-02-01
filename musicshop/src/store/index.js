import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const rootPath = 'http://127.0.0.1:9090';
const authPath = 'http://127.0.0.1:9000';

export default new Vuex.Store({
  state: {
    countries: [],
    token: '',
    user: null,
    loggedIn: false
  },
  // getters: {
  // },
  mutations: {
    login(state, user) {
      state.user = user;
      state.loggedIn = true;
    },

    log_out(state) {
      state.user = null;
      state.loggedIn = false;
      state.token = ''
      localStorage.token='';
    },

    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    setCountries(state, countries) {
      state.countries = countries;
    }
  },
  actions: {
    register({ commit }, obj) {
      fetch(`${authPath}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          if (tkn.msg) {
            alert(tkn.msg);
          } else {
            commit('setToken', tkn.token);
          }
        });
    },

    login({ commit }, obj) {
      fetch(`${authPath}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          if (tkn.msg) {
            alert(tkn.msg);
          } else {
            commit('setToken', tkn.token);
            commit('login', obj);
          }
        });
    },
    // ako ne radi, uraditi async funkciju
    fetchCountries({ commit }) {
      fetch(`${rootPath}/admin/countries`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        }
      })
      .then( obj => obj.json() )
      .then( res => {
        if (res.msg) {
          alert(res.msg);
        } else {
          commit('setCountries', res);
        }
      });
    },

    logout({ commit }) {
      commit('log_out')
    },
  },
  // modules: {
  // }
})
