import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const rootPath = 'http://127.0.0.1:9090';
const authPath = 'http://127.0.0.1:9000';

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    instruments: [],
    token: '',
    user: null,
    loggedIn: false,
    availableInstruments: []
  },

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
      sessionStorage.clear();
    },

    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    setInstruments(state, instruments) {
      state.instruments = instruments;
    },

    setAvailableInstruments(state, availableInstruments) {
      state.availableInstruments = availableInstruments;
    },

    deleteAvailableInstrument(state, availableInstrument) {
      var newAvailable = [];
      for (var i = 0; i < state.availableInstruments.length; i++) {
        if (state.availableInstruments[i].name === availableInstrument.name && 
            state.availableInstruments[i].brand === availableInstrument.brand) {
          continue;
        } else {
          newAvailable.push(state.availableInstruments[i]);
        }
      }
      state.availableInstruments = newAvailable;
    },

    addInstrument(state, instrument) {
      state.instruments.push(instrument);
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
            let user = { name: obj.name, password: obj.password };
            commit('login', user);
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
            if (tkn.token) {
              commit('login', obj);
            }
          }
        });
    },
    
    fetchInstruments({ commit, state }) {
      fetch(`${rootPath}/admin/instruments`, {
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
          commit('setInstruments', res);
        }
      })
    },

    // deleteAvailableInstrument({ commit, state }, data) {
    //   fetch(`${rootPath}/admin/availableInstruments`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${state.token}`
    //     },
    //     body: JSON.stringify(data)
    //   })
    //   .then( obj => obj.json() )
    //   .then( res => {
    //     if (res.msg) {
    //       alert(res.msg);
    //     } else {
    //       commit('deleteAvailableInstrument', data);
    //     }
    //   })
    // },

    // addInstrument({ commit, state }, data) {
    //   fetch(`${rootPath}/admin/instruments`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${state.token}`
    //     },
    //     body: JSON.stringify(data)
    //   })
    //   .then( obj => obj.json() )
    //   .then( res => {
    //     if (res.msg) {
    //       alert(res.msg);
    //     } else {
    //       commit('addInstrument', data);
    //     }
    //   })
    // },

    fetchAvailableInstruments({ commit, state }) {
      fetch(`${rootPath}/admin/availableInstruments`, {
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
          commit('setAvailableInstruments', res);
        }
      });
    },

    logout({ commit }) {
      commit('log_out')
    },

    socket_instrument({ commit }, instrument) {
      const inst = JSON.parse(instrument);
      commit('addInstrument', inst);
    },

    socket_available({ commit }, instrument) {
      const inst = JSON.parse(instrument);
      commit('deleteAvailableInstrument', inst);
    }
  },
  // modules: {
  // }
})
