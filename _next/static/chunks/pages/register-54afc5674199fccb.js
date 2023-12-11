(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[495],{75511:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/register",function(){return n(80272)}])},43843:function(e,t,n){"use strict";n.d(t,{Z:function(){return ArrowLink}});var a=n(85893),r=n(16081),i=n.n(r),s=n(41664),o=n.n(s);function ArrowLink(e){let{href:t}=e;return(0,a.jsx)("div",{className:i().arrowLink,children:(0,a.jsx)(o(),{href:t,children:(0,a.jsx)("div",{className:i().arrowicon,children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"arrow_back_ios_new"})})})})}},93870:function(e,t,n){"use strict";var a=n(85893),r=n(67294),i=n(15385),s=n.n(i);t.Z=function(e){let{title:t}=e,[n,i]=(0,r.useState)(Array.from(t).map(()=>!1));function handleKeyDown(e){let a=t.toLowerCase().indexOf(e.key);if(-1!==a){let e=[...n];e[a]=!0,i(e)}}function handleKeyUp(e){let a=t.toLowerCase().indexOf(e.key);if(-1!==a){let e=[...n];e[a]=!1,i(e)}}return(0,r.useEffect)(()=>(window.addEventListener("keydown",handleKeyDown),window.addEventListener("keyup",handleKeyUp),()=>{window.removeEventListener("keydown",handleKeyDown),window.removeEventListener("keyup",handleKeyUp)}),[n]),(0,a.jsx)("div",{className:s().title,children:Array.from(t).map((e,t)=>(0,a.jsx)("h1",{style:{marginTop:n[t]?"0.5rem":"0"},className:s().letter,children:e},t))})}},61136:function(e,t,n){"use strict";n.d(t,{Z:function(){return Cookie}});var a=n(85893),r=n(80308),i=n.n(r),s=n(41664),o=n.n(s);function Cookie(){return(0,a.jsx)("div",{className:i().cookie,children:(0,a.jsx)(o(),{href:"/cookies",children:(0,a.jsx)("div",{className:i().cookieicon,children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"cookie"})})})})}},93040:function(e,t,n){"use strict";n.d(t,{Z:function(){return LoadingScreen}});var a=n(85893),r=n(99205),i=n.n(r);function LoadingScreen(){return(0,a.jsx)("div",{className:i().loaderContainer,id:"loading-screen",style:{display:"none"},children:(0,a.jsx)("div",{className:i().loader})})}},80272:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Register}});var a=n(85893),r=n(61747),i=n.n(r),s=n(41664),o=n.n(s),u=n(61136),l=n(93870),c=n(43843),p=n(67294),y=n(15182),d=n(94312),m=n(36093),f=n(95771),g=n(69143),h=n(93040),w=n(11163),_=n(18191),v=n(52200);function Register(){let[e,t]=(0,p.useState)(""),[n,r]=(0,p.useState)(""),[s,b]=(0,p.useState)(""),[T,k]=(0,p.useState)(""),[x,S]=(0,p.useState)(""),[N,U]=(0,p.useState)([]),[P,j]=(0,p.useState)(""),[I,E]=(0,p.useState)(""),[C,L]=(0,p.useState)(""),M=(0,p.useRef)(null),A=(0,w.useRouter)(),[Z,O]=(0,p.useState)(null);async function onSubmit(t){if(t.preventDefault(),(0,g.C)(),function(){if(e.length<6)return L("Username must be at least 6 characters"),(0,v.H3)("Registration failed","Username must be at least 6 characters"),!1;if(e.includes("@"))return L("Username cannot contain @"),(0,v.H3)("Registration failed","Username cannot contain @"),!1;if(T.length<8)return L("Password must be at least 8 characters"),(0,v.H3)("Registration failed","Password must be at least 8 characters"),!1;if(0>T.search(/[a-z]/i)||0>T.search(/[0-9]/))return L("Password must contain at least one letter and one number"),(0,v.H3)("Registration failed","Password must contain at least one letter and one number"),!1;if(0>n.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))return L("Invalid email"),(0,v.H3)("Registration failed","Invalid email"),!1;if(n!==s)return L("Emails do not match"),(0,v.H3)("Registration failed","Emails do not match"),!1;if(T!==x)return L("Passwords do not match"),(0,v.H3)("Registration failed","Passwords do not match"),!1;else return L(""),!0}())try{let t=await (0,m.a$)({name:e,email:n,password:T,country:P.value});if(console.log(t),200===t.status){console.log("User created successfully");try{let t=await (0,f.pH)({name:e,password:T,fingerprint:I});if(200===t.status){let e=await (0,_.lz)();t.data.user.tokens=e,O(t.data.user),console.log("User set"),console.log("Login successful"),(0,v.kl)("Registration successful","Welcome! Your first 50 tokens will be added to your wallet shortly."),A.push("/dashboard")}}catch(e){console.error(e)}}else 409===t.status?(L("Username or email already exists"),(0,v.H3)("Registration failed","Username or email already exists")):(L("Unknown error"),(0,v.H3)("Registration failed","Unknown error"))}catch(e){L(e.message),console.error(e)}else console.log("Invalid");(0,g.n)()}return(0,p.useEffect)(()=>{let e=localStorage.getItem("user");e&&(O(JSON.parse(e)),console.log("Initial stored user:",JSON.parse(e)))},[]),(0,p.useEffect)(()=>{Z&&localStorage.setItem("user",JSON.stringify(Z))},[Z]),(0,p.useEffect)(()=>{M.current.style.opacity=1,fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code").then(e=>e.json()).then(e=>{U(e.countries),j(e.userSelectValue)}),async function(){let e=await y.ZP.load(),t=await e.get();E(t.visitorId)}()},[]),(0,a.jsxs)("main",{className:i().main,ref:M,children:[(0,a.jsx)(l.Z,{title:"Register"}),(0,a.jsx)(c.Z,{href:"/"}),(0,a.jsx)("div",{className:i().content,children:(0,a.jsxs)("form",{onSubmit:onSubmit,children:[(0,a.jsx)("input",{type:"text",placeholder:"Username (min 6 characters)",value:e,onChange:e=>t(e.target.value)}),(0,a.jsx)(d.ZP,{options:N,value:P,onChange:j,placeholder:"Country",className:i().select,classNamePrefix:"select"}),(0,a.jsx)("input",{type:"text",placeholder:"Email",value:n,onChange:e=>r(e.target.value)}),(0,a.jsx)("input",{type:"text",placeholder:"Confirm Email",value:s,onChange:e=>b(e.target.value)}),(0,a.jsx)("input",{type:"password",placeholder:"Password",value:T,onChange:e=>k(e.target.value)}),(0,a.jsx)("input",{type:"password",placeholder:"Confirm Password",value:x,onChange:e=>S(e.target.value)}),(0,a.jsx)("button",{type:"submit",children:"Register"}),(0,a.jsxs)("div",{className:i().links,children:[(0,a.jsx)(o(),{href:"/login",children:"Login"}),(0,a.jsx)(o(),{href:"/terms",children:"Terms of Service"})]}),(0,a.jsx)("p",{className:i().error,children:C})]})}),(0,a.jsx)(u.Z,{}),(0,a.jsx)(h.Z,{})]})}},21035:function(e,t,n){"use strict";n.d(t,{C:function(){return metamaskOneTimeLogin},H:function(){return fetchAddress}});var a=n(59498);let r=(0,a.U)("/metamask");async function metamaskOneTimeLogin(e,t,n,a){try{let i=await r.post("/auth",{signature:e,fingerprint:t,timestamp:n,username:a});return i}catch(e){return e}}async function fetchAddress(){try{let e=await r.get("/address");return e.data}catch(e){return e}}},36093:function(e,t,n){"use strict";n.d(t,{Gt:function(){return getLobbyUsers},Ml:function(){return changeCountry},Nk:function(){return updateProfilePicture},Uz:function(){return updateStyle},a$:function(){return registerUser},cO:function(){return getActiveUsers},gQ:function(){return updatePassword},n5:function(){return getUserId},pz:function(){return searchUsers}});var a=n(59498),r=n(21035);let i=(0,a.U)("/users");async function registerUser(e){try{let t=await i.post("/add",e);return t}catch(e){return e.response}}async function updateStyle(e){try{let t=await i.put("/style",{style:e});return t}catch(e){return e.response}}async function getUserId(){try{let e=await i.get("/userId");if(200!==e.status){let e=await (0,r.H)();return e}return e}catch(e){try{let e=await (0,r.H)();return e}catch(e){return e}}}async function updateProfilePicture(){try{let e=await i.put("/changeAvatar");return e}catch(e){return e.response}}async function updatePassword(e,t){try{let n=await i.put("/changePassword",{old:e,updated:t});return n}catch(e){return console.error("Error updating password:",e),e.response}}async function getLobbyUsers(e){try{let t=[];for(let n of e){let e=await i.get("/id/"+n);t.push(e.data)}if(0===t.length)throw console.error("Error fetching lobby users: no users found"),Error("No users found");if(t.length!==e.length)throw console.error("Error fetching lobby users: not all users found"),Error("Not all users found");return t}catch(e){return console.error("Error fetching lobby users:",e),e.response}}async function searchUsers(e){try{let t=await i.get("/getUsers/"+e);return t}catch(e){return e.response}}async function changeCountry(e){try{let t=await i.put("/changeCountry",{country:e});return t}catch(e){return e.response}}async function getActiveUsers(){try{let e=await i.get("/activeUsers");return e}catch(e){return e.response}}},69143:function(e,t,n){"use strict";n.d(t,{C:function(){return showLoadingScreen},n:function(){return hideLoadingScreen}}),n(67294),n(93040);let showLoadingScreen=()=>{let e=document.getElementById("loading-screen");e&&(e.style.display="flex")},hideLoadingScreen=()=>{let e=document.getElementById("loading-screen");e&&(e.style.display="none")}},52200:function(e,t,n){"use strict";n.d(t,{El:function(){return openNotificationInfo},H3:function(){return openNotificationError},kl:function(){return openNotificationSuccess}});var a=n(16318);let openNotificationError=(e,t)=>{a.ZP.error({message:e,description:t,duration:2})},openNotificationSuccess=(e,t)=>{a.ZP.success({message:e,description:t,duration:2})},openNotificationInfo=(e,t)=>{a.ZP.info({message:e,description:t,duration:2})}},18191:function(e,t,n){"use strict";n.d(t,{N1:function(){return getAverageQuestionOfUser},f1:function(){return getTransactions},lz:function(){return getTokens}});var a=n(52209),r=n(36093),i=n(74686);let s="https://eth-sepolia.g.alchemy.com/v2/IA22Anj6b1Wd0KS5Lji_wZf4MwP3IQPP",o="0x221772ff3DB4396820f9D9700F5aAE35DD3FA80f";async function getTokens(){try{let e=new a.ZPm(new a.ZPm.providers.HttpProvider(s)),t=new e.eth.Contract(i,o),n=await (0,r.n5)();console.log("UserId:",n),console.log(n.data);let u=await t.methods.getTokens(n.data).call();console.log("TokensRaw:",u);let l=Number(u);return console.log("Tokens:",l),l}catch(e){return console.log(e),-1}}async function getTransactions(){try{let e=new a.ZPm(new a.ZPm.providers.HttpProvider(s)),t=new e.eth.Contract(i,o),n=await (0,r.n5)(),u=await t.methods.getTransactions(n.data).call();return u}catch(e){return console.log(e),-1}}async function getAverageQuestionOfUser(){try{let e=new a.ZPm(new a.ZPm.providers.HttpProvider(s)),t=new e.eth.Contract(i,o),n=await (0,r.n5)(),u=await t.methods.getAverageQuestionOfUser(n.data).call();return u}catch(e){return console.log(e),-1}}},16081:function(e){e.exports={arrowLink:"arrowLink_arrowLink__fgs27",arrowicon:"arrowLink_arrowicon__5l8LL"}},15385:function(e){e.exports={title:"bouncyTitle_title__2KeEK"}},80308:function(e){e.exports={cookie:"cookie_cookie__mXhcj",cookieicon:"cookie_cookieicon__Nl2Jo",main:"cookie_main__ziqG1",title:"cookie_title__oz4bW",content:"cookie_content__F4wcF"}},99205:function(e){e.exports={loaderContainer:"loadingScreen_loaderContainer__h4VEZ",loader:"loadingScreen_loader__fKF4R",spin:"loadingScreen_spin__iKqDv"}},61747:function(e){e.exports={main:"login_main__ucu6W",content:"login_content__AWx6l",select:"login_select__Oi9Og",select__control:"login_select__control__D7BzQ",links:"login_links__Q7Vh5",error:"login_error__7qKfL"}},46601:function(){},74686:function(e){"use strict";e.exports=JSON.parse('[{"inputs":[{"internalType":"uint256","name":"_minDeposit","type":"uint256"},{"internalType":"uint256","name":"_minDraw","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"user","type":"string"},{"internalType":"uint256","name":"balance","type":"uint256"}],"name":"addBalanceToUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"},{"internalType":"uint256","name":"_buyIn","type":"uint256"},{"internalType":"uint256","name":"_timeStamp","type":"uint256"},{"internalType":"uint16","name":"_players","type":"uint16"}],"name":"addGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"},{"internalType":"string","name":"userId","type":"string"}],"name":"addParticipantToGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"}],"name":"dealMoneyToWinners","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAllTokens","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"}],"name":"getAverageQuestionOfGame","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"userId","type":"string"}],"name":"getAverageQuestionOfUser","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"}],"name":"getGame","outputs":[{"internalType":"contract GameContract","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinDraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getScoreTable","outputs":[{"components":[{"internalType":"string","name":"userName","type":"string"},{"internalType":"uint256","name":"score","type":"uint256"}],"internalType":"struct Storage.UserScore[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"}],"name":"getTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"userId","type":"string"}],"name":"getTransactions","outputs":[{"components":[{"internalType":"string","name":"transactionType","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"timeStamp","type":"uint256"}],"internalType":"struct TransactionStruct.Transaction[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_userId","type":"string"}],"name":"getUserGames","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"},{"internalType":"string","name":"userId","type":"string"}],"name":"isUserInGame","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"},{"internalType":"string","name":"userId","type":"string"}],"name":"kickParticipant","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"}],"name":"updateQuestionCounter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"},{"internalType":"uint256","name":"drawAmount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]')}},function(e){e.O(0,[664,209,318,853,312,774,888,179],function(){return e(e.s=75511)}),_N_E=e.O()}]);