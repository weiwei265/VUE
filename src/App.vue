<template>
    <div id="app">
        <router-view :key="key" v-if="$route.meta.keepAlive"></router-view>
        <router-view v-else></router-view>
    </div>
</template>

<script>
export default {
    computed: {
        key () {
            return this.$route.fullPath;
        }
    }
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
