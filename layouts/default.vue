<template>
    <div style="display: flex;">
        <VerticalNav />
        <Nuxt />
    </div>
</template>

<script>
    import VerticalNav from '../components/VerticalNav.vue';
    export default{
        components: { VerticalNav }
    }
</script>