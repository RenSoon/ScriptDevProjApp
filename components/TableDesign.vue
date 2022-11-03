<template>
    <div style="width: 100%; heigth: 80%;">
        <b-button @click="AddClick" v-b-tooltip.hover title="Add User" variant="success">Add User</b-button>
        <b-table sticky-header="50vh" style="overflow-x: hidden;" borderless striped hover :items="tableData" :fields="fields" class="mytable">
            <template v-slot:cell(actions)="{ item, index }">
                <div class="row">
                    <div class="col">
                        <b-button v-b-tooltip.hover title="Delete User" @click="DeleteClick(item)" variant="warning"><img src="/delete.png" style="width: 1.5vw; height: 1.5vw;" /></b-button>
                    </div>
                    <div class="col">
                        <b-button v-b-tooltip.hover title="Edit User Info" @click="EditClick(item, index)" variant="info"><img src="/edit.png" style="width: 1.5vw; height: 1.5vw;" /></b-button>
                    </div>
                </div>
            </template>
        </b-table>
        

        <b-modal ref="FormModal" hide-footer v-bind:title="modalTitle" v-model="showModal">
            <div class="card-body d-flex flex-column align-items-center align-items-xxl-center CardBody">
                <div :class="{isHidden : isAdding}" style="display: flex; flex-direction: row; justify-content: start; align-items: center; font-family: Ringbearer;">
                    <b style="margin-right: 1.5vw; font-size: 1vw;">ID No.:</b> 
                    <b-form-input v-b-tooltip.hover style="width: 5vw; font-size: 1.5vw; padding: .25vw; height: fit-content;" id="tablIDeItem.id" v-model="tableItem.id" readonly placeholder="User ID" type="text"></b-form-input>
                </div>
                <b-form-group>
                    <b-form-input v-b-tooltip.hover title="Username" class="InputField" id="Name" v-model="tableItem.username" :state="CheckUname" placeholder="enter username" type="text" aria-describedby="name-help"></b-form-input>
                    <b-form-invalid-feedback id="name-help" style="font-family: Ringbearer;">name must be atleast 3 characters long</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group>
                    <b-form-input v-b-tooltip.hover title="Email Address" class="InputField" id="Email" v-model="tableItem.email" :state="CheckEmail" placeholder="enter email" type="email" aria-describedby="email-help"></b-form-input>
                    <b-form-invalid-feedback id="email-help" style="font-family: Ringbearer;">Invalid email</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group>
                    <div style="display: flex; flex-direction: row; align-items: center;">
                        <div control is-expanded>
                            <b-form-input v-b-tooltip.hover title="Password" style="width: 19vw;" class="InputField" id="Password" v-model="tableItem.password" :state="CheckPword" placeholder="enter password" v-bind:type="type" aria-describedby="pword-help"></b-form-input>
                            <b-form-invalid-feedback id="pword-help" style="font-family: Ringbearer;">Password must be 8 characters or more</b-form-invalid-feedback>
                        </div>
                        <div class="control">
                            <b-button variant="info" class="button" @click="toggleShow" style="padding: 3px; width:fit-content; height: fit-content;">
                                <span >
                                    <img v-bind:src="source" style="width: 1.6vw;"/>
                                </span>
                            </b-button>
                        </div>
                    </div>
                    
                </b-form-group>
                <b-form-group>
                    <b-form-input v-b-tooltip.hover title="Repeat Password" class="InputField" id="Password" v-model="txtRPword" :state="CheckRPword" placeholder="confirm password" type="password" aria-describedby="rpword-help"></b-form-input>
                    <b-form-invalid-feedback id="rpword-help" style="font-family: Ringbearer;">Password does not match</b-form-invalid-feedback>
                </b-form-group>
                
                
                <hr style="margin-top: 5%;width: 90%;background: var(--bs-primary);color: var(--bs-card-bg);">
                <b-button :class="{isHidden : !isAdding}" @click="RegisterClick(false)" variant="primary" style="font-family: ExoBold; text-transform: uppercase;">
                    Add
                </b-button>
                <b-button :class="{isHidden : isAdding}" @click="RegisterClick(true)" variant="primary" id="BtnUpdate" style="font-family: ExoBold; text-transform: uppercase;">Update</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { timeStamp } from 'console';

