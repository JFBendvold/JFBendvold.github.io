/* empty css                 */import{u as c,h as d,o as i,c as _,e as o,f as s,x as r,A as f,B as m,b as t,p as b,a1 as h,t as u,y as k,z as y}from"./index-2e410ad1.js";const w={class:"settings"},S={class:"settings-container"},B=t("h1",null,"Profil",-1),V=t("button",{class:"profile-settings-button"},"Profil",-1),v=t("button",{class:"group-settings-button"},"Grupper",-1),A=t("button",{class:"allergens-settings-button"},"Allergener",-1),C=t("button",{class:"display-settings-button"},"Tilgjengeliget/utseende",-1),g=c(),L={methods:{async logout(){if(confirm("Er du sikker på at du vil logge ut?"))try{await g.logout(),h.push("/login"),u("Logget ut")}catch(l){u("Kunne ikke logge ut"),console.error("Logout failed:",l)}}}},x=Object.assign(L,{__name:"SettingsMain",setup(l){return(n,a)=>{const e=d("router-link");return i(),_("div",w,[o(e,{to:"/",class:"back-button"},{default:s(()=>[o(r(f),{icon:r(m)},null,8,["icon"])]),_:1}),t("div",S,[B,t("h2",null,"Velkommen, "+b(r(g).getUsername)+"!",1),o(e,{to:"/profile/profile"},{default:s(()=>[V]),_:1}),o(e,{to:"/profile/groups"},{default:s(()=>[v]),_:1}),o(e,{to:"/profile/allergens"},{default:s(()=>[A]),_:1}),o(e,{to:"/profile/accessibility"},{default:s(()=>[C]),_:1}),t("button",{class:"logout-button",onClick:a[0]||(a[0]=(...p)=>n.logout&&n.logout(...p))},"Logg ut")])])}}}),P={__name:"SettingsView",setup(l){const n=c();return(a,e)=>(i(),_("main",null,[r(n).loggedIn?(i(),k(x,{key:0})):y("",!0)]))}};export{P as default};
