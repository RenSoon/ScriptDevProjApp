<template>
    <div style="width: 100%; heigth: 80%;">
        <div class="row d-flex flex-column ">
            <div class="col" style="font-size: 1vw; justify-content: center; align-items: center;">
                <div class="row  d-flex flex-row" style="justify-content: center; align-items: center;">
                    <div class="col-2">
                        <b-form-input v-b-tooltip.hover title="SearchID"  id="SearchID" v-model="SID" placeholder="enter id" type="text" aria-describedby="name-help"></b-form-input>
                    </div>
                    <div class="col-2">
                        <b-button @click="SearchID" v-b-tooltip.hover title="Search User ID" variant="success">Search User ID</b-button>
                    </div>
                    <div class="col">
                        <b-button @click="AddClick" v-b-tooltip.hover title="Add User" variant="success">Add User</b-button>
                    </div>
                </div>
            </div>
            <div class="col" style="margin-top: 4vh;">
                <b-table sticky-header="50vh" style="overflow-x: hidden;" head-variant="light" no-border-collapse borderless striped hover :items="tableData" :fields="fields" class="mytable">
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
            </div>
        </div>
        <b-modal ref="FormModal" hide-footer v-bind:title="modalTitle" v-model="showModal">
            <div class="card-body d-flex flex-column align-items-center align-items-xxl-center CardBody">
                <div :class="{isHidden : isAdding}" style="display: flex; flex-direction: row; justify-content: start; align-items: center; font-family: Ringbearer;">
                    <b style="margin-right: 1.5vw; font-size: 1vw;">ID No.:</b> 
                    <b-form-input v-b-tooltip.hover style="width: 5vw; font-size: 1.5vw; padding: .25vw; height: fit-content;" id="tablIDeItem.id" v-model="tableItem.id" readonly placeholder="User ID" type="text"></b-form-input>
                </div>
                <b-form-group>
                    <b-form-input v-b-tooltip.hover title="Name" class="InputField" id="Name" v-model="tableItem.name" :state="CheckUname" placeholder="Enter Name" type="text" aria-describedby="name-help"></b-form-input>
                    <b-form-invalid-feedback id="name-help" style="font-family: Ringbearer;">name must be atleast 3 characters long</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group>
                    <b-form-input v-b-tooltip.hover title="Email Address" class="InputField" id="Email" v-model="tableItem.email" :state="CheckEmail" placeholder="Enter Email" type="email" aria-describedby="email-help"></b-form-input>
                    <b-form-invalid-feedback id="email-help" style="font-family: Ringbearer;">Invalid email</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group>
                    <div style="display: flex; flex-direction: row; align-items: center;">
                        <div control is-expanded>
                            <b-form-input v-b-tooltip.hover title="Password" style="width: 19vw;" class="InputField" id="Password" v-model="tableItem.password" :state="CheckPword" placeholder="Enter Password" v-bind:type="type" aria-describedby="pword-help"></b-form-input>
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
                    <b-form-input v-b-tooltip.hover title="Repeat Password" class="InputField" id="RPassword" v-model="txtRPword" :state="CheckRPword" placeholder="Confirm Password" type="password" aria-describedby="rpword-help"></b-form-input>
                    <b-form-invalid-feedback id="rpword-help" style="font-family: Ringbearer;">Password does not match</b-form-invalid-feedback>
                </b-form-group>
                <hr style="margin-top: 5%;width: 90%;background: var(--bs-primary);color: var(--bs-card-bg);">
                <b-button :class="{isHidden : !isAdding}" @click="RegisterClick(false)" variant="primary" style="font-family: RingBearer; text-transform: uppercase;">
                    Add
                </b-button>
                <b-button :class="{isHidden : isAdding}" @click="RegisterClick(true)" variant="primary" id="BtnUpdate" style="font-family: RingBearer; text-transform: uppercase;">Update</b-button>
            </div>
        </b-modal>
        <b-modal ref="ForConfirm" hide-footer title="Confirm Account Deletion" v-model="delCon">
            <div class="d-flex" style="justify-content: center; align-items: center;">
                <p>
                    Do you want to proceed deleting<br>
                    Account for <b>{{ delName }}</b><br>
                    with <b>ID: {{delID}}</b>
                </p>
            </div>
            <hr />
            <div class="d-flex flex-row" style="justify-content: center; align-items: center;">
                <b-button @click="DeleteConfirm(false)" variant="primary">Cancel</b-button>
                <div style="width: 4vw;"></div>
                <b-button @click="DeleteConfirm(true)" variant="warning"><b>Proceed</b></b-button>
            </div>
        </b-modal>
    </div>
