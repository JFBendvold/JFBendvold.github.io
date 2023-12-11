(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[789],{44023:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/wallet",function(){return n(75527)}])},92894:function(t,e,n){"use strict";n.d(e,{Z:function(){return Header}});var a=n(85893),r=n(9057),s=n.n(r),i=n(41664),u=n.n(i),o=n(25675),l=n.n(o),c=n(67294),p=n(11163),y=n(18191),d=n(59498);function Header(){let[t,e]=(0,c.useState)(0),[n,r]=(0,c.useState)({}),i=(0,p.useRouter)();async function getTokensFromBlockchain(){let t=await (0,y.lz)();if(-1===t){console.error("Error getting tokens from blockchain");return}e(t),n.tokens=t,r(n),localStorage.setItem("user",JSON.stringify(n))}return(0,c.useEffect)(()=>{(async function(){let t=localStorage.getItem("user");t?(r(JSON.parse(t)),e(JSON.parse(t).tokens)):(console.error("No user found in local storage"),i.push("/login"))})()},[]),(0,c.useEffect)(()=>{n.name&&""!==n.name&&getTokensFromBlockchain()},[n.name]),(0,a.jsx)("header",{className:s().header,children:(0,a.jsxs)("div",{className:s().inner,children:[(0,a.jsxs)(u(),{className:s().logo,href:"/dashboard",children:[(0,a.jsx)("h1",{children:"T"}),(0,a.jsx)("h1",{children:"O"}),(0,a.jsx)("h1",{children:"K"}),(0,a.jsx)("h1",{children:"E"}),(0,a.jsx)("h1",{children:"N"}),(0,a.jsx)("h1",{children:"T"}),(0,a.jsx)("h1",{children:"R"}),(0,a.jsx)("h1",{children:"I"}),(0,a.jsx)("h1",{children:"V"}),(0,a.jsx)("h1",{children:"I"}),(0,a.jsx)("h1",{children:"A"})]}),(0,a.jsxs)("div",{className:s().content,children:[(0,a.jsxs)(u(),{className:s().wallet,href:"/settings?page=2",children:[(0,a.jsx)("span",{children:t}),(0,a.jsx)("p",{children:"Tokens"})]}),(0,a.jsxs)("div",{href:"/profile",className:s().profile,children:[(0,a.jsx)(l(),{src:"".concat(d.h,"/users/image/").concat(n.name),alt:"Profile",width:36,height:36}),(0,a.jsxs)("div",{className:s().dropdown,children:[(0,a.jsx)(u(),{href:"/settings?page=0",children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"person"})}),(0,a.jsx)(u(),{href:"/settings?page=1",children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"settings"})}),(0,a.jsx)(u(),{href:"/settings?page=2",children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"sync_alt"})}),(0,a.jsx)(u(),{href:"/logout",children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"logout"})})]})]})]})]})})}},75527:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return Wallet}});var a=n(85893),r=n(67294),s=n(92977),i=n.n(s),u=n(92894),o=n(52209);function Wallet(){let t=(0,r.useRef)(null),[e,n]=(0,r.useState)(50),[s,l]=(0,r.useState)(""),[c,p]=(0,r.useState)(null),[y,d]=(0,r.useState)(!1);(0,r.useEffect)(()=>{window.ethereum.on("accountsChanged",t=>{0===t.length?(d(!1),l("")):(d(!0),l(t[0]))}),t.current.style.opacity=1,t.current.style.backgroundColor="#FF70A6",connectWallet()},[]);let connectWallet=async()=>{if(window&&window.ethereum){p(new o.ZPm(window.ethereum));try{let t=await window.ethereum.request({method:"eth_requestAccounts"});console.log("Address found: "+t[0]),l(t[0]),d(!0)}catch(t){console.error("No address found"),d(!1)}}};return(0,a.jsxs)("main",{className:i().main,ref:t,children:[(0,a.jsx)(u.Z,{}),(0,a.jsxs)("div",{className:i().content,children:[(0,a.jsxs)("h1",{className:i().title,children:[e," tokens"]}),(0,a.jsxs)("h2",{className:i().subtitle,children:[e/2," transferable tokens"]}),!y&&(0,a.jsx)("div",{className:i().buttons,children:(0,a.jsx)("button",{className:i().longButton,onClick:connectWallet,children:"Connect Wallet"})}),y&&(0,a.jsxs)("div",{className:i().buttons,children:[!y&&(0,a.jsx)("button",{className:i().button,onClick:connectWallet,children:"Connect Wallet"}),(0,a.jsx)("button",{className:y?i().button:i().buttonDisabled,disabled:!y,children:"Deposit"}),(0,a.jsx)("button",{className:y?i().button:i().buttonDisabled,disabled:!y,children:"Withdraw"})]})]})]})}},21035:function(t,e,n){"use strict";n.d(e,{C:function(){return metamaskOneTimeLogin},H:function(){return fetchAddress}});var a=n(59498);let r=(0,a.U)("/metamask");async function metamaskOneTimeLogin(t,e,n,a){try{let s=await r.post("/auth",{signature:t,fingerprint:e,timestamp:n,username:a});return s}catch(t){return t}}async function fetchAddress(){try{let t=await r.get("/address");return t.data}catch(t){return t}}},36093:function(t,e,n){"use strict";n.d(e,{Gt:function(){return getLobbyUsers},Ml:function(){return changeCountry},Nk:function(){return updateProfilePicture},Uz:function(){return updateStyle},a$:function(){return registerUser},cO:function(){return getActiveUsers},gQ:function(){return updatePassword},n5:function(){return getUserId},pz:function(){return searchUsers}});var a=n(59498),r=n(21035);let s=(0,a.U)("/users");async function registerUser(t){try{let e=await s.post("/add",t);return e}catch(t){return t.response}}async function updateStyle(t){try{let e=await s.put("/style",{style:t});return e}catch(t){return t.response}}async function getUserId(){try{let t=await s.get("/userId");if(200!==t.status){let t=await (0,r.H)();return t}return t}catch(t){try{let t=await (0,r.H)();return t}catch(t){return t}}}async function updateProfilePicture(){try{let t=await s.put("/changeAvatar");return t}catch(t){return t.response}}async function updatePassword(t,e){try{let n=await s.put("/changePassword",{old:t,updated:e});return n}catch(t){return console.error("Error updating password:",t),t.response}}async function getLobbyUsers(t){try{let e=[];for(let n of t){let t=await s.get("/id/"+n);e.push(t.data)}if(0===e.length)throw console.error("Error fetching lobby users: no users found"),Error("No users found");if(e.length!==t.length)throw console.error("Error fetching lobby users: not all users found"),Error("Not all users found");return e}catch(t){return console.error("Error fetching lobby users:",t),t.response}}async function searchUsers(t){try{let e=await s.get("/getUsers/"+t);return e}catch(t){return t.response}}async function changeCountry(t){try{let e=await s.put("/changeCountry",{country:t});return e}catch(t){return t.response}}async function getActiveUsers(){try{let t=await s.get("/activeUsers");return t}catch(t){return t.response}}},18191:function(t,e,n){"use strict";n.d(e,{N1:function(){return getAverageQuestionOfUser},f1:function(){return getTransactions},lz:function(){return getTokens}});var a=n(52209),r=n(36093),s=n(74686);let i="https://eth-sepolia.g.alchemy.com/v2/IA22Anj6b1Wd0KS5Lji_wZf4MwP3IQPP",u="0x221772ff3DB4396820f9D9700F5aAE35DD3FA80f";async function getTokens(){try{let t=new a.ZPm(new a.ZPm.providers.HttpProvider(i)),e=new t.eth.Contract(s,u),n=await (0,r.n5)();console.log("UserId:",n),console.log(n.data);let o=await e.methods.getTokens(n.data).call();console.log("TokensRaw:",o);let l=Number(o);return console.log("Tokens:",l),l}catch(t){return console.log(t),-1}}async function getTransactions(){try{let t=new a.ZPm(new a.ZPm.providers.HttpProvider(i)),e=new t.eth.Contract(s,u),n=await (0,r.n5)(),o=await e.methods.getTransactions(n.data).call();return o}catch(t){return console.log(t),-1}}async function getAverageQuestionOfUser(){try{let t=new a.ZPm(new a.ZPm.providers.HttpProvider(i)),e=new t.eth.Contract(s,u),n=await (0,r.n5)(),o=await e.methods.getAverageQuestionOfUser(n.data).call();return o}catch(t){return console.log(t),-1}}},9057:function(t){t.exports={header:"header_header__rY90F",inner:"header_inner___XluN",logo:"header_logo__XtPtX",content:"header_content__v4Ap4",profile:"header_profile__f2DRM",dropdown:"header_dropdown__VYYBF",wallet:"header_wallet__SC9Rm"}},92977:function(t){t.exports={main:"wallet_main__O41WZ",content:"wallet_content__Hp3Ou",title:"wallet_title__c1o8_",subtitle:"wallet_subtitle__M2FeC",buttons:"wallet_buttons__KsV_u",button:"wallet_button__dSyWs",longButton:"wallet_longButton__G3DxH",buttonDisabled:"wallet_buttonDisabled__pN9rK"}},46601:function(){},74686:function(t){"use strict";t.exports=JSON.parse('[{"inputs":[{"internalType":"uint256","name":"_minDeposit","type":"uint256"},{"internalType":"uint256","name":"_minDraw","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"user","type":"string"},{"internalType":"uint256","name":"balance","type":"uint256"}],"name":"addBalanceToUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"},{"internalType":"uint256","name":"_buyIn","type":"uint256"},{"internalType":"uint256","name":"_timeStamp","type":"uint256"},{"internalType":"uint16","name":"_players","type":"uint16"}],"name":"addGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"},{"internalType":"string","name":"userId","type":"string"}],"name":"addParticipantToGame","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"}],"name":"dealMoneyToWinners","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAllTokens","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"}],"name":"getAverageQuestionOfGame","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"userId","type":"string"}],"name":"getAverageQuestionOfUser","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"}],"name":"getGame","outputs":[{"internalType":"contract GameContract","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinDraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getScoreTable","outputs":[{"components":[{"internalType":"string","name":"userName","type":"string"},{"internalType":"uint256","name":"score","type":"uint256"}],"internalType":"struct Storage.UserScore[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"}],"name":"getTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"userId","type":"string"}],"name":"getTransactions","outputs":[{"components":[{"internalType":"string","name":"transactionType","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"timeStamp","type":"uint256"}],"internalType":"struct TransactionStruct.Transaction[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_userId","type":"string"}],"name":"getUserGames","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"},{"internalType":"string","name":"userId","type":"string"}],"name":"isUserInGame","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"},{"internalType":"string","name":"userId","type":"string"}],"name":"kickParticipant","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gameId","type":"uint256"}],"name":"updateQuestionCounter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"},{"internalType":"uint256","name":"drawAmount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]')}},function(t){t.O(0,[664,209,675,774,888,179],function(){return t(t.s=44023)}),_N_E=t.O()}]);