(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[710],{3509:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/utselger/registrer",function(){return t(6142)}])},6142:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return j}});var n=t(5893),l=t(8934),a=t.n(l),i=t(1664),r=t.n(i),o=t(5675),c=t.n(o),d=t(7294),m=t(4053),u=t(7662),h=t(1323),x=t(8884),p=t(9159),b=t(1163);function j(){let e=(0,m.useSupabaseClient)(),s=(0,b.useRouter)(),[t,l]=(0,d.useState)(0),[i,o]=(0,d.useState)([{id:1,name:"G\xe5rdsutsalg"},{id:2,name:"Gartneri"},{id:3,name:"Fiskeutsalg"},{id:4,name:"Bakstutsalg"},{id:5,name:"Tekstilutsalg"},{id:6,name:"Antikvitetsutsalg"},{id:7,name:"Kunstutsalg"},{id:8,name:"Andre utsalg"}]),[j,N]=(0,d.useState)(!1),[g,_]=(0,d.useState)(!1),[v,f]=(0,d.useState)(""),[y,C]=(0,d.useState)(""),[k,T]=(0,d.useState)(""),[F,w]=(0,d.useState)(""),[S,R]=(0,d.useState)(""),[A,P]=(0,d.useState)(""),[z,E]=(0,d.useState)("MVP AS"),[O,Z]=(0,d.useState)("1234.56.78901"),[D,H]=(0,d.useState)(""),[W,V]=(0,d.useState)(""),[B,J]=(0,d.useState)(""),[K,L]=(0,d.useState)({lat:63.4305,lng:10.3951}),[G,q]=(0,d.useState)(""),[I,M]=(0,d.useState)(""),[Y,U]=(0,d.useState)(""),[X,Q]=(0,d.useState)(!1);async function $(){if(_(!0),!X){(0,u.H3)("Feil","Du m\xe5 godta vilk\xe5rene og betingelsene for \xe5 sende inn s\xf8knaden"),_(!1);return}let{data:t,error:n}=await e.auth.updateUser({data:{first_name:v,last_name:y,phone:k,dob:F,address:S,zip:A}});if(n){(0,u.H3)(n.message),_(!1);return}let l={establishment_name:z};""!==O&&(l.account_number=O);let{data:a,error:r}=await e.from("Establishments").insert([l]).select();if(r){(0,u.H3)(r.message),_(!1);return}console.log(a);let{data:o,error:c}=await e.from("Sales_locations").insert([{sales_location_name:D,type_id:i.find(e=>e.type_name===W).id,address:B,lat:K.lat,lng:K.lng,zip_code:G,sales_location_tlf:I,description:Y,establishment_id:a[0].id}]);if(c){(0,u.H3)(c.message);return}_(!1),s.push("/utselger/dashboard")}return(0,d.useEffect)(()=>{!async function(){let{data:s,error:t}=await e.from("Sales_location_types").select("*");t?console.log(t):(console.log(s),o(s))}()},[]),(0,d.useEffect)(()=>{N(!1)},[W]),(0,n.jsxs)("main",{className:a().main,children:[(0,n.jsxs)("header",{className:a().header,children:[(0,n.jsx)(r(),{href:"/",className:a().logo,children:(0,n.jsx)(c(),{src:"/icons/Logo.svg",alt:"Logo",width:98,height:98,priority:!0})}),(0,n.jsx)(r(),{href:"/",children:"Avbryt"})]}),0===t&&(0,n.jsxs)("section",{className:a().section,children:[(0,n.jsx)("h1",{className:a().title,children:"Fortell oss litt mer om deg selv"}),(0,n.jsxs)("form",{className:a().form,children:[(0,n.jsxs)("div",{className:a().inputRow,children:[(0,n.jsxs)("div",{className:a().inputColumn,children:[(0,n.jsx)("label",{htmlFor:"firstName",children:"Fornavn"}),(0,n.jsx)("input",{type:"text",id:"firstName",name:"firstName",value:v,onChange:e=>f(e.target.value),placeholder:"Fornavn"})]}),(0,n.jsxs)("div",{className:a().inputColumn,children:[(0,n.jsx)("label",{htmlFor:"lastName",children:"Etternavn"}),(0,n.jsx)("input",{type:"text",id:"lastName",name:"lastName",value:y,onChange:e=>C(e.target.value),placeholder:"Etternavn"})]})]}),(0,n.jsxs)("div",{className:a().inputRow,children:[(0,n.jsxs)("div",{className:a().inputColumn,children:[(0,n.jsx)("label",{htmlFor:"phone",children:"Telefonnummer"}),(0,n.jsx)("input",{type:"text",id:"phone",name:"phone",value:k,onChange:e=>{var s;return s=e.target.value,void((""===I||I===k)&&M(s),T(s))},placeholder:"Telefonnummer"})]}),(0,n.jsxs)("div",{className:a().inputColumn,children:[(0,n.jsx)("label",{htmlFor:"dob",children:"F\xf8dselsdato"}),(0,n.jsx)("input",{type:"date",id:"dob",name:"dob",value:F,onChange:e=>w(e.target.value),placeholder:"F\xf8dselsdato"})]})]}),(0,n.jsxs)("div",{className:a().inputRow,children:[(0,n.jsxs)("div",{className:a().inputColumn,children:[(0,n.jsx)("label",{htmlFor:"address",children:"Adresse"}),(0,n.jsx)("input",{type:"text",id:"address",name:"address",value:S,onChange:e=>R(e.target.value),placeholder:"Adresse"})]}),(0,n.jsxs)("div",{className:a().inputColumn,children:[(0,n.jsx)("label",{htmlFor:"zip",children:"Postnummer"}),(0,n.jsx)("input",{type:"text",id:"zip",name:"zip",value:A,onChange:e=>P(e.target.value),placeholder:"Postnummer"})]})]}),(0,n.jsx)("div",{className:a().buttonRow,children:(0,n.jsx)("button",{type:"button",className:a().button,onClick:function(){""===v||""===y||""===k||""===F||""===S||""===A?(0,u.H3)("Feil","Fyll inn alle feltene"):l(1)},children:"Neste"})})]})]}),1===t&&(0,n.jsxs)("section",{className:a().section,children:[(0,n.jsx)("h1",{className:a().title,children:"Fortell oss litt om din bedrift"}),(0,n.jsxs)("form",{className:a().form,children:[(0,n.jsxs)("div",{className:a().inputRow,children:[(0,n.jsxs)("div",{className:a().inputColumn,children:[(0,n.jsx)("label",{htmlFor:"establishmentName",children:"Navn"}),(0,n.jsx)("input",{type:"text",id:"establishmentName",name:"establishmentName",value:z,onChange:e=>E(e.target.value),placeholder:"Navn"})]}),(0,n.jsxs)("div",{className:a().inputColumn,children:[(0,n.jsx)("label",{htmlFor:"establishmentAccountNumber",children:"Kontonummer"}),(0,n.jsx)("input",{type:"text",id:"establishmentAccountNumber",name:"establishmentAccountNumber",value:O,onChange:e=>Z(e.target.value),placeholder:"Kontonummer"})]})]}),(0,n.jsxs)("div",{className:a().buttonRow,children:[(0,n.jsx)("button",{type:"button",className:a().button,onClick:()=>l(0),children:"Tilbake"}),(0,n.jsx)("button",{type:"button",className:a().button,onClick:function(){""===z?(0,u.H3)("Feil","Fyll inn alle feltene"):l(2)},children:"Neste"})]})]})]}),2===t&&(0,n.jsxs)("section",{className:a().section,children:[(0,n.jsx)("h1",{className:a().title,children:"Fortell oss litt om utsalgsstedet"}),(0,n.jsxs)("form",{className:a().form,children:[(0,n.jsxs)("div",{className:a().inputRow,children:[(0,n.jsxs)("div",{className:a().inputColumn,children:[(0,n.jsx)("label",{htmlFor:"companyName",children:"Navn"}),(0,n.jsx)("input",{type:"text",id:"companyName",name:"companyName",value:D,onChange:e=>H(e.target.value),placeholder:"Navn"})]}),(0,n.jsxs)("div",{className:a().inputColumn,children:[(0,n.jsx)("label",{htmlFor:"companyType",children:"Type"}),(0,n.jsxs)("div",{className:a().selectWrapper,children:[(0,n.jsxs)("div",{className:a().select,onClick:()=>N(!j),children:[(0,n.jsx)("span",{children:""===W?"Velg type":W}),(0,n.jsx)("span",{className:"material-symbols-outlined",children:j?"expand_less":"expand_more"})]}),j&&(0,n.jsx)("div",{className:a().selectOptions,children:i.map(e=>(0,n.jsx)("div",{className:a().selectOption,onClick:()=>V(e.type_name),children:e.type_name},e.id))})]})]})]}),(0,n.jsxs)("div",{className:a().inputRow,children:[(0,n.jsxs)("div",{className:a().inputColumn,children:[(0,n.jsx)("label",{htmlFor:"companyAddress",children:"Adresse"}),(0,n.jsx)("input",{type:"text",id:"companyAddress",name:"companyAddress",value:B,onChange:e=>J(e.target.value),placeholder:"Adresse"})]}),(0,n.jsxs)("div",{className:a().inputColumn,children:[(0,n.jsx)("label",{htmlFor:"companyZip",children:"Postnummer"}),(0,n.jsx)("input",{type:"text",id:"companyZip",name:"companyZip",value:G,onChange:e=>q(e.target.value),placeholder:"Postnummer"})]})]}),(0,n.jsxs)("div",{className:a().inputRow,children:[(0,n.jsxs)("div",{className:a().inputColumn,children:[(0,n.jsx)("label",{htmlFor:"companyPhone",children:"Telefonnummer"}),(0,n.jsx)("input",{type:"text",id:"companyPhone",name:"companyPhone",value:I,onChange:e=>M(e.target.value),placeholder:"Telefonnummer"})]}),(0,n.jsxs)("div",{className:a().inputColumn,children:[(0,n.jsx)("label",{htmlFor:"companyDescription",children:"Beskrivelse"}),(0,n.jsx)("input",{type:"text",id:"companyDescription",name:"companyDescription",value:Y,onChange:e=>U(e.target.value),placeholder:"Beskrivelse"})]})]}),(0,n.jsxs)("div",{className:a().buttonRow,children:[(0,n.jsx)("button",{type:"button",className:a().button,onClick:()=>l(1),children:"Tilbake"}),(0,n.jsx)("button",{type:"button",className:a().button,onClick:function(){if(""===D||""===W||""===B||""===G||""===I||""===Y)(0,u.H3)("Feil","Fyll inn alle feltene");else{let e=B+" "+G;(0,x.fromAddress)(e).then(e=>{console.log(e),L(e.results[0].geometry.location)}).catch(e=>{console.log(e)}),l(3)}},children:"Neste"})]})]})]}),3===t&&(0,n.jsxs)("section",{className:a().section,children:[(0,n.jsx)("h1",{className:a().title,children:"Plasser utsalgsstedet p\xe5 kartet"}),(0,n.jsxs)("form",{className:a().form,children:[(0,n.jsx)("div",{className:a().mapContainer,children:(0,n.jsx)(h.un,{apiKey:"AIzaSyA9uqIzpZ00T_YV_lINkTscj4WD90Qb3ak",children:(0,n.jsx)(h.D5,{center:K,zoom:15,className:a().map,fullscreenControl:!1,streetViewControl:!1,keyboardShortcuts:!1,children:(0,n.jsx)(h.Jx,{position:K,onDragEnd:e=>{console.log(e),L(e.latLng.toJSON())},draggable:!0})})})}),(0,n.jsxs)("div",{className:a().buttonRow,children:[(0,n.jsx)("button",{type:"button",className:a().button,onClick:()=>l(2),children:"Tilbake"}),(0,n.jsx)("button",{type:"button",className:a().button,onClick:()=>l(4),children:"Neste"})]})]})]}),4===t&&(0,n.jsxs)("section",{className:a().section,children:[(0,n.jsx)("h1",{className:a().title,children:"Bekreft s\xf8knaden din"}),(0,n.jsxs)("form",{className:a().form,children:[(0,n.jsxs)("div",{className:a().box,children:[(0,n.jsx)("h2",{className:a().boxTitle,children:"Personlig informasjon"}),(0,n.jsxs)("div",{className:a().boxContent,children:[(0,n.jsxs)("p",{className:a().boxText,children:[v," ",y]}),(0,n.jsx)("p",{className:a().boxText,children:k}),(0,n.jsx)("p",{className:a().boxText,children:F}),(0,n.jsxs)("p",{className:a().boxText,children:[S,", ",A]})]})]}),(0,n.jsxs)("div",{className:a().box,children:[(0,n.jsx)("h2",{className:a().boxTitle,children:"Bedriftsinformasjon"}),(0,n.jsxs)("div",{className:a().boxContent,children:[(0,n.jsx)("p",{className:a().boxText,children:z}),(0,n.jsx)("p",{className:a().boxText,children:O})]})]}),(0,n.jsxs)("div",{className:a().box,children:[(0,n.jsx)("h2",{className:a().boxTitle,children:"Utsalgsstedinformasjon"}),(0,n.jsxs)("div",{className:a().boxContent,children:[(0,n.jsx)("p",{className:a().boxText,children:D}),(0,n.jsx)("p",{className:a().boxText,children:W}),(0,n.jsxs)("p",{className:a().boxText,children:[B,", ",G]}),(0,n.jsx)("p",{className:a().boxText,children:I}),(0,n.jsx)("p",{className:a().boxText,children:Y})]})]}),(0,n.jsxs)("div",{className:a().buttonRow,children:[(0,n.jsx)("button",{type:"button",className:a().button,onClick:()=>l(3),children:"Tilbake"}),(0,n.jsx)("button",{type:"button",className:a().button,onClick:()=>l(5),children:"Neste"})]})]})]}),5===t&&(0,n.jsxs)("section",{className:a().section,children:[(0,n.jsx)("h1",{className:a().title,children:"Vilk\xe5r og betingelser"}),(0,n.jsxs)("form",{className:a().form,children:[(0,n.jsxs)("div",{className:a().checkboxWrapper,children:[(0,n.jsx)("div",{className:a().checkbox,onClick:()=>Q(!X),children:(0,n.jsx)("span",{className:"material-symbols-outlined",children:X?"check_box":"check_box_outline_blank"})}),(0,n.jsx)("span",{className:a().checkboxText,children:"Jeg godtar vilk\xe5rene og betingelsene for \xe5 v\xe6re utselger hos Lokal"})]}),(0,n.jsxs)("div",{className:a().buttonRow,children:[(0,n.jsx)("button",{type:"button",className:a().button,onClick:()=>l(4),children:"Tilbake"}),(0,n.jsx)("button",{type:"button",className:a().button,onClick:$,children:"Send inn"})]})]})]}),(0,n.jsx)(p.Z,{spinning:g,fullscreen:!0})]})}},8934:function(e){e.exports={main:"registrer_main__SJMWq",header:"registrer_header__TM7kJ",section:"registrer_section__3e562",inputRow:"registrer_inputRow__Gq0Y0",inputColumn:"registrer_inputColumn__VPGtY",selectWrapper:"registrer_selectWrapper__Bwi0l",select:"registrer_select__3kF2C",selectOptions:"registrer_selectOptions__6eTV5",selectOption:"registrer_selectOption__bZyTf",buttonRow:"registrer_buttonRow__F8apD",mapContainer:"registrer_mapContainer__t6e1z",map:"registrer_map__roZFz",form:"registrer_form__CCi0l",box:"registrer_box__cmeZ0",checkboxWrapper:"registrer_checkboxWrapper__TcZH7",checkbox:"registrer_checkbox__lnN1z",checkboxText:"registrer_checkboxText__lL0Kb"}}},function(e){e.O(0,[61,159,323,888,774,179],function(){return e(e.s=3509)}),_N_E=e.O()}]);