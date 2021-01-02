<template>



    <div>      <!-- enrichGO analysis -->  

        <h1 class='h3_title'>Enrichment Analysis</h1>      
        <Row>
            <!-- <i-form :model="GOformItem" :label-width="120">--> 
                
                <Col span="3">
                    <p class='detail_title'>Contrasts group: </p>                                             
                </Col>
                <Col span="4">
                    <i-select :model.sync="enrichGroup" clearable placeholder="Pleace select contrasts group"  @on-change="changedContrGroupOfEnrich">        
                                <i-option class='h3_title' v-for="(group,index) in contrasts_group" :key='index' :value="group.name">{{ group.name }}</i-option>
                    </i-select>
                </Col>
                &nbsp;&nbsp;
                <!-- <Col span="3" offset="1">
                    <p class='detail_title'>Enrich group:</p>                                             
                </Col> -->
                <!-- <Col span="4">
                    <i-select :model.sync="enrichGroup" clearable  placeholder="Pleace select enrich GO group" @on-change="changenrichType">
                        
                        <i-option v-for="(enrichGroup,index) in enrichGroupList" :key='index' :value="enrichGroup.name">{{ enrichGroup.name }}</i-option>
                    </i-select>
                </Col> -->
                <Col span="2" offset="1">
                    <p class='detail_title' >GO Type:</p>                                             
                </Col>
                <Col span="4">
                    <i-select :model.sync="enrichGroup" clearable  placeholder="Pleace select GO Type" @on-change="changeGoType">                    
                        <i-option v-for="(goType,index) in goTypeList" :key='index' :value="goType.name">{{ goType.name }}</i-option>
                    </i-select>
                </Col>
                 
                <i-button class='button_style' type="primary" icon="ios-search" shape="circle" @click="getenrich_chart"></i-button> 
                
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
				
		

        <router-link to="/Dataset_service">
            <div style="text-align:right;font-size:calc((30/1920) * 100vw);">
                <!-- <img width="20%" height="10%" src="@/assets/img/red_sys.jpg"> -->
                <h3>Back To Dataset Service</h3>

            </div> 
	    </router-link>

    </div>  
    
</template>


<script>
import {getEnrichData,getdiffGroup,getDatasetGroup} from '@/api/erythdataservice'
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
                        name:'CC'
                    },
                    {
                        name:"MF"
                    },
                    {
                        name:"BP"
                    },
                ],
                ifResize:true,
                enrichGO_data:[],
                enrichGO_layout:{},
                enrichGO_options:{
                    responsive: true,
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
        //     getEnrichData(this.series,this.contrGroupOfEnrich,this.enrichGroup,this.goType).then(res =>{ 
        //         // alert(res.datas)
        //         let datas = res.data 
        //         this.spinShow2 = false
        //         console.log(datas.log_p_adjust)
        //         // alert(datas.Description.length)
        //         if(datas.Description.length == 0 ){
        //               let mess = 'there no the GO enrichment of ' + this.enrichGroup  
        //               this.$Message.info(mess, 10);
        //         }
                
        //         var option = {
        //             title: {
        //                 text: 'the GO('+ this.goType+ ') enrichment of ' + this.enrichGroup
                       
        //             },
        //             color: ['#8EC9EB'],
        //             // legend: {
        //             //     data:['GO Term and -log10(p.adjust)'],
        //             //     nameLocation:'left',
        //             // },
        //             tooltip: {
        //                 trigger: 'axis',
        //                 formatter: "GO Term : {b} <br/> -log10(p.adjust) : {c}"
        //             },
        //             grid: {
        //                 left: '3%',
        //                 right: '4%',
        //                 bottom: '3%',
        //                 containLabel: true
        //             },
        //             xAxis: {
        //                 name:"-log10(p.adjust)",
        //                 nameLocation:'center',
        //                 type: 'value',
        //                 splitLine: {
        //                     show: false
        //                 },
        //                 axisLabel: {
        //                     formatter: '{value}'
        //                 }
        //             },
        //             yAxis: {
        //                 name:"GO Term [-log10(p.adjust)]",
                       
        //                 type: 'category',
        //                 axisLine: {onZero: false},
        //                 axisLabel: {
        //                     // 文件超出长度范围解决
        //                     // show:true,
        //                     fontFamily:'Times New Roman',
        //                     fontSize:'9',
        //                     interval:0,
        //                     size:4,
        //                     formatter: function (params){
        //                         if( params.length > 30)
        //                             return params.substring(0,30) + '...';
        //                         else
        //                             return params;
        //                     }
        //                 },
                        
        //                 boundaryGap: true,
        //                 data: datas.Description
        //             },
        //             graphic: [
                        
        //             ],
                    
        //             series: [
        //                 {
        //                     name: 'GO Term and -log10(p.adjust)',
        //                     type: 'bar',
        //                     smooth: true,
        //                     barCategoryGap: 2,
        //                     lineStyle: {
        //                         width: 1,
        //                         shadowColor: 'rgba(0,0,0,0.4)',
        //                         shadowBlur: 2,
        //                         shadowOffsetY: 2
        //                     },
        //                     data:datas.log_p_adjust
        //                     }
        //             ]
        //         }
        //      var enrichChart = this.$echarts.init(document.getElementById("enrichGO_echart"));
        //      enrichChart.setOption(option); 
           
            
        //    })
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
						title:'The GO('+ this.goType + ') enrichment of ' + this.contrGroupOfEnrich + "("+this.series+'('+ this.source+')'+')',
                        bargap: 0.25,
                        xaxis: {
							title:'-log10(p.adjust)',
							// showgrid : TRUE,
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
                            l:500
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
        }
    },
    mounted(){

        this.getDatasetSampleGroup();
        this.getdiff_group();



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
    .h3_title{
		font-size:calc((30/1920) * 100vw);
		   
	}


    .form_style{
        font-size:calc((30/1920) * 100vw);
    }
    .detail_title{
        font-size:calc((25/1920) * 100vw);
    }
    .button_style{
        font-size:calc((40/1920) * 100vw);
    }
</style>

