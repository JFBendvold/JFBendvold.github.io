import{ah as i,ak as l}from"./index-689421b9.js";const c=i("product");async function g(t){try{return await c.get("/ean/"+t)}catch(r){throw r}}async function m(t){try{return await c.post("/",t)}catch(r){throw r}}async function w(t){try{return await c.get("/name/"+t)}catch(r){throw r}}function h(){return"7Y0pACrnoqzFuKO1njUvqIjZF0G6ysfzCCrMuxjA"}const p=l.create({baseURL:"https://kassal.app/api/v1/products",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+h()}});async function k(t){try{return await p.get("?search="+t+"&sort=name_asc")}catch(r){throw new Error("Et problem oppsto ved henting av produkter: "+r)}}async function D(t){try{return await p.get("/ean/"+t)}catch{throw new Error("Et problem oppsto ved henting av produktet: "+t)}}const a=i("fridges");async function j(t){try{return await a.post("/group/product",t)}catch{throw new Error("Kunne ikke legge til produktet til kjøleskapet.")}}async function E(t){try{return await a.get("/group/"+t)}catch{throw new Error("Kunne ikke finne kjøleskapet til gruppen med ID: "+t)}}async function v(t,r){try{return await a.delete("/group/delete/product/"+t+"/"+r.toFixed(2))}catch{throw new Error("Kunne ikke fjerne produktet med ID: "+t+" fra kjøleskapet.")}}async function x(t){try{return await a.delete("/waste/product/"+t)}catch{throw new Error("Kunne ikke fjerne produktet med ID: "+t+" fra kjøleskapet.")}}function C(t){let r=[];for(let e=0;e<t.length;e++)t[e].ean!=null&&r.push({name:t[e].name,image:t[e].image,ean:t[e].ean});return r}function F(t){let r=[];for(let e=0;e<t.products.length;e++){let n=t.products[e].amount;n==null&&(n=1);let o=t.products[e].ean.unit;o==null&&(o="stk");let s=new Date(t.products[e].purchaseDate),u=s;u.setDate(s.getDate()+t.products[e].daysToExpiration);let d=Math.ceil((u-new Date)/(1e3*60*60*24));r.push({productId:t.products[e].id,name:t.products[e].ean.name,image:t.products[e].ean.url,ean:t.products[e].ean.ean,daysToExpiration:t.products[e].daysToExpiration,remainingDays:d,purchaseDate:t.products[e].purchaseDate,amount:n,unit:o.toLowerCase(),allergies:t.products[e].ean.allergies})}return r}function P(t){let r=[];for(let e=0;e<t.products.length;e++){let n=t.products[e].price;n==null&&(n="?"),r.push({productId:e,name:t.products[e].name,image:t.products[e].url,ean:t.products[e].ean,amount:t.products[e].amount,price:n})}return r}export{x as a,P as b,F as c,m as d,D as e,E as f,g,j as h,w as i,k as j,C as k,v as r};
