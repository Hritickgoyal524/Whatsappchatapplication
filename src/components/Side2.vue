<template>
<div>
   <div class="contact-table-scroll">
    <div class="container-message bg-white shadow-sm" :class="item.idFrom === getuid ? 'right' : 'left'"
        
          v-for="item in listMessage"
          :key="item.id">
        <div class="message">
            <span v-if="item.isimage">
                <img :src="item.content" 
                alt="" class="img-fluid">
            </span>
            <span class="messagetext" v-else>
                {{item.content}}
            </span>
    
            <br>
            <span class="message-time"><small>
        {{item.timestamp}}</small></span>
        </div>

    </div>
   </div>
<div v-if="currentPeerUser!=null" class="row message-box p-3">
    <div class="col-sm-2 mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" fill="currentColor" class="bi bi-emoji-smile emoj" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
</svg>

<label>
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" fill="currentColor" class="bi bi-paperclip emoj" viewBox="0 0 16 16">
  <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
</svg>
   <input type="file" name="upload" class="w-0 tex" @change="changeAvatar" />
</label>
    </div>
<div class="col-sm-9">
    <form @submit.prevent="">
        <input type="text"  id="mess" class="form-control" placeholder="Type a message....." v-model="inputValue" v-on:keyup.enter="sendMessage(inputValue)"/>
    </form>
</div>
<div class="col-sm-1 mt-2">

<span v-if="isimage" @click="sendMessage(getuid)">
<svg  xmlns="http://www.w3.org/2000/svg" width="26" height="24" fill="currentColor" class="bi bi-arrow-up-left-square" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm10.096 8.803a.5.5 0 1 0 .707-.707L6.707 6h2.768a.5.5 0 1 0 0-1H5.5a.5.5 0 0 0-.5.5v3.975a.5.5 0 0 0 1 0V6.707l4.096 4.096z"/>
</svg>
</span>
   <svg v-else xmlns="http://www.w3.org/2000/svg" width="26" height="24" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
  <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
</svg>
</div>

</div>
</div>

</template>

<script>
   import moment from 'moment'
import {mapGetters} from 'vuex'
import Vue from 'vue'
// import $ from 'jquery'
import firebaseApp from '../services/firebase'
export default {
    props:[
"currentPeerUser"
    ],
    data(){
return{
    inputValue:'',
    listMessage:[],
    groupChatId:null,
    isimage:false,
    profilepic:null,
    photourl:""
}

    },
    watch:{
currentPeerUser:function(newval,oldval){
    if(newval!=oldval){
        this.getMessage()
    }
}
    },
    computed:{
            ...mapGetters(['currentprofilepic',"getuid","currentusername"])
        },

        mounted() {
            this.getMessage()
        },
    methods:{


async changeAvatar(event){
  if(event.target.files && event.target.files[0]){
    const filetype=event.target.files[0].type.toString();
    console.log(filetype)
    this.image=false
    if(filetype.indexOf("image")!=0){
       Vue.toasted.show("Please Select an image")
       return
    }
    this.profilepic=event.target.files[0]
   
  await this.uploadAvatar()
   
  }

  else{
     Vue.toasted.show("Please Select an image")
  }
},


uploadAvatar(){
if(this.profilepic)
{
    const timestamp=moment().valueOf().toString();
 const upload= firebaseApp.storage().ref().child(this.groupChatId).child(timestamp).put(this.profilepic);
 upload.on(
   "state_changed",
   null,
   err=>{
     Vue.toasted.show(err.message)
   },()=>{
upload.snapshot.ref.getDownloadURL().then(url=>{
this.photourl=url
console.log("url created")
console.log(url)
 this.isimage=true
 Vue.toasted.show("click on arrow button to send image message")
})
   }
 )
}


},

        sendMessage(content){
            if(content==='' && this.isimage==false)return
            const timestamp=moment().valueOf().toString()
            const d=new Date()
            const hour=d.getHours()
            const min=d.getMinutes()
            const sec=d.getSeconds()
            const time=`${hour}:${min}:${sec}`
            let cont=''
            console.log("time",timestamp)
            console.log(this.getuid)
console.log("gruop",this.groupChatId)
            if(this.isimage){
                 
                cont=this.photourl
               console.log('after upload file url',cont)
            }
            else{
                cont=content.trim()
                console.log('dasfdgsdgsdgsdgsdgsdgsdhshsdhh',cont)
            }
            const message={
                id:timestamp,
                idFrom:this.getuid,
                idTo:this.currentPeerUser.id,
                timestamp:time,
                isimage:this.isimage,
                content:cont
            };

            firebaseApp.firestore().collection("Messages").doc(this.groupChatId).collection(this.groupChatId).doc(timestamp).set(message).then(()=>{
                this.inputValue=""
                this.isimage=false
            })
        },

        getMessage(){
this.listMessage=[]
let groupchatid=`${this.currentPeerUser.id}+${this.getuid}`
firebaseApp.firestore().collection("Messages").doc(groupchatid).collection(groupchatid).onSnapshot(Snapshot=>{
    if(Snapshot.docChanges().length>0){
        this.groupChatId=groupchatid
        Snapshot.docChanges().forEach(res=>{
            this.listMessage.push(res.doc.data());
        });
    }
    else{
     this.groupChatId=`${this.getuid}+${this.currentPeerUser.id}`;

        firebaseApp.firestore().collection("Messages").doc(this.groupChatId).collection(this.groupChatId).onSnapshot(Snapshot=>{
Snapshot.docChanges().forEach(res=>{
    if(res.type==="added")
            this.listMessage.push(res.doc.data());
        });

        });
    }
});

//   this.$nextTick(() => {
//                         $("html, body").scrollTop($(document).height());
//                       })
        },

        
    }
}
</script>

<style  scoped>
.contact-table-scroll{
     overflow:auto;
    height: 79vh;
}
.container-message{
    border-radius: 10px;
 margin-top: 15px;
 margin-bottom: 10px;
  max-width: 200px;
  
  
/* max-width:500px; */
}

.message{
    word-break: break-all;
    padding-left:12px ;
    padding-right: 12px;
    padding-top: 10px;
    position: relative;
    text-align: start;
    
}
.message-box{
    height:65px;
    background-color:#F0F0F0;
}
.message-time{
position:relative;
left:67%;
 text-align: start;
}
.emoj{
    margin-left:20px;
}
.left{
    position: relative;
    left:2%;
}
.messagetext{
    text-align: start;
}
.tex{
    display: none;
}
.right{
    position: relative;
    left:72%;
}
</style>