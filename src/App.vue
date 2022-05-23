
<template>
    <Header />
    <router-view /> 
    <Footer />
</template>

<script>
import Header from './components/Header/header.vue'
import Footer from './components/Footer/footer.vue'

export default {
    name: 'App',
    components: {
        Header,
        Footer
    }
}
</script>


<style src="./globalStyles.scss" lang="sass" />
