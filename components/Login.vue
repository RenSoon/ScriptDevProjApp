<template>
    <div style="height:100vh;">
        <div class="d-flex justify-content-center align-items-center justify-content-xxl-center align-items-xxl-center" :class="BodyClass">
            <div class="d-flex flex-column">
                <div class="container-fluid">
                    <div :class="Card" class="card text-start border-0 d-flex">
                        <h1 class="text-center TitleHeader" style="width: 28vw;margin-bottom: 5%;">My Web Application<span class="tooltipText"><img src="/for_frodo.gif" style="width:22vw;" /></span></h1>
                        <div class="card-body d-flex flex-column align-items-center align-items-xxl-center CardBody">
                                <input v-model="txtEmail" type="text" class="InputField" placeholder="Email">
                                <input v-model="txtPword" type="password" class="InputField" placeholder="Password">
                                <hr style="margin-top: 5%;width: 90%;background: var(--bs-primary);color: var(--bs-card-bg);">
                                <button @click="LoginClick" class="btn btn-primary login-button" style="">LOGIN</button>
                        </div>
                        <a class="text-center forgotlink" style="width: 28vw;" @click="ForgotPass('Register Link Clicked', false)">Create an Account<span class="forgotlinkImg"><img src="/gimli.gif" style="width: 16vw;"/></span></a>
                        <a class="text-center forgotlink" style="width: 28vw;" @click="ForgotPass('Forgot Link Clicked', true)">Forgot Password?<span class="forgotlinkImg"><img src="/samwise_gamgee.gif" style="width: 16vw;"/></span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>15vh;

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
                if (this.txtEmail == "" || this.txtPword == "") {
                    alert("Please fill all fields.");
                }
                else {
                    alert("Email: " + this.txtEmail + "\r\nPassword: " + this.txtPword + "\r\nHello!!!");
                    this.ClearField();
                }
            },
            ClearField() {
                this.txtEmail = "";
                this.txtPword = "";
            },
            ForgotPass(text, page){
                alert(text);
                if(page)
                {
                    this.$router.push('/2ndPage');
                }
                else
                {
                  this.$router.back();
                }
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
        font-family: Ringbearer;
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
        color: #d9db86;
        border-style: none;
        font-weight: bold;
        font-size: 1.5vw;
        font-family: Ringbearer;
    }
    .login-button:hover{
        color: #7b934a;
    }
    .forgotlink{
        font-family: Ringbearer;
        font-size: 1vw;
        margin-top: 5%;
        color: #d1d188
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
