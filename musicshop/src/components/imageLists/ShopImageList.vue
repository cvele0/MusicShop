<template>
  <div>
    <b-table 
     :items="this.myInstruments"
     small 
     fixed 
     hover 
     dark
     bordered
     stripped
     @row-clicked="rowClicked">
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'ShopImageList',
  
  // props: {
  //   objects: Array
  // },

  computed: {
    ...mapState([
      'availableInstruments'
    ]),
  },

  data() {
    return {
      myInstruments: []
    }
  },

  mounted() {
    if (localStorage.token) {
      this.fetchAvailableInstruments();
      this.myInstruments = [];
      for (var i = 0; i < this.availableInstruments.length; i++) {
        var obj = { name: this.availableInstruments[i].name, brand: this.availableInstruments[i].brand };
        this.myInstruments.push(obj);
      }
    }
  },

  watch: {
    availableInstruments(nval) {
      this.myInstruments = [];
      for (var i = 0; i < nval.length; i++) {
        var obj = { name: nval[i].name, brand: nval[i].brand };
        this.myInstruments.push(obj);
      }
    }
  },

  methods: {
    ...mapActions([
      'fetchAvailableInstruments'
    ]),

    rowClicked(record, index) {
      this.$router.push( {name: 'SingleShop', params: {name: record.name} } )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
