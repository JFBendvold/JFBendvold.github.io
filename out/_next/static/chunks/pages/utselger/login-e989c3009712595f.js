(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[488],{6386:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/utselger/login",function(){return t(9878)}])},9878:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return p}});var i=t(5893),s=t(8223),o=t.n(s),l=t(1664),a=t.n(l),r=t(5675),c=t.n(r),u=t(7294),d=t(4053),h=t(1095),g=t(1053);function p(){let e=(0,d.useSupabaseClient)(),[n,t]=(0,u.useState)(!1),[s,l]=(0,u.useState)(!1),[r,p]=(0,u.useState)("");async function _(){if(t(!0),""===r){(0,h.H3)("E-posten kan ikke v\xe6re tom"),t(!1);return}if(!r.includes("@")||!r.includes(".")||r.length<5){(0,h.H3)("E-posten er ikke gyldig"),t(!1);return}let{data:n,error:i}=await e.auth.signInWithOtp({email:r,options:{emailRedirectTo:"http://localhost:3000//utselger",shouldCreateUser:!0}});i?(0,h.H3)(i.message):((0,h.kl)("Velykket","Vi har sendt en e-post til deg med innloggingsinformasjon"),l(!0)),t(!1)}return(0,u.useEffect)(()=>{e.auth.getUser().then(e=>{console.log(e.data.user)}).catch(e=>{console.log(e)})},[e]),(0,i.jsxs)("main",{className:o().main,children:[(0,i.jsxs)("header",{className:o().header,children:[(0,i.jsx)(a(),{href:"/",className:o().logo,children:(0,i.jsx)(c(),{src:"/icons/Logo.svg",alt:"Logo",width:98,height:98,priority:!0})}),(0,i.jsx)(a(),{href:"/utselger",children:"G\xe5 tilbake"})]}),!s&&(0,i.jsxs)("div",{className:o().content,children:[(0,i.jsx)("h1",{children:"Logg inn"}),(0,i.jsxs)("div",{className:o().inputContainer,children:[(0,i.jsx)("label",{htmlFor:"email",children:"E-post"}),(0,i.jsx)("input",{type:"email",id:"email",value:r,onChange:e=>p(e.target.value),placeholder:"E-post"})]}),(0,i.jsx)("div",{className:o().buttonContainer,children:(0,i.jsx)("button",{onClick:_,children:"Logg inn"})})]}),s&&(0,i.jsxs)("div",{className:o().content,children:[(0,i.jsx)("h1",{children:"E-post sendt"}),(0,i.jsx)("p",{children:"Vi har sendt en e-post til deg med innloggingsinformasjon."}),(0,i.jsx)("p",{children:"Hvis du ikke har mottatt e-posten, sjekk spam-mappen din."})]}),(0,i.jsx)(g.Z,{spinning:n,fullscreen:!0})]})}},8223:function(e){e.exports={main:"login_main__8ETfk",header:"login_header__gK_wn",content:"login_content__1Bixz",inputContainer:"login_inputContainer__FdOj_",buttonContainer:"login_buttonContainer__T3iu2"}}},function(e){e.O(0,[61,53,888,774,179],function(){return e(e.s=6386)}),_N_E=e.O()}]);