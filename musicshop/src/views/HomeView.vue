<template>
  <div class="home">
    <Header subtitle="Home Page"/>
    <img alt="Vue logo" src="https://cdn.shopify.com/s/files/1/0147/1256/9910/files/DanvilleMusicStore_DisplayRoom7979_Retouched.jpg?v=1658169027&width=1500">
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'HomeView',
  components: {
    Header
  }
}
</script>
