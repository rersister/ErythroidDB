<template>



    <div>      <!-- enrichGO analysis -->  

        <br>
        <h1 class="my_h1">Enrichment Analysis</h1> 
        <br>
        <Row>
        	<i-form :label-width="120">
				<i-col span="8">
					<Form-item label="Contrasts Group: ">                                                  
						<i-select  clearable placeholder="Pleace select contrasts group"  @on-change="changedContrGroup"  filterable>        
							<i-option v-for="(group,index) in contrasts_group" :key='index' :value="group.name">{{ group.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
                &nbsp;&nbsp;
                <i-col span="12">
					<Form-item label="Type: ">                                                  
						<i-select :model.sync="enrichGroup" clearable  placeholder="Pleace select GO Type" @on-change="changeGoType"  filterable>                    
                            <i-option v-for="(goType,index) in goTypeList" :key='index' :value="goType.value">{{ goType.name }}</i-option>
                        </i-select>
                    
                      
					</Form-item>
				</i-col>

			</i-form>
        </Row> 	     
        <Row>
            <!-- <i-form :model="GOformItem" :label-width="120">--> 
                
                <!-- <Col span="4">
                    <p class='detail_title'>Contrasts Group: </p>                                             
                </Col>
                <Col span="4">
                    <i-select :model.sync="enrichGroup" clearable placeholder="Pleace select contrasts group"  @on-change="changedContrGroupOfEnrich">        
                                <i-option class='h3_title' v-for="(group,index) in contrasts_group" :key='index' :value="group.name">{{ group.name }}</i-option>
                    </i-select>
                </Col> -->
                
                <!-- <Col span="3" offset="1">
                    <p class='detail_title'>Enrich group:</p>                                             
                </Col> -->
                <!-- <Col span="4">
                    <i-select :model.sync="enrichGroup" clearable  placeholder="Pleace select enrich GO group" @on-change="changenrichType">
                        
                        <i-option v-for="(enrichGroup,index) in enrichGroupList" :key='index' :value="enrichGroup.name">{{ enrichGroup.name }}</i-option>
                    </i-select>
                </Col> -->
                <!-- <Col span="2" offset="1">
                    <p class='detail_title' >Type:</p>                                             
                </Col>
                <Col span="4">
                    <i-select :model.sync="enrichGroup" clearable  placeholder="Pleace select GO Type" @on-change="changeGoType">                    
                        <i-option v-for="(goType,index) in goTypeList" :key='index' :value="goType.value">{{ goType.name }}</i-option>
                    </i-select>
                </Col>
                 
                <i-button class='button_style' icon="ios-search" shape="circle" @click="getenrich_chart"></i-button> 
                 -->
            <!--</i-form>-->
        </Row>     
        <Row> 
            <!-- <div id="enrichGO_echart" style="width: 100%;height:600%; text-aglign:center"></div>  -->
            <!-- <div v-if="enrichShow"> -->
                <!-- <Spin size="large" fix v-if="spinShow2"></Spin>              -->
                <vue-plotly :autoResize="ifResize" :data="enrichGO_data" :layout="enrichGO_layout" :options="enrichGO_options"/>
            <!-- </div>              -->
        </Row> 
        
					<!-- <Spin size="large" fix v-if="spinShow2"></Spin>              -->
				
		


    </div>  
    
</template>


<script>
import {getEnrichData,getdiffGroup,getDatasetGroup,getDatasetSourceInfoData} from '@/api/erythdataservice'
// import {getAllEnrichData}  from '@/api/erythroidAtlas'
import VuePlotly from '@statnett/vue-plotly'
export default {
    name:"EnrichGO",
    components:{
		VuePlotly,  

	},
    data(){
        return{
                contrGroupOfEnrich:'',
                GOformItem:{},
                spinShow2:'true',
                series:this.$store.state.app.CurrentPageToken,
                enrichShow:false,
                enrichGroup:'',
                contrasts_group:[],
                enrichGroupList:[
                ],
                goTypeList:[
                    {
                        name:'GO-CC',
                        value:'CC'
                    },
                    {
                        name:"GO-MF",
                        value:'MF'
                    },
                    {
                        name:"GO-BP",
                        value:'BP'
                    },
                    {
                        name:"KEGG",
                        value:'KEGG'
                    },

                ],
                ifResize:true,
                enrichGO_data:[],
                enrichGO_layout:{},
                enrichGO_options:{
                    
                    responsive: true,
                    displaylogo: false,
                    toImageButtonOptions: {
                        format: 'svg', // one of png, svg, jpeg, webp
                        filename: 'enrich_image',
                        // height: 500,
                        // width: 700,
                        scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
                    }


                },

        }
    },
    methods:{
        getdiff_group(){
            let contrasts_group_type_list = []
            let enrich_group_list = []
            let _this = this
            getdiffGroup(this.series).then(res =>{
                let datas = res.data 
                console.log(datas)  
                datas.forEach(key => contrasts_group_type_list.push({
                    name:key
                }))
                this.contrasts_group = contrasts_group_type_list
                
                this.contrGroupOfEnrich= datas[0]
                
                this.enrichGroup = datas[0].split('-')[0]
                this.goType = 'CC'
                this.getenrich_chart(this.series,datas[0])
                
                
               
            })
        },
        
        getenrich_chart(){
            this.enrichShow = true
            // alert("go to sql")     
            if( "" == this.contrGroupOfEnrich ){
                        this.$Message.info('please select contrasts group', 10);
            } 
            if( "" == this.enrichGroup ){
                        this.$Message.info('please select enrich group', 10);
            } 

            if( "" == this.goType ){
                        this.$Message.info('please select GO type', 10);
            } 
         
            this.spinShow2 = true

            getEnrichData(this.series,this.contrGroupOfEnrich,this.goType).then(res =>{ 
                        let datas = res.data 
                        var xData = datas.xData  // list 里面装list
                        var yData =datas.yData   
                        var nData = datas.nData
                        var tData = datas.tData
                        this.enrichGO_data = []
                        for ( var i = 0; i < xData.length; i ++ ) {
                            // alert(nData[i])
                            var result = {
                                x: xData[i],
                                y: yData[i],
                                name: nData[i],
                                type: 'bar',
                                orientation :'h',
                            };
                            this.enrichGO_data.push(result)   
                        };

                        var layout = {
                            // "("+this.series+'('+ this.source+')'+')',  没有副标题，把标题设置简短
                            title:'GO ('+ this.goType + ') enrichment of ' + this.contrGroupOfEnrich+ '\n'
                              +'( '+this.series+';Source:' + this.Dsource + ";Growth Mode:"+ this.Dgrowth_mode +')',
                            //itle:'Differential analysis of ' + diffgroup +'( '+this.series+';Source:' + this.Dsource + ";Growth Mode:"+ this.Dgrowth_mode +')',

                            
                            // bargap: 0.25,
                            xaxis: {
                                title:'-log10(p.adjust)',
                                // showgrid : TRUE,
                                gridcolor: 'rgb(243, 243, 243)',
                                gridwidth: 1,
                            },
                            yaxis: {
                                // showgrid: TRUE,
                                title:{
                                        text: 'GO Term [-log10(p.adjust)]',
                                        position:'top',
                                        standoff: 40,
                                        yanchor:'top',
                                    },
                                // yanchor:'top',
                                // position:'top',
                                automargin: true,
                                gridcolor: 'rgb(243, 243, 243)',
                                gridwidth: 1,
                                rangemode: "normal",
                                dtick: 1,
                                // axisLabel: {
                                // // 文件超出长度范围解决
                                // // show:true,
                                // interval:0,
                                
                                exponentformat: function (params){
                                    if( params.length > 30)
                                        return params.substring(0,30) + '...';
                                    else
                                        return params;
                                }
                            
                            },
                            margin: {
                                l:100
                            },
                        
                        
                        }
                        this.enrichGO_layout = layout
            })
            
        
        
        },
        changedContrGroupOfEnrich(contr_group){ 
            let enrich_group_list = []
            let _this = this
            let enrich_lists = contr_group.split('-')
           
            enrich_lists.forEach(key => enrich_group_list.push({
                name:key
            }))
            _this.enrichGroupList = enrich_group_list
            this.contrGroupOfEnrich = contr_group
                
          
        },
        changeGoType(goType){
            let _this = this
            this.goType = goType
            this.getenrich_chart()
        },

        changedContrGroup(contra_group){
            this.contrGroupOfEnrich =  contra_group
            this.getenrich_chart()

        },
        changenrichType(enrichGroup){
            let _this = this
            this.enrichGroup = enrichGroup
        },
        getDatasetSampleGroup(){
             let _this = this
             getDatasetGroup(this.$store.state.app.CurrentPageToken).then(res =>{
                let datas =res.data
                console.log(datas)
                let samples_data = datas.sample
                let datasetsource = datas.source
                _this.source = datasetsource
                // let gse = datas.gse
                // let group = datas.group               
                // var samples_string = 'gid   ' + 'sample ' + 'group' +"<br/>"
                // if (samples_data != null){
                //     for (var i=0;i<samples_data.length;i++){ 
                //         samples_string = samples_string + "<a href=https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=" + gse[i] +">"+ gse[i] +"</a>"+' ' +samples_data[i]+'    '+group[i]+"<br/>"
                        
                //     }


                // }
                // _this.samples = samples_string
                
            })
        },

        getDatasetSourceInfo(series){
             let _this = this
             getDatasetSourceInfoData(this.series).then(res =>{
                let datas =res.data
                console.log(datas)
                _this.Dsource = datas.source
                _this.Dgrowth_mode = datas.growth_mode
                
            })
        }
    },
    mounted(){

        this.getDatasetSampleGroup();
        this.getdiff_group();
        this.getDatasetSourceInfo(this.series)



    //     var myChartContainer = document.getElementById('enrichGO_echart')
    //     console.log(myChartContainer)
    //     // 获取自适应的高度和宽度
    //     var resizeMyChartContainer = function() {
    //         // console.log("----")
    //         myChartContainer.style.height = window.innerHeight * 0.65 + 'px';
    //         myChartContainer.style.width = window.innerWidth * 0.75 + 'px';
            
    //     };
    //     // 设置容器高和宽
    //     resizeMyChartContainer();

    //     var myChart = this.$echarts.init(myChartContainer);
    //     let option = {};
      
    //     myChart.setOption(option);
    //     window.onresize = ()=>{
    // 　　　　//调用methods中的事件
    //         resizeMyChartContainer();
            
    //         myChart.resize()
    //         console.log('==')
    //         // _this.pageResize();
    //   }

	}
   

    
}
</script>

<style>



    .form_style{
        font-size:calc((30/1920) * 100vw);
    }
    .detail_title{
        font-size:calc((25/1920) * 100vw);
    }
    
</style>

