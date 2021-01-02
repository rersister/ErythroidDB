<template>

    <div class="lay_out">
            <Row>
				<!--<i-col span="12"> -->
					<h1 class="my_h1">Single Cell Interraction Atlas</h1> 
					<Col span="10">
						<i-select placeholder="Select cell source" clearable style="width:80%" @on-change='changedSourceGroup'>
							<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
						</i-select>
					</Col>
					<Col span="10">
						<!-- 数据查询分子名 -->
						<i-select placeholder="Select comm type"  clearable @on-change="changedCommType">        
							<i-option v-for="(group,index) in comm_type_list" :key='index' :value="group.name">{{ group.name }}</i-option>
						</i-select>
					</Col>
					</br>
					<!-- <Spin size="large" fix v-if="spinShow2"></Spin>              -->
					<!-- <vue-plotly :autoResize="ifResize" :data="enrichGO_data" :layout="enrichGO_layout" :options="enrichGO_options"/> -->
					<div>
						<div id="Net_view" style="width: 100%;height:400%; text-aglign:center"></div>
					</div>
				<!-- </i-col> -->
				<!-- <i-col span="12">
					
						<h1 class="my_h1">Single Cell Interraction Biomolecular</h1> 
						<Col span="10">
							
							<i-select placeholder="Select cell source" clearable style="width:80%" @on-change='changedSourceGroup2'>
								<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
							</i-select>
						</Col>
						<Col span="10">
							<!-- 数据查询分子名
							<i-select  clearable placeholder=" Select comm group"  @on-change="changedCommType2">        
								<i-option v-for="(group,index) in comm_type_list" :key='index' :value="group.name">{{ group.name }}</i-option>
							</i-select>

						</Col>
					
					<!-- <vue-plotly :autoResize="ifResize" :data="enrichGO_data" :layout="enrichGO_layout" :options="enrichGO_options"/> 
					<div >
						<div id="LRPlot_view" style="width: 100%;height:400%; text-aglign:center;"></div>
					</div>

				</i-col>-->
            </Row>
             
        
		
			
		
		</br>
		</br>
		<Row>
			<router-link to="/Dataset_service">
				<div style="text-align:right;font-size:calc((30/1920) * 100vw);">
					<!-- <img width="20%" height="10%" src="@/assets/img/red_sys.jpg"> -->
					<h3>Back To Dataset Service</h3>
					<!-- <p>Sample: 
						<count-to :end="68" count-class="count-style"/>                                                              
					</p> -->
				</div> 
			</router-link>
		</Row>
	</div>  
  
</template>


<script>
import {getdiffGroup,getTsneGroup} from '@/api/erythdataservice'
import {getLRPlotData,getNetViewData,getCellSourceData}  from '@/api/erythroidAtlas'
// import {getTsneGroup} from '@/api/erythdataservice'

