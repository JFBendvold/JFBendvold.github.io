import{r,o as h,c as _,e as p,f as y,b as e,d as i,v as c,g as b,t as o,a1 as V,h as E,y as f,z as P,A as x}from"./index-689421b9.js";/* empty css                 */const N={class:"settings"},B={class:"settings-container"},U=e("h1",null,"Profil",-1),C=e("h2",null," Fyll inn feltene du ønsker å endre ",-1),A={class:"text-row-inputs"},j={class:"change-email"},D=e("label",{for:"change-email"},"Ny e-post: ",-1),F={class:"change-email-confirm"},G=e("label",{for:"change-email-confirm"},"Bekreft e-post: ",-1),L={class:"change-password"},S=e("label",{for:"change-password"},"Nytt passord: ",-1),$={class:"change-password-confirm"},z=e("label",{for:"change-password-confirm"},"Bekreft passord: ",-1),I={__name:"ProfileSettings",setup(v){const m=b(),s=r(""),d=r(""),a=r(""),u=r("");async function g(){if(s.value!==d.value){o("E-postene er ikke like");return}if(a.value!==u.value){o("Passordene er ikke like");return}if(s.value===""&&a.value===""){o("Du må fylle inn minst ett felt");return}if(s.value!==""&&!w(s.value)){o("E-posten er ikke gyldig");return}if(a.value!==""&&a.value.length<8){o("Passordet må være minst 8 tegn");return}try{await V({email:s.value,password:a.value}),o("Endringer lagret"),m.push("/profile")}catch(l){console.log(l),o("Kunne ikke lagre endringer")}}function w(l){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)}return(l,n)=>{const k=E("router-link");return h(),_("div",N,[p(k,{to:"/profile",class:"back-button"},{default:y(()=>[p(f(P),{icon:f(x)},null,8,["icon"])]),_:1}),e("div",B,[U,C,e("div",A,[e("div",j,[D,i(e("input",{type:"email",id:"change-email",name:"change-email",placeholder:"Ny e-post","onUpdate:modelValue":n[0]||(n[0]=t=>s.value=t)},null,512),[[c,s.value]])]),e("div",F,[G,i(e("input",{type:"email",id:"change-email-confirm",name:"change-email",placeholder:"Gjenta e-post","onUpdate:modelValue":n[1]||(n[1]=t=>d.value=t)},null,512),[[c,d.value]])]),e("div",L,[S,i(e("input",{type:"password",name:"change-password",id:"change-password",placeholder:"Nytt passord","onUpdate:modelValue":n[2]||(n[2]=t=>a.value=t)},null,512),[[c,a.value]])]),e("div",$,[z,i(e("input",{type:"password",name:"change-password-confirm",id:"change-password-confirm",placeholder:"Gjenta passord","onUpdate:modelValue":n[3]||(n[3]=t=>u.value=t)},null,512),[[c,u.value]])])]),e("div",null,[e("button",{class:"save-button",onClick:g}," Lagre endringer ")])])])}}},R={__name:"ProfileView",setup(v){return(m,s)=>(h(),_("main",null,[p(I)]))}};export{R as default};