<template>

<!-- 具体数据服务可视化页面  -->
    <div>
        <!-- 标题 -->
        <Row>
            <Col> 
                <h1 class='h1_title'>{{dataset_title}}</h1>
                <p></p>
            </Col>
        </Row>
        <br>
        <!-- dataset description -->
        <Row class='detail_style'>  
            <Col>
                    <Row>
                        <Col span="5"><strong>Dataset:</strong></Col>
                        <Col span="19"><a :href="getSeriHref()" target="_blank">{{dataset}}</a></Col>                         
                    </Row>
                    <Row>
                        <Col span="5"><strong>Organism:</strong></Col>
                        <Col span="19">{{organism}}</Col> 
                    </Row>
                    <Row>
                        <Col span="5"><strong>Source:</strong></Col>
                        <Col span="19">{{tissue}}</Col> 
                    </Row>
                    <Row>
                        <Col span="5"><strong>Experiment type:</strong></Col>
                        <!-- <Col span="19">{{growth_type}}</Col>  -->
                        <!-- myCagrowth_type -->
                        <Col span="19">{{myCagrowth_type}}</Col>
                    </Row>
                    <!-- <Row>
                        <Col span="5"><strong>Development Type:</strong></Col>
                        <Col span="19">{{development_type}}</Col> 
                    </Row> -->

                    <Row>
                        <!-- experiment_type -->
                        <Col span="5"><strong>Omics type:</strong></Col>                   
                        <Col span="19">{{experiment_type}}</Col>
                    </Row> 
                    <!-- <Row>
                      
                        <Col span="5"><strong>Sequencing Type:</strong></Col>                   
                        <Col span="19">{{sequencing_type}}</Col>
                    </Row>  -->
                    <!-- status -->
                    <Row>
                        <Col span="5"><strong>Status:</strong></Col>
                        <Col span="19">{{status}}</Col> 
                    </Row>


                    <!-- summary -->                
                    <Row>                       
                        <Col span="5"><strong>Summary:</strong></Col>                   
                        <Col span="19" class="text_p">{{summary}}</Col>
                    </Row>

                    <!-- <Row >                     
                        <Col span="6"><strong>Subseries:</strong></Col>                   
                        <Col span="18">{{subseries}}</Col>
                    </Row>
                    

                    <Row>
                        <Col span="6">Sample numbers:</Col>                   
                        <Col span="18">{{sample_numbers}}</Col>
                    </Row>
                 
                    <Row>
                        <Col span="6">Sequencing type:</Col>                   
                        <Col span="18" >{{sequencing_type}}</Col>
                    </Row> -->
                     <Row>
                        <Col span="5"><strong>Organization name:</strong></Col>                   
                        <Col span="19">{{organization_name}}</Col>
                    </Row>
                    <Row>                     
                        <Col span="5"><strong>Platforms:</strong></Col>                   
                        <Col span="19"  v-html='platforms'></Col>
                    </Row> 
                    <Row>                     
                        <Col span="5"><strong>Citation(s):</strong></Col>                   
                        <Col span="19" v-html='citations'></Col>
                    </Row> 
                    <Row>                     
                       <strong> Samples ({{totalRow}}) and group:</strong>                   
                    </Row>
                    <Row>
                       
                            <Table 
                            class="my-tableStyle"
                            :columns="sampleCols" 
                            :data="sampleData" 
                            size="small" 
                            disabled-hover="true"
                            ref="table"></Table>
                            <!-- <Spin size="large" fix v-if="spinShowSampleSource"></Spin> -->
                            <div style="margin: 10px;overflow: hidden">               
                                <div style="float: right;">
                                    <Page :total="totalRow"  
                                    :current="currentPage" 
                                    :page-size="pageSize" 
                                    show-elevator 
                                    show-total
                                    show-sizer
                                    @on-change="handleCurrentChange" 
                                    @on-page-size-change="handleSizeChange">
                                    </Page>                   
                                </div>
                            </div>
                        
                        
                     
                    
                    </Row> 

                    <!-- Datase Service 内容 -->
                    <Content>
                        <Card >                            
                            <div>                              
                                <!-- <router-view/>-->                        
                                <DatasetService />
                                <!-- <All /> -->
                            </div>
                        </Card> 
                    </Content> 

                    <Row> 
                        <Collapse>
                            <Panel name="0">
                                Data processing
                                <p slot="content" class="text_p">{{data_processing}}</p>

                            </Panel>  
                            <Panel name="_0">
                                Normalization method
                                <p slot="content" class="text_p">{{normalization_method}}</p>

                            </Panel> 
                            <Panel name="1">
                                Overall design
                                <p slot="content" class="text_p">{{overall_design}}</p>

                            </Panel>

                            <Panel name="2">
                                Contributor(s)
                                <p slot="content" class="text_p" v-html='contributors'></p>
                                
                            </Panel>
                            <Panel name="3">
                                Submission date
                                <p slot="content" class="text_p">{{submission_date}}</p>
                                
                            </Panel>                                              
                            <Panel name="4">
                                Contact name
                                <p slot="content" class="text_p">{{contact_name}}</p>
                                
                            </Panel>
                            <Panel name="5">
                                E-mails
                                <p slot="content" class="text_p">{{e_mails}}</p>
                                
                            </Panel>
                            <Panel name="6">
                                Organization name
                                <p slot="content" class="text_p">{{organization_name}}</p>
                                
                            </Panel>
                            <Panel name="7">
                                Country
                                <p slot="content" class="text_p">{{country}}</p>
                                
                            </Panel>
                            <Panel name="8">
                                City
                                <p slot="content" class="text_p">{{city}}</p>
                                
                            </Panel>
                            <Panel name="9" v-if='ifSub'>
                                Subseries
                                <p slot="content" class="text_p" v-html='subseries'></p>
                                
                            </Panel>
                            <!-- <Panel name="10">
                                Samples({{samples_count}}) And Group
                                <p slot="content"  v-html='samples'></p>
                                
                            </Panel> -->
                            <!-- <Panel name="11">
                                Samples Group ({{samples_count}})
                                <p slot="content"  v-html='samples'></p>
                                
                            </Panel> -->
                        </Collapse>
                    </Row>            
            </Col>
        </Row> 
       
        <Row>          
            <Col>
                <!-- 各种类型数据在样本中的表达情况,表达占比数 -->               
                <!-- <highcharts class="chart" :options='chartOptionsAllStack'></highcharts>
                <Spin size="large" fix v-if="spinShow1"></Spin> -->
            </Col>
        </Row>

        

    </div>
   
