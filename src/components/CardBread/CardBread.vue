<template>
  <div class="cardBread" v-for="(bread, index) in data" v-bind:key="index">
    <img :src="bread.image"  @click="teste" />
    <span>{{ bread.type }}</span>
    <button type="button" @click="() => changeBread(bread.type)">
      Escolher
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
    checkBreadSelected() {
    }
  }
};
</script>

<style lang="sass" src="./style.scss" scoped>
</style>