(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6db1323e"],{"09cc":function(t,e,a){t.exports=a.p+"img/moleclues.7be1624e.jpg"},"0d03":function(t,e,a){t.exports=a.p+"img/disease.3fcb46fc.jpg"},"16e0":function(t,e,a){},"408a":function(t,e,a){var n=a("e330");t.exports=n(1..valueOf)},"57f2":function(t,e,a){var n,s;!function(o,i){n=i,s="function"===typeof n?n.call(e,a,e,t):n,void 0===s||(t.exports=s)}(0,(function(t,e,a){var n=function(t,e,a,n,s,o){for(var i=0,r=["webkit","moz","ms","o"],l=0;l<r.length&&!window.requestAnimationFrame;++l)window.requestAnimationFrame=window[r[l]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[r[l]+"CancelAnimationFrame"]||window[r[l]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,e){var a=(new Date).getTime(),n=Math.max(0,16-(a-i)),s=window.setTimeout((function(){t(a+n)}),n);return i=a+n,s}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)});var u=this;for(var c in u.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:null,formattingFn:null},o)o.hasOwnProperty(c)&&(u.options[c]=o[c]);""===u.options.separator&&(u.options.useGrouping=!1),u.options.prefix||(u.options.prefix=""),u.options.suffix||(u.options.suffix=""),u.d="string"==typeof t?document.getElementById(t):t,u.startVal=Number(e),u.endVal=Number(a),u.countDown=u.startVal>u.endVal,u.frameVal=u.startVal,u.decimals=Math.max(0,n||0),u.dec=Math.pow(10,u.decimals),u.duration=1e3*Number(s)||2e3,u.formatNumber=function(t){var e,a,n,s;if(t=t.toFixed(u.decimals),t+="",e=t.split("."),a=e[0],n=e.length>1?u.options.decimal+e[1]:"",s=/(\d+)(\d{3})/,u.options.useGrouping)for(;s.test(a);)a=a.replace(s,"$1"+u.options.separator+"$2");return u.options.prefix+a+n+u.options.suffix},u.easeOutExpo=function(t,e,a,n){return a*(1-Math.pow(2,-10*t/n))*1024/1023+e},u.easingFn=u.options.easingFn?u.options.easingFn:u.easeOutExpo,u.formattingFn=u.options.formattingFn?u.options.formattingFn:u.formatNumber,u.version=function(){return"1.7.1"},u.printValue=function(t){var e=u.formattingFn(t);"INPUT"===u.d.tagName?this.d.value=e:"text"===u.d.tagName||"tspan"===u.d.tagName?this.d.textContent=e:this.d.innerHTML=e},u.count=function(t){u.startTime||(u.startTime=t),u.timestamp=t;var e=t-u.startTime;u.remaining=u.duration-e,u.options.useEasing?u.countDown?u.frameVal=u.startVal-u.easingFn(e,0,u.startVal-u.endVal,u.duration):u.frameVal=u.easingFn(e,u.startVal,u.endVal-u.startVal,u.duration):u.countDown?u.frameVal=u.startVal-(u.startVal-u.endVal)*(e/u.duration):u.frameVal=u.startVal+(u.endVal-u.startVal)*(e/u.duration),u.countDown?u.frameVal=u.frameVal<u.endVal?u.endVal:u.frameVal:u.frameVal=u.frameVal>u.endVal?u.endVal:u.frameVal,u.frameVal=Math.round(u.frameVal*u.dec)/u.dec,u.printValue(u.frameVal),e<u.duration?u.rAF=requestAnimationFrame(u.count):u.callback&&u.callback()},u.start=function(t){return u.callback=t,u.rAF=requestAnimationFrame(u.count),!1},u.pauseResume=function(){u.paused?(u.paused=!1,delete u.startTime,u.duration=u.remaining,u.startVal=u.frameVal,requestAnimationFrame(u.count)):(u.paused=!0,cancelAnimationFrame(u.rAF))},u.reset=function(){u.paused=!1,delete u.startTime,u.startVal=e,cancelAnimationFrame(u.rAF),u.printValue(u.startVal)},u.update=function(t){cancelAnimationFrame(u.rAF),u.paused=!1,delete u.startTime,u.startVal=u.frameVal,u.endVal=Number(t),u.countDown=u.startVal>u.endVal,u.rAF=requestAnimationFrame(u.count)},u.printValue(u.startVal)};return n}))},6577:function(t,e,a){t.exports=a.p+"img/compState.974058d2.svg"},7156:function(t,e,a){var n=a("1626"),s=a("861d"),o=a("d2bb");t.exports=function(t,e,a){var i,r;return o&&n(i=e.constructor)&&i!==a&&s(r=i.prototype)&&r!==a.prototype&&o(t,r),t}},"87b8":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",[n("Row",[n("Collapse",{model:{value:t.value1,callback:function(e){t.value1=e},expression:"value1"}},[n("Panel",{staticClass:"Panel_c",attrs:{name:"1"}},[t._v(" About EryDB "),n("p",{staticClass:"p_text",attrs:{slot:"content"},slot:"content"},[t._v(" EryDB: a database of transcriptome profile of erythropoiesis and a web-accessible collection of expertly curated, quality-assured, and pre-analyzed data sets covering three species and nine sources, totaling "+t._s(t.allSampleN)+" samples and "+t._s(t.allCellN)+" single cell. ")])])],1)],1),n("br"),n("Row",[n("Col",{attrs:{span:"12"}},[n("Carousel",{attrs:{autoplay:t.setting.autoplay,"autoplay-speed":t.setting.autoplaySpeed,dots:t.setting.dots,"radius-dot":t.setting.radiusDot,trigger:t.setting.trigger,arrow:t.setting.arrow},model:{value:t.value3,callback:function(e){t.value3=e},expression:"value3"}},[n("CarouselItem",[n("div",{staticClass:"demo-carousel"},[n("a",[n("img",{attrs:{width:"100%",src:a("a30d"),alt:"img"}})])])]),n("CarouselItem",[n("div",{staticClass:"demo-carousel"},[n("a",[n("img",{attrs:{width:"80%",src:a("6577"),alt:"img"}})])])]),n("CarouselItem",[n("div",{staticClass:"demo-carousel"},[n("a",[n("img",{attrs:{width:"80%",src:a("b4e1"),alt:"img"}})])])])],1)],1),n("Col",{staticClass:"keyWord",attrs:{span:"12"}},[n("br"),n("br"),n("br"),n("br"),n("span",[t._v("Input Reported Gene/Tissue/Dataset Id/Organism Name:")]),n("i-select",{staticStyle:{width:"80%"},attrs:{"enter-button":"Search",model:t.showByGroup,placeholder:t.search_placeholder,filterable:""},on:{"on-search":function(e){return t.searchDataSetByKeyName(e)},"update:model":function(e){t.showByGroup=e},"on-change":function(e){return t.searchDataSetByKeyName(e)}}},t._l(t.keyWords_list,(function(e,a){return n("i-option",{key:a,attrs:{value:e.name}},[t._v(t._s(e.name))])})),1),n("Button",{attrs:{type:"primary"},on:{click:function(e){return t.searchByKeyWord()}}},[t._v("Search")])],1)],1)],1),n("br"),n("div",{staticClass:"card"},[n("Row",{staticStyle:{background:"#eee",padding:"10px"}},[n("Col",{attrs:{span:"8"}},[n("Card",[n("div",{staticClass:"count_div"},[n("p",{staticClass:"h3_title"},[t._v("Sample Number "),n("count-to",{attrs:{end:t.allSampleN,"count-class":"count-style"}})],1)])])],1),n("Col",{attrs:{span:"8"}},[n("Card",[n("div",{staticClass:"count_div"},[n("p",{staticClass:"h3_title"},[t._v("Single Cell Number "),n("count-to",{attrs:{end:t.allCellN,"count-class":"count-style"}})],1)])])],1),n("Col",{attrs:{span:"8"}},[n("Card",[n("div",{staticClass:"count_div"},[n("p",{staticClass:"h3_title"},[t._v("Study Number "),n("count-to",{attrs:{end:t.allStudyN,"count-class":"count-style"}})],1)])])],1)],1),n("Row",{staticStyle:{background:"#eee",padding:"10px"}},[n("Col",{attrs:{span:"12"}},[n("router-link",{attrs:{to:"/Eryth"}},[n("Card",[n("div",{staticClass:"moudle"},[n("img",{staticClass:"moudle_image",attrs:{src:a("c5ce")}}),n("div",{staticClass:"moudle_title"},[t._v(" Differentiation ")])]),n("div",{staticClass:"count_div"},[n("p",{staticClass:"h3_title"},[t._v("Stage Number "),n("count-to",{attrs:{end:12,"count-class":"count-style"}})],1)])])],1)],1),n("Col",{attrs:{span:"12"}},[n("router-link",{attrs:{to:"/gene"}},[n("Card",[n("div",{staticClass:"moudle"},[n("img",{staticClass:"moudle_image",attrs:{src:a("76d7")}}),n("div",{staticClass:"moudle_title"},[t._v(" Genes ")])]),n("div",{staticClass:"count_div"},[n("p",{staticClass:"h3_title"},[t._v("Gene Number "),n("count-to",{attrs:{end:124,"count-class":"count-style"}})],1)])])],1)],1)],1),n("Row",{staticStyle:{background:"#eee",padding:"10px"}},[n("Col",{attrs:{span:"12"}},[n("router-link",{attrs:{to:"/molecules"}},[n("Card",[n("div",{staticClass:"moudle"},[n("img",{staticClass:"moudle_image",attrs:{src:a("09cc")}}),n("div",{staticClass:"moudle_title"},[t._v(" Compounds ")])]),n("div",{staticClass:"count_div"},[n("p",{staticClass:"h3_title"},[t._v("Type Number "),n("count-to",{attrs:{end:9,"count-class":"count-style"}})],1)])])],1)],1),n("Col",{attrs:{span:"12"}},[n("router-link",{attrs:{to:"/Disease"}},[n("Card",[n("div",{staticClass:"moudle"},[n("img",{staticClass:"moudle_image",attrs:{src:a("0d03")}}),n("div",{staticClass:"moudle_title"},[t._v(" Diseases ")])]),n("div",{staticClass:"count_div"},[n("p",{staticClass:"h3_title"},[t._v("Type Number "),n("count-to",{attrs:{end:7,"count-class":"count-style"}})],1)])])],1)],1)],1)],1)])},s=[],o=a("5530"),i=a("a18c"),r=(a("ddb9"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"count-to-wrapper"},[t._t("left"),a("p",{staticClass:"content-outer"},[a("span",{class:["count-to-count-text",t.countClass],attrs:{id:t.counterId}},[t._v(t._s(t.init))]),a("i",{class:["count-to-unit-text",t.unitClass]},[t._v(t._s(t.unitText))])]),t._t("right")],2)}),l=[],u=(a("a9e3"),a("57f2")),c=a.n(u),d=(a("16e0"),{name:"CountTo",props:{init:{type:Number,default:0},startVal:{type:Number,default:0},end:{type:Number,required:!0},decimals:{type:Number,default:0},decimal:{type:String,default:"."},duration:{type:Number,default:2},delay:{type:Number,default:0},uneasing:{type:Boolean,default:!1},usegroup:{type:Boolean,default:!1},separator:{type:String,default:","},simplify:{type:Boolean,default:!1},unit:{type:Array,default:function(){return[[3,"K+"],[6,"M+"],[9,"B+"]]}},countClass:{type:String,default:""},unitClass:{type:String,default:""}},data:function(){return{counter:null,unitText:""}},computed:{counterId:function(){return"count_to_".concat(this._uid)}},methods:{getHandleVal:function(t,e){return{endVal:parseInt(t/Math.pow(10,this.unit[e-1][0])),unitText:this.unit[e-1][1]}},transformValue:function(t){var e=this.unit.length,a={endVal:0,unitText:""};if(t<Math.pow(10,this.unit[0][0]))a.endVal=t;else for(var n=1;n<e;n++)t>=Math.pow(10,this.unit[n-1][0])&&t<Math.pow(10,this.unit[n][0])&&(a=this.getHandleVal(t,n));return t>Math.pow(10,this.unit[e-1][0])&&(a=this.getHandleVal(t,e)),a},getValue:function(t){var e=0;if(this.simplify){var a=this.transformValue(t),n=a.endVal,s=a.unitText;this.unitText=s,e=n}else e=t;return e}},mounted:function(){var t=this;this.$nextTick((function(){var e=t.getValue(t.end);t.counter=new c.a(t.counterId,t.startVal,e,t.decimals,t.duration,{useEasing:!t.uneasing,useGrouping:t.useGroup,separator:t.separator,decimal:t.decimal}),setTimeout((function(){t.counter.error||t.counter.start()}),t.delay)}))},watch:{end:function(t){var e=this.getValue(t);this.counter.update(e)}}}),m=d,p=a("2877"),f=Object(p["a"])(m,r,l,!1,null,null,null),g=f.exports,v=g,h=a("2f62"),y=a("39b2"),b={name:"home",components:{CountTo:v},data:function(){return{keyWords_list:[{name:"Danio rerio"},{name:"Homo sapiens"},{name:"Mus musculus"}],value1:"1",value3:0,allSampleN:3900,allCellN:175628,allStudyN:88,setting:{autoplay:!0,autoplaySpeed:4e3,dots:"inside",radiusDot:!1,trigger:"click",arrow:"hover"},InputKeyName:"",active:"",search_placeholder:"GATA1/Bone Marrow/GSE102182/Homo sapiens"}},methods:Object(o["a"])(Object(o["a"])({},Object(h["b"])(["setCurrentPageToken"])),{},{yr:function(){this.active="color:grey"},yc:function(){this.active=""},getAllkeyWords:function(){var t=this;Object(y["g"])().then((function(e){t.keyWords_list=e.data.keywords,console.log("this.keyWords_list"),console.log(e.data.keywords)}))},getAllSampleCellN:function(){var t=this;Object(y["a"])().then((function(e){console.log(e.data);var a=t,n=e.data;console.log(n.allsampleN),a.allSampleN=n.allsampleN,a.allCellN=n.allcellN,a.allStudyN=n.allstudyN}))},searchDataSetByKeyName:function(t){var e=this;e.InputKeyName=t},searchByKeyWord:function(){i["a"].push({name:"Search",params:{KeyName:this.InputKeyName}})},intoDataSet:function(t){console.log(t),this.setCurrentPageToken(t),i["a"].push({name:"Dataset_detail",params:{dataset:t}})}}),mounted:function(){this.getAllSampleCellN(),this.getAllkeyWords()}},C=b,_=(a("ad89"),Object(p["a"])(C,n,s,!1,null,null,null)),N=_.exports;e["default"]=N},a30d:function(t,e,a){t.exports=a.p+"img/aboutSBySpecies.0897974e.svg"},a9e3:function(t,e,a){"use strict";var n=a("83ab"),s=a("da84"),o=a("e330"),i=a("94ca"),r=a("6eeb"),l=a("1a2d"),u=a("7156"),c=a("3a9b"),d=a("d9b5"),m=a("c04e"),p=a("d039"),f=a("241c").f,g=a("06cf").f,v=a("9bf2").f,h=a("408a"),y=a("58a8").trim,b="Number",C=s[b],_=C.prototype,N=s.TypeError,V=o("".slice),w=o("".charCodeAt),S=function(t){var e=m(t,"number");return"bigint"==typeof e?e:F(e)},F=function(t){var e,a,n,s,o,i,r,l,u=m(t,"number");if(d(u))throw N("Cannot convert a Symbol value to a number");if("string"==typeof u&&u.length>2)if(u=y(u),e=w(u,0),43===e||45===e){if(a=w(u,2),88===a||120===a)return NaN}else if(48===e){switch(w(u,1)){case 66:case 98:n=2,s=49;break;case 79:case 111:n=8,s=55;break;default:return+u}for(o=V(u,2),i=o.length,r=0;r<i;r++)if(l=w(o,r),l<48||l>s)return NaN;return parseInt(o,n)}return+u};if(i(b,!C(" 0o1")||!C("0b1")||C("+0x1"))){for(var x,A=function(t){var e=arguments.length<1?0:C(S(t)),a=this;return c(_,a)&&p((function(){h(a)}))?u(Object(e),a,A):e},T=n?f(C):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),k=0;T.length>k;k++)l(C,x=T[k])&&!l(A,x)&&v(A,x,g(C,x));A.prototype=_,_.constructor=A,r(s,b,A)}},ad89:function(t,e,a){"use strict";a("bb6f")},b4e1:function(t,e,a){t.exports=a.p+"img/datasetState.431af7a5.svg"},bb6f:function(t,e,a){}}]);