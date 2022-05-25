<template>
  <div class="cardBread" v-bind:class="{ cardBreadSelected: breadSelected === bread.type}" v-for="(bread, index) in data" v-bind:key="index">
    <img :src="bread.image"  @click="teste" />
    <span>{{ bread.type }}</span>
    <button type="button" @click="() => (changeBread(bread.type), checkBreadSelected(bread.type))">
      <p v-show="breadSelected === bread.type"><i class="fa-solid fa-circle-check"></i></p>
      <p v-show="breadSelected !== bread.type">Escolher</p>
    </button>
  </div>
</template>

<script>
export default {
  name: "CardBread",
  props: {
    data: Array,
    breadSelected: String,
    changeBread: Function
  },
  methods: {
    checkBreadSelected(breadType) {
      console.log(breadType)
    }
  }
};
</script>

<style lang="sass" src="./style.scss" scoped>
</style>