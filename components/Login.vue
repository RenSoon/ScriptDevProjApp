<template>
    <div style="height:100vh;">
        <div class="d-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center" :class="BodyClass">
            <div class="d-flex flex-column">
                <div class="container-fluid">
                    <div :class="Card" class="card text-start border-0 d-flex">
                        <h1 class="text-center TitleHeader" style="width: 28vw;margin-bottom: 5%;">My Web Application<span class="tooltipText"><img src="/for_frodo.gif" style="width:22vw;" /></span></h1>
                        <div class="card-body d-flex flex-column align-items-center align-items-xxl-center CardBody">
                                <b-form-input class="InputField" id="Email" v-model="txtEmail" :state="CheckEmail" placeholder="enter email" type="email" aria-describedby="email-help"></b-form-input>
                                <b-form-invalid-feedback id="email-help" style="margin-left: 5vw;font-family: Ringbearer;">Invalid email</b-form-invalid-feedback>
                                <b-form-input class="InputField" id="Password" v-model="txtPword" :state="CheckPword" placeholder="enter password" type="password" aria-describedby="pword-help"></b-form-input>
                                <b-form-invalid-feedback id="pword-help" style="margin-left: 5vw;font-family: Ringbearer;">Password must be 8 characters or more</b-form-invalid-feedback>
                                <hr style="margin-top: 5%;width: 90%;background: var(--bs-primary);color: var(--bs-card-bg);">
                                
                                    <button @click="LoginClick" class="btn btn-primary login-button" style="">
                                        <NuxtLink to="/Dashboard" style="color: inherit;text-decoration: none;">Login</NuxtLink>
                                    </button>
                                
                        </div>
                        <a class="text-center forgotlink" style="width: 28vw;" @click="ForgotPass('Register Link Clicked')">Create an Account<span class="forgotlinkImg"><img src="/gimli.gif" style="width: 16vw;"/></span></a>
                        <a class="text-center forgotlink" style="width: 28vw;" @click="ForgotPass('Forgot Link Clicked')">Forgot Password?<span class="forgotlinkImg"><img src="/samwise_gamgee.gif" style="width: 16vw;"/></span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                Card: "Card",
                BodyClass: "BodyClass",
                txtEmail: "",
                txtPword: ""
            };
        },
        methods: {
            LoginClick() {
                let msg = "";
                let ttl = "";
                let vrnt = "";
                if (this.txtEmail == "" || this.txtPword == "") {
                    msg = "Please fill all fields.";
                    ttl = "Missing Fields";
                    vrnt = "danger";
                }
                else {
                    msg = "Email: " + this.txtEmail + "\r\nPassword: " + this.txtPword + "\r\nHello!!!";
                    ttl = "Success";
                    vrnt = "success";
                    this.ClearField();
                }
                this.$bvToast.toast(msg, {
                                    title: ttl,
                                    autoHideDelay: 3000,
                                    appendToast: false,
                                    variant: vrnt
                                    });
            },
            ClearField() {
                this.txtEmail = "";
                this.txtPword = "";
            },
            ForgotPass(text){
                alert(text);
            }
        },
        computed: {
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
            }
        }
}
</script>

<style scoped>
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
    ::placeholder{
        color: whitesmoke;
    }
    .CardBody{
        border-radius: 12px;
        filter: blur(0px);
        border: 2px solid #ebc960;
        backdrop-filter: blur(15px);
    }
    .TitleHeader{
        color: #d1d188;
        font-family: RingBearer;
        font-size: 2.5vw;

        
        position: relative;
        display: inline-block;
    }
    .TitleHeader:hover{
        cursor: pointer;
    }
    .TitleHeader .tooltipText{
        visibility: hidden;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 12px;
        position: absolute;
        z-index: 1;
        bottom: 150%;
        left: 50%;
        margin-left: -11vw;
    }
    .TitleHeader.tooltipText::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
    }
    .TitleHeader:hover .tooltipText{
        visibility: visible;
    }
    .TitleHeader:hover{
        color: #ebc960;
    }
    .login-button{
        margin-top: 5%;
        width: 15vw;
        height: 5.5vh;
        background: url(/Rivendell.png) center / cover no-repeat;
        color: #d9db86 !important;
        border-style: none;
        font-weight: bold;
        font-size: 1.5vw;
        font-family: Ringbearer;
    }
    .login-button:hover{
        color: #7b934a !important;
    }
    .forgotlink{
        font-family: Ringbearer;
        font-size: 1vw;
        margin-top: 5%;
        color: #d1d188;
    }
    .forgotlink:hover{
        
        cursor: pointer;
    }
    .forgotlink .forgotlinkImg{
        visibility: hidden;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 12px;
        position: absolute;
        z-index: 1;
        top: 100%;
        left: 50%;
        margin-left: -8vw;
    }
    .forgotlink .forgotlinkImg::after{
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: 10vw;
    }
    .forgotlink:hover .forgotlinkImg{
        color: #7b934a;
        cursor: pointer;
        visibility: visible;
    }
</style>

<style>
    .Card{
        background-color: transparent !important;
        background: transparent !important;
        height: fit-content;
        min-width: 30%;
        padding: 5px;
        border-radius: 12px;
    }
    .BodyClass{
        background-color: transparent !important;
        background: url(/Shire.jpg)  bottom / cover no-repeat;
        height: 100%;
        width: 100%;
    }
</style>
