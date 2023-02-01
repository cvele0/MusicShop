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
import { mapActions, mapState } from 'vuex';

export default {
  name: 'CountryView',
  components: {
    Header,
    CountryImageList
  },

  computed: {
    ...mapState([
      'countries',
    ])
  },

  data() {
    return {
      //countries: []
    }
  },

  // mozda dodati watch() 16.12. 38.00
  methods: {
    ...mapActions([
      'fetchCountries'
    ])
  },

  mounted() {
    if (localStorage.token) {
      this.fetchCountries();
    }
  },

  watch: {
    $route(nval) {

    }
  }
}
</script>
