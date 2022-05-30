<template>
    <div>      <!-- enrichGO analysis -->  
        <h1 class='h3_title'>Cluster's Enrichment Analysis</h1>      
        <Row>
            <i-form :label-width="120">
				<i-col span="10">
					<Form-item label="Data source: ">                                                  
						<i-select :model.sync="showByGroup" clearable placeholder="Pleace select cell source"  @on-change="changedDataSource">        
							<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
                <i-col span="10">
					<Form-item label="Enrich group: ">                                                  
						<i-select :model.sync="showByGroup" clearable placeholder="Pleace select cluster group"  @on-change="changedEnrichChart">        
							<i-option v-for="(group,index) in group_type_list" :key='index' :value="group.name">{{ group.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
			</i-form>
        </Row>     
        <Row> 
            <div id="enrichGO_echart" style="width: 100%;height:600%; text-aglign:center"></div> 
            <div v-if="enrichShow">
                <Spin size="large" fix v-if="spinShow2"></Spin>             
                
            </div>             
        </Row> 


    </div>  
    
</template>


<script>
import {getClusterEnrichData,getTsneGroup,getClusterEncihGroup} from '@/api/erythdataservice'
export default {
    name:"ClusterEncihGO",
    data(){
        return{
                GroupOfEnrich:'',
                GOformItem:{},
                spinShow2:'true',
                series:this.$store.state.app.CurrentPageToken,
                enrichShow:false,
                // enrichGroup:'',
                data_source_list:[],
                source:'',
                group_type_list:[],
                group:'',
                
                
        }
    },
    methods:{
        changedEnrichChart(group){
            console.log(group)
            this.group = group
			this.getEnrichChart(this.series,this.source,group)

		},
        changedDataSource(source){
			let _this = this  
			this.source = source
            this.getEnrichGroup(this.series,source)
            
        },
        
        getEnrichChart(){
            this.enrichShow = true
            // alert("go to sql")     
            if( "" == this.source ){
                        this.$Message.info('please select data source', 10);
            } 
            if( "" == this.group ){
                        this.$Message.info('please select enrich group', 10);
            } 
            this.spinShow2 = true

            getClusterEnrichData(this.series,this.source,this.group).then(res =>{ 
                // alert(res.datas)
                let datas = res.data 
                this.spinShow2 = false
                console.log(datas.log_p_adjust)
                // alert(datas.Description.length)
                if(datas.Description.length == 0 ){
                      let mess = 'there no the GO enrichment of ' + this.enrichGroup  
                      this.$Message.info(mess, 10);
                }
                
                var option = {
                    title: {
                        text: "the GO('')  enrichment of " + this.group
                       
                    },
                    color: ['#8EC9EB'],
                    // legend: {
                    //     data:['GO Term and -log10(p.adjust)'],
                    //     nameLocation:'left',
                    // },
                    tooltip: {
                        trigger: 'axis',
                        formatter: "GO Term : {b} <br/> -log10(p.adjust) : {c}"
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        name:"-log10(p.adjust)",
                        nameLocation:'center',
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    yAxis: {
                        name:"GO Term [-log10(p.adjust)]",
                       
                        type: 'category',
                        axisLine: {onZero: false},
                        axisLabel: {
                            // 文件超出长度范围解决
                            // show:true,
                            fontFamily:'Times New Roman',
                            fontSize:'9',
                            interval:0,
                            size:4,
                            formatter: function (params){
                                if( params.length > 30)
                                    return params.substring(0,30) + '...';
                                else
                                    return params;
                            }
                        },
                        
                        boundaryGap: true,
                        data: datas.Description
                    },
                    graphic: [
                        
                    ],
                    
                    series: [
                        {
                            name: 'GO Term and -log10(p.adjust)',
                            type: 'bar',
                            smooth: true,
                            barCategoryGap: 2,
                            lineStyle: {
                                width: 1,
                                shadowColor: 'rgba(0,0,0,0.4)',
                                shadowBlur: 2,
                                shadowOffsetY: 2
                            },
                            data:datas.log_p_adjust
                            }
                    ]
                }

             var enrichChart = this.$echarts.init(document.getElementById("enrichGO_echart"));
             enrichChart.setOption(option); 
           
            
           })
        },
        
        getDataSourceList(series){

			getTsneGroup(this.series).then(res =>{

				let _this = this
                let datas = res.data  
				console.log(datas)
				var data =   datas 
				this.source = datas[1]       
				datas.forEach(key => this.data_source_list.push({
                    name:key
				})) 
				// alert(datas[1])
				// this.getMarkerChart(this.series,datas[1])
             
           })
        },

        getEnrichGroup(series,source){
            getClusterEncihGroup(series,source).then(res => {
                let datas = res.data
                console.log(datas)
                datas.forEach(key => this.group_type_list.push({
                    name:key
				})) 
            })
        }
       
        
    },
    mounted(){
           this.getDataSourceList(this.series)
    //     this.getdiff_group();
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

