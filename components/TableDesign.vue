<template>
    <div style="width: 100%; heigth: 80%;">
        <b-table striped hover :items="tableData" class="mytable"></b-table>
    </div>
</template>

<script>
    export default{
        name: "TableDesign",
        data(){
            return{
                tableData: [{username: "sbrendon", email: "brendon@mail.com", password: "bsamson"},
                            {username: "frodo", email: "frodo@mail.com", password: "baggins"},
                            {username: "gollum", email: "gollum@mail.com", password: "myprecious"}
                        ]
            }
        }
    }
</script>

<style scoped>
.mytable{
    font-size: 30%;
    backdrop-filter: blur(15px);
}
</style>