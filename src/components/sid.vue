<template>
<div class="main-container">
 <div class="container-fluid sub-container">
     <div class="back-top"></div>
     <div class="back-main"></div>
 </div>
 <div class="container sub-container1">
   <div class="row chat-head ">
       <div class="col-sm-4 d-flex flex-row justify-content-between align-items-center">
           <img :src="currentprofilepic" alt="" class="rounded-circle profile-image">
           <span class="mar">
               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" fill="currentColor" class="bi bi-circle " viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
</svg>
         
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" fill="currentColor" class="bi bi-chat-left-fill mx-3" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
</svg>
       
       <svg 
       
       @click="sho_setting"
       @dblclick="rest_setting"
       xmlns="http://www.w3.org/2000/svg" width="22" height="19" fill="currentColor" class="bi bi-three-dots-vertical mr-2" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg>
       </span>    </div>
       <div class="col-sm-8 border-start border-secondary d-flex flex-row justify-content-between align-items-center">
 

 <span v-if="currentPeerUser!=null"><img :src="currentPeerUser.url" alt="" class="rounded-circle profile-image">

    <span  class="name">{{currentPeerUser.name}}</span> 
 </span>
<span v-else></span>
           <span class="mar">
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" fill="currentColor" class="bi bi-search " viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
       <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" fill="currentColor" class="bi bi-three-dots-vertical mx-3" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg>

           </span>

       </div>
       </div>  


       <div class="row">

<div class="col-sm-4 contacts">
<div class="contact-table" >
    
<div class="container-fluid rm hov shadow-sm" v-on:click="letsChat(item)"
          v-for="item in searchUsers"
          :key="item.id"
          v-show="item.id != getuid" >
    <div class="row d-flex flex-row justify-content-start align-items-center">
        <div class="col-1 ml-0 padr">
            <img :src="item.url" alt="" class="rounded-circle profile-image">
        </div>
        <div class="col-7 mt-2 name1">
            
            <span>{{item.name}}</span>
            <br>
            <span>
               {{item.description}}
            </span>
        </div>

        <div class="col-3 mb-3 marlf">
            <span >
            online
            </span>
        </div>
    </div>
    <div class="row">
       <div class="pt-2"><hr class="marg"></div> 
    </div>
</div>

</div>


</div>
<div class="col-sm-8 chtalist message-area">

<div  v-if="currentPeerUser===null">
      <div class="my-4">
        <img :src="currentprofilepic" width="100px" height="100px" class="br-50" />
      </div>
      <div>
        <h2>Welcome {{currentusername}},</h2>
        <h3>Let's Chat</h3>
      </div>
    </div>
    <div v-else >
        <side2 v-bind:currentPeerUser="currentPeerUser" />
    </div>





</div>


       </div>
 
 <div class="conta shadow-sm" :class="isopen ?'hide_content':'display_content'">
     <div class=" setting onhov">
        New group

    </div>
    <div class="setting onhov">
        Create a room

    </div>
<div @click="profile" class="setting onhov">
        Profile

    </div>

    <div class="setting onhov">
        Calls
    </div>
     <div class="setting onhov">
         Setting
     </div>
     <div class="setting pb-2 onhov" @click="logout">
        Logout
    </div>
 </div>

 </div>


 </div>
