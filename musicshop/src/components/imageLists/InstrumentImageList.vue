<template>
  <div>
    <b-table 
     :items="this.myInstruments"
     small 
     fixed 
     hover 
     @row-clicked="rowClicked">
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'CountryImageList',
  
  // props: {
  //   objects: Array
  // },

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

  mounted() {
    if (localStorage.token) {
      this.fetchInstruments();
      this.myInstruments = [];
      for (var i = 0; i < this.instruments.length; i++) {
        var obj = { name: this.instruments[i].name, brand: this.instruments[i].brand };
        this.myInstruments.push(obj);
      }
    }
  },

  watch: {
    // instruments(nval) {
    //   this.myInstruments = [];
    //   for (var i = 0; i < nval.length; i++) {
    //     var obj = { name: nval[i].name, brand: nval[i].brand };
    //     this.myInstruments.push(obj);
    //   }
    // }
  },

  methods: {
    ...mapActions([
      'fetchInstruments'
    ]),

    rowClicked(record, index) {
      this.$router.push( {name: 'SingleInstrument', params: {name: record.name} } )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