</template>
<script>
const url = 'http://localhost:3002/accounts/';
    export default{
        name: 'TableDesign',
        data(){
            return{
                new_data: [],
                fields: [{key: "id", sortable: true}, {key: 'name', sortable: true},{key: 'email', sortable: true}, 'password', 'actions'],
                tableItem: {id: "", name: "", email: "", password: ""},
                tableData: [],
                tableRow: 0,
                txtRPword: "",
                modalTitle: "Add User",
                showModal: false,
                isAdding: false,
                showPassword: false,
                type: 'password',
                source: "/hide.png",
                SID: "",
                id: 0,
                delCon: false,
                delID: 0,
                delName: ""
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
                this.tableItem["id"] = this.id;
            },
            async DeleteConfirm(res){
                this.delCon = false;
                if(res)
                {
                    await this.$axios.$post(url + 'delete', {id: this.delID})
                    .then((res) => {
                    this.$bvToast.toast("Account with ID: " + this.delID + " Deleted Successfully", {
                                    title: "Account Deletion",
                                    autoHideDelay: 3000,
                                    appendToast: false,
                                    variant: "success"
                                    });
                    console.log(res);
                })
                .catch((err) => {
                    this.$bvToast.toast("Failed to Delete Account with ID: " + this.delID + "", {
                                    title: "Account Deletion",
                                    autoHideDelay: 3000,
                                    appendToast: false,
                                    variant: "danger"
                                    });
                    console.log(err)
                });
                this.GetAllAccount();
                }
            },
            DeleteClick(item){
                this.delCon = true;
                this.delID = item.id;
                this.delName = item.name;
            },
            EditClick(item, index){
                // this.$refs['FormModal'].show();
                this.showPassword = false;
                this.source = "/hide.png";
                this.isAdding = false;
                this.showModal = true;
                this.tableItem = {id: item["id"], name: item["name"], email: item["email"], password: item["password"]};
                this.modalTitle = "Update User Information";
                this.tableRow = index;
                this.type = "password";
            },
            async RegisterClick(updating) {
                let msg = "";
                let ttl = "";
                let vrnt = "";
                if (this.tableItem.email == "" || this.tableItem.password == "" || this.tableItem.name == "" || this.txtRPword == "") {
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
                    msg = "Name: " + this.tableItem.name + " Email: " + this.tableItem.email + " Password: " + this.tableItem.password + " RPassword: " + this.txtRPword;
                    if(updating){
                        await this.$axios.$post(url + 'update', this.tableItem)
                        .then((res) => {
                            vrnt = "success";
                            ttl = "Success Updating User Account";
                        })
                        .catch((err) => {
                            vrnt = "danger";
                            ttl = "Failed Updating User Account";
                        });
                    }
                    else
                    {
                        await this.$axios.$post(url + 'new', this.tableItem)
                        .then((res) => {
                            vrnt = "success";
                            ttl = "Success Adding User Account";
                            console.log(res)
                        })
                        .catch((err) => {
                            vrnt = "danger";
                            ttl = "Failed Adding User Account";
                            console.log(err)
                        });
                    }
                    this.GetAllAccount();
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
                this.tableItem = {id: "", name: "", email: "", password: ""};
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
            },
            async SearchID(){
                var hasValue = false;
                if(this.SID.length > 0)
                {
                    await this.$axios.$get(url + this.SID)
                    .then((res) => {
                        console.log(res);
                        this.showPassword = false;
                        this.SID = "";
                        this.source = "/hide.png";
                        this.isAdding = false;
                        this.showModal = true;
                        this.tableItem = {id: res["id"], name: res["name"], email: res["email"], password: res["password"]};
                        this.modalTitle = "Update User Information";
                        this.type = "password";
                        hasValue = true;
                    })
                    .catch((err) => {
                        this.$bvToast.toast("Account ID Not Found on Database", {
                                    title: "Account ID",
                                    autoHideDelay: 3000,
                                    appendToast: false,
                                    variant: "danger"
                                    });
                    });
                }
            },
            async GetAllAccount(){
                var data = [];
                await this.$axios.$get(url)
                    .then((res) => {
                        console.log("Response");
                        console.log(res);
                        this.tableData = res;
                        this.GetCurrentID();
                    });
                    // this.tableData = data;
                    // console.log(data);
            },
            async GetCurrentID(){
                this.id = Math.max.apply(Math, this.tableData.map(function(o) { return o.id; })) + 1;
            }
        },
        computed: {
            CheckUname(){
                if(this.tableItem.name.length == 0)
                {
                    return null;
                }
                return this.tableItem.name.length >= 3 ? true : false;
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
        },
     mounted(){
            // async LoadTable(){
                this.GetAllAccount();
            // },  
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
    font-family: ExoLight;
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
    color: black;
    font-family: ExoBold;
    font-style: bold;
    background: goldenrod !important;
    font-size: inherit !important;
  }
</style>