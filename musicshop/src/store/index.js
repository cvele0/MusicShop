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
    // instrumentNames: [
    //   "Gibson SG",
    //   "El. gitara Peavey",
    //   "Klavir C40 Yamaha",
    //   "Klasicna gitara Alhambra",
    //   "El. gitara Stratokaster"
    // ],
    // instrumentUrls: [
    //   "https://www.mitrosmusic.com/media/inlineimage/upload_28451_1.jpg",
    //   "https://www.scmusic.com.au/content/uploads/2015/11/p-25175-PEAVEY-AT200-BLACK-MAIN.jpg",
    //   "https://www.player.rs/images/products/big/30559.webp",
    //   "https://www.alhambraguitarras.com/layout/common/_thumb/2304mahoganydelante_ma-480x640-zc2.jpg",
    //   "https://makingfunmusic.com/wp-content/uploads/2021/02/Fender-Player-Stratocaster-Electric-Guitar-Maple-Fingerboard-Black-Full-Straight-Front.jpg"
    // ]
    instrumentNames: [],
    instrumentUrls: []
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
      sessionStorage.clear();
    },

    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    setInstruments(state, instruments) {
      state.instruments = instruments;
    },

    setInstrumentNames(state, instrumentNames) {
      state.instrumentNames = instrumentNames;
    },

    setInstrumentUrls(state, instrumentUrls) {
      state.instrumentUrls = instrumentUrls;
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
            commit('login', obj);
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
      });
    },

    fetchInstrumentNames({ commit, state }) {
      fetch(`${authPath}/instrumentNames`, {
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
          commit('setInstrumentNames', res.instrumentNames);
        }
      });
    },

    fetchInstrumentUrls({ commit, state }) {
      fetch(`${authPath}/instrumentUrls`, {
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
          commit('setInstrumentUrls', res.instrumentUrls);
        }
      });
    },

    logout({ commit }) {
      commit('log_out')
    },

    addImage({ commit, state }, name, url) {
      state.instrumentNames.push(name);
      state.instrumentUrls.push(url);
    }
  },
  // modules: {
  // }
})
