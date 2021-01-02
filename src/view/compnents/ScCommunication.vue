<template>



    <div class="lay_out">      <!-- enrichGO analysis -->  

        <h1 class="my_h1">Single Cell Communication Pattern</h1> 
        <div>
            <Row>
                <Col span="12">
                    <i-select placeholder="Select cell source" clearable style="width:80%" @on-change='changedSourceGroup'>
						<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
					</i-select>
                </Col>
                <Col span="12">
                    <!-- 数据查询分子名 -->
                    <i-select :model.sync="contrastsGroup" clearable placeholder="Please select signal pattern"  @on-change="changedSigPattern">        
                        <i-option v-for="(group,index) in sigPattern_list" :key='index' :value="group.name">{{ group.name }}</i-option>
                    </i-select>
                </Col>
            </Row>
             
        
		
			<Row :gutter="4"> 
					<!-- <Spin size="large" fix v-if="spinShow2"></Spin>              -->
				<!-- <vue-plotly :autoResize="ifResize" :data="enrichGO_data" :layout="enrichGO_layout" :options="enrichGO_options"/> -->
				<!--<div id="Cell_Chart" style="width: 100%;height:600%; text-aglign:center"></div>-->
				<Col span="8"><highcharts class='river_container'  :options='Cell_Chart_RiverCell'></highcharts></Col>
				<Col span="16">
					<div><highcharts class='river_container' :options='Cell_Chart_RiverPath'></highcharts></div>
					<!--<div id="cellChat_sig" style="width: 100%;height:600%; text-aglign:center">-->
				</Col>
			
			</Row> 
			
		</div>
			
		<div>
			<Row>
				<div class="box_two">
					<div class="left">
						<i-select :model.sync="contrastsGroup" clearable placeholder="Please select signal name"  @on-change="changedSigName">        
							<i-option v-for="(group,index) in sigName_list" :key='index' :value="group.name">{{ group.name }}</i-option>
						</i-select>
						<vue-plotly :watchShallow="ifResize" :autoResize="ifResize"  :data="CellChartHotMap_data" :layout="CellChartHotMap_layout" :options="CellChartHotMap_options"/>
						

					</div>
					<div class="right">
						<!-- <i-col span="12"> -->
						<div id="eSigPathNet" style="width: 100%;height:400%; text-aglign:center;"></div>	
						<!-- </i-col> -->
					</div>
				</div>
			</Row>
			<br>
			<br>
			<Row>
				<div><highcharts class='Rcontri_container' :options='Cell_Chart_Rcontri'></highcharts></div>
				
			</Row>

		</div>

		<br>
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
import {getTsneGroup,getSigName,getEachSig} from '@/api/erythdataservice'
import {getCellChatSigData,getLRPlotData,geteSigPathNetData,getCellChartRcontri}  from '@/api/erythroidAtlas'
import VuePlotly from '@statnett/vue-plotly'
export default {
	name:"ScCommunication",
	components:{
		VuePlotly,  

	},
    data(){
        return{
				sigPattern_list:[
					{

						'name':'incoming'
					},

					{
						'name':'outgoing'
					}
				],
				sigName_list:[],
				sigPattern:'',
			    data_source_list:[],
				Cell_Chart_RiverCell:{},
				Cell_Chart_RiverPath:{},
				Cell_Chart_Rcontri:{},
				ifResize:true,
				CellChartHotMap_layout:{},
				CellChartHotMap_data:[],
				CellChartHotMap_options:{
					responsive: true,
				},
				dataset_name:'erthy',
				comm_type:'all',
                // ifResize:true,
				// enrichGO_data:[],
				enrichGO_layout:{},
				enrichGO_options:{
                    responsive: true,
                },
				contrasts_group:[],
				contrastsGroup:'',
				// sourceGroup:'vivo',
				source:'',
                contrGroupOfEnrich:'',
                GOformItem:{},
                spinShow2:'true',
                series:this.$store.state.app.CurrentPageToken,
             
                enrichGroup:'',
                contrasts_group:[],
                enrichGroupList:[
				],
				
				
               

        }
    },
    methods:{
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
				
				// this.getTraCol(this.series,data[0])
				// console.log("===")
				// console.log(_this.colnames[0]) 
				// this.getTraChart(this.series,data[0],'new_cluster_name')
				var pName = 'incoming'
				this.getCellChartView(data[1],pName);
				this.getSigNameList(this.series,datas[1])
           })
		},

		getSigNameList(series,source){

			getSigName(this.series,this.source).then(res =>{

				let _this = this
                let datas = res.data  
				console.log(datas)
				var data =   datas 
				       
				datas.forEach(key => this.sigName_list.push({
                    name:key
				})) 

				this.getCellChartHotMap(this.series,this.source,datas[0])
				this.geteSigPathNet_chart(this.series,this.source,datas[0]);
				this.getCellChartRcontri(this.series,this.source,datas[0]);
           })


		},
		geteSigPathNet_chart(series,source,sigName){
			let myChart = this.$echarts.init(document.getElementById("eSigPathNet"));
            myChart.showLoading();
			this.spinShow2 = true
			// var dev_type = 'BM(vitro)'
			// var sig_name = 'TGFb'
			geteSigPathNetData(series,source,sigName).then(res =>{ 
					myChart.hideLoading();
					let datas = res.data 
					console.log(datas)
					var nodes = datas.nodes  // list 里面装list
					var links =datas.links   
					var categories = datas.categories
					// var nData = datas.nData
					// var tData = datas.tData
					// this.nodes_list = []
					// var graph = echarts.dataTool.gexf.parse(xml);
					var categories_chart = [];
					var nodes_chart = []
					for (var i = 0; i < categories.length; i++) {
						categories_chart[i] = {
							name: categories[i]
						};
						var subnodes = []
						for(var j = 0;j < nodes.length;j ++){
							if (categories[i] === nodes[j].category && 0 === nodes[j].c_f){
								subnodes.push(nodes[j])
							}
						}
						for(var j = 0;j < nodes.length;j ++){
							if (categories[i] === nodes[j].category && 1 === nodes[j].c_f){
								subnodes.push(nodes[j])
							}
						}
						console.log(subnodes)
						nodes_chart = nodes_chart.concat(subnodes)
					}
					console.log(nodes_chart)

					nodes_chart.forEach(function (node) {
						node.id = node.id;
						node.value = node.symbolSize;
						node.symbolSize = node.symbolSize;
						node.label = {
							normal: {
								show: node.name
							}
						};
						node.category = node.category
					});
					var option = {
						title: {
							text: sigName + ' signaling pathway network',
							subtext: this.series +" "+ source,
							top: 'top',
							//left: 'left'
						},
						tooltip: {},
						legend: [{
							data: categories_chart.map(function (a) {
								return a.name;
							}),
							top: 'bottom',
						}],
						animationDurationUpdate: 1500,
						animationEasingUpdate: 'quinticInOut',
						series: [
							{
								name: 'Les Miserables',
								type: 'graph',
								layout: 'circular',
								circular: {
									rotateLabel: true
								},
								data: nodes_chart,
								links: links,
								categories: categories_chart,
								roam: true,
								label: {
									position: 'right',
									formatter: '{b}'
								},
								edgeSymbol:['no', 'arrow'],
								edgeSymbolSize: [0.4, 10],
								// lineStyle: {
								// 	color: 'source',
								// 	curveness: 0.3,
								// 	width:1
								// }
							}
						]
					};

					myChart.setOption(option);
					})
		
		
		
		},
		
		getCellChartHotMap(series,source,sigName){
			
			getEachSig(series,source,sigName).then(res=>{

				let datas = res.data 
				console.log(datas)

				// var data = [{
				// 	z:[
				// 		[3.08E-10,7.09E-08,4.60E-09,1.77E-09,5.25E-09,2.06E-08],
				// 		[1.03E-09,7.62E-08,5.68E-09,2.89E-09,4.17E-09,1.35E-08],
				// 		[0.004384834,1,0.064925258,0.025005543,0.074077788,0.291360538],
				// 		[0.013612703,1,0.074587455,0.037984126,0.054744687,0.177036742],
				// 	],
				// 	x: ['Erythrocyte','Monocyte','HSPC','B','NK','T'],
				// 	y: ['sender','receiver','mediator','influencer'],
				// 	type: 'heatmap',
				// 	hoverongaps: false
				// }];
				var data = [{
					z:datas.zData,
					x: datas.xData,
					y: ['sender','receiver','mediator','influencer'],
					type: 'heatmap',
					hoverongaps: false
				}];
				
				var layout = {
					title: sigName +' signaling pathway network',
				}
				this.CellChartHotMap_data = data
				this.CellChartHotMap_layout = layout

			})
		},
        getCellChartView(dev_type,pName){
			
			// var dev_type = 'BM(vitro)'
			// var sig_pattern = 'outgoing'
			var sig_pattern = this.series + "_" + pName 
			getCellChatSigData(dev_type,sig_pattern).then(res=>{
			 	console.log(res.data)
		
			 	var data = res.data
			 	var option_1 = {
			 				title: {
			 					text: 'communication('+pName +') patterns', 
			 				},
			 				series: [{
			 					keys: ['from', 'to', 'weight'],
			 					data: data.netSigCell,
			 					type: 'sankey',
			 					name: 'Sankey demo series'
			 				}],
				}
			    this.Cell_Chart_RiverCell = option_1
				var option_2 = {
			 				title: {
			 					text: 'communication('+pName +') signal of cells'
			 				},
			 				series: [{
			 					keys: ['from', 'to', 'weight'],
			 					data: data.netSigPath,
			 					type: 'sankey',
			 					name: 'Sankey demo series'
			 				}],
				}
				this.Cell_Chart_RiverPath = option_2

			})
		
		
		},

		getCellChartRcontri(series,dev_type,sigName){

			getCellChartRcontri(series,dev_type,sigName).then(res=>{
			 	console.log(res.data)
		
			 	var data = res.data
				var option = {

					chart: {
						type: 'bar'
					},
					title: {
						text: 'Contribution of each L-R pair ' 
					},
					subtitle: {
						
					},
					xAxis: {
						// categories: ['非洲', '美洲', '亚洲', '欧洲', '大洋洲'],
						categories:data.cate,
						title: {
							text: null
						}
					},
					yAxis: {
						min: 0,
						title: {
							text: 'Relative contribution',
							align: 'high'
						},
						labels: {
							overflow: 'justify'
						}
					},
					tooltip: {
						valueSuffix: ' 百万'
					},
					plotOptions: {
						bar: {
							dataLabels: {
								enabled: true,
								allowOverlap: true // 允许数据标签重叠
							}
						}
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'top',
						x: -40,
						y: 1,
						floating: true,
						borderWidth: 1,
						// backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
						shadow: true
					},
					series: [
						{
							name:  sigName + ' pathway network',
							// data: [107, 31, 635, 203, 2]
							data:data.seriData
						}
					]

				}

				this.Cell_Chart_Rcontri = option
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
		
		getdiff_group(table_name){
            let contrasts_group_type_list = []
            let enrich_group_list = []
			let _this = this
			// alert(table_name)
            getdiffGroup(table_name).then(res =>{
                let datas = res.data 
                console.log(datas)  
                datas.forEach(key => contrasts_group_type_list.push({
                    name:key
                }))
				this.contrasts_group = contrasts_group_type_list
				this.contrastsGroup = datas[0]
				// alert(this.contrastsGroup)
				this.getLRPlot_chart(this.table_name,this.contrastsGroup)
				
                // enrichGroup = datas[0].split('-')[0]
                // goType = 'CC'
               
            })
		},
	
		changedSigPattern(pName){

			this.sigPattern = pName
			// var dataset_name = 
			
			this.getCellChartView(this.source,pName);
			

		},
		changedSigName(sigName){
			this.siName = sigName
			
			this.getCellChartHotMap(this.series,this.source,sigName)
			// this.getCellChartView(this.source,pName);
			this.geteSigPathNet_chart(this.series,this.source,sigName);
			this.getCellChartRcontri(this.series,this.source,sigName);
			
		},

		changedSourceGroup(sourceGroup){
			// alert(sourceGroup)
			// this.table_name = 'all_rna_dev_bulk_' + sourceGroup
			this.source = sourceGroup
			this.getSigNameList(this.series,this.source)
			// alert(this.table_name)
			// this.getdiff_group(this.table_name)
			var pName = 'incoming'
			this.getCellChartView(sourceGroup,pName);
		},



    },
    mounted(){
		this.getDataSourceList(this.series)

		var myChartContainer2 = document.getElementById('eSigPathNet')
		// 获取自适应的高度和宽度
		var resizeMyChartContainer = function() {
			// console.log("----")
		
			myChartContainer2.style.height = window.innerHeight * 0.85 + 'px';
			myChartContainer2.style.width = window.innerWidth * 0.45+ 'px';
		};

		// 设置容器高和宽
		resizeMyChartContainer();

		
		var myChart2 = this.$echarts.init(myChartContainer2);

	
        let option2 = {};
     
		myChart2.setOption(option2);
		
		window.onresize = ()=>{
	　　　　//调用methods中的事件
			resizeMyChartContainer();
			console.log('==')
			myChart2.resize()
			// _this.pageResize();
		}



	}
   

    
}
</script>

<style>
    .lay_out{
        margin: 2% 2%  2% 2%;
    }

    .my_h1{
        font-size: calc((40/1920) * 100vw);
        text-align: center;
    }
	.box_two{
		margin:auto; 
		/* width:calc((500/1920) * 100vw);;*/
		/* height:calc((700/1920) * 100vw); */
		/* background:#900; */
		text-align:center;

	}
	.left
	{
		float:left;
		text-align: center;
		width:48%;
		height: 100%;
		margin:20px auto;
	}
	.right{
		background:white;
		text-align: center;
		float: right;
		height: 100%;
		width:48%;
		margin:20px auto;
	}
	.river_container{
	
		height: 800px;
		margin: 0 auto;
		border: 1px solid silver;
	}
	.Rcontri_container{
		height: 400px;
		margin: 0 auto;
		border: 1px solid silver;
	}

</style>

