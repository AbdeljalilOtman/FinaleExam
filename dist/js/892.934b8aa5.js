"use strict";(self["webpackChunktp4"]=self["webpackChunktp4"]||[]).push([[892],{2892:function(e,t,r){r.r(t),r.d(t,{default:function(){return C}});var n=r(6768),s=r(4232);const o=e=>((0,n.Qi)("data-v-1328c1d8"),e=e(),(0,n.jt)(),e),u={class:"profile-container"},l=o((()=>(0,n.Lk)("h2",null,"Profile",-1))),i={key:0},a=o((()=>(0,n.Lk)("strong",null,"First Name:",-1))),c=o((()=>(0,n.Lk)("strong",null,"Last Name:",-1))),d=o((()=>(0,n.Lk)("strong",null,"Email:",-1))),k=o((()=>(0,n.Lk)("strong",null,"Favorite Foods:",-1))),g=o((()=>(0,n.Lk)("strong",null,"Regime:",-1))),f={key:1},h=o((()=>(0,n.Lk)("p",null,"Please sign in to view your profile.",-1)));function v(e,t,r,o,v,p){const L=(0,n.g2)("router-link");return(0,n.uX)(),(0,n.CE)("div",u,[l,v.user?((0,n.uX)(),(0,n.CE)("div",i,[(0,n.Lk)("p",null,[a,(0,n.eW)(" "+(0,s.v_)(v.user.firstName),1)]),(0,n.Lk)("p",null,[c,(0,n.eW)(" "+(0,s.v_)(v.user.lastName),1)]),(0,n.Lk)("p",null,[d,(0,n.eW)(" "+(0,s.v_)(v.user.email),1)]),(0,n.Lk)("p",null,[k,(0,n.eW)(" "+(0,s.v_)(v.user.favoriteFoods),1)]),(0,n.Lk)("p",null,[g,(0,n.eW)(" "+(0,s.v_)(v.user.regime),1)]),(0,n.Lk)("button",{onClick:t[0]||(t[0]=e=>p.signOut())},"Sign Out")])):((0,n.uX)(),(0,n.CE)("div",f,[h,(0,n.bF)(L,{to:"/signin"},{default:(0,n.k6)((()=>[(0,n.eW)("Sign In")])),_:1})]))])}r(4114);var p=r(2829),L=(r(8307),r(5833),{name:"ProfileView",data(){return{user:null}},created(){this.fetchUserData()},methods:{async fetchUserData(){try{const e=p.A.auth().currentUser;if(e){const t=await p.A.firestore().collection("users").doc(e.uid).get();t.exists?this.user=t.data():console.error("User document does not exist")}}catch(e){console.error("Error fetching user data:",e)}},signOut(){p.A.auth().signOut().then((()=>{console.log("User signed out"),this.$router.push("/")})).catch((e=>{console.error("Signout error:",e)}))}}}),m=r(1241);const _=(0,m.A)(L,[["render",v],["__scopeId","data-v-1328c1d8"]]);var C=_}}]);
//# sourceMappingURL=892.934b8aa5.js.map