</template>


<script>


import router from '@/router'
import * as echarts from 'echarts'
// 示例封装好的axios
import { getDataset,getAllExpreStack,getDatasetGroup,
getSequenceEchartByTabletype,
getExpreRange,} from '@/api/erythdataservice'

import {getSampleGroupPageDataset,} from '@/api/erythdataset'
import DatasetService from "@/view/compnents/DatasetService.vue"

export default {
    name:"DatasetDetail",
    components:{   
       DatasetService,
        //  ColumnChart,
        //  ScatterChart,
        //  pdf,
        //  ColumnPerchart
     },
    data () {
            return {  
                sampleCols:[
                            {
                                title: 'Sample ID',
                                key: 'gid',
                                "sortable": true,
                                filter: {
                                type: 'Input'
                                },
                                fixed: 'left',
                                width:120,
                                render: (h, params) => {  
                                    if (params.row.gid.indexOf("GSM") > -1){
                                        return h('div', [
                                        h('a', {                               
                                                attrs:{                              
                                                href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.gid,
                                                target:'_blank',                    
                                                },    
                                            },params.row.gid)
                                        ])
                                    }if(params.row.gid.indexOf("EGAD") > -1){
                                        return h('div', [
                                        h('a', {                               
                                                attrs:{                              
                                                href:'https://web2.ega-archive.org/datasets/'+params.row.gid.split('_')[0],
                                                target:'_blank',

                                                },    
                                            },params.row.gid)
                                        ])

                                    } else{
                                        return h('div',params.row.gid)
                                
                                    }  
                                }   

                                
                            },
                            {
                                title: 'Sample name',
                                key: 'sample',
                                "sortable": true,
                                filter: {
                                type: 'Input'
                                }

                            },
                            {
                                title: 'Organism',
                                key: 'organism',
                                width:120,
                                "sortable": true,
                                filter: {
                                type: 'Input'
                                }

                            },
                            {
                                title: 'Source',  //和dataset 里的source 一致
                                key: 'tissue',
                                width:120,
                                "sortable": true,
                                filter: {
                                type: 'Input'
                                },
                            },
                            // {
                            //     title: 'Sorted',
                            //     key: 'strain',
                            //     "sortable": true,
                            //     // filter: {
                            //     //     type: 'Select',
                            //     //     option: P_Value_range
                            //     // },
                            // },
                            {
                                title: 'Cell type',
                                key: 'cell_type',
                                width:120,
                                "sortable": true,
                                // filter: {
                                //     type: 'Select',
                                //     option: P_Value_range
                                // },
                            },
                            {
                                title: 'Tissue', // 细胞来源时间，分选等信息
                                key: 'source',
                                "sortable": true,
                                width:120,
                                // filter: {
                                //     type: 'Select',
                                //     option: P_Value_range
                                // },
                            },

                            {
                                title: 'Growth mode',
                                key: 'growth_mode',
                                filter: {
                                    type: 'Input',
                                },
                                // filter: {
                                //     type: 'Select',
                                //     option: P_Value_range
                                // },
                            },
                            {
                                title: 'Development  type',
                                key: 'development_type',
                                width:115,
                                filter: {
                                    type: 'Input',
                                },
                                // filter: {
                                //     type: 'Select',
                                //     option: P_Value_range
                                // },
                            },
                            {
                                title: 'Group',
                                key: 'group',
                                "sortable": true,
                                // filter: {
                                //     type: 'Select',
                                //     option: P_Value_range
                                // },
                            },
                ],   
                sampleData:[], 
                source:'', 
                spinShowSampleSource:true,  
                totalRow: 40,
                currentPage: 1,
                pageSize: 10,     
                enrich_data:[],
                enrich_layout:{},
                enrich_options:{},          
                enrichGroup:'',           
                publicPath: process.env.BASE_URL,
                // 查询信息的展示默认值
                // value1: '1',           
                series:'',
                organism:'',
                tissue:'',
                growth_type:'',
                myCagrowth_type:'',
                development_type:'',
                sample_numbers:'',
                organization_name:'',
                country:'',
                city:'',
                experiment_type:'',
                sequencing_type:'',
                status:'',
                summary:'',
                cell_types:'',
                samples:'',
                samples_count:'',
                ifSub:false,
                subseries:'',
                platforms:'',
                citations:'',
                contributors:'',
                data_processing:'',
                normalization_method:'',
                overall_design:'',
                submission_date:'',
                contact_name:'',
                e_mails:'',
                sequencing_type:'',
                standardized_mode:'',
                experimental_materials:'',
                laboratory_reagents:'',
                sequencing_process:'',
                reference:'',
                href:'',
                // dataset:this.$route.params.dataset,
                dataset:this.$store.state.app.CurrentPageToken,
                dataset_title:'',
                // currentPage1: 0,
			    // pageCount1: 0,
                // currentPage: 1,
                // diff_currentPage:1,
                // pageSize: 10,
                // diff_pageSize:10,
                // total: 400,
                // diff_total:400,
                // spinShow: true,
                search_placeholder:'',
                
                self: this,

                all_sample_tableData: [],
                diff_tableData:[],
                all_sample_tableColumns: [],
                diff_tableColumns:[],
                diff_exTbColums:[],
                contrGroupOfEnrich:'',
                enrichGroup:'',
                goType:'',
                tableColumnsChecked:[],
                tableColumnsData:[],
             
                tableType:'',
              
                chartOptionsEL:{},
        
                enrichGoOptions:{},
                chartOptionsELbubble:{},
                chartOptionsBoxPlot:{},
                chartOptionsAllStack:{},
                itemInfoTip:'',
            
               
                searchMicName:'',
                SpecifExpreTip:'',
             
                specif_name:'',
        }
     },
     

    methods: {

      


        intoClustGram(){               
         
          //alert(dataset);
          router.push({
            name: "ClustGram",
            params: {
              dataset : this.dataset,
            }
         
          });
        },

        mockTableData(series,currentPage,pageSize){

			var _this = this;      
            _this.spinShowTypeSource = true, 
            // alert("==")
            // alert(contrastsGroup)
			getSampleGroupPageDataset(series,currentPage,pageSize).then( res=>{

				_this.spinShowTypeSource = false                    
				let datas = res.data
                console.log('getSampleGroupPageDataset')
                console.log(datas)
				if (datas.signal == 1){

					// console.info(datas.list)
					_this.sampleData = datas.list                  
					_this.totalRow = datas.total;
				}else{
				}
			})


		}, 



  

       getImgURL(){
           let imgurl = '@/assets/img/'+ this.dataset + '.png'
           var src="@/assets/img/hspc_1.png"
        //    return require("./../../../src/assets/img/hspc_1.png")
           return require('@/assets/img/'+ this.dataset + '.png')

       },
       getHref(){
           if (this.source =="Fang's Lab"){
                return "http://sourcedb.big.cas.cn/zw/zjrc/yjy/201311/t20131116_3979427.html"
           }

       },
       getSeriHref(){
            
            
            if (this.dataset.indexOf("GSE") > -1){

                if((this.dataset.indexOf("_") > -1)){
                    var key = this.dataset.split('_')[0]
                    return 'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+ key
                
                }else{
                    return 'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+ this.dataset
                
            
                }
                  
            }
            
            if (this.dataset.indexOf("PMID") > -1){
                  var key = this.dataset.split('PMID')[1]
                  return 'https://pubmed.ncbi.nlm.nih.gov/'+ key
            }

            if (this.dataset.indexOf("CRA") > -1){
                  
                  return 'https://ngdc.cncb.ac.cn/gsa/browse/'+ this.dataset
            }

            else{
                
                return  '#'
              
            }    
       },
    //    capitalized(name) {
    //         const capitalizedFirst = name[0].toUpperCase();
    //         const rest = name.slice(1);
    //         return capitalizedFirst + rest;
    //    },
       getDatasetDetail(){
            let _this = this
            // alert(this.$store.state.app.CurrentPageToken)
            getDataset(this.$store.state.app.CurrentPageToken).then(res => {                              
                let datas =res.data
                // console.log(datas)
                // console.log(datas.series)
                _this.series = datas.series
                _this.organism = datas.organism
                // 把 datas.growth_type 首字符变大写
                const capitalizedFirst = datas.growth_type[0].toUpperCase();
                const rest = datas.growth_type.slice(1);
                var myCagrowth_type = capitalizedFirst + rest
        
                _this.myCagrowth_type = myCagrowth_type
                _this.growth_type = myCagrowth_type
                _this.tissue = datas.tissue
                _this.dataset_title = datas.title
                _this.development_type = datas.development_type
                _this.sample_numbers = datas.sample_numbers
                _this.organization_name = datas.organization_name
                _this.country = datas.country
                _this.city = datas.city
                _this.experiment_type = datas.experiment_type
                _this.sequencing_type = datas.sequencing_type
                _this.status = datas.status
                _this.summary = datas.summary
                let samples_data = datas.samples                 
                var samples_string = 'GSM   ' + 'Sample ' + 'Group' +"<br/>"
                if (samples_data != null){
                    let samples_arry = samples_data.split(",")
                    samples_arry
                    // console.info(samples_arry)
                    for (var i=0;i<samples_arry.length;i++){
                        let sample_arry = samples_arry[i].split(" ")
                      
                        if ( sample_arry[0].indexOf("GSM") > -1 ){                            
                            samples_string = samples_string + "<a href=https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=" + sample_arry[0] +">"+ samples_arry[i] +"</a>" +"<br/>"
                        }else{
                        }

                    }


                }
                _this.samples = samples_string
                _this.data_processing = datas.data_processing
                _this.normalization_method = datas.normalization_method
                _this.overall_design = datas.overall_design
                _this.samples_count = datas.samples_count
                _this.submission_date = datas.submission_date
                _this.contact_name = datas.contact_name
                _this.e_mails = datas.e_mails
                let platforms_data = datas.platforms  
                
                var platforms_string = ''


                if (platforms_data != null){

                    if(this.dataset.indexOf("GSE") > -1){
                        if ( platforms_data.indexOf(",") > -1){
                         let platforms_arry = platforms_data.split(",")
                        // console.info(samples_arry)
                        for (var i=0;i<platforms_arry.length;i++){
                            let platform_arry = platforms_arry[i].split(" ")
                            if ( platform_arry[0].indexOf("GPL") > -1 ){  

                                // platforms_string =  platforms_string+ platform_arry[0] +platforms_arry[i]+"&nbsp;&nbsp;"
                                platforms_string =  platforms_string + "<a target=_blank href=https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=" + platform_arry[0] +">"+platforms_arry[i]+"</a>&nbsp;&nbsp;"
                            }else{

                            }
                        }
                        }else{
                            let platform_arry = platforms_data.split(" ")
                            // platforms_string =  platform_arry[0] +platforms_data
                            platforms_string =   platforms_string + "<a target=_blank href=https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=" + platform_arry[0] +">"+platforms_data+"</a>"
                        }
                    }else{

                        platforms_string =  platforms_data
                    }
                   


                }

                _this.platforms = platforms_string

                let subseries_data = datas.subseries
              
                let subseries_string = ''
                if (subseries_data === null){
                     
                    _this.ifSub = false
                }else{
                    
                      _this.ifSub = true               
                    if ( subseries_data.indexOf(",") > -1){
                        let subseries_arry = subseries_data.split(",")
                        // console.info(samples_arry)
                        
                        for (var i=0;i<subseries_arry.length;i++){
                            // https://pubmed.ncbi.nlm.nih.gov/27281222
                                                   
                            subseries_string =  subseries_string + "<a href=https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=" + subseries_arry[i] +">"+ subseries_arry[i] +"</a>"+"<br/>"
                           
                        }
                    }else{
                        let subserie_arry = subseries_data
                        subseries_string =  "<a href=https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=" + subserie_arry +">"+ subserie_arry +"</a>"
                    }
                  _this.subseries = subseries_string
                }


                let citations_data = datas.citations
                var citations_string = ''
                if (citations_data != null){
                    if ( citations_data.indexOf(",") > -1){
                         let citations_arry = citations_data.split(",")
                        // console.info(samples_arry)
                        for (var i=0;i<citations_arry.length;i++){
                            // https://pubmed.ncbi.nlm.nih.gov/27281222
                                                   
                            citations_string =  citations_string + "<a target=_blank href=https://pubmed.ncbi.nlm.nih.gov/" + citations_arry[i] +">"+citations_arry[i]+"</a>&nbsp;&nbsp;"
                           
                        }
                    }else{
                        let citation_arry = citations_data
                        citations_string =  "<a target=_blank href=https://pubmed.ncbi.nlm.nih.gov/"  + citation_arry +">"+citation_arry+"</a>"
                    }
                }
                _this.citations = citations_string

                let contributors_data = datas.contributors
                var contributors_string = ''
                if (contributors_data != null){
                    if ( contributors_data.indexOf(",") > -1){
                         let contributors_arry = contributors_data.split(",")
                        // console.info(samples_arry)
                        for (var i=0;i<contributors_arry.length;i++){
                            // https://www.ncbi.nlm.nih.gov/pubmed/?term=Diaz-Blanco E[Author]
                            // console.log(contributors_arry[i])                       
                            contributors_string =  contributors_string + "<a href=\"https://www.ncbi.nlm.nih.gov/pubmed/?term=" + contributors_arry[i] + "[Author]\">"+contributors_arry[i]+"</a>&nbsp;&nbsp;"
                            // console.log(contributors_string)
                        }
                    }else{
                        let contributor_arry = contributors_data
                        contributors_string =  "<a href=\"https://www.ncbi.nlm.nih.gov/pubmed/?term=" + contributor_arry +"[Author]\">"+contributor_arry+"</a>"
                    }
                }
                _this.contributors = contributors_string

                let series_data = datas.series
                var series_string = ''
                if (series_data != null){
                    let series_arry = series_data.split(",")                                            
                    for (var i=0;i<series_arry.length;i++){                                         
                        series_string = series_string + "<a href=https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=" + series_arry[i] +">"+series_arry[i]+"</a>,"                           
                    }

                }

                // 各dataset的数据     
               
               
                _this.experimental_materials = datas.experimental_materials
                _this.laboratory_reagents = datas.laboratory_reagents
                _this.sequencing_process = datas.sequencing_process
                _this.reference = datas.reference
                _this.href = datas.href

                _this.sequencing_type= datas.sequencing_type
                // //  根据数据传过来信息做一个给所有数据做一个列表，   
                // let sequencing_type_list =[]
                let tableType = ''
                if ( datas.experiment_type != null){

                     if( "Expression profiling by array" == datas.experiment_type ){
                        _this.search_placeholder = "Symbol, eg: A1BG,A1BG"
                        _this.searchMicName='mrna'
                        _this.tableType = 'expre'  //表达数据类型
                        _this.standardized_mode = 'normalized gene level expression values'
                     } 


                }

             

            })
 
            getDatasetGroup(this.$store.state.app.CurrentPageToken).then(res =>{
                let datas =res.data
                // console.log(datas)
                let samples_data = datas.sample
                let datasetsource = datas.source
                _this.source = datasetsource
                let gse = datas.gse
                let group = datas.group               
                var samples_string = 'sid   ' + 'sample ' + 'group' +"<br/>"
                if (samples_data != null){
                    for (var i=0;i<samples_data.length;i++){ 
                        // console.log('===')
                        // console.log(gse[i].indexOf('GSM'))
                        if (gse[i].indexOf('SAMC')>-1){
                            // https://bigd.big.ac.cn/gsa/s/sample/SAMC112490/brFIwkBd
                            samples_string = samples_string + "<a href=https://bigd.big.ac.cn/gsa/s/sample/" + gse[i] +"/brFIwkBd >"+ gse[i] +"</a>"+' ' +samples_data[i]+'    '+group[i]+"<br/>"
                        }else{

                            if (gse[i].indexOf('GSM')>-1){
                                samples_string = samples_string + "<a href=https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=" + gse[i] +">"+ gse[i] +"</a>"+' ' +samples_data[i]+'    '+group[i]+"<br/>"
                            }else{
                                samples_string = samples_string + "<a"  +">"+ gse[i] +"</a>"+' ' +samples_data[i]+'    '+group[i]+"<br/>"
                            }

                            
                        }   
                    }
                }
                _this.samples = samples_string
                
            })

       },
        

        // 后期考虑排除此功能
        // sample各个时期的详细表达
        // mockExpressionTableData(tableType){          
        //     var _this = this;          
        //     getPageExpressionTableData( _this.dataset,tableType,_this.standardized_mode,_this.currentPage,_this.pageSize).then( res => {
        //         let datas = res.data
        //         // console.info(datas.list)
        //         // console.info(datas.total)           
        //         // console.log(datas.list[0])
                
        //         let tableColumnsChecked_data = []
        //         let tableColumnsData_data = []

        //         // console.log("====================")
        //         // console.log(datas.list[0])
        //         // console.log(datas.list)
        //         for(var key in datas.list[0]){

        //             // console.log(key,datas.list[0][key])
                    
        //             tableColumnsChecked_data.push(key)
        //             tableColumnsData_data.push(
        //                     {
        //                         name:key
        //                     }
        //             )    
                    
                    
        //         }
        //         // console.log(tableColumnsChecked_data)
                
        //         _this.tableColumnsChecked = tableColumnsChecked_data                    
        //         _this.tableColumnsData =  tableColumnsData_data
        //         _this.changeTableColumns()
        //         // console.log(_this.tableColumnsData)
        //         _this.all_sample_tableData = datas.list               
        //         _this.total = datas.total;

        //     })
        // },
        


        //根据数据类型改变查询提示语
        setsearch_placeholder(tableType){
            var _this = this
            
            _this.search_placeholder = "Enter " + tableType.split('-')[0]  + " name..."
            _this.search_datatype = tableType.split('-')[0]

        },

        
        

        setOthersearchItems(tabletype){
           
           var _this = this
            var datatype = tabletype.split('-')[0]
            let othersearchItems = []
          
                   
            // datatype中有空格，使用是否存在此字符串的方法
            
            if (datatype.search("mRNA") != -1){
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
            
            if (datatype.search("miRNA") != -1) {
                
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
            if (datatype.search("lncRNA") != -1) {
                
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

        //根据数据类型画表达关系图 echarts
        drawSequenceEchartByTabletype(tableType){

            var _this = this
            var myChart = this.$echarts.init(document.getElementById("expression_sequence"));
            getSequenceEchartByTabletype(_this.dataset,tableType).then( res => {    
                let datas = res.data               
                //tableType
                // 基于准备好的dom，初始化echarts实例
                _this.spinShow2 = false
                var axisData = datas.axisData;

                var data = datas.data;

                var links = data.map(function (item, i) {
                    return {
                        source: i,
                        target: i + 1
                    };
                });

                links.pop();

                var option = {
                        title: {
                            text: "The expression of " +tableType + " all samples during "+ _this.dataset,
                            x:'center',
                            y:'top',
                            textAlign:'center'
                        },
                        tooltip: {},
                        xAxis: {
                            type : 'category',
                            boundaryGap : false,
                            data : axisData
                        },
                        yAxis: {
                            type : 'value'
                        },
                        series: [
                            {
                                type: 'graph',
                                layout: 'none',
                                coordinateSystem: 'cartesian2d',
                                symbolSize: 40,
                                label: {
                                    normal: {
                                        show: true
                                    }
                                },
                                edgeSymbol: ['circle', 'arrow'],
                                edgeSymbolSize: [4, 10],
                                data: data,
                                links: links,
                                lineStyle: {
                                    normal: {
                                        color: '#2f4554'
                                    }
                                }
                            }
                        ]
                };
                myChart.setOption(option); 
            })
        },
         
        // 根据数getChartOptionsEL据类型范围数据画 表达范围图
        getChartExpreRange(tableType){
            var _this = this;
            getExpreRange(_this.dataset,tableType).then( res => {
                let datas = res.data                  
                
                _this.spinShow3 = false
                _this.chartOptionsEL= 
                    {
                    chart: {
                        type: 'column'
                    },           
                    title: {
                        text: tableType + " expression levels"
                    },
                    subtitle: {
                        text: 'Data Souce:' + _this.source
                    },
                    loading: {
                        hideDuration: 1000,
                        showDuration: 1000
                    },
                    xAxis: {
                        categories: [
                            '0-5','5-10','10-20','20-30','30-40','40-50','50-60','60-70','70-80','80-90','90-100','100-1000','>1000'
                        ],
                        title: {
                            text: _this.standardized_mode + ' Range'
                        },
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Sum'
                        },
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
                    series: datas,


                    exporting: {                        
                    }
                }
                    


                
            })
        },

       
     

        getchartOptionsAllStack(){
            // 得到所有数据占比信息
            var _this = this;

           getAllExpreStack(_this.dataset,_this.sequencing_type).then(res =>{
                let datas = res.data  
                _this.spinShow1 = false
                _this.chartOptionsAllStack={
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'The expression distribution of  all samples during the red line differentiation stage'
                    },
                    xAxis: {

                        categories: datas.categories
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Total proportion'

                        }
                    },
                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                        shared: true
                    },
                    plotOptions: {
                        column: {
                            stacking: 'percent'
                        }
                    },
                    credits: { enabled:false},
                    series:datas.series
                }
           })


        },

        getTable2Columns() {
          
            let _this = this
            let data = [] 
            // alert(_this.tableColumnsData)
            // data.push({
            //             title: _this.tableColumnsData[0].name,
            //             key: _this.tableColumnsData[0].name,
            //             width: 150,
            //             fixed: 'left',
                        
            //         })
                    
            _this.tableColumnsChecked.forEach(col => data.push({
                         title: col,
                         key: col,
                         width: 150,
                         sortable: true
                    })  )
            // console.log("=====================")
            // console.log(data)       
            return data;
        },
             
        
        changeTableColumns() {
            let _this = this
            _this.all_sample_tableColumns = _this.getTable2Columns();
        },

       

      

        handleCurrentChange(val,tableType) {
            let _this = this 
            // console.log(`当前页: ${val}`);
            this.currentPage = val;           
          
            _this.mockTableData(this.dataset,this.currentPage,this.pageSize)

        },

        // diff_handleCurrentChange(val){
        //     // 直接获取变量获取 this.无值,  事件改变 _this.
        //     let _this = this     
        //     this.diff_currentPage = val;   
        //     // _this.http();
        // },


        handleSizeChange(val,tableType){
            let _this = this
            // console.log(`每页 ${val} 条`);
            this.pageSize = val;
            _this.mockTableData(this.dataset,this.currentPage,this.pageSize)

        },
        // diff_handleSizeChange(val){
           
        //     // console.log(`每页 ${val} 条`);
        //     this.diff_pageSize = val;
        //     // _this.http()
        // },

       
    //    changedataType_squenceEchart(tabletype){
    //         let _this = this  
    //         _this.drawSequenceEchartByTabletype(tabletype)
    //     },
       
       
       
       
       
        changedataType_getMicInfo(tabletype){
            let _this = this       
            _this.setsearch_placeholder(tabletype)
            _this.setOthersearchItems(tabletype)

        },

        changeExpreRange(tabletype){
            let _this = this  
            _this.getChartExpreRange(tabletype)

        },
        

       
       
      
     
           
     },    
    mounted () {   
     
        this.getDatasetDetail(); 
        this.mockTableData(this.dataset,this.currentPage,this.pageSize)
        // this.getdiff_chart();
        
        // // 示例封装好的axios  mounted 中的使用形式
        // this.getTableData();


        // this.mockExpressionTableData();
        // this.getColumsData();
        // this.getexpressionBar()
        // this.drawSequenceEchartByTabletype('mmm');
        
     
        // this.getenrich_chart();
        

    
    },
    
    watch:{
        '$route':'getParams'


    }


        



}
</script>

<style>
   .detail_name{
       

   }

  
   
    .detail_style{
        font-size:18px;
    }

    .text_p{
        text-align: justify;
    }
    .testtype{
        background: #eee;
    }

    .my-tableStyle{
        cursor:auto;
    }
    .my-tableStyle:hover{
        cursor:auto;
    }
    /* .ivu-table-row{
        cursor:auto !important;
    } */
</style>

