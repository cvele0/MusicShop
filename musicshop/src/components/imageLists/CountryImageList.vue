<template>
  <div>
    <b-table 
     :items="items"
     :fields="fields"
     small 
     fixed 
     hover 
     @row-clicked="rowClicked">
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'CountryImageList',
  
  props: {
    objects: Array
  },

  data() {
    return {
      fields: ['country'],
      items: [
            { country: 'Default1' },
            { country: 'Default2' },
            { country: 'Default3' },
            { country: 'Default4' }
          ]
    }
  },

  methods: {
    rowClicked(record, index) {
      this.$router.push( {name: 'SingleCountry', params: {country: record.country} } )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pagination {
  justify-content: center;
}
</style>
