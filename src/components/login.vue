<template>
    <div class="tex" >
        <div class="head"><h1>Welcome to Chat App</h1>
        <h2>Register your number</h2></div>
        <br><br>
        <form class="detail-box my-5" @submit.prevent="submit">
      <div class="form-group my-3">
            <div>
                <label for="phonenumber" id="phone">Phone Number</label>
            </div>
            <div>
                <input type="tel"
                    id="phonenumber"                    
                    maxlength="13"
                    required
                    v-model="phoneNumber"
                     class="form-control mb-4 mt-4"
                    placeholder="+91 NUMBER"
                    title="Enter Phone number with the code"
                >
            </div>
            <br>
            <div id="recaptcha-container" style="background-color:#1b1a1a;width:300px;margin:auto;">
            </div>
            <br>
            <div>
                <button
          
          type="submit"
         id="log-in"
          class="btn btn-danger"
        >Login</button>
                
            </div>
      </div>
      
        
        <div v-if="smsSent" id="sms">
            <div>
            <label id="otp">Enter OTP</label>
            </div>
            <br>
            <div>
                <input type="text" 
                id="otpField"
                style="text-align:center;"
                pattern="[0-9]{6}"
                maxlength="6"
                v-model="otpnum"
                placeholder="Enter OTP"
                required>
            </div>
            <br>
            <div>
                <button class="btn btn-secondary" @click="verifyCode" id="otp-btn">Confirm</button>
            </div>
        </div>
          </form>
    </div>    
</template>

<script>
import firebase from 'firebase'
import firebaseApp from '../services/firebase'
import Vue from 'vue'
export default {
    name:"login",
    data() {
      return {
        phoneNumber:null, 
        confirmationResult:null,
        otpnum:null,
        recaptchaVerifier:null,
        recaptchaWidgetId:null,
        confirmResult:null,
        smsSent:false,
        isregister:false
      }
    },
    mounted()
    {
        firebaseApp.auth().useDeviceLanguage()
        this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('log-in',{
            'size':'invisible',
            'callback':() => {
           
            }
        })  

        console.log("mounted methods")
        
    },
    methods:{

async getlist(){
console.log("snjabfkasbafjas fa ff ")
const result= await firebaseApp.firestore().collection('users').get();
console.log("result")
console.log(result.docs)
if(result.docs.length>0){
    let listuser=[]
    listuser=[...result.docs]

    
    listuser.forEach((item)=>{
        if(item.data().number===this.phoneNumber){
            Vue.toasted.show("Number is already registered")
             this.$store.dispatch('setuid',item.data().uid)
                this.$store.dispatch("setnum",this.phoneNumber)
                    this.$store.dispatch("setcurrentusername",item.data().name)
    this.$store.dispatch("setuserprofile",item.data().photourl)
    this.$store.dispatch("setdescription",item.data().description)
                        localStorage.setItem('phonenumber',this.phoneNumber)
                           localStorage.setItem('name',item.data().name)
                              localStorage.setItem('desrip',item.data().description)
                               localStorage.setItem('id',item.data().uid)
    
    localStorage.setItem('photopic',item.data().photourl)


this.isregister=true;
                this.$router.replace('/chat')
        }
})}

}
        ,
        submit()
        {


   


this.getlist()

if(!this.isregister){
console.log("is recaptha is calling")
            this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
            this.recaptchaVerifier.render().then((widgetId)=>{
            this.recaptchaWidgetId = widgetId    
            })
            
            var number = this.phoneNumber            
            firebase.auth().signInWithPhoneNumber(number,this.recaptchaVerifier)
            .then((confirmationResult)=>{                
                this.confirmResult = confirmationResult
                console.log(this.confirmResult)
               Vue.toasted.show("Otp is send to your registered number")
                this.smsSent=true
        
            })
            .catch((error)=>{
                if(!this.isregister){
                  Vue.toasted.show(error.message)
                }
              
               
            })
        }},
        verifyCode()
        {   if(this.otpnum==null){
     Vue.toasted.show("Please enter the otp")
     return
  }         
            this.confirmResult.confirm(this.otpnum)
            .then((result)=>{
                Vue.toasted.show("Registration Successfull!!")
                // this.gotonext()
                var user = result.user
                 console.log("user:",user.uid)     
                this.$store.dispatch('setuid',user.uid)
                this.$store.dispatch("setnum",this.phoneNumber)
                        localStorage.setItem('phonenumber',this.phoneNumber)
                this.$router.replace('/profile')
                console.log(user)                
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        
    },    
}
</script>
<style  scoped>
input[type="tel"] {
  margin: 0 auto;
  width: 80%;
}
.detail-box {
  padding: 5px;
  border: 2px solid green;
  width: 400px;
  min-height: 250px;
  margin: 0 auto;
  background: hsl(28, 73%, 71%);
  padding-bottom: 10px;
  border-radius:20px;
}
h2 {
    margin-top:20px;
  color: #009688;
  font-weight: 600;
}
h1{
    font-weight: bold;
    color:#009688;
}
#sms{
    background-color:rgb(124, 179, 179);
    width:300px;
    height:180px;
    margin: auto; border-radius:10px;
    border: 1px solid white;
    
}
.head{
    margin: 0 auto;
   
    width: 100%;
}
#otp{
    font-family:system-ui;font-size: x-large;
    color:whitesmoke;
    padding-top: 5px;
}
#log-in{
    font-weight: 600px;
    width:60%;
}
#phone{
    font-family:system-ui;font-size: x-large;
    color:#ffff;
    font-weight: 500;
}
.tex{
    margin-top:40px;
    text-align: center;
}
</style>