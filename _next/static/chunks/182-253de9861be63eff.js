"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[182],{5182:function(e,t,n){n.d(t,{ZP:function(){return L}});var r,a,__assign=function(){return(__assign=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};function __awaiter(e,t,n,r){return new(n||(n=Promise))(function(a,i){function fulfilled(e){try{step(r.next(e))}catch(e){i(e)}}function rejected(e){try{step(r.throw(e))}catch(e){i(e)}}function step(e){var t;e.done?a(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())})}function __generator(e,t){var n,r,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function verb(c){return function(s){return function(c){if(n)throw TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(o=0)),o;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return o.label++,{value:c[1],done:!1};case 5:o.label++,r=c[1],c=[0];continue;case 7:c=o.ops.pop(),o.trys.pop();continue;default:if(!(a=(a=o.trys).length>0&&a[a.length-1])&&(6===c[0]||2===c[0])){o=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){o.label=c[1];break}if(6===c[0]&&o.label<a[1]){o.label=a[1],a=c;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(c);break}a[2]&&o.ops.pop(),o.trys.pop();continue}c=t.call(e,o)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}}function __spreadArray(e,t,n){if(n||2==arguments.length)for(var r,a=0,i=t.length;a<i;a++)!r&&a in t||(r||(r=Array.prototype.slice.call(t,0,a)),r[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))}"function"==typeof SuppressedError&&SuppressedError;var i="4.1.0";function wait(e,t){return new Promise(function(n){return setTimeout(n,e,t)})}function isPromise(e){return!!e&&"function"==typeof e.then}function awaitIfAsync(e,t){try{var n=e();isPromise(n)?n.then(function(e){return t(!0,e)},function(e){return t(!1,e)}):t(!0,n)}catch(e){t(!1,e)}}function mapWithBreaks(e,t,n){return void 0===n&&(n=16),__awaiter(this,void 0,void 0,function(){var r,a,i,o;return __generator(this,function(c){switch(c.label){case 0:r=Array(e.length),a=Date.now(),i=0,c.label=1;case 1:if(!(i<e.length))return[3,4];if(r[i]=t(e[i],i),!((o=Date.now())>=a+n))return[3,3];return a=o,[4,wait(0)];case 2:c.sent(),c.label=3;case 3:return++i,[3,1];case 4:return[2,r]}})})}function suppressUnhandledRejectionWarning(e){e.then(void 0,function(){})}function toInt(e){return parseInt(e)}function toFloat(e){return parseFloat(e)}function replaceNaN(e,t){return"number"==typeof e&&isNaN(e)?t:e}function countTruthy(e){return e.reduce(function(e,t){return e+(t?1:0)},0)}function round(e,t){if(void 0===t&&(t=1),Math.abs(t)>=1)return Math.round(e/t)*t;var n=1/t;return Math.round(e*n)/n}function x64Add(e,t){var n,r,a=e[0]>>>16,i=65535&e[0],o=e[1]>>>16,c=65535&e[1],s=t[0]>>>16,u=65535&t[0],l=t[1]>>>16,d=65535&t[1],f=0,m=0;n=0+((r=0+(c+d))>>>16),r&=65535,n+=o+l,m+=n>>>16,n&=65535,m+=i+u,f+=m>>>16,m&=65535,f+=a+s,f&=65535,e[0]=f<<16|m,e[1]=n<<16|r}function x64Multiply(e,t){var n,r,a=e[0]>>>16,i=65535&e[0],o=e[1]>>>16,c=65535&e[1],s=t[0]>>>16,u=65535&t[0],l=t[1]>>>16,d=65535&t[1],f=0,m=0;n=0+((r=0+c*d)>>>16),r&=65535,n+=o*d,m+=n>>>16,n&=65535,n+=c*l,m+=n>>>16,n&=65535,m+=i*d,f+=m>>>16,m&=65535,m+=o*l,f+=m>>>16,m&=65535,m+=c*u,f+=m>>>16,m&=65535,f+=a*d+i*l+o*u+c*s,f&=65535,e[0]=f<<16|m,e[1]=n<<16|r}function x64Rotl(e,t){var n=e[0];32==(t%=64)?(e[0]=e[1],e[1]=n):t<32?(e[0]=n<<t|e[1]>>>32-t,e[1]=e[1]<<t|n>>>32-t):(t-=32,e[0]=e[1]<<t|n>>>32-t,e[1]=n<<t|e[1]>>>32-t)}function x64LeftShift(e,t){0!=(t%=64)&&(t<32?(e[0]=e[1]>>>32-t,e[1]=e[1]<<t):(e[0]=e[1]<<t-32,e[1]=0))}function x64Xor(e,t){e[0]^=t[0],e[1]^=t[1]}var o=[4283543511,3981806797],c=[3301882366,444984403];function x64Fmix(e){var t=[0,e[0]>>>1];x64Xor(e,t),x64Multiply(e,o),t[1]=e[0]>>>1,x64Xor(e,t),x64Multiply(e,c),t[1]=e[0]>>>1,x64Xor(e,t)}var s=[2277735313,289559509],u=[1291169091,658871167],l=[0,5],d=[0,1390208809],f=[0,944331445];function isTrident(){var e=window,t=navigator;return countTruthy(["MSCSSMatrix"in e,"msSetImmediate"in e,"msIndexedDB"in e,"msMaxTouchPoints"in t,"msPointerEnabled"in t])>=4}function isChromium(){var e=window,t=navigator;return countTruthy(["webkitPersistentStorage"in t,"webkitTemporaryStorage"in t,0===t.vendor.indexOf("Google"),"webkitResolveLocalFileSystemURL"in e,"BatteryManager"in e,"webkitMediaStream"in e,"webkitSpeechGrammar"in e])>=5}function isWebKit(){var e=window,t=navigator;return countTruthy(["ApplePayError"in e,"CSSPrimitiveValue"in e,"Counter"in e,0===t.vendor.indexOf("Apple"),"getStorageUpdates"in t,"WebKitMediaKeys"in e])>=4}function isDesktopWebKit(){var e=window,t=e.HTMLElement,n=e.Document;return countTruthy(["safari"in e,!("ongestureend"in e),!("TouchEvent"in e),!("orientation"in e),t&&!("autocapitalize"in t.prototype),n&&"pointerLockElement"in n.prototype])>=4}function isSafariWebKit(){var e,t=window;return e=t.print,!!/^function\s.*?\{\s*\[native code]\s*}$/.test(String(e))&&countTruthy(["[object WebPageNamespace]"===String(t.browser),"MicrodataExtractor"in t])>=1}function isGecko(){var e,t,n=window;return countTruthy(["buildID"in navigator,"MozAppearance"in(null!==(t=null===(e=document.documentElement)||void 0===e?void 0:e.style)&&void 0!==t?t:{}),"onmozfullscreenchange"in n,"mozInnerScreenX"in n,"CSSMozDocumentRule"in n,"CanvasCaptureMediaStream"in n])>=4}function isWebKit616OrNewer(){var e=window,t=navigator,n=e.CSS,r=e.HTMLButtonElement;return countTruthy([!("getStorageUpdates"in t),r&&"popover"in r.prototype,"CSSCounterStyleRule"in e,n.supports("font-size-adjust: ex-height 0.5"),n.supports("text-transform: full-width")])>=4}function isAndroid(){var e=isChromium(),t=isGecko();if(!e&&!t)return!1;var n=window;return countTruthy(["onorientationchange"in n,"orientation"in n,e&&!("SharedWorker"in n),t&&/android/i.test(navigator.appVersion)])>=2}function makeInnerError(e){var t=Error(e);return t.name=e,t}function withIframe(e,t,n){var r,a,i;return void 0===n&&(n=50),__awaiter(this,void 0,void 0,function(){var o,c;return __generator(this,function(s){switch(s.label){case 0:o=document,s.label=1;case 1:if(o.body)return[3,3];return[4,wait(n)];case 2:return s.sent(),[3,1];case 3:c=o.createElement("iframe"),s.label=4;case 4:return s.trys.push([4,,10,11]),[4,new Promise(function(e,n){var r=!1,resolve=function(){r=!0,e()};c.onload=resolve,c.onerror=function(e){r=!0,n(e)};var a=c.style;a.setProperty("display","block","important"),a.position="absolute",a.top="0",a.left="0",a.visibility="hidden",t&&"srcdoc"in c?c.srcdoc=t:c.src="about:blank",o.body.appendChild(c);var checkReadyState=function(){var e,t;r||((null===(t=null===(e=c.contentWindow)||void 0===e?void 0:e.document)||void 0===t?void 0:t.readyState)==="complete"?resolve():setTimeout(checkReadyState,10))};checkReadyState()})];case 5:s.sent(),s.label=6;case 6:if(null===(a=null===(r=c.contentWindow)||void 0===r?void 0:r.document)||void 0===a?void 0:a.body)return[3,8];return[4,wait(n)];case 7:return s.sent(),[3,6];case 8:return[4,e(c,c.contentWindow)];case 9:return[2,s.sent()];case 10:return null===(i=c.parentNode)||void 0===i||i.removeChild(c),[7];case 11:return[2]}})})}var m=["monospace","sans-serif","serif"],h=["sans-serif-thin","ARNO PRO","Agency FB","Arabic Typesetting","Arial Unicode MS","AvantGarde Bk BT","BankGothic Md BT","Batang","Bitstream Vera Sans Mono","Calibri","Century","Century Gothic","Clarendon","EUROSTILE","Franklin Gothic","Futura Bk BT","Futura Md BT","GOTHAM","Gill Sans","HELV","Haettenschweiler","Helvetica Neue","Humanst521 BT","Leelawadee","Letter Gothic","Levenim MT","Lucida Bright","Lucida Sans","Menlo","MS Mincho","MS Outlook","MS Reference Specialty","MS UI Gothic","MT Extra","MYRIAD PRO","Marlett","Meiryo UI","Microsoft Uighur","Minion Pro","Monotype Corsiva","PMingLiU","Pristina","SCRIPTINA","Segoe UI Light","Serifa","SimHei","Small Fonts","Staccato222 BT","TRAJAN PRO","Univers CE 55 Medium","Vrinda","ZWAdobeF"];function canvasToString(e){return e.toDataURL()}function getCurrentScreenFrame(){var e=screen;return[replaceNaN(toFloat(e.availTop),null),replaceNaN(toFloat(e.width)-toFloat(e.availWidth)-replaceNaN(toFloat(e.availLeft),0),null),replaceNaN(toFloat(e.height)-toFloat(e.availHeight)-replaceNaN(toFloat(e.availTop),0),null),replaceNaN(toFloat(e.availLeft),null)]}function isFrameSizeNull(e){for(var t=0;t<4;++t)if(e[t])return!1;return!0}function forceShow(e){e.style.setProperty("visibility","hidden","important"),e.style.setProperty("display","block","important")}function doesMatch$4(e){return matchMedia("(inverted-colors: ".concat(e,")")).matches}function doesMatch$3(e){return matchMedia("(forced-colors: ".concat(e,")")).matches}function doesMatch$2(e){return matchMedia("(prefers-contrast: ".concat(e,")")).matches}function doesMatch$1(e){return matchMedia("(prefers-reduced-motion: ".concat(e,")")).matches}function doesMatch(e){return matchMedia("(dynamic-range: ".concat(e,")")).matches}var v=Math,fallbackFn=function(){return 0},p={default:[],apple:[{font:"-apple-system-body"}],serif:[{fontFamily:"serif"}],sans:[{fontFamily:"sans-serif"}],mono:[{fontFamily:"monospace"}],min:[{fontSize:"1px"}],system:[{fontFamily:"system-ui"}]},b=new Set([10752,2849,2884,2885,2886,2928,2929,2930,2931,2932,2960,2961,2962,2963,2964,2965,2966,2967,2968,2978,3024,3042,3088,3089,3106,3107,32773,32777,32777,32823,32824,32936,32937,32938,32939,32968,32969,32970,32971,3317,33170,3333,3379,3386,33901,33902,34016,34024,34076,3408,3410,3411,3412,3413,3414,3415,34467,34816,34817,34818,34819,34877,34921,34930,35660,35661,35724,35738,35739,36003,36004,36005,36347,36348,36349,37440,37441,37443,7936,7937,7938]),y=new Set([34047,35723,36063,34852,34853,34854,34229,36392,36795,38449]),g=["FRAGMENT_SHADER","VERTEX_SHADER"],w=["LOW_FLOAT","MEDIUM_FLOAT","HIGH_FLOAT","LOW_INT","MEDIUM_INT","HIGH_INT"],k="WEBGL_debug_renderer_info";function getWebGLContext(e){if(e.webgl)return e.webgl.context;var t,n=document.createElement("canvas");n.addEventListener("webglCreateContextError",function(){return t=void 0});for(var r=0,a=["webgl","experimental-webgl"];r<a.length;r++){var i=a[r];try{t=n.getContext(i)}catch(e){}if(t)break}return e.webgl={context:t},t}function getConstantsFromPrototype(e){return Object.keys(e.__proto__).filter(isConstantLike)}function isConstantLike(e){return"string"==typeof e&&!e.match(/[^A-Z0-9_x]/)}function isValidParameterGetter(e){return"function"==typeof e.getParameter}var x={fonts:function(){var e=this;return withIframe(function(t,n){var r=n.document;return __awaiter(e,void 0,void 0,function(){var e,t,n,a,i,o,c,s,u,l;return __generator(this,function(d){switch(d.label){case 0:return(e=r.body).style.fontSize="48px",(t=r.createElement("div")).style.setProperty("visibility","hidden","important"),n={},a={},i=function(e){var n=r.createElement("span"),a=n.style;return a.position="absolute",a.top="0",a.left="0",a.fontFamily=e,n.textContent="mmMwWLliI0O&1",t.appendChild(n),n},o=function(){for(var e={},_loop_1=function(t){e[t]=m.map(function(e){return i("'".concat(t,"',").concat(e))})},t=0;t<h.length;t++)_loop_1(h[t]);return e},c=function(e){return m.some(function(t,r){return e[r].offsetWidth!==n[t]||e[r].offsetHeight!==a[t]})},s=m.map(i),u=o(),e.appendChild(t),[4,wait(0)];case 1:for(d.sent(),l=0;l<m.length;l++)n[m[l]]=s[l].offsetWidth,a[m[l]]=s[l].offsetHeight;return[2,h.filter(function(e){return c(u[e])})]}})})})},domBlockers:function(e){var t=(void 0===e?{}:e).debug;return __awaiter(this,void 0,void 0,function(){var e,n,r,a,i;return __generator(this,function(o){switch(o.label){case 0:var c;if(!(isWebKit()||isAndroid()))return[2,void 0];return n=Object.keys(e={abpIndo:["#Iklan-Melayang","#Kolom-Iklan-728","#SidebarIklan-wrapper",'[title="ALIENBOLA" i]',(c=atob)("I0JveC1CYW5uZXItYWRz")],abpvn:[".quangcao","#mobileCatfish",c("LmNsb3NlLWFkcw=="),'[id^="bn_bottom_fixed_"]',"#pmadv"],adBlockFinland:[".mainostila",c("LnNwb25zb3JpdA=="),".ylamainos",c("YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd"),c("YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd")],adBlockPersian:["#navbar_notice_50",".kadr",'TABLE[width="140px"]',"#divAgahi",c("YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd")],adBlockWarningRemoval:["#adblock-honeypot",".adblocker-root",".wp_adblock_detect",c("LmhlYWRlci1ibG9ja2VkLWFk"),c("I2FkX2Jsb2NrZXI=")],adGuardAnnoyances:[".hs-sosyal","#cookieconsentdiv",'div[class^="app_gdpr"]',".as-oil",'[data-cypress="soft-push-notification-modal"]'],adGuardBase:[".BetterJsPopOverlay",c("I2FkXzMwMFgyNTA="),c("I2Jhbm5lcmZsb2F0MjI="),c("I2NhbXBhaWduLWJhbm5lcg=="),c("I0FkLUNvbnRlbnQ=")],adGuardChinese:[c("LlppX2FkX2FfSA=="),c("YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd"),"#widget-quan",c("YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd"),c("YVtocmVmKj0iLjE5NTZobC5jb20vIl0=")],adGuardFrench:["#pavePub",c("LmFkLWRlc2t0b3AtcmVjdGFuZ2xl"),".mobile_adhesion",".widgetadv",c("LmFkc19iYW4=")],adGuardGerman:['aside[data-portal-id="leaderboard"]'],adGuardJapanese:["#kauli_yad_1",c("YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="),c("Ll9wb3BJbl9pbmZpbml0ZV9hZA=="),c("LmFkZ29vZ2xl"),c("Ll9faXNib29zdFJldHVybkFk")],adGuardMobile:[c("YW1wLWF1dG8tYWRz"),c("LmFtcF9hZA=="),'amp-embed[type="24smi"]',"#mgid_iframe1",c("I2FkX2ludmlld19hcmVh")],adGuardRussian:[c("YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0="),c("LnJlY2xhbWE="),'div[id^="smi2adblock"]',c("ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd"),"#psyduckpockeball"],adGuardSocial:[c("YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0="),c("YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0="),".etsy-tweet","#inlineShare",".popup-social"],adGuardSpanishPortuguese:["#barraPublicidade","#Publicidade","#publiEspecial","#queTooltip",".cnt-publi"],adGuardTrackingProtection:["#qoo-counter",c("YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=="),c("YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0="),c("YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=="),"#top100counter"],adGuardTurkish:["#backkapat",c("I3Jla2xhbWk="),c("YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="),c("YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"),c("YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==")],bulgarian:[c("dGQjZnJlZW5ldF90YWJsZV9hZHM="),"#ea_intext_div",".lapni-pop-over","#xenium_hot_offers"],easyList:[".yb-floorad",c("LndpZGdldF9wb19hZHNfd2lkZ2V0"),c("LnRyYWZmaWNqdW5reS1hZA=="),".textad_headline",c("LnNwb25zb3JlZC10ZXh0LWxpbmtz")],easyListChina:[c("LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="),c("LmZyb250cGFnZUFkdk0="),"#taotaole","#aafoot.top_box",".cfa_popup"],easyListCookie:[".ezmob-footer",".cc-CookieWarning","[data-cookie-number]",c("LmF3LWNvb2tpZS1iYW5uZXI="),".sygnal24-gdpr-modal-wrap"],easyListCzechSlovak:["#onlajny-stickers",c("I3Jla2xhbW5pLWJveA=="),c("LnJla2xhbWEtbWVnYWJvYXJk"),".sklik",c("W2lkXj0ic2tsaWtSZWtsYW1hIl0=")],easyListDutch:[c("I2FkdmVydGVudGll"),c("I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=="),".adstekst",c("YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0="),"#semilo-lrectangle"],easyListGermany:["#SSpotIMPopSlider",c("LnNwb25zb3JsaW5rZ3J1ZW4="),c("I3dlcmJ1bmdza3k="),c("I3Jla2xhbWUtcmVjaHRzLW1pdHRl"),c("YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0=")],easyListItaly:[c("LmJveF9hZHZfYW5udW5jaQ=="),".sb-box-pubbliredazionale",c("YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd"),c("YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd"),c("YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ==")],easyListLithuania:[c("LnJla2xhbW9zX3RhcnBhcw=="),c("LnJla2xhbW9zX251b3JvZG9z"),c("aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd"),c("aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd"),c("aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd")],estonian:[c("QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==")],fanboyAnnoyances:["#ac-lre-player",".navigate-to-top","#subscribe_popup",".newsletter_holder","#back-top"],fanboyAntiFacebook:[".util-bar-module-firefly-visible"],fanboyEnhancedTrackers:[".open.pushModal","#issuem-leaky-paywall-articles-zero-remaining-nag","#sovrn_container",'div[class$="-hide"][zoompage-fontsize][style="display: block;"]',".BlockNag__Card"],fanboySocial:["#FollowUs","#meteored_share","#social_follow",".article-sharer",".community__social-desc"],frellwitSwedish:[c("YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=="),c("YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=="),"article.category-samarbete",c("ZGl2LmhvbGlkQWRz"),"ul.adsmodern"],greekAdBlock:[c("QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd"),c("QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=="),c("QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd"),"DIV.agores300","TABLE.advright"],hungarian:["#cemp_doboz",".optimonk-iframe-container",c("LmFkX19tYWlu"),c("W2NsYXNzKj0iR29vZ2xlQWRzIl0="),"#hirdetesek_box"],iDontCareAboutCookies:['.alert-info[data-block-track*="CookieNotice"]',".ModuleTemplateCookieIndicator",".o--cookies--container","#cookies-policy-sticky","#stickyCookieBar"],icelandicAbp:[c("QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ==")],latvian:[c("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0="),c("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==")],listKr:[c("YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0="),c("I2xpdmVyZUFkV3JhcHBlcg=="),c("YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=="),c("aW5zLmZhc3R2aWV3LWFk"),".revenue_unit_item.dable"],listeAr:[c("LmdlbWluaUxCMUFk"),".right-and-left-sponsers",c("YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=="),c("YVtocmVmKj0iYm9vcmFxLm9yZyJd"),c("YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd")],listeFr:[c("YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=="),c("I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=="),c("YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0="),".site-pub-interstitiel",'div[id^="crt-"][data-criteo-id]'],officialPolish:["#ceneo-placeholder-ceneo-12",c("W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd"),c("YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=="),c("YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=="),c("ZGl2I3NrYXBpZWNfYWQ=")],ro:[c("YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd"),c("YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd"),c("YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0="),c("YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd"),'a[href^="/url/"]'],ruAd:[c("YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd"),c("YVtocmVmKj0iLy91dGltZy5ydS8iXQ=="),c("YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0="),"#pgeldiz",".yandex-rtb-block"],thaiAds:["a[href*=macau-uta-popup]",c("I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=="),c("LmFkczMwMHM="),".bumq",".img-kosana"],webAnnoyancesUltralist:["#mod-social-share-2","#social-tools",c("LmN0cGwtZnVsbGJhbm5lcg=="),".zergnet-recommend",".yt.btn-link.btn-md.btn"]}),[4,function(e){var t;return __awaiter(this,void 0,void 0,function(){var n,r,a,i,o,c,s;return __generator(this,function(u){switch(u.label){case 0:for(r=(n=document).createElement("div"),a=Array(e.length),i={},forceShow(r),o=0;o<e.length;++o)"DIALOG"===(c=function(e){for(var t=function(e){for(var t,n,r="Unexpected syntax '".concat(e,"'"),a=/^\s*([a-z-]*)(.*)$/i.exec(e),i=a[1]||void 0,o={},c=/([.:#][\w-]+|\[.+?\])/gi,addAttribute=function(e,t){o[e]=o[e]||[],o[e].push(t)};;){var s=c.exec(a[2]);if(!s)break;var u=s[0];switch(u[0]){case".":addAttribute("class",u.slice(1));break;case"#":addAttribute("id",u.slice(1));break;case"[":var l=/^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(u);if(l)addAttribute(l[1],null!==(n=null!==(t=l[4])&&void 0!==t?t:l[5])&&void 0!==n?n:"");else throw Error(r);break;default:throw Error(r)}}return[i,o]}(e),n=t[0],r=t[1],a=document.createElement(null!=n?n:"div"),i=0,o=Object.keys(r);i<o.length;i++){var c=o[i],s=r[c].join(" ");"style"===c?function(e,t){for(var n=0,r=t.split(";");n<r.length;n++){var a=r[n],i=/^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(a);if(i){var o=i[1],c=i[2],s=i[4];e.setProperty(o,c,s||"")}}}(a.style,s):a.setAttribute(c,s)}return a}(e[o])).tagName&&c.show(),forceShow(s=n.createElement("div")),s.appendChild(c),r.appendChild(s),a[o]=c;u.label=1;case 1:if(n.body)return[3,3];return[4,wait(50)];case 2:return u.sent(),[3,1];case 3:return n.body.appendChild(r),[4,wait(0)];case 4:u.sent();try{for(o=0;o<e.length;++o)a[o].offsetParent||(i[e[o]]=!0)}finally{null===(t=r.parentNode)||void 0===t||t.removeChild(r)}return[2,i]}})})}((i=[]).concat.apply(i,n.map(function(t){return e[t]})))];case 1:return r=o.sent(),t&&function(e,t){for(var n="DOM blockers debug:\n```",r=0,a=Object.keys(e);r<a.length;r++){var i=a[r];n+="\n".concat(i,":");for(var o=0,c=e[i];o<c.length;o++){var s=c[o];n+="\n  ".concat(t[s]?"\uD83D\uDEAB":"➡️"," ").concat(s)}}console.log("".concat(n,"\n```"))}(e,r),(a=n.filter(function(t){var n=e[t];return countTruthy(n.map(function(e){return r[e]}))>.6*n.length})).sort(),[2,a]}})})},fontPreferences:function(){var e,t;return e=function(e,t){for(var n={},r={},a=0,i=Object.keys(p);a<i.length;a++){var o=i[a],c=p[o],s=c[0],u=void 0===s?{}:s,l=c[1],d=void 0===l?"mmMwWLliI0fiflO&1":l,f=e.createElement("span");f.textContent=d,f.style.whiteSpace="nowrap";for(var m=0,h=Object.keys(u);m<h.length;m++){var v=h[m],b=u[v];void 0!==b&&(f.style[v]=b)}n[o]=f,t.appendChild(e.createElement("br")),t.appendChild(f)}for(var y=0,g=Object.keys(p);y<g.length;y++){var o=g[y];r[o]=n[o].getBoundingClientRect().width}return r},void 0===t&&(t=4e3),withIframe(function(n,r){var a=r.document,i=a.body,o=i.style;o.width="".concat(t,"px"),o.webkitTextSizeAdjust=o.textSizeAdjust="none",isChromium()?i.style.zoom="".concat(1/r.devicePixelRatio):isWebKit()&&(i.style.zoom="reset");var c=a.createElement("div");return c.textContent=__spreadArray([],Array(t/20<<0),!0).map(function(){return"word"}).join(" "),i.appendChild(c),e(a,i)},'<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">')},audio:function(){return isWebKit()&&isWebKit616OrNewer()&&isSafariWebKit()?-4:function(){var e,t,n=window,r=n.OfflineAudioContext||n.webkitOfflineAudioContext;if(!r)return -2;if(isWebKit()&&!isDesktopWebKit()&&!(countTruthy(["DOMRectList"in(e=window),"RTCPeerConnectionIceEvent"in e,"SVGGeometryElement"in e,"ontransitioncancel"in e])>=3))return -1;var a=new r(1,5e3,44100),i=a.createOscillator();i.type="triangle",i.frequency.value=1e4;var o=a.createDynamicsCompressor();o.threshold.value=-50,o.knee.value=40,o.ratio.value=12,o.attack.value=0,o.release.value=.25,i.connect(o),o.connect(a.destination),i.start(0);var c=(t=function(){},[new Promise(function(e,n){var r=!1,i=0,o=0;a.oncomplete=function(t){return e(t.renderedBuffer)};var startRunningTimeout=function(){setTimeout(function(){return n(makeInnerError("timeout"))},Math.min(500,o+5e3-Date.now()))},tryRender=function(){try{var e=a.startRendering();switch(isPromise(e)&&suppressUnhandledRejectionWarning(e),a.state){case"running":o=Date.now(),r&&startRunningTimeout();break;case"suspended":!document.hidden&&i++,r&&i>=3?n(makeInnerError("suspended")):setTimeout(tryRender,500)}}catch(e){n(e)}};tryRender(),t=function(){!r&&(r=!0,o>0&&startRunningTimeout())}}),t]),s=c[0],u=c[1],l=s.then(function(e){return function(e){for(var t=0,n=0;n<e.length;++n)t+=Math.abs(e[n]);return t}(e.getChannelData(0).subarray(4500))},function(e){if("timeout"===e.name||"suspended"===e.name)return -3;throw e});return suppressUnhandledRejectionWarning(l),function(){return u(),l}}()},screenFrame:function(){var e=this;if(isWebKit()&&isWebKit616OrNewer()&&isSafariWebKit())return function(){return Promise.resolve(void 0)};var t=function(){var e=this;return!function(){if(void 0===a){var checkScreenFrame=function(){var e=getCurrentScreenFrame();isFrameSizeNull(e)?a=setTimeout(checkScreenFrame,2500):(r=e,a=void 0)};checkScreenFrame()}}(),function(){return __awaiter(e,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:var n,a;if(!isFrameSizeNull(e=getCurrentScreenFrame()))return[3,2];if(r)return[2,__spreadArray([],r,!0)];if(!((n=document).fullscreenElement||n.msFullscreenElement||n.mozFullScreenElement||n.webkitFullscreenElement))return[3,2];return[4,((a=document).exitFullscreen||a.msExitFullscreen||a.mozCancelFullScreen||a.webkitExitFullscreen).call(a)];case 1:t.sent(),e=getCurrentScreenFrame(),t.label=2;case 2:return isFrameSizeNull(e)||(r=e),[2,e]}})})}}();return function(){return __awaiter(e,void 0,void 0,function(){var e,n;return __generator(this,function(r){switch(r.label){case 0:return[4,t()];case 1:return e=r.sent(),[2,[(n=function(e){return null===e?null:round(e,10)})(e[0]),n(e[1]),n(e[2]),n(e[3])]]}})})}},canvas:function(){return function(e){return __awaiter(this,void 0,void 0,function(){var t,n,r,a,i,o,c;return __generator(this,function(s){var u,l,d;switch(s.label){case 0:if(t=!1,i=((u=document.createElement("canvas")).width=1,u.height=1,a=[u,u.getContext("2d")])[0],o=a[1],l=i,o&&l.toDataURL)return[3,1];return n=r="unsupported",[3,4];case 1:if((d=o).rect(0,0,10,10),d.rect(2,2,6,6),t=!d.isPointInPath(5,5,"evenodd"),!e)return[3,2];return n=r="skipped",[3,4];case 2:return[4,function(e,t){return __awaiter(this,void 0,void 0,function(){var n,r,a;return __generator(this,function(i){switch(i.label){case 0:var o;return e.width=240,e.height=60,t.textBaseline="alphabetic",t.fillStyle="#f60",t.fillRect(100,1,62,20),t.fillStyle="#069",t.font='11pt "Times New Roman"',o="Cwm fjordbank gly ".concat(String.fromCharCode(55357,56835)),t.fillText(o,2,15),t.fillStyle="rgba(102, 204, 0, 0.2)",t.font="18pt Arial",t.fillText(o,4,45),[4,wait(0)];case 1:if(i.sent(),n=canvasToString(e),r=canvasToString(e),n!==r)return[2,["unstable","unstable"]];return function(e,t){e.width=122,e.height=110,t.globalCompositeOperation="multiply";for(var n=0,r=[["#f2f",40,40],["#2ff",80,40],["#ff2",60,80]];n<r.length;n++){var a=r[n],i=a[0],o=a[1],c=a[2];t.fillStyle=i,t.beginPath(),t.arc(o,c,40,0,2*Math.PI,!0),t.closePath(),t.fill()}t.fillStyle="#f9c",t.arc(60,60,60,0,2*Math.PI,!0),t.arc(60,60,20,0,2*Math.PI,!0),t.fill("evenodd")}(e,t),[4,wait(0)];case 2:return i.sent(),a=canvasToString(e),[2,[n,a]]}})})}(i,o)];case 3:n=(c=s.sent())[0],r=c[1],s.label=4;case 4:return[2,{winding:t,geometry:n,text:r}]}})})}(isWebKit()&&isWebKit616OrNewer()&&isSafariWebKit())},osCpu:function(){return navigator.oscpu},languages:function(){var e,t=navigator,n=[],r=t.language||t.userLanguage||t.browserLanguage||t.systemLanguage;if(void 0!==r&&n.push([r]),Array.isArray(t.languages))isChromium()&&countTruthy([!("MediaSettingsRange"in(e=window)),"RTCEncodedAudioFrame"in e,""+e.Intl=="[object Intl]",""+e.Reflect=="[object Reflect]"])>=3||n.push(t.languages);else if("string"==typeof t.languages){var a=t.languages;a&&n.push(a.split(","))}return n},colorDepth:function(){return window.screen.colorDepth},deviceMemory:function(){return replaceNaN(toFloat(navigator.deviceMemory),void 0)},screenResolution:function(){if(!(isWebKit()&&isWebKit616OrNewer()&&isSafariWebKit())){var e,t,n;return e=screen,(n=[(t=function(e){return replaceNaN(toInt(e),null)})(e.width),t(e.height)]).sort().reverse(),n}},hardwareConcurrency:function(){return replaceNaN(toInt(navigator.hardwareConcurrency),void 0)},timezone:function(){var e,t,n=null===(t=window.Intl)||void 0===t?void 0:t.DateTimeFormat;if(n){var r=new n().resolvedOptions().timeZone;if(r)return r}var a=-(e=new Date().getFullYear(),Math.max(toFloat(new Date(e,0,1).getTimezoneOffset()),toFloat(new Date(e,6,1).getTimezoneOffset())));return"UTC".concat(a>=0?"+":"").concat(Math.abs(a))},sessionStorage:function(){try{return!!window.sessionStorage}catch(e){return!0}},localStorage:function(){try{return!!window.localStorage}catch(e){return!0}},indexedDB:function(){var e,t;if(!(isTrident()||countTruthy(["msWriteProfilerMark"in(e=window),"MSStream"in e,"msLaunchUri"in(t=navigator),"msSaveBlob"in t])>=3&&!isTrident()))try{return!!window.indexedDB}catch(e){return!0}},openDatabase:function(){return!!window.openDatabase},cpuClass:function(){return navigator.cpuClass},platform:function(){var e=navigator.platform;return"MacIntel"===e&&isWebKit()&&!isDesktopWebKit()?!function(){if("iPad"===navigator.platform)return!0;var e=screen,t=e.width/e.height;return countTruthy(["MediaSource"in window,!!Element.prototype.webkitRequestFullscreen,t>.65&&t<1.53])>=2}()?"iPhone":"iPad":e},plugins:function(){var e=navigator.plugins;if(e){for(var t=[],n=0;n<e.length;++n){var r=e[n];if(r){for(var a=[],i=0;i<r.length;++i){var o=r[i];a.push({type:o.type,suffixes:o.suffixes})}t.push({name:r.name,description:r.description,mimeTypes:a})}}return t}},touchSupport:function(){var e,t=navigator,n=0;void 0!==t.maxTouchPoints?n=toInt(t.maxTouchPoints):void 0!==t.msMaxTouchPoints&&(n=t.msMaxTouchPoints);try{document.createEvent("TouchEvent"),e=!0}catch(t){e=!1}return{maxTouchPoints:n,touchEvent:e,touchStart:"ontouchstart"in window}},vendor:function(){return navigator.vendor||""},vendorFlavors:function(){for(var e=[],t=0,n=["chrome","safari","__crWeb","__gCrWeb","yandex","__yb","__ybro","__firefox__","__edgeTrackingPreventionStatistics","webkit","oprt","samsungAr","ucweb","UCShellJava","puffinDevice"];t<n.length;t++){var r=n[t],a=window[r];a&&"object"==typeof a&&e.push(r)}return e.sort()},cookiesEnabled:function(){var e=document;try{e.cookie="cookietest=1; SameSite=Strict;";var t=-1!==e.cookie.indexOf("cookietest=");return e.cookie="cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT",t}catch(e){return!1}},colorGamut:function(){for(var e=0,t=["rec2020","p3","srgb"];e<t.length;e++){var n=t[e];if(matchMedia("(color-gamut: ".concat(n,")")).matches)return n}},invertedColors:function(){return!!doesMatch$4("inverted")||!doesMatch$4("none")&&void 0},forcedColors:function(){return!!doesMatch$3("active")||!doesMatch$3("none")&&void 0},monochrome:function(){if(matchMedia("(min-monochrome: 0)").matches){for(var e=0;e<=100;++e)if(matchMedia("(max-monochrome: ".concat(e,")")).matches)return e;throw Error("Too high value")}},contrast:function(){return doesMatch$2("no-preference")?0:doesMatch$2("high")||doesMatch$2("more")?1:doesMatch$2("low")||doesMatch$2("less")?-1:doesMatch$2("forced")?10:void 0},reducedMotion:function(){return!!doesMatch$1("reduce")||!doesMatch$1("no-preference")&&void 0},hdr:function(){return!!doesMatch("high")||!doesMatch("standard")&&void 0},math:function(){var e=v.acos||fallbackFn,t=v.acosh||fallbackFn,n=v.asin||fallbackFn,r=v.asinh||fallbackFn,a=v.atanh||fallbackFn,i=v.atan||fallbackFn,o=v.sin||fallbackFn,c=v.sinh||fallbackFn,s=v.cos||fallbackFn,u=v.cosh||fallbackFn,l=v.tan||fallbackFn,d=v.tanh||fallbackFn,f=v.exp||fallbackFn,m=v.expm1||fallbackFn,h=v.log1p||fallbackFn;return{acos:e(.12312423423423424),acosh:t(1e308),acoshPf:v.log(1e154+v.sqrt(1e154*1e154-1)),asin:n(.12312423423423424),asinh:r(1),asinhPf:v.log(1+v.sqrt(2)),atanh:a(.5),atanhPf:v.log(3)/2,atan:i(.5),sin:o(-1e300),sinh:c(1),sinhPf:v.exp(1)-1/v.exp(1)/2,cos:s(10.000000000123),cosh:u(1),coshPf:(v.exp(1)+1/v.exp(1))/2,tan:l(-1e300),tanh:d(1),tanhPf:(v.exp(2)-1)/(v.exp(2)+1),exp:f(1),expm1:m(1),expm1Pf:v.exp(1)-1,log1p:h(10),log1pPf:v.log(11),powPI:v.pow(v.PI,-100)}},pdfViewerEnabled:function(){return navigator.pdfViewerEnabled},architecture:function(){var e=new Float32Array(1),t=new Uint8Array(e.buffer);return e[0]=1/0,e[0]=e[0]-e[0],t[3]},applePay:function(){var e=window.ApplePaySession;if("function"!=typeof(null==e?void 0:e.canMakePayments))return -1;try{return e.canMakePayments()?1:0}catch(e){return function(e){if(e instanceof Error){if("InvalidAccessError"===e.name){if(/\bfrom\b.*\binsecure\b/i.test(e.message))return -2;if(/\bdifferent\b.*\borigin\b.*top.level\b.*\bframe\b/i.test(e.message))return -3}if("SecurityError"===e.name&&/\bthird.party iframes?.*\bnot.allowed\b/i.test(e.message))return -3}throw e}(e)}},privateClickMeasurement:function(){var e,t=document.createElement("a"),n=null!==(e=t.attributionSourceId)&&void 0!==e?e:t.attributionsourceid;return void 0===n?void 0:String(n)},webGlBasics:function(e){var t,n,r,a,i,o,c=getWebGLContext(e.cache);if(!c)return -1;if(!isValidParameterGetter(c))return -2;var s=isGecko()?null:c.getExtension(k);return{version:(null===(t=c.getParameter(c.VERSION))||void 0===t?void 0:t.toString())||"",vendor:(null===(n=c.getParameter(c.VENDOR))||void 0===n?void 0:n.toString())||"",vendorUnmasked:s?null===(r=c.getParameter(s.UNMASKED_VENDOR_WEBGL))||void 0===r?void 0:r.toString():"",renderer:(null===(a=c.getParameter(c.RENDERER))||void 0===a?void 0:a.toString())||"",rendererUnmasked:s?null===(i=c.getParameter(s.UNMASKED_RENDERER_WEBGL))||void 0===i?void 0:i.toString():"",shadingLanguageVersion:(null===(o=c.getParameter(c.SHADING_LANGUAGE_VERSION))||void 0===o?void 0:o.toString())||""}},webGlExtensions:function(e){var t=getWebGLContext(e.cache);if(!t)return -1;if(!isValidParameterGetter(t))return -2;var n=t.getSupportedExtensions(),r=t.getContextAttributes(),a=[],i=[],o=[],c=[];if(r)for(var s=0,u=Object.keys(r);s<u.length;s++){var l=u[s];a.push("".concat(l,"=").concat(r[l]))}for(var d=getConstantsFromPrototype(t),f=0;f<d.length;f++){var m=d[f],h=t[m];i.push("".concat(m,"=").concat(h).concat(b.has(h)?"=".concat(t.getParameter(h)):""))}if(n)for(var v=0;v<n.length;v++){var p=n[v];if(!(p===k&&isGecko())){var x=t.getExtension(p);if(x)for(var L=0,S=getConstantsFromPrototype(x);L<S.length;L++){var m=S[L],h=x[m];o.push("".concat(m,"=").concat(h).concat(y.has(h)?"=".concat(t.getParameter(h)):""))}}}for(var W=0;W<g.length;W++)for(var V=g[W],F=0;F<w.length;F++){var M=w[F],_=function(e,t,n){var r=e.getShaderPrecisionFormat(e[t],e[n]);return r?[r.rangeMin,r.rangeMax,r.precision]:[]}(t,V,M);c.push("".concat(V,".").concat(M,"=").concat(_.join(",")))}return o.sort(),i.sort(),{contextAttributes:a,parameters:i,shaderPrecisions:c,extensions:n,extensionParameters:o}}};function componentsToDebugString(e){return JSON.stringify(e,function(e,t){if(t instanceof Error){var n;return __assign({name:t.name,message:t.message,stack:null===(n=t.stack)||void 0===n?void 0:n.split("\n")},t)}return t},2)}function hashComponents(e){return function(e,t){var n,r=function(e){for(var t=new Uint8Array(e.length),n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<0||r>127)return new TextEncoder().encode(e);t[n]=r}return t}(e);t=t||0;var a=[0,r.length],i=a[1]%16,o=a[1]-i,c=[0,t],m=[0,t],h=[0,0],v=[0,0];for(n=0;n<o;n+=16)h[0]=r[n+4]|r[n+5]<<8|r[n+6]<<16|r[n+7]<<24,h[1]=r[n]|r[n+1]<<8|r[n+2]<<16|r[n+3]<<24,v[0]=r[n+12]|r[n+13]<<8|r[n+14]<<16|r[n+15]<<24,v[1]=r[n+8]|r[n+9]<<8|r[n+10]<<16|r[n+11]<<24,x64Multiply(h,s),x64Rotl(h,31),x64Multiply(h,u),x64Xor(c,h),x64Rotl(c,27),x64Add(c,m),x64Multiply(c,l),x64Add(c,d),x64Multiply(v,u),x64Rotl(v,33),x64Multiply(v,s),x64Xor(m,v),x64Rotl(m,31),x64Add(m,c),x64Multiply(m,l),x64Add(m,f);h[0]=0,h[1]=0,v[0]=0,v[1]=0;var p=[0,0];switch(i){case 15:p[1]=r[n+14],x64LeftShift(p,48),x64Xor(v,p);case 14:p[1]=r[n+13],x64LeftShift(p,40),x64Xor(v,p);case 13:p[1]=r[n+12],x64LeftShift(p,32),x64Xor(v,p);case 12:p[1]=r[n+11],x64LeftShift(p,24),x64Xor(v,p);case 11:p[1]=r[n+10],x64LeftShift(p,16),x64Xor(v,p);case 10:p[1]=r[n+9],x64LeftShift(p,8),x64Xor(v,p);case 9:p[1]=r[n+8],x64Xor(v,p),x64Multiply(v,u),x64Rotl(v,33),x64Multiply(v,s),x64Xor(m,v);case 8:p[1]=r[n+7],x64LeftShift(p,56),x64Xor(h,p);case 7:p[1]=r[n+6],x64LeftShift(p,48),x64Xor(h,p);case 6:p[1]=r[n+5],x64LeftShift(p,40),x64Xor(h,p);case 5:p[1]=r[n+4],x64LeftShift(p,32),x64Xor(h,p);case 4:p[1]=r[n+3],x64LeftShift(p,24),x64Xor(h,p);case 3:p[1]=r[n+2],x64LeftShift(p,16),x64Xor(h,p);case 2:p[1]=r[n+1],x64LeftShift(p,8),x64Xor(h,p);case 1:p[1]=r[n],x64Xor(h,p),x64Multiply(h,s),x64Rotl(h,31),x64Multiply(h,u),x64Xor(c,h)}return x64Xor(c,a),x64Xor(m,a),x64Add(c,m),x64Add(m,c),x64Fmix(c),x64Fmix(m),x64Add(c,m),x64Add(m,c),("00000000"+(c[0]>>>0).toString(16)).slice(-8)+("00000000"+(c[1]>>>0).toString(16)).slice(-8)+("00000000"+(m[0]>>>0).toString(16)).slice(-8)+("00000000"+(m[1]>>>0).toString(16)).slice(-8)}(function(e){for(var t="",n=0,r=Object.keys(e).sort();n<r.length;n++){var a=r[n],i=e[a],o="error"in i?"error":JSON.stringify(i.value);t+="".concat(t?"|":"").concat(a.replace(/([:|\\])/g,"\\$1"),":").concat(o)}return t}(e))}var L={load:function(e){var t;return void 0===e&&(e={}),__awaiter(this,void 0,void 0,function(){var n,r;return __generator(this,function(a){var o,c,s,u,l,d,f,m,h,v;switch(a.label){case 0:return(null===(t=e.monitoring)||void 0===t||t)&&function(){if(!(window.__fpjs_d_m||Math.random()>=.001))try{var e=new XMLHttpRequest;e.open("get","https://m1.openfpcdn.io/fingerprintjs/v".concat(i,"/npm-monitoring"),!0),e.send()}catch(e){console.error(e)}}(),n=e.delayFallback,r=e.debug,[4,(void 0===(o=n)&&(o=50),c=o,s=2*o,(u=window.requestIdleCallback)?new Promise(function(e){return u.call(window,function(){return e()},{timeout:s})}):wait(Math.min(c,s)))];case 1:return a.sent(),l={cache:{},debug:r},d=[],m=mapWithBreaks(f=Object.keys(x).filter(function(e){return!function(e,t){for(var n=0,r=e.length;n<r;++n)if(e[n]===t)return!0;return!1}(d,e)}),function(e){var t,n;return t=x[e],suppressUnhandledRejectionWarning(n=new Promise(function(e){var n=Date.now();awaitIfAsync(t.bind(null,l),function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var a=Date.now()-n;if(!t[0])return e(function(){return{error:t[1],duration:a}});var i=t[1];if("function"!=typeof i)return e(function(){return{value:i,duration:a}});e(function(){return new Promise(function(e){var t=Date.now();awaitIfAsync(i,function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var i=a+Date.now()-t;if(!n[0])return e({error:n[1],duration:i});e({value:n[1],duration:i})})})})})})),function(){return n.then(function(e){return e()})}}),suppressUnhandledRejectionWarning(m),[2,(h=r,v=Date.now(),{get:function(e){return __awaiter(this,void 0,void 0,function(){var t,n,r;return __generator(this,function(a){switch(a.label){case 0:return t=Date.now(),[4,function(){return __awaiter(this,void 0,void 0,function(){var e,t,n;return __generator(this,function(r){switch(r.label){case 0:return[4,m];case 1:return[4,mapWithBreaks(r.sent(),function(e){var t=e();return suppressUnhandledRejectionWarning(t),t})];case 2:return[4,Promise.all(r.sent())];case 3:for(n=0,e=r.sent(),t={};n<f.length;++n)t[f[n]]=e[n];return[2,t]}})})}()];case 1:var o,c,s,u;return r={get visitorId(){return void 0===u&&(u=hashComponents(this.components)),u},set visitorId(visitorId){u=visitorId},confidence:(s=round(.99+.01*(c=function(e){if(isAndroid())return .4;if(isWebKit())return isDesktopWebKit()&&!(isWebKit616OrNewer()&&isSafariWebKit())?.5:.3;var t="value"in e.platform?e.platform.value:"";return/^Win/.test(t)?.6:/^Mac/.test(t)?.5:.7}(o=n=a.sent())),1e-4),{score:c,comment:"$ if upgrade to Pro: https://fpjs.dev/pro".replace(/\$/g,"".concat(s))}),components:o,version:i},(h||(null==e?void 0:e.debug))&&console.log("Copy the text below to get the debug data:\n\n```\nversion: ".concat(r.version,"\nuserAgent: ").concat(navigator.userAgent,"\ntimeBetweenLoadAndGet: ").concat(t-v,"\nvisitorId: ").concat(r.visitorId,"\ncomponents: ").concat(componentsToDebugString(n),"\n```")),[2,r]}})})}})]}})})},hashComponents:hashComponents,componentsToDebugString:componentsToDebugString}}}]);