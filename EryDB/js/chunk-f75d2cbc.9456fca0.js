(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f75d2cbc"],{"0a81":function(e,t,a){},bd01:function(e,t,a){"use strict";a("0a81")},bee0:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"lay_out"},[a("h1",{staticClass:"my_h1"},[e._v("Single Cell Cluster's Differential Analysis")]),a("div",[a("Row",[a("Col",{attrs:{span:"16"}},[e.spinShow1?a("Spin",{attrs:{size:"large",fix:""}}):e._e(),a("vue-plotly",{attrs:{autoResize:e.ifResize,data:e.enrichGO_data,layout:e.enrichGO_layout,options:e.enrichGO_options}})],1),a("Col",{attrs:{span:"8"}},[a("i-form",{attrs:{"label-width":120}},[a("Form-item",{attrs:{label:"Data source: "}},[a("i-select",{attrs:{clearable:"",placeholder:"Pleace select cell source",filterable:""},on:{"on-change":e.changedDataSource},model:{value:e.source,callback:function(t){e.source=t},expression:"source"}},e._l(e.data_source_lischangedDiffChartgetScDiffEnricht,(function(t,o){return a("i-option",{key:o,attrs:{value:t.name}},[e._v(e._s(t.name))])})),1)],1),a("Form-item",{attrs:{label:"Contrast group: "}},[a("i-select",{attrs:{clearable:"",placeholder:"Pleace select cluster group",filterable:""},on:{"on-change":e.changedDiffChart}},e._l(e.group_type_list,(function(t,o){return a("i-option",{key:o,attrs:{value:t.name}},[e._v(e._s(t.name))])})),1)],1),a("Form-item",{attrs:{label:"Absolute Fold Change: "}},[a("i-select",{attrs:{clearable:"",placeholder:"Pleace select change fold"},on:{"on-change":e.changedFoldChange},model:{value:e.foldChange,callback:function(t){e.foldChange=t},expression:"foldChange"}},e._l(e.fold_change,(function(t,o){return a("i-option",{key:o,attrs:{value:t.value}},[e._v(e._s(t.name))])})),1)],1),a("Form-item",{attrs:{label:"P value: "}},[a("i-select",{attrs:{clearable:"",placeholder:"Pleace select change fold"},on:{"on-change":e.changedPvalue},model:{value:e.Pvalue,callback:function(t){e.Pvalue=t},expression:"Pvalue"}},e._l(e.PValue_change,(function(t,o){return a("i-option",{key:o,attrs:{value:t.value}},[e._v(e._s(t.name))])})),1)],1)],1)],1)],1),a("Br")],1)])},n=[],r=(a("d3b7"),a("159b"),a("ddd7")),s=a("43e0"),i=a.n(s),l=a("6c9c"),c=(a("39b2"),{0:{value:">0.05",name:">0.05"},1:{value:"=<0.05",name:"=<0.05"}}),u={name:"sc_Diffanal",components:{VuePlotly:i.a,FilterTable:r["a"]},data:function(){return{series:this.$store.state.app.CurrentPageToken,ifResize:!0,spinShow1:"true",diff_data:[],diff_layout:{},contrasts_group:[],data_source_list:[],source:"",currentPage:1,pageSize:10,totalRow:400,diff_options:{responsive:!0},contrastsGroup:"",sourceGroup:"vivo",table_name:"all_rna_dev_bulk_vivo",diffData:[],diffCols:[{title:"Symbol",key:"SYMBOL",filter:{type:"Input"},fixed:"left"},{title:"logFC",key:"logFC",filter:{type:"Input"}},{title:"unshrunk.logFC",key:"unshrunk.logFC",filter:{type:"Input"}},{title:"logCPM",key:"logCPM",filter:{type:"Input"}},{title:"P.Value",key:"P.Value",filter:{type:"Select",option:c}}],group_type_list:[],group:"",enrichGO_data:[],enrichGO_layout:{},enrichGO_options:{responsive:!0,displaylogo:!1,toImageButtonOptions:{format:"svg",filename:"sc_diff_enrich",scale:1}}}},methods:{getDataSourceList:function(e){var t=this;Object(l["E"])(this.series).then((function(e){var a=t,o=e.data;console.log(o);var n=o;t.source=n[0].source_g,o.forEach((function(e){console.log(e.source_g),a.data_source_list.push({name:e.source_g})}))}))},changedDiffChart:function(e){console.log(e),this.group=e,alert(this.series),alert(this.source),alert(this.group),this.getdiffEnrich_chart(this.series,this.source,e)},changedDataSource:function(e){this.source=e,this.getContrastGroup(this.series,e)},getContrastGroup:function(){var e=this;Object(l["getClusterContrastGroup"])(this.series,this.source).then((function(t){var a=t.data;console.log(a);a.forEach((function(t){return e.group_type_list.push({name:t})}))}))},getdiffEnrich_chart:function(){var e=this,t=this;t.spinShow1=!0,Object(l["w"])(this.series,this.source,this.group).then((function(a){var o=a.data,n=o.xData,r=o.yData,s=o.nData;o.tData;e.enrichGO_data=[];for(var i=0;i<n.length;i++){var l={x:n[i],y:r[i],name:s[i],type:"bar",orientation:"h"};e.enrichGO_data.push(l)}var c={title:"the ("+e.sourceGroup+") enrichment of "+e.contrastsGroup,xaxis:{title:"-Log10(P value)"},yaxis:{title:{text:"Pathway term",position:"top",standoff:40,yanchor:"top"},automargin:!0,rangemode:"normal",dtick:1,exponentformat:function(e){return e.length>30?e.substring(0,30)+"...":e}},margin:{l:650}};e.enrichGO_layout=c,t.spinShow1=!1}))}},mounted:function(){this.getDataSourceList(this.series)}},h=u,f=(a("bd01"),a("2877")),p=Object(f["a"])(h,o,n,!1,null,null,null);t["default"]=p.exports}}]);