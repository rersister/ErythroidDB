<template>
<div>

		<Row>					
			<!-- tsne 图 -->
			<i-col span="12">

				<h1 class='h3_title'>Cluster's Markers Plot</h1>
				<i-form>
					<i-col span="10">
						<Form-item label="Data source: ">                                                  
							<i-select :model.sync="showByGroup" clearable placeholder="Pleace select cell group"  @on-change="changedShowGroup">        
								<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
							</i-select>
						</Form-item>
					</i-col>
				</i-form>
				<Spin size="large" fix v-if="spinShow1"></Spin>
				<!-- <vue-plotly :data="TSNE_data" :layout="TSNE_layout" :options="TSNE_options"/> -->
				<highcharts class='makers_container' :options='makres_Chart'></highcharts>

			</i-col>
			<i-col span="12">
				<!-- <div> -->
					<h1 class='h3_title'>Cluster's Enrichment Analysis</h1>      
					<i-form>
						<!-- <i-col span="10"> -->
							<!-- <Form-item label="Data source: ">                                                  
								<i-select :model.sync="showByGroup" clearable placeholder="Pleace select cell source"  @on-change="changedDataSource">        
									<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
								</i-select>
							</Form-item> -->
						<!-- </i-col>-->
						<!-- <i-col span="10">  -->
							<Form-item label="Enrich group: ">                                                  
								<i-select :model.sync="showByGroup" clearable placeholder="Pleace select cluster group"  @on-change="changedEnrichChart">        
									<i-option v-for="(group,index) in group_type_list" :key='index' :value="group.name">{{ group.name }}</i-option>
								</i-select>
							</Form-item>
						<!-- </i-col> -->
					</i-form>
				<!-- </div> -->
				<div id="enrichGO_echart" style="width: 100%;height:600%; text-aglign:center"></div> 
            	<div v-if="enrichShow">
                	<Spin size="large" fix v-if="spinShow2"></Spin>             
            	</div>
			
				
			</i-col>
		</Row>     

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
import VuePlotly from '@statnett/vue-plotly'
import {getFeaturePlot,getTsneGroup,getClusterMarker,getClusterEncihGroup,getClusterEnrichData} from '@/api/erythdataservice'
export default {
	name:"ClusterMarker",
	components:{
		VuePlotly,  

	},
	data(){
		return{
			spinShow2:'true',
			enrichShow:false,
			// feature_name:'',
			spinShow1:'true',
			TSNE_data: [], 
			TSNE_layout: {}, 
			makres_Chart:{},             
			contrasts_group:[],
			TSNE_options: { responsive: true },
			showByGroup:'',
			series:this.$store.state.app.CurrentPageToken,
			data_source_list:[],
			source:'',
			source2:'',
			group_type_list:[],
			feature_list : [ {
					
					name:"C1QC"
				},
				{
					
					name:"HIST1H4C"
				}],


		}
	},
	methods:{
		changedEnrichChart(group){
            console.log(group)
            
			if (typeof group === 'undefined' ){
				
				this.group = group

			}else{
			
				this.group = group
				this.getEnrichChart(this.series,this.source,group)

			}

		},
		getEnrichChart(){
            this.enrichShow = true
            // alert("go to sql")     
            if( "" == this.source2 ){
                        this.$Message.info('please select data source', 10);
            } 
            if( "" == this.group ){
                        this.$Message.info('please select enrich group', 10);
            } 
            
			this.spinShow2 = true
            getClusterEnrichData(this.series,this.source,this.group).then(res =>{ 
                // alert(res.datas)
                let datas = res.data 
               
                console.log(datas.log_p_adjust)
                // alert(datas.Description.length)
                if(datas.Description.length == 0 ){
                      let mess = 'there no the GO enrichment of ' + this.enrichGroup  
                      this.$Message.info(mess, 10);
                }
                
                var option = {
                    title: {
                        text: "the GO(" +this.source2 +")  enrichment of " + this.group
                       
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
						// nameLocation:bottom,
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
				this.spinShow2 = false
           
            
           })
        },
		changedDataSource(source){
			let _this = this  
			this.source2 = source
            this.getEnrichGroup(this.series,source)
            
		},
		getEnrichGroup(series,source){
            getClusterEncihGroup(series,source).then(res => {
                let datas = res.data
				console.log(datas)
				this.group = datas[0]
                datas.forEach(key => this.group_type_list.push({
                    name:key
				})) 
				this.getEnrichChart()
            })
        },
		
		changedShowGroup(source){
			let _this = this  
			this.source = source
            // this.getFeaturePlot(this.series,source)
			
			this.source2 = source
            this.getEnrichGroup(this.series,source)
			
		},


		// series,source
		getMarkerChart(){

			let _this = this
			_this.spinShow1 = true
			console.log(this.series)
		
            getClusterMarker(this.series,this.source).then(res =>{
                let datas = res.data  
				console.log(datas.series)
				// var data =   datas           
              
				var option = {
					chart: {
						type: 'packedbubble',
						height: '100%'
					},
					title: {
						text: "Each Cluster's Markers"
					},
					tooltip: {
						useHTML: true,
						pointFormat: '<b>{point.name}:</b> {point.y}m CO<sub>2</sub>'
					},
					plotOptions: {
						packedbubble: {
							minSize: '30%',
							maxSize: '120%',
							zMin: 0,
							zMax: 1000,
							layoutAlgorithm: {
								gravitationalConstant: 0.05,
								splitSeries: true,
								seriesInteraction: false,
								dragBetweenSeries: true,
								parentNodeLimit: true
							},
							dataLabels: {
								enabled: true,
								format: '{point.name}',
								filter: {
									property: 'y',
									operator: '>',
									value: 0.2
								},
								style: {
									color: 'black',
									textOutline: 'none',
									fontWeight: 'normal'
								}
							}
						}
					},
					series:datas.series,

				}

                this.makres_Chart = option
                _this.spinShow1 = false
            })   
		},
		changedFeatureName(featurename){
            let _this = this  
            this.getFeaturePlot(this.series,featurename)
            
		},
		getFeatureByName(feature_name){
			let _this = this
			this.getFeaturePlot(this.series,this.source,feature_name)

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
				this.getMarkerChart(this.series,datas[1])
             
           })
		}

	},
	mounted(){
		this.getDataSourceList(this.series)
		// this.getFeaturePlot(this.series,this.feature_list[1]['name'])
		// this.getMarkerChart(this.series,this.source)
		 var myChartContainer = document.getElementById('enrichGO_echart')

		// 获取自适应的高度和宽度
		var resizeMyChartContainer = function() {
			// console.log("----")
			myChartContainer.style.height = window.innerHeight * 0.85 + 'px';
			myChartContainer.style.width = window.innerWidth * 0.45+ 'px';
			
		};
		// 设置容器高和宽
		resizeMyChartContainer();

		var myChart = this.$echarts.init(myChartContainer);

		let option = {};
		
		myChart.setOption(option);
		
		window.onresize = ()=>{
	　　　　//调用methods中的事件
			resizeMyChartContainer();
			console.log('==')
			myChart.resize()
			// _this.pageResize();
		}


	}


    
}
</script>

<style>
	.makers_container{
		text-align: center;
		/* min-width: 320px; */
			/* height:calc((700/1920) * 100vw); */
		width: calc((1750/1920) * 100vw);
		min-width: calc((320/1920) * 100vw);
		max-width: calc((800/1920) * 100vw);
		border: 1px solid silver;
	}



</style>

