<template>
    <div style="height:100vh;font-family: Ringbearer;background: url(/middle_earth.jpg)  center / cover no-repeat">
        <div class="d-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center" style="height: inherit;width: inherit;">
            <div class="d-flex flex-column">
                <div class="container-fluid myClass">
                    <p id="TextHead">This is the Dashboard Page</p>
                    <b-tooltip target="TextHead" triggers="hover" placement="top" noninteractive html="false" ><b-img fluid-grow src="/for_frodo.gif"/></b-tooltip>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'Dashboard'
}
</script>

<style scoped>
.myClass{
    color: #d9db86 !important;
    font-size: 5vw;
    font-family: Ringbearer;
}
</style>