<template>
  <div class="home">
    <Header :subtitle="subtitle"/>
    <img class="image" v-bind="imageUrl" v-if="imageUrl.length > 0" :src="imageUrl">
    <h1 v-else> Error loading image </h1>
  </div>
</template>

<script>
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
      'instrumentNames',
      'instrumentUrls'
    ])
  },

  data() {
    return {
      imageUrl: '',
      subtitle: 'Unknown'
    }
  },

  methods: {
    ...mapActions([
      'addImage',
      'fetchInstrumentNames',
      'fetchInstrumentUrls'
    ])
  },

  mounted() {
    this.fetchInstrumentNames();
    this.fetchInstrumentUrls();
    var name = this.$route.params.name;
    this.subtitle = name;
    var idx = this.instrumentNames.indexOf(name);
    this.imageUrl = this.instrumentUrls[idx];
  },

  watch: {
    
  }
}
</script>

<style scoped>
.image {
  border: 10cm;
  border-color: black;
  background-color: black;
  width: auto;
  height: 15cm;
}
</style>
