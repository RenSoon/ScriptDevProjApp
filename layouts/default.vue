<template>
    <div style="display: flex;">
        <NewNavBar />
        <Nuxt />
    </div>
</template>

<script>
    import VerticalNav from '../components/VerticalNav.vue';
import NewNavBar from '../components/NewNavBar.vue';
    export default{
        components: { VerticalNav, NewNavBar }
    }
</script>