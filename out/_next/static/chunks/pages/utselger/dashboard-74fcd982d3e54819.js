(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[107],{5706:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/utselger/dashboard",function(){return a(3017)}])},3017:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return en}});var n=a(5893),s=a(1940),i=a.n(s),l=a(1163),r=a(7294),o=a(4053),c=a(7662),d=a(6966),u=a(9159),g=a(3618);a(1664);var h=a(5675),m=a.n(h),p=a(2965),_=a.n(p);function f(){let[e,t]=(0,r.useState)(null),a=(0,o.useSupabaseClient)(),s=(0,l.useRouter)();async function i(){let{error:e}=await a.auth.signOut();e?console.log(e):(console.log("Logged out"),s.push("/utselger"))}return(0,r.useEffect)(()=>{a.auth.getUser().then(e=>{t(e.data.user)}).catch(e=>{console.log(e)})},[a]),(0,n.jsxs)("header",{className:_().header,children:[(0,n.jsx)("p",{className:_().headerTitle,children:e?"Velkommen tilbake, "+(null==e?void 0:e.user_metadata.full_name):"Hei, ukjent"}),(0,n.jsx)("button",{className:_().headerButton,onClick:i,children:"Logg ut"})]})}var x=a(636),k=a.n(x);async function j(e,t,a,n,s,i,l){let{data:r,error:o}=await e.from("Products").insert([{sales_location_id:t,product_name:a,product_description:n,price:s,quantity:i,category_id:l}]).select();if(o)throw o;return r[0].id}async function b(e,t,a,n,s,i,l){let{data:r,error:o}=await e.from("Products").update({product_name:a,product_description:n,price:s,quantity:i,category_id:l}).eq("id",t).select();if(o)throw o;return r[0].id}async function v(e,t,a,n){let{data:s,error:i}=await e.from("Products").select("*").order("updated_at",{ascending:!1}).range(a,n).eq("sales_location_id",t);if(i)throw i;return s}async function N(e,t,a){let n;if(t.length>0){let{data:s,error:i}=await e.from("Products").select("id",{count:"exact"}).eq("sales_location_id",a).ilike("product_name","%".concat(t,"%"));if(i)throw i;n=s.length}else{let{data:t,error:s}=await e.from("Products").select("id",{count:"exact"}).eq("sales_location_id",a);if(s)throw s;n=t.length}return n}async function y(e,t){let{data:a,error:n}=await e.rpc("set_product_unlisted_at",{p_product_id:t});if(n)throw n;console.log("DATA"),console.log(a)}async function C(e,t){let{data:a,error:n}=await e.from("Products").update({unlisted_at:null}).eq("id",t).select();if(n)throw n;return a[0].id}async function w(e,t,a,n,s){let{data:i,error:l}=await e.from("Products").select("*").order("updated_at",{ascending:!1}).range(n,s).eq("sales_location_id",a).ilike("product_name","%".concat(t,"%"));if(l)throw l;return i}async function S(e,t,a,n){let{data:s,error:i}=await e.storage.from("imgs").upload(n+"/"+a,t);if(i)throw i;return s}async function L(e,t){let{data:a,error:n}=await e.storage.from("imgs").remove([t]);if(n)throw n;return a}async function P(e,t){let{error:a}=await e.from("Images").delete().eq("parent_id",t);if(a)throw a;return!0}async function B(e,t){let{data:a,error:n}=await e.storage.from("imgs").getPublicUrl(t);if(n)throw n;return a.publicUrl}async function E(e,t,a){let{data:n,error:s}=await e.from("Images").insert([{url:t+"/",parent_id:a}]).select();if(s)throw s;return n[0].id}async function H(e,t){let{data:a,error:n}=await e.from("Images").select("*").eq("parent_id",t);if(n)throw n;return a}var I=a(2672),U=a.n(I),D=a(6616);function A(e){let t=function(e){let t=[],a={};e.forEach(e=>{a[e.id]={category:e,children:[]}}),e.forEach(e=>{null===e.parent_category_id?t.push(a[e.id]):a[e.parent_category_id]&&a[e.parent_category_id].children.push(a[e.id])});for(let e=0;e<t.length;e++)0===t[e].children.length&&delete t[e].children;return t}(e),a=[];for(let e=0;e<t.length;e++)a.push(function e(t){if(!t)return;let a=t.category.category_name,n={title:a.charAt(0).toUpperCase()+a.slice(1),value:t.category.id};return t.children&&t.children.length>0&&(n.children=t.children.map(t=>e(t)).filter(e=>null!==e)),n}(t[e]));return a}async function T(e){let{data:t,error:a}=await e.from("Categories").select("*");if(a)throw a;return t}async function R(e){let{data:t,error:a}=await e.auth.getUser();if(a)throw a;return t.user.id}function q(e){let{product:t,client:a,productImages:s,emitRefresh:i}=e,[l,o]=(0,r.useState)(!1),[d,g]=(0,r.useState)(!1),[h,p]=(0,r.useState)(""),[_,f]=(0,r.useState)(""),[x,k]=(0,r.useState)(""),[j,v]=(0,r.useState)(""),[N,y]=(0,r.useState)(""),[C,w]=(0,r.useState)([]),[B,I]=(0,r.useState)([]),[q,Z]=(0,r.useState)([]),[O,F]=(0,r.useState)(!1),[K,V]=(0,r.useState)([]);async function Y(){o(!0),console.log(t),p(t.product_name),f(t.product_description),k(t.price),v(t.quantity),y(t.category_id),w([]),Z(s);try{let e=await H(a,t.id);console.log(e),e&&e.length>0?(V(e),console.log(e[0].url)):(0,c.H3)("Produktet mangler bilde","Bildene kunne ikke hentes")}catch(e){console.error("Error fetching product image:",e.message),(0,c.H3)("Noe gikk galt","Bildene kunne ikke hentes for produktet")}g(!0),o(!1)}async function z(e){if(C.length<1)try{let t=e.target.files[0];console.log(t),w([...C,t]),Z([...q,URL.createObjectURL(t)]),F(!0)}catch(e){(0,c.H3)("Noe gikk galt","Bildene ble ikke lastet opp")}else(0,c.H3)("PS","Du kan ikke laste opp flere enn 1 bilde")}async function X(e){let t=e.target.value;if(t.includes(".")){(0,c.H3)("Ugyldig pris","Tips: fors\xf8k \xe5 bruk komma i stedet for punktum");return}t<-1?k(-1):k(t)}async function J(){try{let e=await T(a),t=0;for(;t<4&&(!(e=await T(a))||!(e.length>0));)t++;if(e&&e.length>0){let t=A(e);I(t)}else(0,c.H3)("Noe gikk galt","Kategoriene kunne ikke hentes for produktene")}catch(e){(0,c.H3)("Noe gikk galt","Kategoriene kunne ikke hentes for produktene")}}async function M(){let e=!0;try{0===K.length?e=!1:(await L(a,K[0].url),await P(a,t.id))}catch(t){console.log(t),e?(0,c.H3)("Noe gikk galt","Bildet ble ikke fjernet fra produktet"):console.log("Produktet hadde ikke bilde fra f\xf8r, men det ble lagt til et n\xe5.")}}async function Q(){try{let e=await b(a,t.id,h,_,x,j,N);if(O&&await M(),C.length>0)for(let t=0;t<C.length;t++){let n=C[t],s=await R(a),i=await E(a,s,e);await S(a,n,i,s)}g(!1),(0,c.kl)("Produktet ble endret","Produktet ble oppdatert i databasen"),i()}catch(e){console.log(e),(0,c.H3)("Noe gikk galt","Produktet ble ikke oppdatert i databasen")}}async function W(e){if(e.preventDefault(),""===h){(0,c.H3)("Produktnavn mangler","Du m\xe5 skrive inn et produktnavn");return}if(""===x){(0,c.H3)("Produktpris mangler","Du m\xe5 skrive inn en produktpris");return}if(""===j){(0,c.H3)("Produktlager mangler","Du m\xe5 skrive inn antall p\xe5 lager");return}if(""===N){(0,c.H3)("Produktkategori mangler","Du m\xe5 velge en produktkategori");return}if(N===t.category_id&&h===t.product_name&&_===t.product_description&&x===t.price&&j===t.quantity&&!O){(0,c.H3)("Ingen endringer","Du m\xe5 gj\xf8re endringer for \xe5 oppdatere produktet");return}o(!0);try{await Q()}catch(e){(0,c.H3)("Noe gikk galt","Produktet ble ikke lagt til i databasen")}o(!1)}return(0,r.useEffect)(()=>{J()},[]),(0,n.jsxs)("div",{className:U().container,children:[(0,n.jsx)("button",{className:U().editButton,onClick:Y,children:"Endre produkt"}),(0,n.jsxs)("div",{className:"".concat(U().panel," ").concat(d?U().open:""),children:[(0,n.jsx)("span",{className:"".concat(U().closeButton," material-symbols-outlined"),onClick:()=>g(!1),children:"close"}),(0,n.jsx)("h1",{className:U().title,children:"Endre produkt"}),(0,n.jsxs)("div",{className:U().form,children:[(0,n.jsx)("div",{className:U().left,children:(0,n.jsxs)("div",{className:U().imageUploadContainer,children:[q.length," / 1",q.length>0&&(0,n.jsx)("div",{className:U().imageUpload,children:q.map((e,t)=>(0,n.jsxs)("div",{className:U().imageContainer,children:[(0,n.jsx)("span",{className:"material-symbols-outlined",onClick:()=>(C.splice(t,1),void(q.splice(t,1),w([...C]),Z([...q]),F(!0))),children:"close"}),(0,n.jsx)(m(),{src:e,width:100,height:100,alt:"opplastet bilde ".concat(t)})]},t))}),(0,n.jsx)("div",{className:U().imageUpload,children:(0,n.jsxs)("span",{className:"material-symbols-outlined",children:["Image",(0,n.jsx)("br",{}),(0,n.jsx)("input",{id:"image",type:"file",accept:"image/jpeg",name:"image",onChange:e=>{z(e)}})]})})]})}),(0,n.jsxs)("div",{className:U().right,children:[(0,n.jsxs)("div",{className:U().inputContainer,children:[(0,n.jsx)("label",{className:U().label,children:"Produktnavn"}),(0,n.jsx)("input",{className:U().input,type:"text",value:h,onChange:e=>p(e.target.value)})]}),(0,n.jsxs)("div",{className:U().inputContainer,children:[(0,n.jsx)("label",{className:U().label,children:"Beskrivelse"}),(0,n.jsx)("textarea",{className:U().input,value:_,onChange:e=>f(e.target.value)})]}),(0,n.jsxs)("div",{className:U().inputContainer,children:[(0,n.jsx)("label",{className:U().label,children:"Pris"}),(0,n.jsx)("input",{className:U().input,type:"number",value:x,onChange:e=>X(e)})]}),(0,n.jsxs)("div",{className:U().inputContainer,children:[(0,n.jsx)("label",{className:U().label,children:"Antall p\xe5 lager (-1 = ubegrenset)"}),(0,n.jsx)("input",{className:U().input,type:"number",value:j,onChange:e=>v(e.target.value)})]}),(0,n.jsxs)("div",{className:U().inputContainer,children:[(0,n.jsx)("label",{className:U().label,children:"Kategori"}),(0,n.jsx)(D.Z,{dropdownStyle:{maxHeight:250,overflow:"auto"},style:{width:"100%",marginBottom:"1rem"},treeData:B,placeholder:"Velg en kategori",treeDefaultExpandAll:!0,allowClear:!0,showSearch:!0,value:N,treeNodeFilterProp:"title",onChange:e=>y(e)})]}),(0,n.jsx)("div",{className:U().inputContainer,children:(0,n.jsx)("button",{className:U().submitButton,onClick:W,children:"Oppdater produkt"})})]})]})]}),(0,n.jsx)(u.Z,{spinning:l,fullscreen:!0})]})}function Z(e){let{KeyIndex:t,ProdInfo:a,client:s,salesLocationId:i,emitRefresh:l}=e,[o,c]=(0,r.useState)(""),d=async()=>{try{let e=await H(s,a.id);if(e&&e.length>0){let t=[];for(let a=0;a<e.length;a++)t.push(await B(s,e[a].url));t.length>0&&c(t)}}catch(e){console.error("Error fetching product image:",e.message)}},u=async()=>{console.log("Unlisting product:",a);try{await y(s,a.id),l()}catch(e){console.error("Error unlisting product:",e.message)}},g=async()=>{console.log("Listing product:",a);try{await C(s,a.id),l()}catch(e){console.error("Error listing product:",e.message)}};return(0,r.useEffect)(()=>{d()},[]),(0,n.jsxs)("div",{className:"".concat(k().productItemContainer," ").concat(a.unlisted_at?k().unlisted:""),children:[o&&o.map((e,t)=>(0,n.jsx)(m(),{src:e,alt:"Produktbilde",width:100,height:100},t)),(0,n.jsx)("h2",{children:a.product_name}),(0,n.jsxs)("p",{children:[(0,n.jsx)("b",{children:"Pris:"})," ",a.price," kr"]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("b",{children:"Beskrivelse:"})," ",a.product_description]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("b",{children:"Antall:"})," ",-1===a.quantity?"Ubegrenset":a.quantity+" stk"]}),null!=a.unlisted_at&&(0,n.jsxs)("p",{children:[(0,n.jsx)("b",{children:"Annonse skjult: "})," ",a.unlisted_at," "]}),(0,n.jsxs)("div",{className:k().buttonContainer,children:[null!=a.unlisted_at&&(0,n.jsx)("button",{className:k().productButtonList,onClick:()=>g(),children:"Gjenopprett produktannonse"}),null==a.unlisted_at&&(0,n.jsx)("button",{className:k().productButtonUnlist,onClick:()=>u(),children:"Skjul produktannonse"}),(0,n.jsx)(q,{product:a,client:s,salesLocationId:i,productImages:o,emitRefresh:l})]})]},t)}var O=a(9450),F=a.n(O);function K(e){let{salesLocationId:t,emitRefresh:a}=e,s=(0,o.useSupabaseClient)(),[i,l]=(0,r.useState)(!1),[d,g]=(0,r.useState)(!1),[h,p]=(0,r.useState)(""),[_,f]=(0,r.useState)(""),[x,k]=(0,r.useState)(""),[b,v]=(0,r.useState)(""),[N,y]=(0,r.useState)(""),[C,w]=(0,r.useState)([]),[L,P]=(0,r.useState)([]),[B,H]=(0,r.useState)([]);async function I(){l(!0),U(),g(!0),l(!1)}function U(){p(""),f(""),k(""),v(""),y(""),w([]),H([])}async function q(e){if(C.length<1)try{e.target.files[0];let t=e.target.files[0],a=URL.createObjectURL(t);w([...C,t]),H([...B,a])}catch(e){(0,c.H3)("Noe gikk galt","Bildene ble ikke lastet opp")}else(0,c.H3)("PS","Du kan ikke laste opp flere enn 1 bilde")}async function Z(e){let t=e.target.value;if(t.includes(".")){(0,c.H3)("Ugyldig pris","Tips: fors\xf8k \xe5 bruk komma i stedet for punktum");return}t<-1?k(-1):k(t)}async function O(){try{let e=await T(s),t=0;for(;t<4&&(!(e=await T(s))||!(e.length>0));)t++;if(e&&e.length>0){let t=A(e);P(t)}else(0,c.H3)("Noe gikk galt","Kategoriene kunne ikke hentes for produktene")}catch(e){(0,c.H3)("Noe gikk galt","Kategoriene kunne ikke hentes for produktene")}}async function K(){try{if(C.length<1){(0,c.H3)("Bilde mangler","Du m\xe5 laste opp et bilde for \xe5 legge til et produkt");return}let e=await j(s,t,h,_,x,b,N);for(let t=0;t<C.length;t++){let n=C[t],i=await R(s),l=await E(s,i,e);await S(s,n,l,i)&&((0,c.kl)("Produktet ble lagt til","Produktet ble lagt til i databasen"),U(),g(!1),a())}}catch(e){console.log(e),(0,c.H3)("Noe gikk galt","Produktet ble ikke lagt til i databasen")}}async function V(e){if(e.preventDefault(),""===h){(0,c.H3)("Produktnavn mangler","Du m\xe5 skrive inn et produktnavn");return}if(""===x){(0,c.H3)("Produktpris mangler","Du m\xe5 skrive inn en produktpris");return}if(""===b){(0,c.H3)("Produktlager mangler","Du m\xe5 skrive inn antall p\xe5 lager");return}if(""===N){(0,c.H3)("Produktkategori mangler","Du m\xe5 velge en produktkategori");return}l(!0);try{await K()}catch(e){(0,c.H3)("Noe gikk galt","Produktet ble ikke lagt til i databasen")}l(!1)}return(0,r.useEffect)(()=>{O()},[]),(0,n.jsxs)("div",{className:F().container,children:[(0,n.jsx)("button",{className:F().addButton,onClick:I,children:(0,n.jsx)("span",{className:"material-symbols-outlined",children:"add"})}),(0,n.jsxs)("div",{className:"".concat(F().panel," ").concat(d?F().open:""),children:[(0,n.jsx)("span",{className:"".concat(F().closeButton," material-symbols-outlined"),onClick:()=>g(!1),children:"close"}),(0,n.jsx)("h1",{className:F().title,children:"Legg til et nytt produkt"}),(0,n.jsxs)("div",{className:F().form,children:[(0,n.jsx)("div",{className:F().left,children:(0,n.jsxs)("div",{className:F().imageUploadContainer,children:[B.length," / 1",B.length>0&&(0,n.jsx)("div",{className:F().imageUpload,children:B.map((e,t)=>(0,n.jsxs)("div",{className:F().imageContainer,children:[(0,n.jsx)("span",{className:"material-symbols-outlined",onClick:()=>(C.splice(t,1),void(B.splice(t,1),w([...C]),H([...B]))),children:"close"}),(0,n.jsx)(m(),{src:e,width:100,height:100,alt:"opplastet bilde ".concat(t)})]},t))}),(0,n.jsx)("div",{className:F().imageUpload,children:(0,n.jsxs)("span",{className:"material-symbols-outlined",children:["Image",(0,n.jsx)("br",{}),(0,n.jsx)("input",{id:"image",type:"file",accept:"image/jpeg",name:"image",onChange:e=>{q(e)}})]})})]})}),(0,n.jsxs)("div",{className:F().right,children:[(0,n.jsxs)("div",{className:F().inputContainer,children:[(0,n.jsx)("label",{className:F().label,children:"Produktnavn"}),(0,n.jsx)("input",{className:F().input,type:"text",value:h,onChange:e=>p(e.target.value)})]}),(0,n.jsxs)("div",{className:F().inputContainer,children:[(0,n.jsx)("label",{className:F().label,children:"Beskrivelse"}),(0,n.jsx)("textarea",{className:F().input,value:_,onChange:e=>f(e.target.value)})]}),(0,n.jsxs)("div",{className:F().inputContainer,children:[(0,n.jsx)("label",{className:F().label,children:"Pris"}),(0,n.jsx)("input",{className:F().input,type:"number",value:x,onChange:e=>Z(e)})]}),(0,n.jsxs)("div",{className:F().inputContainer,children:[(0,n.jsx)("label",{className:F().label,children:"Antall p\xe5 lager (-1 = ubegrenset)"}),(0,n.jsx)("input",{className:F().input,type:"number",value:b,onChange:e=>v(e.target.value)})]}),(0,n.jsxs)("div",{className:F().inputContainer,children:[(0,n.jsx)("label",{className:F().label,children:"Kategori"}),(0,n.jsx)(D.Z,{dropdownStyle:{maxHeight:250,overflow:"auto"},style:{width:"100%",marginBottom:"1rem"},treeData:L,placeholder:"Velg en kategori",treeDefaultExpandAll:!0,allowClear:!0,showSearch:!0,value:N,treeNodeFilterProp:"title",onChange:e=>y(e)})]}),(0,n.jsx)("div",{className:F().inputContainer,children:(0,n.jsx)("button",{className:F().submitButton,onClick:V,children:"Legg til produkt"})})]})]})]}),(0,n.jsx)(u.Z,{spinning:i,fullscreen:!0})]})}function V(e){let{salesLocationId:t}=e,a=(0,o.useSupabaseClient)(),[s,i]=(0,r.useState)(!1),[l,c]=(0,r.useState)(""),[d,g]=(0,r.useState)([]),[h,m]=(0,r.useState)(""),[p,_]=(0,r.useState)(0),[f,x]=(0,r.useState)(1);(0,r.useEffect)(()=>{m(t)},[]);let j=async()=>{if(!h){i(!1);return}i(!0);try{let e;let t=await N(a,l,h);x(t),l.length>0?(e=await w(a,l,h,p,p+9),_(0)):e=await v(a,h,p,p+9),g(e),i(!1)}catch(e){console.error("Error fetching products:",e.message)}},b=async e=>{c(e),i(!0);try{let t=await w(a,e,h,p,p+9);g(t),i(!1)}catch(e){console.error("Error fetching products:",e.message)}},y=async()=>{await j()};return(0,r.useEffect)(()=>{j()},[h,f,p,l]),(0,r.useEffect)(()=>{_(0)},[h]),(0,n.jsxs)("div",{className:k().productContainer,children:[(0,n.jsx)("h1",{children:"Registrerte produkter"}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{htmlFor:"search",children:"S\xf8k opp produkt"}),(0,n.jsx)("input",{type:"text",id:"search",name:"search",onChange:e=>b(e.target.value)})]}),(0,n.jsxs)("div",{className:k().paginationContainer,children:[(0,n.jsxs)("p",{className:k().intervalText,children:[p+1," til ",p+10]}),(0,n.jsx)("button",{onClick:()=>{p-10<0?_(0):_(p-10)},disabled:0===p,children:"Forrige"}),(0,n.jsx)("button",{onClick:()=>{_(p+10)},disabled:p+11>f,children:"Neste"})]}),s&&(0,n.jsx)(u.Z,{}),0===d.length&&!s&&(0,n.jsx)("p",{children:"Ingen produkter"}),d.length>0&&!s&&(0,n.jsx)("div",{className:k().productList,children:d.map((e,t)=>(0,n.jsx)(Z,{KeyIndex:t,ProdInfo:e,client:a,salesLocationId:h,emitRefresh:y},t))}),(0,n.jsx)(K,{salesLocationId:"".concat(h),emitRefresh:y})]})}var Y=a(8277),z=a.n(Y);async function X(e,t){let{data:a,error:n}=await e.from("Sales_locations").select("*").eq("id",t);if(n)throw n;return a}async function J(e,t){let{data:a,error:n}=await e.from("Sales_locations").update(t).eq("id",t.id).select();if(n)throw n;return a[0].id}var M=a(7523),Q=a.n(M),W=a(4284);async function G(e){let{data:t,error:a}=await e.from("Sales_location_types").select("*");if(a)throw a;return t}function $(e){let{location:t,client:a,locationImages:s,emitRefresh:i}=e,[l,o]=(0,r.useState)(!1),[d,g]=(0,r.useState)(!1),[h,p]=(0,r.useState)([]),[_,f]=(0,r.useState)([]),[x,k]=(0,r.useState)(!1),[j,b]=(0,r.useState)(""),[v,N]=(0,r.useState)(""),[y,C]=(0,r.useState)(""),[w,B]=(0,r.useState)(""),[I,D]=(0,r.useState)(""),[A,T]=(0,r.useState)(""),[q,Z]=(0,r.useState)(""),[O,F]=(0,r.useState)(""),[K,V]=(0,r.useState)([]),[Y,z]=(0,r.useState)([]);async function X(){o(!0),console.log("Location: "),console.log(t),b(t.sales_location_name),N(t.sales_location_description),C(t.address),B(t.zip_code),D(t.sales_location_tlf),T(t.lng),Z(t.lat),F(t.type_id),f(s),p([]);try{let e=await H(a,t.id);console.log("Image urls: "),console.log(e),e&&e.length>0?(z(e),console.log(e[0].url)):(0,c.H3)("Utsalget mangler bilde","Bildene kunne ikke hentes")}catch(e){console.error("Error fetching product image:",e.message),(0,c.H3)("Noe gikk galt","Bildene kunne ikke hentes for utsalget")}g(!0),o(!1)}async function M(e){if(0===h.length&&1!==_.length)try{let t=e.target.files[0];console.log(t),p([...h,t]),f([..._,URL.createObjectURL(t)]),k(!0)}catch(e){(0,c.H3)("Noe gikk galt","Bildene ble ikke lastet opp")}else(0,c.H3)("PS","Du kan ikke laste opp flere enn 1 bilde")}async function Q(){try{let e=await G(a);V(e)}catch(e){(0,c.H3)("Noe gikk galt","Typene kunne ikke hentes for utsalgsstedene")}}async function $(){let e=!0;try{0===Y.length?e=!1:(await L(a,Y[0].url),await P(a,t.id))}catch(t){console.log(t),e?(0,c.H3)("Noe gikk galt","Bildet ble ikke fjernet fra produktet"):console.log("Produktet hadde ikke bilde fra f\xf8r, men det ble lagt til et n\xe5.")}}async function ee(){try{let e=await J(a,{id:t.id,sales_location_name:j,sales_location_description:v,address:y,zip_code:w,sales_location_tlf:I,lng:A,lat:q,type_id:O});if(x&&await $(),h.length>0)for(let t=0;t<h.length;t++){let n=h[t],s=await R(a),i=await E(a,s,e);await S(a,n,i,s),(0,c.kl)("Bilde lastet opp","Bildet lastes opp.. Vent litt for \xe5 se endringene")}g(!1),(0,c.kl)("Utsalget ble endret","Utsalget ble oppdatert i databasen"),i()}catch(e){console.log(e),(0,c.H3)("Noe gikk galt","Utsalget ble ikke oppdatert i databasen")}}async function et(e){if(e.preventDefault(),""===j){(0,c.H3)("Navn mangler","Du m\xe5 skrive inn et navn for utsalget");return}if(""===y){(0,c.H3)("Adresse mangler","Du m\xe5 skrive inn en adresse for utsalget");return}if(""===w){(0,c.H3)("Postkode mangler","Du m\xe5 skrive inn en postkode for utsalget");return}if(""===I){(0,c.H3)("Telefonnummer mangler","Du m\xe5 skrive inn et telefonnummer for utsalget");return}if(""===A){(0,c.H3)("Lengdegrad mangler","Du m\xe5 skrive inn en lengdegrad for utsalget");return}if(""===q){(0,c.H3)("Breddegrad mangler","Du m\xe5 skrive inn en breddegrad for utsalget");return}if(""===O){(0,c.H3)("Utsalgstype mangler","Du m\xe5 velge en type for utsalget");return}if(console.log("Location: "),console.log(t),j===t.sales_location_name&&v===t.sales_location_description&&y===t.address&&w===t.zip_code&&I===t.sales_location_tlf&&A===t.lng&&q===t.lat&&O===t.type_id&&!x){(0,c.H3)("Ingen endringer","Du m\xe5 gj\xf8re endringer for \xe5 oppdatere produktet");return}o(!0);try{console.log("Execute update location"),await ee()}catch(e){(0,c.H3)("Noe gikk galt","Produktet ble ikke lagt til i databasen")}o(!1)}return(0,r.useEffect)(()=>{Q()},[]),(0,n.jsxs)("div",{className:U().container,children:[(0,n.jsx)("button",{className:U().editButton,onClick:X,children:"Endre utsalg"}),(0,n.jsxs)("div",{className:"".concat(U().panel," ").concat(d?U().open:""),children:[(0,n.jsx)("span",{className:"".concat(U().closeButton," material-symbols-outlined"),onClick:()=>g(!1),children:"close"}),(0,n.jsx)("h1",{className:U().title,children:"Endre utsalg"}),(0,n.jsxs)("div",{className:U().form,children:[(0,n.jsx)("div",{className:U().left,children:(0,n.jsxs)("div",{className:U().imageUploadContainer,children:[_.length," / 1",_.length>0&&(0,n.jsx)("div",{className:U().imageUpload,children:_.map((e,t)=>(0,n.jsxs)("div",{className:U().imageContainer,children:[(0,n.jsx)("span",{className:"material-symbols-outlined",onClick:()=>(h.splice(t,1),void(_.splice(t,1),p([...h]),f([..._]),k(!0))),children:"close"}),(0,n.jsx)(m(),{src:e,width:100,height:100,alt:"opplastet bilde ".concat(t)})]},t))}),(0,n.jsx)("div",{className:U().imageUpload,children:(0,n.jsxs)("span",{className:"material-symbols-outlined",children:["Image",(0,n.jsx)("br",{}),(0,n.jsx)("input",{id:"image",type:"file",accept:"image/jpeg",name:"image",onChange:e=>{M(e)}})]})})]})}),t&&(0,n.jsxs)("div",{className:U().right,children:[(0,n.jsxs)("div",{className:U().inputContainer,children:[(0,n.jsx)("label",{className:U().label,children:"Navn p\xe5 utsalget"}),(0,n.jsx)("input",{className:U().input,type:"text",value:j,onChange:e=>b(e.target.value)})]}),(0,n.jsxs)("div",{className:U().inputContainer,children:[(0,n.jsx)("label",{className:U().label,children:"Beskrivelse"}),(0,n.jsx)("textarea",{className:U().input,value:v,onChange:e=>N(e.target.value)})]}),(0,n.jsxs)("div",{className:U().inputContainer,children:[(0,n.jsx)("label",{className:U().label,children:"Adresse"}),(0,n.jsx)("input",{className:U().input,type:"text",value:y,onChange:e=>C(e.target.value)})]}),(0,n.jsxs)("div",{className:U().inputContainer,children:[(0,n.jsx)("label",{className:U().label,children:"Postkode"}),(0,n.jsx)("input",{className:U().input,type:"text",value:w,onChange:e=>B(e.target.value)})]}),(0,n.jsxs)("div",{className:U().inputContainer,children:[(0,n.jsx)("label",{className:U().label,children:"Telefon"}),(0,n.jsx)("input",{className:U().input,type:"text",value:I,onChange:e=>D(e.target.value)})]}),(0,n.jsxs)("div",{className:U().inputContainer,children:[(0,n.jsx)("label",{className:U().label,children:"Lengdegrad"}),(0,n.jsx)("input",{className:U().input,type:"text",value:A,onChange:e=>T(e.target.value)})]}),(0,n.jsxs)("div",{className:U().inputContainer,children:[(0,n.jsx)("label",{className:U().label,children:"Breddegrad"}),(0,n.jsx)("input",{className:U().input,type:"text",value:q,onChange:e=>Z(e.target.value)})]}),(0,n.jsxs)("div",{className:U().inputContainer,children:[(0,n.jsx)("label",{className:U().label,children:"Type utsalg"}),(0,n.jsx)(W.Z,{value:O,onChange:e=>F(e),children:K&&K.map((e,t)=>(0,n.jsx)(W.Z.Option,{value:e.id,children:e.type_name},t))})]}),(0,n.jsx)("div",{className:U().inputContainer,children:(0,n.jsx)("button",{className:U().submitButton,onClick:et,children:"Oppdater utsalg"})})]})]})]}),(0,n.jsx)(u.Z,{spinning:l,fullscreen:!0})]})}function ee(e){let{KeyIndex:t,LocationInfo:a,client:s,emitRefresh:i}=e,[l,o]=(0,r.useState)(null),[c,d]=(0,r.useState)(""),u=async()=>{try{let e=await H(s,a.id);if(console.log("Images fetched:",e),e&&e.length>0){let t=[];for(let a=0;a<e.length;a++)t.push(await B(s,e[a].url));t.length>0&&(d(t),console.log("Location images:",c))}}catch(e){console.error("Error fetching location image:",e.message)}};return(0,r.useEffect)(()=>{let e=a.pending;1===e?o("Verifisert utsalg"):2===e?o("Ikke verifisert utsalg"):o("Venter p\xe5 verifisering");try{u()}catch(e){console.error("Error fetching location image:",e.message)}},[]),(0,r.useEffect)(()=>{u()},[a]),(0,n.jsxs)("div",{className:Q().locationContainer,children:[c&&c.map((e,t)=>(0,n.jsx)(m(),{src:e,alt:"Produktbilde",width:100,height:100},t)),(0,n.jsx)("h2",{children:a.sales_location_name}),(0,n.jsxs)("p",{children:[(0,n.jsx)("b",{children:"Beskrivelse: "}),a.sales_location_description]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("b",{children:"Adresse: "}),a.address]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("b",{children:"Postkode: "}),a.zip_code]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("b",{children:"Telefon: "}),a.sales_location_tlf]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("b",{children:"Lengdegrad: "}),a.lng]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("b",{children:"Breddegrad: "}),a.lat]}),(0,n.jsxs)("p",{children:[(0,n.jsx)("b",{children:"Opprettet: "}),a.created_at]}),l&&(0,n.jsxs)("p",{children:[(0,n.jsx)("b",{children:"Status: "})," ",l]}),(0,n.jsx)($,{location:a,locationImages:c,client:s,emitRefresh:i})]},t)}function et(e){let{salesLocationId:t}=e,a=(0,o.useSupabaseClient)(),[s,i]=(0,r.useState)(!1),[l,c]=(0,r.useState)(null),d=async()=>{if(!t){i(!1);return}i(!0);try{let e=await X(a,t);console.log(e[0]),c(e[0]),i(!1)}catch(e){console.error("Error fetching location:",e.message)}};return(0,r.useEffect)(()=>{d()},[]),(0,n.jsxs)("div",{className:z().locationListContainer,children:[(0,n.jsx)("h1",{children:"Registrerte utsalgssteder"}),l&&(0,n.jsx)(ee,{KeyIndex:0,LocationInfo:l,client:a,emitRefresh:()=>{d()}}),s&&(0,n.jsx)(u.Z,{})]})}let ea=async e=>{let{data:t,error:a}=await e.auth.getSession();if(a)throw a;return t};function en(){let e=(0,o.useSupabaseClient)(),t=(0,l.useRouter)(),{confirm:a}=d.default,[s,h]=(0,r.useState)(!1),[m,p]=(0,r.useState)("dashboard"),[_,x]=(0,r.useState)(null),[k,j]=(0,r.useState)(null),[b,v]=(0,r.useState)(null),[N,y]=(0,r.useState)(!1),[C,w]=(0,r.useState)(!1);async function S(){h(!0);let t=await L();t?(x(t),await P(t.id)):(0,c.H3)("Kunne ikke hente utsalg");try{let t=await ea(e);y(null!==t.session.access_token)}catch(e){(0,c.AV)("Advarsel","Vennligst pr\xf8v igjen senere.")}h(!1)}async function L(){let{data:s,error:i}=await e.from("Establishments").select();return i?(0,c.H3)(i.message):(console.log(s),x(s[0]),0===s.length&&a({title:"Du er ikke registrert som utselger",icon:(0,n.jsx)(g.Z,{}),content:"\xd8nsker du \xe5 registrere deg som utselger?",okText:"Registrer",cancelText:"Avbryt",okButtonProps:{style:{backgroundColor:"#84A59D"}},onOk(){d.default.destroyAll(),t.push("/utselger/registrer")},onCancel(){d.default.destroyAll(),t.push("/")}})),s[0]}async function P(t){await e.from("Sales_locations").select("*").eq("establishment_id",t).then(e=>{let{data:t,error:a}=e;a?(0,c.H3)(a.message):(console.log(t),j(t),v(t[0].id))})}function B(e){p(e),t.push("/utselger/dashboard?nav=".concat(e))}return(0,r.useEffect)(()=>{S()},[]),(0,n.jsxs)("main",{className:i().main,children:[(0,n.jsx)("div",{className:i().leftContainer,children:(0,n.jsxs)("div",{className:i().navbar,children:[(0,n.jsxs)("div",{className:i().navbarHeader,onClick:()=>w(!C),children:[(0,n.jsx)("h1",{className:i().navbarHeaderText,children:k?k.find(e=>e.id===b).sales_location_name:""}),(0,n.jsx)("span",{className:"material-symbols-outlined ".concat(C?i().navbarHeaderIconExpanded:""),children:C?"expand_less":"expand_more"})]}),(0,n.jsx)("div",{className:"".concat(i().navbarSalesLocations," ").concat(C?i().navbarSalesLocationsExpanded:""),children:k?k.map(e=>(0,n.jsx)("div",{className:"".concat(i().navbarSalesLocation," ").concat(b===e.id?i().navbarSalesLocationSelected:""),onClick:()=>v(e.id),children:(0,n.jsx)("p",{className:i().navbarSalesLocationText,children:e.sales_location_name})},e.id)):""}),(0,n.jsxs)("div",{className:"".concat(i().navbarItem," ").concat("dashboard"===m?i().active:""),onClick:()=>B("dashboard"),children:[(0,n.jsx)("span",{className:"material-symbols-outlined",children:"grid_view"}),(0,n.jsx)("p",{className:i().navbarItemText,children:"Dashboard"})]}),(0,n.jsxs)("div",{className:"".concat(i().navbarItem," ").concat("location-settings"===m?i().active:""),onClick:()=>B("location-settings"),children:[(0,n.jsx)("span",{className:"material-symbols-outlined",children:"storefront"}),(0,n.jsx)("p",{className:i().navbarItemText,children:"Utsalg"})]}),(0,n.jsxs)("div",{className:"".concat(i().navbarItem," ").concat("economy"===m?i().active:""),onClick:()=>B("economy"),children:[(0,n.jsx)("span",{className:"material-symbols-outlined",children:"payments"}),(0,n.jsx)("p",{className:i().navbarItemText,children:"\xd8konomi"})]}),(0,n.jsxs)("div",{className:"".concat(i().navbarItem," ").concat("orders"===m?i().active:""),onClick:()=>B("orders"),children:[(0,n.jsx)("span",{className:"material-symbols-outlined",children:"orders"}),(0,n.jsx)("p",{className:i().navbarItemText,children:"Ordre"})]}),(0,n.jsxs)("div",{className:"".concat(i().navbarItem," ").concat("products"===m?i().active:""),onClick:()=>B("products"),children:[(0,n.jsx)("span",{className:"material-symbols-outlined",children:"inventory_2"}),(0,n.jsx)("p",{className:i().navbarItemText,children:"Produkter"})]}),(0,n.jsxs)("div",{className:"".concat(i().navbarItem," ").concat("employees"===m?i().active:""),onClick:()=>B("employees"),children:[(0,n.jsx)("span",{className:"material-symbols-outlined",children:"group"}),(0,n.jsx)("p",{className:i().navbarItemText,children:"Ansatte"})]}),(0,n.jsxs)("div",{className:"".concat(i().navbarItem," ").concat("settings"===m?i().active:""),onClick:()=>B("settings"),children:[(0,n.jsx)("span",{className:"material-symbols-outlined",children:"settings"}),(0,n.jsx)("p",{className:i().navbarItemText,children:"Innstillinger"})]})]})}),(0,n.jsxs)("div",{className:i().rightContainer,children:[(0,n.jsx)(f,{}),"dashboard"===m?(0,n.jsx)("div",{className:i().content,children:(0,n.jsx)("h1",{children:"Dashboard"})}):"location-settings"===m?(0,n.jsx)("div",{className:i().content,children:(0,n.jsx)(et,{salesLocationId:b})}):"economy"===m?(0,n.jsx)("div",{className:i().content,children:(0,n.jsx)("h1",{children:"\xd8konomi"})}):"orders"===m?(0,n.jsx)("div",{className:i().content,children:(0,n.jsx)("h1",{children:"Ordre"})}):"products"===m?(0,n.jsx)("div",{className:i().content,children:(0,n.jsx)(V,{salesLocationId:b})}):"employees"===m?(0,n.jsx)("div",{className:i().content,children:(0,n.jsx)("h1",{children:"Ansatte"})}):"settings"===m?(0,n.jsx)("div",{className:i().content,children:(0,n.jsx)("h1",{children:"Innstillinger"})}):""]}),(0,n.jsx)(u.Z,{spinning:s,fullscreen:!0})]})}},2965:function(e){e.exports={header:"DashboardHeader_header__cSr_k",headerButton:"DashboardHeader_headerButton__RdY7n"}},9450:function(e){e.exports={container:"AddProduct_container__SxArF",addButton:"AddProduct_addButton__1SqAk",panel:"AddProduct_panel__hA6Lv",open:"AddProduct_open__ae15R",closeButton:"AddProduct_closeButton__KYLfQ",form:"AddProduct_form__YI_E7",left:"AddProduct_left__OTrlT",right:"AddProduct_right__JJxkP",imageUploadContainer:"AddProduct_imageUploadContainer__UERTF",imageUpload:"AddProduct_imageUpload__fCb_f",imageContainer:"AddProduct_imageContainer__715Ct",inputContainer:"AddProduct_inputContainer__WtVcm",submitButton:"AddProduct_submitButton__X_MZ6"}},2672:function(e){e.exports={container:"EditProduct_container__Z_gb1",editButton:"EditProduct_editButton__ptKbv",panel:"EditProduct_panel__Zx5vS",open:"EditProduct_open__137aa",closeButton:"EditProduct_closeButton__DJ6Fh",form:"EditProduct_form__TmQ3i",left:"EditProduct_left__x_a1f",right:"EditProduct_right__caMUE",imageUploadContainer:"EditProduct_imageUploadContainer__Islir",imageUpload:"EditProduct_imageUpload__rhat0",imageContainer:"EditProduct_imageContainer__4Xkxh",inputContainer:"EditProduct_inputContainer__EiFgL",submitButton:"EditProduct_submitButton__wlRTJ"}},7523:function(e){e.exports={locationContainer:"Location_locationContainer__bG1xY"}},8277:function(e){e.exports={locationListContainer:"LocationList_locationListContainer__DBLLv",productContainer:"LocationList_productContainer__6_Wfq",paginationContainer:"LocationList_paginationContainer__UShDF",intervalText:"LocationList_intervalText___4s2v",productList:"LocationList_productList__AgaRj",productItemContainer:"LocationList_productItemContainer__DUic3",unlisted:"LocationList_unlisted__sAYe8",productButtonUnlist:"LocationList_productButtonUnlist__ezF3S",productButtonList:"LocationList_productButtonList__mmcSi",buttonContainer:"LocationList_buttonContainer__yaYqm"}},636:function(e){e.exports={productContainer:"ProductList_productContainer__Zw9Dv",paginationContainer:"ProductList_paginationContainer__7u0DI",intervalText:"ProductList_intervalText__sb6Vw",productList:"ProductList_productList__qAkCv",productItemContainer:"ProductList_productItemContainer__clC9r",unlisted:"ProductList_unlisted__8U28Y",productButtonUnlist:"ProductList_productButtonUnlist__YlYsS",productButtonList:"ProductList_productButtonList__ILz64",buttonContainer:"ProductList_buttonContainer__Zy7n6"}},1940:function(e){e.exports={main:"dashboard_main___MfCX",leftContainer:"dashboard_leftContainer__rpALB",rightContainer:"dashboard_rightContainer__xFcws",navbar:"dashboard_navbar__Cp9Zv",navbarItem:"dashboard_navbarItem__iNtw0",icon:"dashboard_icon__JkZ80",active:"dashboard_active__MCQkP",navbarHeader:"dashboard_navbarHeader__t_9zi",navbarSalesLocations:"dashboard_navbarSalesLocations__1OW7R",navbarSalesLocationsExpanded:"dashboard_navbarSalesLocationsExpanded__1JXkC",navbarSalesLocation:"dashboard_navbarSalesLocation__x_LX7"}}},function(e){e.O(0,[61,159,836,888,774,179],function(){return e(e.s=5706)}),_N_E=e.O()}]);