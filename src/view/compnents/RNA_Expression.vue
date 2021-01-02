<template>
    <div>
        <h1 class='h1_title'>Expression Profile</h1>
		<div style="margin-top: 10px;">                             
            <div style="margin-top: 10px;">
                <Row  >
                        <Col span="12">
                            <!-- 数据查询分子名 -->
                            <Input search enter-button="Search"  @on-search="searchItemByName($event)" :placeholder="search_placeholder"/>                         
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
                    <Col span="12">
                        <!-- 相关推荐介绍 -->
                        <Collapse simple v-model='value1' class='h3_title'>                                      
                                <Panel name="2">
                                Look up this {{search_datatype}} in:
       
                                <p slot="content">
                                    <Button class='button_style' v-for="(search_item,index) in othersearch_items" :key='index' :label='search_item.name' type="primary" icon="ios-search">
                                    <a :href='search_item.link' style="color:white">    
                                        {{search_item.name}}
                                    </a>
                                    </Button>                                               
                                </p>
                            </Panel> 
                        </Collapse>
                    </Col>

                </Row> 
                <br>
                <Row justify="center" class="code-row-bg">
                    <!-- 表达柱图 EL 根据指定的RNA/INcRNA/miRNA出柱状图-->
                    <Col span="8">
                        <Spin size="large" fix v-if="spinShow4"></Spin>
                        <highcharts class="chart" :options='SpecifExpreOptionsByName'></highcharts>
                    </Col>
                </Row>


                
            </div>          
			
			
        </div>      
       
        <router-link to="/Dataset_service">
            <div style="text-align:right;font-size:calc((30/1920) * 100vw);">
                <!-- <img width="20%" height="10%" src="@/assets/img/red_sys.jpg"> -->
                <h3>Back To Dataset Service</h3>
                <!-- <p>Sample: 
                    <count-to :end="68" count-class="count-style"/>                                                              
                </p> -->
            </div> 
		</router-link>  
       
	</div>
   
     
</template>


<script>
import { getDatasetExperiType,  } from '@/api/datasetService'
import {getSpecifExpreOptionsByName,getMicroInfo } from '@/api/erythdataservice'
export default {
    name:"RNA_Expression",
    data(){
        return{
            search_placeholder:'',
            series:this.$store.state.app.CurrentPageToken,
            SpecifExpreOptionsByName:{},

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
        
		searchItemByName(micvalue){

           let _this = this
           _this.ShowitemInfoTip = false
        
           
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
                
                // alert(datas.series)
              
                if (datas.signal == 0){
                    // alert(datas.message)
                   
                    this.$Message.info(datas.message, 10);
                    this.spinShow4 = false
                    
                }else{

                     _this.SpecifExpreOptionsByName= {
                        chart: {
                            type: 'column'
                        },           
                        title: {
                            text: "  " + specif_name + " expression levels(" +this.series+")" 
                        },
                        subtitle: {
                            text: 'Data Souce:' + this.series +"(" + datas.source + ")"
                        },
                        loading: {
                            hideDuration: 1000,
                            showDuration: 1000
                        },
                        xAxis: {
                            categories: datas.categories,
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: datas.value_type
                            }
                        },
                        tooltip: {
                            // head + 每个 point + footer 拼接成完整的 table
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        credits: { enabled:false},
                    
                        plotOptions: {
                            column: {
                                borderWidth: 0
                            }
                        },
                        series: datas.series,
                        //[{name: 'AATF', data: [9.0031863, 9.02721225, 8.865415624, 8.776098422, 8.75715593, 8.472251825, 8.75715593, 7.855944704, 8.059018553, 7.806333457]}],


                        exporting: {  

                        }
                    }
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
 .h1_title{
        font-size:calc((40/1920) * 100vw);
}
.h3_title{
        font-size:calc((20/1920) * 100vw);
}

.button_style{
    font-size:calc((20/1920) * 100vw);
    margin-right: calc((10/1920) * 100vw);;
    margin-bottom:calc((10/1920) * 100vw);
  }
.chart{
    text-align: center;
    width:calc((1600/1920) * 100vw); 
    height: calc((600/1920) * 100vw);;
}

</style>

