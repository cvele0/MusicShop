<template>
  <div class="home">
    <Header subtitle="Available instruments in shop"/>
    <ShopImageList />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import ShopImageList from '@/components/imageLists/ShopImageList.vue';

export default {
  name: 'ShopView',
  components: {
    Header,
    ShopImageList
  }
}
</script>
