<template>
  <div class="home">
    <Header subtitle="Owned Instruments"/>
    <!-- <InstrumentImageList v-if="this.myInstruments" :objects="this.myInstruments" />  -->
    <InstrumentImageList />
    <!-- <h1 v-else> Error load instruments </h1> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import InstrumentImageList from '@/components/imageLists/InstrumentImageList.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'InstrumentView',
  components: {
    Header,
    InstrumentImageList
  },

  computed: {
    ...mapState([
      'instruments',
    ]),
  },

  data() {
    return {
      myInstruments: []
    }
  },

  methods: {
    ...mapActions([
      'fetchInstruments'
    ])
  },

  mounted() {
    // if (localStorage.token) {
    //   this.fetchInstruments();
    //   this.myInstruments = [];
    //   for (var i = 0; i < this.instruments.length; i++) {
    //     var obj = { name: this.instruments[i].name, brand: this.instruments[i].brand };
    //     this.myInstruments.push(obj);
    //   }
    // }
  },

  watch: {
    // instruments(nval) {
    //   this.myInstruments = [];
    //   for (var i = 0; i < nval.length; i++) {
    //     var obj = { name: nval[i].name, brand: nval[i].brand };
    //     this.myInstruments.push(obj);
    //   }
    // }
  }
}
</script>
