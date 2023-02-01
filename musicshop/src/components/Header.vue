<template>
  <div class="naslov">
    <h1> Welcome to our music shop! </h1>
    <h3>{{ subtitle }}</h3>
    <br>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    subtitle: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.naslov {
  padding-top: 15px;
}
</style>