</template>
<script>
import firebaseApp from '../services/firebase'
import {mapGetters} from 'vuex'
import Side2 from '../components/Side2'
    export default {
        data(){
            return {
               searchUsers:[],
        isopen:false,
                currentPeerUser:null,

            }
        },

        components:{
            Side2
        },
        computed:{
            ...mapGetters(['currentprofilepic',"getuid","currentusername"])
        },
        methods: {
            sho_setting(){
     this.isopen=true
     console.log("show setting")
            },
             profile(){
                 this.$store.dispatch('setisprofile',true)
                this.$router.push('/profile')
         },
            letsChat(item){
this.currentPeerUser=item
            },
rest_setting(){
    this.isopen=false
},
reload(){
     let nam=localStorage.getItem('name')
let pic=localStorage.getItem('photopic');
let des=localStorage.getItem('descrip')
let uid=localStorage.getItem('id')
this.$store.dispatch("setcurrentusername",nam)
    this.$store.dispatch("setuserprofile",pic)
    this.$store.dispatch("setdescription",des)
    
        this.$store.dispatch("setuid",uid)
console.log("pic",pic)
console.log("des",des)
console.log('uid',uid)
}
,
        logout(){
                firebaseApp.auth().signOut()
                localStorage.clear()
                this.$router.push('/')
             },
            async getlist(){
console.log("snjabfkasbafjas fa ff ")
const result= await firebaseApp.firestore().collection('users').get();
console.log("result")
console.log(result.docs)
if(result.docs.length>0){
    let listuser=[]
    listuser=[...result.docs]

    console.log("listuser")
    
    listuser.forEach((item,index)=>{

this.searchUsers.push({
    key:index,
    documentkey:item.id,
    id:item.data().uid,
    name:item.data().name,
    description:item.data().description,
    url:item.data().photourl
});

    });
    console.log("tgis is users")
    console.log(this.searchUsers)
}
            },
            
        },
        created() {
                console.log("agdasfasvfhavsfhvasyufah")
                console.log("created")
                this.getlist()
            },
            mounted(){
                if(this.getuid==null || this.currentusername==null){

                    this.reload()
                    console.log("mounted call reload")
                }
                console.log("mounted call chat")
            }
    }
</script>

<style scoped>
.main-container{
    position: relative;
}
  .sub-container{
      position:absolute;
      top:0;
      left:0;
      right:0;
  }
  .sub-container1{
      position:absolute;
     
      left:0;
      right:0;
      top: 25px;
  }
  .marlf{
      margin-left:10px;
  }
  .padr{
      margin-right:25px;
  }
  .back-top{
background-color: #009688;
height: 10vh;
    }

   .back-main{
background-color:#D9DBD5;
height: 90vh;
    }
    .chat-head{
        background-color: #EDEDED;
        
        min-height: 50px;
        /* z-index: 200; */
    }
   .profile-image{
       height:35px;
       width:35px;
      
      
   }
.mar{
    margin-bottom: 8px;
}
.name{
    margin-left: 10px;
}
.relate{
    position: relative;
    left:75%;
}
#mess{
    border-radius:100px;
}
.contacts{
    background-color: #ffff;
    min-height: 87vh;
    margin: 0px;
    padding: 0%;
}
.contact-table{
    overflow:auto;
    height: 87vh;
}
.setting{
 padding-top:7px;
 padding-bottom:10px;
 padding-left: 25px;
    padding-right: 50px
 /* padding-bottom: 10px; */
}
.contact-table-scroll{
     overflow:auto;
    height: 79vh;
}
.name1{
text-align: start;
padding: 0;
}
.onhov{
      text-align: start;
}
.conta{
    position:absolute;
    top:40px;
    left:18%;
    height: 255px;
    background-color:#ffff;
    ;
    padding-top:10px;
    
  
width: 180px;
    
}
.display_content{
    display:none;
}
.hide_content{
display:block
}
.rm{
    margin: 0;
    padding-left:15px;
    padding-right:15px;
}
.marg{
    margin:0;
}
.right{
    position: relative;
    left:75%;
}
.left{
    position: relative;
    left:2%;
}
.over{
    overflow: hidden;
}

.message-area{
    min-height: 87vh;
    background-color: #e4e1de;
}
.container-message{
    border-radius: 10px;
 margin-top: 15px;
 margin-bottom: 10px;
  max-width: 200px;
  
  
/* max-width:500px; */
}
.onhov:hover{
    background-color: rgb(248, 244, 244);

}
.hov:hover{
    background-color: rgb(248, 244, 244);
}
.message{
    word-break: break-all;
    padding-left:12px ;
    padding-right: 12px;
    padding-top: 10px;
    position: relative;
    
}
.message-time{
position:relative;
left:35%;
}
.message-box{
    height:65px;
    background-color:#F0F0F0;
}
</style>