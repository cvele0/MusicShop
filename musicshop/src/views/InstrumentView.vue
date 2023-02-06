<template>
  <div class="home">
    <Header subtitle="Owned Instruments"/>
    <InstrumentImageList />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import InstrumentImageList from '@/components/imageLists/InstrumentImageList.vue';

export default {
  name: 'InstrumentView',
  components: {
    Header,
    InstrumentImageList
  }
}
</script>
