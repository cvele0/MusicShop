<template>
  <div class="home">
    <Header subtitle="Countries"/>
    <CountryImageList v-if="countries" :objects="countries" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import CountryImageList from '@/components/imageLists/CountryImageList.vue';

export default {
  name: 'CountryView',
  components: {
    Header,
    CountryImageList
  },

  data() {
    return {
      countries: []
    }
  },

  // mozda dodati watch() 16.12. 38.00

  mounted() {
    // fetch(`http://127.0.0.1:9090/admin/countries`)
    // .then( obj => obj.json() )
    // .then( res => {
    //   this.countries = res;
    //   console.log("radim ispis: " + res);
    // });
  }
}
</script>
