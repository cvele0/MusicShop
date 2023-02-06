<template>
  <div class="home">
    <Header :subtitle="subtitle"/>
    <img class="image" v-if="imageUrl.length > 0" :src="imageUrl">
    <h1 v-else> Error loading image </h1>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import InstrumentImageList from '@/components/imageLists/InstrumentImageList.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'SingleInstrumentView',
  components: {
    Header,
    InstrumentImageList
  },

  computed: {
    ...mapState([
      'instruments'
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
      'fetchInstruments',
    ])
  },

  mounted() {
    this.fetchInstruments();
    var name = this.$route.params.name;
    this.subtitle = name;
    for (var i = 0; i < this.instruments.length; i++) {
      if (this.instruments[i].name === name) {
        this.imageUrl = this.instruments[i].url;
      }
    }
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
