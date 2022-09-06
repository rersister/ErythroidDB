<template>
    <div>
        <br/>
        <h1 class="my_h1">Expression Profile</h1>
		<div style="margin-top: 10px;">                             
            <div style="margin-top: 10px;">
                <Row>
                        <Col span="12">
                            <!-- 数据查询分子名 -->
                            <span class="h4_title" >Input Gene Symbol:</span>
                            <Input class='my_class_input' v-on:input="search_value($event)"  :placeholder="search_placeholder"/>                         
                            <Button class='button_mystyle' @click="searchItemByName" >Search</Button>
                        </Col>                                                                                                                                                       
                </Row>       
                <br>     
                <Row>                               
                    <!-- 右边 -->
                    <!-- <Col span="12"  >
                    <!-- 相关介绍 -->
                        <!-- <Collapse simple v-model='value1' class='h3_title'> -->
                            <!-- <Panel name="1" >
                                Info:
                                <p slot="content" v-if="ShowitemInfoTip">{{itemInfoTip}}</p>
                                <p slot="content">
                                    <strong>Symbol</strong>:{{itemInfo_Symbol}} <br>  
                                    <strong>Ensembl_ID</strong>: {{ itemInfo_Ensembl_ID }} <br>  
                                    <strong>Description</strong>:{{ itemInfo_Description }}  <br>  
                                    <strong>Alias</strong>:{{ itemInfo_Alias }}   <br> 
                                    <strong>Summary</strong>:{{ itemInfo_Summary }}  <br>                   
                                </p>
                            </Panel>                                       
                        </Collapse>                                                                 
                    </Col> -->
                    <!-- <Col span="12"> -->
                        <!-- 相关推荐介绍 -->
                        <Collapse simple v-model='value1' class='h3_title'>                                      
                                <Panel name="2">
                                <!-- Look up this {{search_datatype}} in: -->
                               <span class="h4_title">Search Gene Symbol in:</span> 
                                <p slot="content">
                                    <Button class="button_style" v-for="(search_item,index) in othersearch_items" :key='index' :label='search_item.name' type="primary" icon="ios-search">
                                    <a :href='search_item.link' target=_blank style="color:white">    
                                        {{search_item.name}}
                                    </a>
                                    </Button>                                               
                                </p>
                            </Panel> 
                            
                        </Collapse>
                    <!-- </Col> -->

                </Row> 
                <br>
                <Row justify="center" class="code-row-bg">
                    <!-- 表达柱图 EL 根据指定的RNA/INcRNA/miRNA出柱状图-->
                    <!-- <Col span="8"> -->
                        <Spin size="large" fix v-if="spinShow4"></Spin>
                        <!-- <highcharts class="chart" :options='SpecifExpreOptionsByName'></highcharts> -->
                         <vue-plotly  :autoResize="ifResize" :data="expreProfile_data" :layout="expreProfile_layout" :options="expreProfile_options" />

                    <!-- </Col> -->
                </Row>


                
            </div>          
			
			
        </div>      

       
	</div>
   
     
</template>


<script>
import { getDatasetExperiType,  } from '@/api/datasetService'
import {getSpecifExpreOptionsByName,getMicroInfo } from '@/api/erythdataservice'
import VuePlotly from '@statnett/vue-plotly'

