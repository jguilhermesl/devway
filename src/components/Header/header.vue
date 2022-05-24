<template>
    <header class="header">
        <div class="logo">
            <router-link to="/"><img src="/img/logo.png" alt="Hamburguer" /></router-link>
            <h1>devway</h1>
        </div>
        <nav>
            <ul>
                <router-link to="/"><li>Home</li></router-link>
                <router-link to="/orders"><li>Pedidos</li></router-link>
            </ul>
        </nav>
        <router-link to="/"><button>Fazer pedido</button></router-link>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style src="./style.scss" lang="sass" scoped />