import VuePlotly from '@statnett/vue-plotly'
export default {
	name:"ScInterraction",
	components:{
		VuePlotly,  

	},
    data(){
        return{
				dataset_name:this.$store.state.app.CurrentPageToken, 
				comm_type:'',
				comm_type2:'',
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
				source2:'',
                contrGroupOfEnrich:'',
                GOformItem:{},
                spinShow2:'true',
                series:this.$store.state.app.CurrentPageToken,
             
                enrichGroup:'',
                contrasts_group:[],
                enrichGroupList:[
				],
				table_name:'all_rna_dev_bulk_vivo',
				data_source_list:[],
				data_source_list2:[],
				comm_type_list:[
					{
						'name':'all'
					},
					{
						'name':'growth factor'
					},
					{
						'name':'other',
					},
					{
						'name':'cytokine',
					},
					{
						'name':'checkpoint',
					}

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
				this.source =  data[1]    
				datas.forEach(key => this.data_source_list.push({
                    name:key
				})) 
				datas.forEach(key => this.data_source_list2.push({
                    name:key
				})) 
				var dataset_name = this.series +"_"+ data[1]
				this.getNetView(dataset_name,'all')

           })
		},
		getCellSource(){
			getCellSourceData().then(res =>{
				var dev_types = res.data.dev_types
				for (var i = 0; i < dev_types.length; i++) {
					// var dev_type = {
					// 	name : ,
					// 	value:dev_types[i]

					// }
				}

			})

		},
        getNetView(dataset_name,comm_type){
			let myChart = this.$echarts.init(document.getElementById("Net_view"));
            myChart.showLoading();
			// this.spinShow2 = true
			// var dataset_name = 'erthy'
			// var comm_type = 'all'
			getNetViewData(dataset_name,comm_type).then(res =>{ 
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
						node.symbolSize /= 1.5;
						node.label = {
							normal: {
								show: node.name
							}
						};
						node.category = node.category
					});
					var option = {
						title: {
							text: 'Top 40 factor of '+ comm_type +'('+this.source+ ')',
							subtext: 'Circular layout',
							top: 'bottom',
							left: 'left'
						},
						tooltip: {},
						legend: [{
							data: categories_chart.map(function (a) {
								return a.name;
							})
						}],
						animationDurationUpdate: 1500,
						animationEasingUpdate: 'quinticInOut',
						series: [
							{
								name: 'Top 40 '+ comm_type +' factor',
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
								edgeSymbol: ['no', 'arrow'],
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
        getLRPlot_chart(dataset_name,comm_type){

			let myChart = this.$echarts.init(document.getElementById("LRPlot_view"));
            myChart.showLoading();
			// this.spinShow2 = true
			// var dataset_name = 'erthy'
			// var comm_type = 'all'
			getLRPlotData(dataset_name,comm_type).then(res =>{ 
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
						node.symbolSize /= 1.5;
						node.label = {
							normal: {
								show: node.name
							}
						};
						node.category = node.category
					});
					var option = {
						title: {
							text: 'Top 40 '+ comm_type +' factor',
							subtext: 'Circular layout',
							top: 'bottom',
							left: 'right'
						},
						tooltip: {},
						legend: [{
							data: categories_chart.map(function (a) {
								return a.name;
							})
						}],
						animationDurationUpdate: 1500,
						animationEasingUpdate: 'quinticInOut',
						series: [
							{
								name: 'Top 40 factor of '+ comm_type ,
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
								edgeSymbol: ['no', 'arrow'],
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
		
		
		changedCommType(comm_type){
			let _this = this  
			// alert(this.table_name)
			this.comm_type = comm_type
			var dataset_name = this.series +"_"+ this.source
			this.getNetView(dataset_name,comm_type)

		},
		changedCommType2(comm_type){
			let _this = this  
			// alert(this.table_name)
			this.comm_type2 = comm_type
			var dataset_name = this.series +"_"+ this.source2
			this.getLRPlot_chart(dataset_name,comm_type)

		},
		changedSourceGroup(source){
			// alert(sourceGroup)
			// this.table_name = 'all_rna_dev_bulk_' + sourceGroup
			this.source = source
			// alert(this.table_name)
			// this.getdiff_group(this.table_name)
		},
		changedSourceGroup2(source){
			this.source2 = source
		}

    },
    mounted(){
		this.getDataSourceList(this.series)
		// this.getdiff_group(this.table_name);

		// this.getLRPlot_chart(this.dataset_name,this.comm_type);

		// this.getNetView(this.dataset_name,this.comm_type);
		
		//this.getCellSource()


		var myChartContainer = document.getElementById('Net_view')
		//var myChartContainer2 = document.getElementById('LRPlot_view')
		// 获取自适应的高度和宽度
		var resizeMyChartContainer = function() {
			// console.log("----")
			myChartContainer.style.height = window.innerHeight * 0.85 + 'px';
			myChartContainer.style.width = window.innerWidth * 0.75+ 'px';
			//myChartContainer2.style.height = window.innerHeight * 0.85 + 'px';
			//myChartContainer2.style.width = window.innerWidth * 0.45+ 'px';
		};

		// 设置容器高和宽
		resizeMyChartContainer();

		var myChart = this.$echarts.init(myChartContainer);
		//var myChart2 = this.$echarts.init(myChartContainer2);

		let option = {};
        //let option2 = {};
        myChart.setOption(option);
		//myChart2.setOption(option2);
		
		window.onresize = ()=>{
	　　　　//调用methods中的事件
			resizeMyChartContainer();
			console.log('==')
			myChart.resize()
			//myChart2.resize()
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
	



</style>

