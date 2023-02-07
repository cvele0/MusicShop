<template>
  <div class="naslov">
    <!-- <h1 class="title"> Welcome to our music shop! </h1> -->
    <div class="nine">
      <h1>Cvele Music Shop<span>Our music, your melody</span></h1>
    </div>
    <h3 class="subtitle">{{ subtitle }}</h3>
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

.subtitle {
  color: rgb(103, 103, 243);
  font-size: 30px;
  letter-spacing: 5px;
  font-family: "Cinecav";
}

.nine h1 {
  text-align:center; font-size:50px; text-transform:uppercase; color:#222; letter-spacing:1px;
  font-family:"Playfair Display", serif; font-weight:400;
}
.nine h1 span {
  margin-top: 5px;
    font-size:17px; color:#444; word-spacing:1px; font-weight:normal; letter-spacing:2px;
    text-transform: uppercase; font-family:"Raleway", sans-serif; font-weight:500;

    display: grid;
    grid-template-columns: 1fr max-content 1fr;
    grid-template-rows: 27px 0;
    grid-gap: 20px;
    align-items: center;
}

.nine h1 span:after,.nine h1 span:before {
    content: " ";
    display: block;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    height: 5px;
  background-color:#f8f8f8;
}

</style>
