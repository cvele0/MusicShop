<template>
  <div class="table">
    <b-table
     :items="this.myInstruments"
     bordered
     stripped
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
  name: 'InstrumentImageList',
  
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
    instruments(nval) {
      if (localStorage.token) {
        this.myInstruments = [];
        for (var i = 0; i < nval.length; i++) {
          var obj = { name: nval[i].name, brand: nval[i].brand };
          this.myInstruments.push(obj);
        }
      }
    }
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
/* .table {
  background-color: rgb(193, 232, 193);
} */
</style>
