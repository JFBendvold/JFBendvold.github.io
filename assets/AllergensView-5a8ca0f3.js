import{r as g,m as U,s as L,a9 as N,u as i,j as x,G as C,o as v,c as h,b as s,e as p,y as c,A as V,z as _,F as M,L as B,p as m,g as E,t as d,d as F,aa as P,U as j,i as D,$ as G,ab as $}from"./index-689421b9.js";const z={class:"allergens"},I={class:"allergens-settings"},R=s("h1",null,"Allergener",-1),T={class:"allergens-settings-container"},q=s("h2",null,"Velg dine allergener:",-1),H={class:"allergens-selection"},J=["value"],K={class:"checkmark"},O={class:"allergens-selected"},Q={__name:"AllergensSettings",setup(k){const o=E(),f=["Bløtdyr","Egg","Fisk","Gluten","Lupiner","Melk","Nøtter","Peanøtter","Selleri","Sennep","Sesam","Skalldyr","Soya","Sulfitt"],l=g([]),t=g([]),r=g([!0]);U(async()=>{L();let a=await N(i().getUsername);for(let e=0;e<a.length;e++)a[e]=a[e].name;l.value=a,t.value=a,x()});const y=async()=>{const a=i().getUsername;for(let e=0;e<l.value.length;e++)if(!t.value.includes(l.value[e]))try{let n={username:a,allergyName:l.value[e]};const u=await G(n)}catch{d("Lagring av allergen feilet")}},A=async()=>{const a=i().getUsername;for(let e=0;e<t.value.length;e++)if(!l.value.includes(t.value[e]))try{let n={username:a,allergyName:t.value[e]};const u=await $(n)}catch{d("Noe gikk galt ved fjerning av allergen")}},b=async()=>{await y(),await A(),d("Allergener lagret"),t.value=l.value,await i().setUserAllergens(),r.value=!1,o.push("/profile")};C(l,a=>{a.toString()!==t.value.toString()?r.value=!0:r.value=!1});const w=()=>{r.value||o.push("/profile"),r.value&&confirm("Du har ulagrede endringer. Er du sikker på at du vil forlate siden?")&&(r.value=!1,o.push("/profile"))};return(a,e)=>(v(),h("div",z,[s("button",{class:"back-button",onClick:w},[p(c(_),{icon:c(V)},null,8,["icon"])]),s("div",I,[R,s("div",T,[q,s("div",H,[(v(),h(M,null,B(f,(n,u)=>s("div",{class:"allergen-container",key:u},[s("label",null,[F(s("input",{type:"checkbox",value:n,"onUpdate:modelValue":e[0]||(e[0]=S=>l.value=S)},null,8,J),[[P,l.value]]),s("span",K,[p(c(_),{icon:c(j)},null,8,["icon"])]),D(" "+m(n),1)])])),64))])]),s("div",O,[s("div",null,"Allergener valgt: "+m(l.value.join(", ")),1)]),s("div",{class:"save-button-container"},[s("button",{class:"save-button",onClick:b},"Lagre endringer")])])]))}},X={__name:"AllergensView",setup(k){return(o,f)=>(v(),h("main",null,[p(Q)]))}};export{X as default};
