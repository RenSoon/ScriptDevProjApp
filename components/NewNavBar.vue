<template>
    <div class="d-flex flex-column p-3 bg-light container-fluid" style="width: 15vw;font-family: Ringbearer;font-size: 1vw;background:url(/shire_portrait.jpg) center / cover no-repeat;padding: 0px;">
        <div style="width: 100%; height: 100%;  backdrop-filter: blur(40px);">
            <a href="/" class="d-flex flex-column align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none " style="margin-bottom: 5vh;">
                <img src="/one_ring.png" style="width: 5vw;"/>
                <NuxtLink to="/" style="margin-top: 3vh;" class="titleClass"><span class="fs-4 " style="">Middle Earth</span></NuxtLink>
            </a>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto" style="margin-top: 5vh;">
                <li class="nav-item ListClass">
                    <NuxtLink to="/home" style="color: inherit">Home</NuxtLink>
                </li>
                <li class="nav-item ListClass">
                <NuxtLink to="/dashboard" style="color: inherit">Dashboard</NuxtLink>
                </li>
                <li class="nav-item ListClass">
                <NuxtLink to="/orders" style="color: inherit">Orders</NuxtLink>
                </li>
                <li class="nav-item ListClass">
                <NuxtLink to="/products" style="color: inherit">Products</NuxtLink>
                </li>
                <li class="nav-item ListClass">
                <NuxtLink to="/users" style="color: inherit">Users</NuxtLink>
                </li>
                <li  class="nav-item ListClass" style=" text-align: center; margin-top: 15vh;">
                    <NuxtLink to="/" style="color: inherit;">LOGOUT</NuxtLink>
                </li>
            </ul>
        </div>
    
    </div>
</template>

<script>
export default{
    name: 'NewNavBar'
}
</script>

<style scoped>
.ListClass{
    color: #ebc960 !important; 
    margin-top: 2.5vh;
    font-size: 1.2vw;
}
.ListClass:hover{
    color: #7b934a !important;
}
.titleClass{
    font-size: 1.7vw;
    color: #ebc960;
}
.titleClass:hover{
    color: #7b934a !important;
    text-decoration: none !important;
}
</style>