export default {
    name:"RnaExpression",
    components:{
		VuePlotly, 

	},
    data(){
        return{
            inpute_v:'',
            search_placeholder:'',
            series:this.$store.state.app.CurrentPageToken,
            SpecifExpreOptionsByName:{},
            ifResize:true,
            expreProfile_data:[],
            expreProfile_layout:{},
            expreProfile_options:{
                responsive: true,
                displaylogo: false,
                toImageButtonOptions: {
                    format: 'svg', // one of png, svg, jpeg, webp
                    filename: 'expression_image',
                   
                    height: 500,
                    width: 700,
                   
                    scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
                }
            },
            spinShow4:'true',
            othersearch_items:[],
            search_datatype:'',
            experiment_type:'',
            value1: '1',  
            itemInfo_Symbol: '',
            itemInfo_Ensembl_ID: '',
            itemInfo_Description : '',
            itemInfo_Alias: '',
            itemInfo_Summary: '',
            ShowitemInfoTip:false,
            dataType:''
        }
    },
	methods:{

        getdatasetExperiType(){

            console.log(this.$store.state.app.CurrentPageToken)
            getDatasetExperiType(this.$store.state.app.CurrentPageToken).then(res => {                              
             
                
                let data = res.data
                console.log(data)
                this.experiment_type = data.experiment_type
               
                if ( data.experiment_type.indexOf("Expression profiling") > -1){
                    this.search_placeholder = 'AAGAB'
                    // console.info(samples_arry)
                    let dataType = 'rna'
                    this.dataType = dataType
                    this.search_datatype = "RNA's symbol"
                    
                    this.searchItemInfoBydataname('rna','CD36')
                    this.specif_name = 'CD36'
                    this.setOthersearchItems('rna')
                    
                    this.getSpecifExpreOptionsByName(this.series,dataType,'CD36')
                    
                }else{
                   
                }
             
        
            

               
         

            })


        },
        search_value(inpute_v){
            // alert(inpute_v)
            this.inpute_v = inpute_v
        },
		searchItemByName(){

           let _this = this
           _this.ShowitemInfoTip = false
        
           var micvalue = _this.inpute_v
        //    alert(micvalue)
           this.specif_name = micvalue
           this.getSpecifExpreOptionsByName(this.series,this.dataType,micvalue)
            // 根据查询名给数据库里相关介绍信息
           this.searchItemInfoBydataname(this.dataType,micvalue)
           this.setOthersearchItems(this.dataType)
        },


        getSpecifExpreOptionsByName(series,dataType,specif_name){
            var _this = this;
            // alert(this.specif_name)
            // alert(specif_name)
            if ( specif_name == undefined || specif_name == null) {
                
                specif_name = 'CD36'

                this.specif_name = specif_name

                
            }
            let tableType = _this.dataType
            // alert(specif_name)
            getSpecifExpreOptionsByName(series,tableType,specif_name).then( res =>{
                let datas = res.data    
                
                // alert(datas)
              
                if (datas.signal == 0){
                    // alert(datas.message)
                   
                    this.$Message.info(datas.message, 10);
                    this.spinShow4 = false
                    
                }else{

                    //  _this.SpecifExpreOptionsByName= {
                    //     chart: {
                    //         type: 'column'
                    //     },           
                    //     title: {
                    //         text: "  " + specif_name + " expression levels(" +this.series+")" 
                    //     },
                    //     subtitle: {
                    //         text: 'Data Souce:' + this.series +"(" + datas.source + ")"
                    //     },
                    //     loading: {
                    //         hideDuration: 1000,
                    //         showDuration: 1000
                    //     },
                    //     xAxis: {
                    //         categories: datas.categories,
                    //         crosshair: true
                    //     },
                    //     yAxis: {
                    //         min: 0,
                    //         title: {
                    //             text: datas.value_type
                    //         }
                    //     },
                    //     tooltip: {
                    //         // head + 每个 point + footer 拼接成完整的 table
                    //         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    //         pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    //         '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    //         footerFormat: '</table>',
                    //         shared: true,
                    //         useHTML: true
                    //     },
                    //     credits: { enabled:false},
                    
                    //     plotOptions: {
                    //         column: {
                    //             borderWidth: 0
                    //         }
                    //     },
                    //     series: datas.series,
                    //     //[{name: 'AATF', data: [9.0031863, 9.02721225, 8.865415624, 8.776098422, 8.75715593, 8.472251825, 8.75715593, 7.855944704, 8.059018553, 7.806333457]}],


                    //     exporting: {  

                    //     }
                    // }
                    
                    this.expreProfile_data = []
                    var xData = datas.xData
                    var yData =datas.yData
                    console.log("===")
                    console.log(yData)
                    for ( var i = 0; i < xData.length; i ++ ) {
                        var result = {
                            type: 'box',
                            y: yData[i],
                            name: xData[i],
                            boxpoints: 'all',
                            jitter: 0.5,
                            whiskerwidth: 0.2,
                            fillcolor: 'cls',
                            marker: {
                                size: 2
                            },
                            line: {
                                width: 1
                            }
                        };
                        // alert(this.vivo_data)
                        this.expreProfile_data.push(result);
                    };
                    let layout = {
                        title:  specif_name+' Expression level' + '('+ this.series+';Source:' +datas.source + ";Growth Mode:"+ datas.growth_mode +')',
                        // bargap: 0.25,
                        yaxis: {
                            
                            autorange: true,
                            rangemode :"normal",
                            // range: list(0,20), 
                            showgrid: true,
                            zeroline: true,
                            // dtick: 5,
                            gridcolor: 'rgb(243, 243, 243)',
                            gridwidth: 1,
                            zerolinecolor: 'rgb(243, 243, 243)',
                            zerolinewidth: 2,
                            title:"Normalized Value",
                           
                        },
                        xaxis:{
                            title:"Group",
                            gridcolor: 'rgb(243, 243, 243)',
                            gridwidth: 1,
                        },
                        margin: {
                                l: 80,
                                r: 30,
                                b: 80,
                                t: 100
                            },
                            // paper_bgcolor: 'rgb(243, 243, 243)',
                            // plot_bgcolor: 'rgb(243, 243, 243)',
                            showlegend: false
                    };
                    this.expreProfile_layout = layout

                    this.spinShow4 = false
                }
                 // alert("Don't get any results, may you check your input");
                
            })

        },

        setOthersearchItems(dataType){
              
           let othersearchItems = []
           let _this = this 
                   
            // datatype中有空格，使用是否存在此字符串的方法
            
            if (dataType.search("rna") != -1){
                 othersearchItems.push(
                    {
                        name:"GeneCards",
                        //  link:"http://www.genecards.org/cgi-bin/carddisp.pl?gene=MT2A"
                        link:"http://www.genecards.org/cgi-bin/carddisp.pl?gene=" + _this.specif_name
                    },
                    {
                        name:"NCBI",
                        link:"https://www.ncbi.nlm.nih.gov/gene/?term=" + _this.specif_name
                    },
                    {
                        name:"Ensembl",
                        // link:"http://www.ensembl.org/Homo_sapiens/Gene/Summary?g=MT2A"
                        link:"http://www.ensembl.org/Homo_sapiens/Gene/Summary?g="+ _this.specif_name
                    },
                    {
                        name:"EBI",
                        // link:"hhttp://www.ebi.ac.uk/gxa/query?geneQuery=MT2A"
                        link:"hhttp://www.ebi.ac.uk/gxa/query?geneQuery=" + _this.specif_name
                    },
                    {
                        name:"OMIM",
                        // link:"https://omim.org/search/?search=MT2A"
                        link:"https://omim.org/search/?search=" + _this.specif_name
                    },
                    {
                        name:"COSMIC",
                        // link:"http://cancer.sanger.ac.uk/cosmic/gene/analysis?ln=MT2A"
                        link:"http://cancer.sanger.ac.uk/cosmic/gene/analysis?ln=" + _this.specif_name
                    },
                     {
                        name:"HPA",
                        link:"http://www.proteinatlas.org/ENSG00000125148-MT2A/tissue"
                    },
                    {
                        name:"DrugBank",
                        // link:"https://www.drugbank.ca/unearth/q?query=MT2A&searcher=targets"
                        link:"https://www.drugbank.ca/unearth/q?query="+_this.specif_name+"&searcher=targets"
                    },
                )

            }
            
            if (dataType.search("miRNA") != -1) {
                
                othersearchItems.push(
                    {
                        name:"GeneCards",
                        //  link:"http://www.genecards.org/cgi-bin/carddisp.pl?gene=MT2A"
                        link:"http://www.genecards.org/cgi-bin/carddisp.pl?gene=" + _this.specif_name
                    },
                    {
                        name:"NCBI",
                        link:"https://www.ncbi.nlm.nih.gov/gene/?term=ENSG00000125148"
                    },
                    {
                        name:"Ensembl",
                        // link:"http://www.ensembl.org/Homo_sapiens/Gene/Summary?g=MT2A"
                        link:"http://www.ensembl.org/Homo_sapiens/Gene/Summary?g="+ _this.specif_name
                    },
                    {
                        name:"EBI",
                        // link:"hhttp://www.ebi.ac.uk/gxa/query?geneQuery=MT2A"
                        link:"hhttp://www.ebi.ac.uk/gxa/query?geneQuery=" + _this.specif_name
                    },
                    {
                        name:"OMIM",
                        // link:"https://omim.org/search/?search=MT2A"
                        link:"https://omim.org/search/?search=" + _this.specif_name
                    },
                    {
                        name:"COSMIC",
                        // link:"http://cancer.sanger.ac.uk/cosmic/gene/analysis?ln=MT2A"
                        link:"http://cancer.sanger.ac.uk/cosmic/gene/analysis?ln=" + _this.specif_name
                    },
                     {
                        name:"HPA",
                        link:"http://www.proteinatlas.org/ENSG00000125148-MT2A/tissue"
                    },
                    {
                        name:"DrugBank",
                        // link:"https://www.drugbank.ca/unearth/q?query=MT2A&searcher=targets"
                        link:"https://www.drugbank.ca/unearth/q?query="+_this.specif_name+"&searcher=targets"
                    },
                )

            }
            if (dataType.search("lncRNA") != -1) {
                
                othersearchItems.push(
                    {
                        name:"GeneCards",
                        //  link:"http://www.genecards.org/cgi-bin/carddisp.pl?gene=MT2A"
                        link:"http://www.genecards.org/cgi-bin/carddisp.pl?gene=" + _this.specif_name
                    },
                    {
                        name:"NCBI",
                        link:"https://www.ncbi.nlm.nih.gov/gene/?term=ENSG00000125148"
                    },
                    {
                        name:"Ensembl",
                        // link:"http://www.ensembl.org/Homo_sapiens/Gene/Summary?g=MT2A"
                        link:"http://www.ensembl.org/Homo_sapiens/Gene/Summary?g="+ _this.specif_name
                    },
                    {
                        name:"EBI",
                        // link:"hhttp://www.ebi.ac.uk/gxa/query?geneQuery=MT2A"
                        link:"hhttp://www.ebi.ac.uk/gxa/query?geneQuery=" + _this.specif_name
                    },
                    {
                        name:"OMIM",
                        // link:"https://omim.org/search/?search=MT2A"
                        link:"https://omim.org/search/?search=" + _this.specif_name
                    },
                    {
                        name:"COSMIC",
                        // link:"http://cancer.sanger.ac.uk/cosmic/gene/analysis?ln=MT2A"
                        link:"http://cancer.sanger.ac.uk/cosmic/gene/analysis?ln=" + _this.specif_name
                    },
                     {
                        name:"HPA",
                        link:"http://www.proteinatlas.org/ENSG00000125148-MT2A/tissue"
                    },
                    {
                        name:"DrugBank",
                        // link:"https://www.drugbank.ca/unearth/q?query=MT2A&searcher=targets"
                        link:"https://www.drugbank.ca/unearth/q?query="+_this.specif_name+"&searcher=targets"
                    },
                )

            }
            _this.othersearch_items = []
            _this.othersearch_items = othersearchItems

            // alert(_this.othersearch_items.name)

        },

        searchItemInfoBydataname(dataType,value){
            // alert(value)
            // NAP1L1P1
            // alert(tabletype) 
            var _this = this
            if ( value == undefined || value == null) {
                value = 'CD36'
            }
           
            getMicroInfo(dataType,value).then( res =>{
                let datas = res.data   
                // alert(datas)

                if (datas.signal == 0){
                    _this.itemInfoTip=datas.message
                    _this.ShowitemInfoTip = true

                }else{

                    _this.itemInfo_Symbol=datas.Symbol
                    _this.itemInfo_Ensembl_ID=datas.Ensembl_ID
                    _this.itemInfo_Description=datas.Description
                    _this.itemInfo_Alias=datas.Alias
                    _this.itemInfo_Summary=datas.Summary

                }
               
                               
            })


        },

        
    },
    mounted(){
        this.getdatasetExperiType()
        

    }


}
</script>



<style>




.button_style{
    font-size:12px;
    margin-right:10px;
    margin-bottom:5px;
    /* width:calc((50/1920) * 100vw); 
    height: calc((20/1920) * 100vw); */
  }

.chart{
    text-align: center;
    width:calc((1600/1920) * 100vw); 
    height: calc((600/1920) * 100vw);;
}

.button_mystyle{
    background:#a85557!important;
    color: #fff!important;
    border-color:#a85557!important;
    margin-top:5px;
}

.ivu-input-search {

    background: #a85557!important;
    color: #fff!important;
    border-color: #a85557!important;

}

.ivu-input-search:hover{
    background: #e6b9b8 !important;
    color: #fff !important;
    border-color: #ea898c !important;
}

.ivu-btn-primary {
    background: #a85557!important;
    color: #fff!important;
    border-color: #a85557!important;
}

</style>

