<template>
    <div style="width: 100%; heigth: 80%;">
        <b-button @click="AddClick">Add</b-button>
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
        <b-modal ref="my-modal" hide-footer title="Add a User">
            <div class="card-body d-flex flex-column align-items-center align-items-xxl-center CardBody">
                <b-form-group>
                    <b-form-input class="InputField" id="Name" v-model="txtUname" :state="CheckUname" placeholder="enter username" type="text" aria-describedby="name-help"></b-form-input>
                    <b-form-invalid-feedback id="name-help" style="font-family: Ringbearer;">name must be atleast 3 characters long</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group>
                    <b-form-input class="InputField" id="Email" v-model="txtEmail" :state="CheckEmail" placeholder="enter email" type="email" aria-describedby="email-help"></b-form-input>
                    <b-form-invalid-feedback id="email-help" style="font-family: Ringbearer;">Invalid email</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group>
                    <b-form-input class="InputField" id="Password" v-model="txtPword" :state="CheckPword" placeholder="enter password" type="password" aria-describedby="pword-help"></b-form-input>
                    <b-form-invalid-feedback id="pword-help" style="font-family: Ringbearer;">Password must be 8 characters or more</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group>
                    <b-form-input class="InputField" id="Password" v-model="txtRPword" :state="CheckRPword" placeholder="confirm password" type="password" aria-describedby="rpword-help"></b-form-input>
                    <b-form-invalid-feedback id="rpword-help" style="font-family: Ringbearer;">Password does not match</b-form-invalid-feedback>
                </b-form-group>
                
                
                <hr style="margin-top: 5%;width: 90%;background: var(--bs-primary);color: var(--bs-card-bg);">
                <button @click="RegisterClick" class="btn btn-primary login-button" style="">
                    <NuxtLink to="/" style="color: inherit;text-decoration: none;">Register</NuxtLink>
                </button>
            </div>
        </b-modal>
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
                        ],
                txtUname: "",
                txtEmail: "",
                txtPword: "",
                txtRPword: ""
            }
        },
        methods:{
            AddClick(){
                this.$refs['my-modal'].show();
            },
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
            },
            RegisterClick() {
                let msg = "";
                let ttl = "";
                let vrnt = "";
                if (this.txtEmail == "" || this.txtPword == "" || this.txtUname == "" || this.txtRPword == "") {
                    msg = "Please fill all fields.";
                    ttl = "Missing Fields";
                    vrnt = "warning";
                }
                else if(this.txtPword.length < 8 || this.txtRPword.length < 8)
                {
                    ttl = "Password";
                    msg = "Password must atleast be 8 characters long.";
                    vrnt = "danger";
                }
                else if(this.txtPword != this.txtRPword)
                {
                    ttl = "Password Mismatch";
                    msg = "Password confirmation do not match original password.";
                    vrnt = "danger";
                }
                else {
                    msg = "Username: " + this.txtUname + " Email: " + this.txtEmail + " Password: " + this.txtPword + " RPassword: " + this.txtRPword;
                    ttl = "Success";
                    vrnt = "success";
                    this.tableData.push({id: id++, username: this.txtUname, email: this.txtEmail, password: this.txtPword});
                    this.ClearField();
                    this.$refs['my-modal'].hide();
                }

                
                this.$bvToast.toast(msg, {
                                    title: ttl,
                                    autoHideDelay: 3000,
                                    appendToast: false,
                                    variant: vrnt
                                    });
            },
            ClearField() {
                this.txtUname = "";
                this.txtEmail = "";
                this.txtPword = "";
                this.txtRPword = "";
            },
            ForgotPass(text){
                alert(text);
            }
        },
        computed: {
            CheckUname(){
                if(this.txtUname.length == 0)
                {
                    return null;
                }
                return this.txtUname.length >= 3 ? true : false;
            },
            CheckEmail(){
                if(this.txtEmail.length == 0)
                {
                    return null;
                }
                return this.txtEmail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? true:false;
            },
            CheckPword(){
                if(this.txtPword.length == 0)
                {
                    return null;
                }
                return this.txtPword.length >= 8 ? true : false;
            },
            CheckRPword(){
                if(this.txtRPword.length == 0)
                {
                    return null;
                }
                return this.txtPword == this.txtRPword ? true : false;
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