let id = 0;
    export default{
        name: 'TableDesign',
        data(){
            return{
                new_data: [],
                fields: [{key: 'username', sortable: true},{key: 'email', sortable: true}, 'password', 'actions'],
                tableData: [{id: id++, username: "sbrendon", email: "brendon@mail.com", password: "bsamsons"},
                            {id: id++, username: "frodo", email: "frodo@mail.com", password: "bagginss"},
                            {id: id++, username: "gollum", email: "gollum@mail.com", password: "myprecious"}
                        ],
                tableItem: {id: "", username: "", email: "", password: ""},
                tableRow: 0,
                txtRPword: "",
                modalTitle: "Add User",
                showModal: false,
                isAdding: false,
                showPassword: false,
                type: 'password',
                source: "/hide.png"
            }
        },
        methods:{
            AddClick(){
                // this.$refs['FormModal'].show();
                this.ClearField();
                this.showPassword = false;
                this.source = "/hide.png";
                this.modalTitle = "Add User";
                this.showModal = true;
                this.isAdding = true;
                if(this.id != this.tableData.length)
                {
                    this.id = this.tableData.length;
                }
                this.tableItem["id"] = id;
            },
            DeleteClick(item){
                this.tableData = this.tableData.filter((t) => t !== item);
            },
            EditClick(item, index){
                // this.$refs['FormModal'].show();
                this.showPassword = false;
                this.source = "/hide.png";
                this.isAdding = false;
                this.showModal = true;
                this.tableItem = {id: item["id"], username: item["username"], email: item["email"], password: item["password"]};
                this.modalTitle = "Update User Information";
                this.tableRow = index;
                this.type = "password";
            },
            RegisterClick(updating) {
                let msg = "";
                let ttl = "";
                let vrnt = "";
                if (this.tableItem.email == "" || this.tableItem.password == "" || this.tableItem.username == "" || this.txtRPword == "") {
                    msg = "Please fill all fields.";
                    ttl = "Missing Fields";
                    vrnt = "warning";
                }
                else if(this.tableItem.password.length < 8 || this.txtRPword.length < 8)
                {
                    ttl = "Password";
                    msg = "Password must atleast be 8 characters long.";
                    vrnt = "danger";
                }
                else if(this.tableItem.password != this.txtRPword)
                {
                    ttl = "Password Mismatch";
                    msg = "Password confirmation do not match original password.";
                    vrnt = "danger";
                }
                else {
                    msg = "Username: " + this.tableItem.username + " Email: " + this.tableItem.email + " Password: " + this.tableItem.password + " RPassword: " + this.txtRPword;
                    vrnt = "success";
                    if(updating){
                        this.tableData[this.tableRow].username = this.tableItem.username;
                        this.tableData[this.tableRow].email = this.tableItem.email;
                        this.tableData[this.tableRow].password = this.tableItem.password;
                        ttl = "Success Updating User Information";
                    }
                    else
                    {
                        this.tableData.push(this.tableItem);
                        ttl = "Success Adding User";
                    }
                    
                    this.showModal = false;
                    this.ClearField();
                    this.isAdding = false;
                }
                
                this.$bvToast.toast(msg, {
                                    title: ttl,
                                    autoHideDelay: 3000,
                                    appendToast: false,
                                    variant: vrnt
                                    });
            },
            UpdateClick(){
                alert('update clicked');
            },
            ClearField() {
                this.tableItem = {id: "", username: "", email: "", password: ""};
                this.txtRPword = "";
                this.type = "password";
            },
            toggleShow() {
                if(this.showPassword)
                {
                    this.type = "text";
                    this.source = "/show.png";
                }
                else
                {
                    this.type = "password";
                    this.source = "/hide.png";
                }
                this.showPassword = !this.showPassword;
            }
        },
        computed: {
            CheckUname(){
                if(this.tableItem.username.length == 0)
                {
                    return null;
                }
                return this.tableItem.username.length >= 3 ? true : false;
            },
            CheckEmail(){
                if(this.tableItem.email.length == 0)
                {
                    return null;
                }
                return this.tableItem.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? true:false;
            },
            CheckPword(){
                if(this.tableItem.password.length == 0)
                {
                    return null;
                }
                return this.tableItem.password.length >= 8 ? true : false;
            },
            CheckRPword(){
                if(this.txtRPword.length == 0)
                {
                    return null;
                }
                return this.tableItem.password == this.txtRPword ? true : false;
            },
            ClosedModal(){
                this.modalTitle = "Add User";
            }
        }
    }
</script>

<style>
.mytable{
    font-size: 30%;
    backdrop-filter: blur(15px);
    width: 70vw;
}
.isHidden{
    display: none;
}
.InputField{
    margin-top: 5%;
    width: 21vw;
    border: none;
    border-bottom: 3px solid #6a8b4b;
    padding-left: 15px;
    height: 5vh;
    font-size: 1.1vw;
    font-family: Ringbearer;
    color: #ebc960;
    background-color: transparent;
}

.b-table tbody tr:hover td, .b-table tbody tr:hover th {
    color: black;
    font-family: ExoBold;
    background: gainsboro;
}
.b-table tr td {
    color: white;
    font-family: ExoLight;
    font-size: 1.3vw;
}
.b-table-sticky-header > .table.b-table > thead > tr > th {
    position: sticky !important;
    background: inherit;
    color: black;
    font-family: ExoBold;
    font-style: bold;
  }
</style>