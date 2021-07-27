<template>
<div class="tex">
<h2 class="fw-600 mt-3 heading">Welcome to Profile section</h2>
  <div class="detail-box">
    
    <div v-if="!getprofile" class="profile back">
      <img class="br-06 rounded-circle" :src="photoURL" alt=" " width="100%" height="80%" />
      <label class="avatar">
        <font-awesome-icon icon="pencil-alt" />
        <input type="file" name="upload" class="w-0" @change="changeAvatar" />
      </label>
    </div>
    
    <div v-else class="profile1 ">
      <img class="br-06 rounded-circle" :src="currentprofilepic" alt=" " width="100%" height="100%" />
   
    </div>
<div>

    <div class="form-group">
      <label id="name">Name</label>
      <input v-if="!getprofile" type="text"  id ="name" name="name" class="form-control " v-model="name" />
    

<input v-else class="form-control" type="text" :value="currentusername"  id="name" disabled readonly>
    </div>
    <div class="form-group">
      <label id="des">Write about yourself</label>
      <input v-if="!getprofile" type="text"  id ="des" name="aboutMe" class="form-control" v-model="aboutMe" />
 
 <input v-else class="form-control" id="des" type="text" :value="description"  disabled readonly>
  </div>
</div>

    <button type="button" class="btn btn-danger" v-on:click="uploadAvatar">Save</button>
    <button v-if="getprofile" type="button" class="btn btn-danger" v-on:click="goback">Back</button>
  </div>
</div>
</template>



<script>
import Vue from 'vue'
import {mapGetters} from 'vuex'
import firebaseApp from '../services/firebase'
    export default {
        data(){
          return{
            name:'',
            aboutMe:'',
            profilepic:'',
            photoURL:''
          }
        },
        computed:{
...mapGetters(['currentusername','currentprofilepic','description','getuid','getnum','getprofile'])
        },
        
        methods:{
          goback(){
this.$store.dispatch("setisprofile",false)
this.$router.replace('/chat')
          },
          loaddata(){

            let nam=localStorage.getItem('name')
let pic=localStorage.getItem('photopic');
let des=localStorage.getItem('descrip')
let uid=localStorage.getItem('id')
let num=localStorage.getItem('phonenumber')
this.name=nam
this.PhotoURL=pic
this.aboutMe=des

this.$store.dispatch("setcurrentusername",nam)
    this.$store.dispatch("setuserprofile",pic)
    this.$store.dispatch("setdescription",des)
     this.$store.dispatch("setnum",num)
        this.$store.dispatch("setuid",uid)

          }
,
         
changeAvatar(event){
  if(event.target.files && event.target.files[0]){
    const filetype=event.target.files[0].type.toString();
    console.log(filetype)
    if(filetype.indexOf("image")!=0){
       Vue.toasted.show("Please Select an image")
       return
    }
    this.profilepic=event.target.files[0]
    this.photoURL=URL.createObjectURL(event.target.files[0])
  }

  else{
     Vue.toasted.show("Please Select an image")
  }
},
 uploaddata(){
  const name=this.name
  const des=this.aboutMe
  const url=this.photoURL
   firebaseApp.firestore().collection('users').doc(this.getuid).set({
     uid:this.getuid,
name,
description:des,
photourl:url,
number:this.getnum
  }).then(()=>{
    localStorage.setItem('id',this.getuid)
    localStorage.setItem('name',this.name)
    localStorage.setItem('photopic',this.photoURL)
    localStorage.setItem('descrip',this.aboutMe)
    this.$store.dispatch("setcurrentusername",name)
    this.$store.dispatch("setuserprofile",url)
    this.$store.dispatch("setdescription",des)
    console.log("name:",localStorage.getItem('name'))
    console.log("class:",localStorage.getItem('photopic'))
    
    Vue.toasted.show("Profile is saved")
    this.$router.replace('/')
  })
  
},
uploadAvatar(){
if(this.profilepic)
{
 const upload= firebaseApp.storage().ref().child("profilepic").child(this.getuid).put(this.profilepic);
 upload.on(
   "state_changed",
   null,
   err=>{
     Vue.toasted.show(err.message)
   },()=>{
upload.snapshot.ref.getDownloadURL().then(url=>{
this.photoURL=url
}).then(res=>{
  console.log(res)
  this.uploaddata()
});
   }
 )
}


},


        },

        mounted(){
          if(this.getuid==null){
this.loaddata();
          }
          else {
console.log("monted profile")
          }

        },
    }
</script>





<style scoped>

.detail-box {
  padding: 5px;
  border: 2px solid green;
  width: 500px;
  min-height: 250px;
  margin: 0 auto;
  background:#e4e1de;
  
  border-radius: 15px;
}
input[type="text"] {
  margin: 0 auto;
  width: 25%;
}
label {
  font-size: 18px;
  font-weight: 600;
}
.fw-600 {
  font-weight: 600;
}
.w-100 {
  width: 100vw;
}
.w-0 {
  width: 0;
}
.br-06 {
  border-radius: 0.6rem;
}
.profile {
  margin: 20px auto;
  width: 150px;
  height: 150px;
  background-color: whitesmoke;
  position: relative;
  border-radius: 0.6rem;
}
/* .setwidth{
  background-color: #ffff;
  width: 80px;
} */
.profile1 {
  margin: 20px auto;
  width: 110px;
  height: 110px;
  background-color: whitesmoke;
  position: relative;
  border-radius: 0.6rem;
}
.avatar {
  width: 35px;
  height: 35px;
  background: #f46e13;
  border-radius: 0.6rem;
  position: absolute;
  top: 115px;
  right: 0px;
  padding: 2px 0px 0px 7px;
}
.form-group{
    margin-bottom: 15px;
}
button{
    margin-right: 10px;
    margin-top: 10px;
     width: 25%;
}
#name{
    margin-bottom: 10px;
    width: 40%;
}
.name{
  height:40px;
  background-color: #ffff;
}
#des{
      margin-bottom: 10px;
       width: 40%;
}
.back{
background-color: #ffff;

}
.heading{
  color:#009688;
    margin-bottom:50px;
}
.tex{
  margin-top:20px;

}
/* .text_showname{
  height:40px;
  width: 180px;
  background-color: #fff;
  padding-top: 10px;
  margin-bottom: 10px;
}

.text_showdes{
  height:40px;
  width: 180px;
  background-color: #fff;
  padding-top: 10px;
  margin-bottom: 10px;
} */


</style>

