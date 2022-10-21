<template>
    <div style="width: 100%; heigth: 80%;">
        <b-table striped hover :items="tableData" :fields="fields" class="mytable">
            <template v-slot:cell()="{ value, item, field: { key }}">
                <template v-if="!item.isEditing">{{ value }}</template>
              <b-form-input v-else v-model="item[key]" />
            </template>

            <template v-slot:cell(actions)="{ item }">
                <div class="row">
                    <div class="col">
                        <b-button @click="DeleteClick(item)" variant="danger">Delete</b-button>
                    </div>
                    <div class="col">
                        <b-button @click="EditClick(item)" variant="primary">Edit</b-button>
                    </div>
                </div>
            </template>
        </b-table>
    </div>
</template>

<script>
let id = 0;
    export default{
        name: "TableDesign",
        data(){
            return{
                new_data: [],
                action: "Edit",
                fields: [{key: 'username', sortable: true},{key: 'email', sortable: true}, 'password', 'actions'],
                tableData: [{id: id++, username: "sbrendon", email: "brendon@mail.com", password: "bsamson"},
                            {id: id++, username: "frodo", email: "frodo@mail.com", password: "baggins"},
                            {id: id++, username: "gollum", email: "gollum@mail.com", password: "myprecious"}
                        ]
            }
        },
        methods:{
            DeleteClick(item){
                this.tableData = this.tableData.filter((t) => t !== item);
            },
            EditClick(item){
                if(item.isEditing)
                {
                    this.$set(item, 'isEditing', false);
                    this.$set(item, 'variant', 'info');
                }
                else
                {
                    this.$set(item, 'isEditing', true);
                    
                    this.$set(item, 'variant', 'info');
                }
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