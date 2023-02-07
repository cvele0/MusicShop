<template>
  <div class="home">
    <Header :subtitle="subtitle"/>
    <div class="image">
      <img class="inside-image" v-if="imageUrl.length > 0" :src="imageUrl">
      <h1 v-else> Error loading image </h1>
    </div>
    <body>
      <div class="Cart-Container">
        <div class="Header">
          <h3 class="Heading">Order instrument</h3>
        </div>
        <div class="Cart-Items">
          <div class="image-box">
            <img :src="this.imageUrl" style="height:180px; width:auto"/>
          </div>
          <div class="about">
            <h1 class="title">{{ this.subtitle }} </h1>
            <h1 class="description"> {{ this.description }} </h1>
          </div>
          <div class="counter"></div>
          <div class="prices"></div>
        </div>
        <div class="price">
          <h1> Price: {{ this.price }}$</h1>
          <b-button class="button" type="submit" squared variant="outline-info" @click="buttonClicked()">Order</b-button>
        </div>
      </div> 
    </body>
      
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { mapActions, mapState } from 'vuex';

export default {
  name: 'SingleShopView',
  components: {
    Header
  },

  computed: {
    ...mapState([
      'availableInstruments',
      'instruments',
      'token'
    ])
  },

  data() {
    return {
      imageUrl: '',
      brand: '',
      price: 0,
      description: '',
      subtitle: 'Unknown'
    }
  },

  methods: {
    ...mapActions([
      'fetchAvailableInstruments',
      'addInstrument',
      'deleteAvailableInstrument'
    ]),

    buttonClicked() {
      var instrument = null;
      var name = this.$route.params.name;
      for (var i = 0; i < this.availableInstruments.length; i++) {
        if (this.availableInstruments[i].name === name) {
          instrument = this.availableInstruments[i];
        }
      }
      if (instrument === null) return;
      // this.deleteAvailableInstrument(instrument);
      this.$socket.emit('available', {name: instrument.name, 
        brand: instrument.brand, url: instrument.url, token: this.token});
      //this.addInstrument(instrument);
      this.$socket.emit('instrument', {name: instrument.name, 
        brand: instrument.brand, url: instrument.url, token: this.token});
      this.$router.push({ name: 'Shop' });
    }
  },

  mounted() {
    this.fetchAvailableInstruments();
    var name = this.$route.params.name;
    this.subtitle = name;
    for (var i = 0; i < this.availableInstruments.length; i++) {
      if (this.availableInstruments[i].name === name) {
        this.imageUrl = this.availableInstruments[i].url;
        this.price = this.availableInstruments[i].price;
        this.brand = this.availableInstruments[i].brand;
        this.description = this.availableInstruments[i].description;
      }
    }
  },

  watch: {
    
  }
}
</script>

<style scoped>

.image {
  height: 350px;
  width: auto;
}

.inside-image {
  height: 350px;
  width: auto;
}

body{
 margin: 0;
 padding: 0;
 background: linear-gradient(to bottom right, #E3F0FF, #FAFCFF);
 height: 100vh;
 display: flex;
 justify-content: center;
 align-items: center;
}
.Cart-Container{
 width: 70%;
 height: 85%;
 background-color: #ffffff;
 border-radius: 20px;
 box-shadow: 0px 25px 40px #1687d933;
}

.Header{
 margin: auto;
 width: 90%;
 height: 15%;
 display: flex;
 justify-content: space-between;
 align-items: center;
}
.Heading{
 font-size: 30px;
 font-family: 'Open Sans';
 font-weight: 700;
 color: #021a31;
}
.Cart-Items{
 margin: auto;
 width: 90%;
 height: 30%;
 display: flex;
 justify-content: space-between;
 align-items: center;
}
.image-box{
 width: 15%;
 text-align: center;
}
.about{
 height: 100%;
}
.title{
 margin-left: 2cm;
 padding-top: 5px;
 line-height: 10px;
 font-size: 32px;
 font-family: 'Open Sans';
 font-weight: 800;
 color: #202020;
}
.description {
 background-color: rgb(236, 199, 199);
 font-family: 'Open Sans';
 font-style: italic;
 letter-spacing: 2px;
 margin-top: 1cm;
 margin-left: 8cm;
 margin-right: 5cm;
 line-height: 25px;
 font-size: 25px;
 font-weight: 600;
 color: #e48f2e;
}

.price {
  margin-top: 30px;
  width: 60%;
  height: 5%;
  display: inline-flex;
  white-space: 2cm;
  /* justify-content: space-between; */
  /*display: flex;*/
  align-items: center; 
}

.button {
  margin-left: 20px;
  width: 100px;
  height: 15px;
  font-size: 20px;
  padding-bottom: 35px;
}
.price h1 {
  margin-top: 5px;
  font-size: 25px;
  letter-spacing: 2px;
}

</style>
