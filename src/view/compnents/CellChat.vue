<template>



    <div class="lay_out">      <!-- enrichGO analysis -->  

        <h1 class="my_h1">Single Cell Interaction Atlas</h1> 
        <div>
            <Row>
                <Col span="12">
                    <i-select placeholder="Pleace select cell source" clearable style="width:80%" @on-change='changedSourceGroup'  filterable>
                        <i-option v-for="(source,index) in source_group" :key='index' :value="source.name">{{ source.name }}</i-option>
                    </i-select>
                </Col>
                <Col span="12">
                    <!-- 数据查询分子名 -->
                    <i-select :model.sync="contrastsGroup" clearable placeholder="Please select signal pattern"  @on-change="changedContrGroup"  filterable>        
                        <i-option v-for="(group,index) in contrasts_group" :key='index' :value="group.name">{{ group.name }}</i-option>
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
						
						<vue-plotly :watchShallow="ifResize" :autoResize="ifResize"  :data="CellChartHotMap_data" :layout="CellChartHotMap_layout" :options="CellChartHotMap_options"/>
						
					</div>
					<div class="right">
						
						<div id="eSigPathNet" style="width: 100%;height:600%; text-aglign:center"></div>
					</div>
				</div>
			</Row>
		</div>
		
		<!-- <h1 class="my_h1">Single Cell Interraction Biomolecular</h1>  -->
		<!-- <div>
            <Row>
                <Col span="12">
                    <i-select placeholder="Pleace select cell source" clearable style="width:80%" @on-change='changedSourceGroup'>
                        <i-option v-for="(source,index) in source_group" :key='index' :value="source.name">{{ source.name }}</i-option>
                    </i-select>
                </Col>
                <Col span="12">
                    <!-- 数据查询分子名 
                    <i-select :model.sync="contrastsGroup" clearable placeholder="Pleace select contrasts group"  @on-change="changedContrGroup">        
                        <i-option v-for="(group,index) in contrasts_group" :key='index' :value="group.name">{{ group.name }}</i-option>
                    </i-select>
                </Col>
            </Row>
             
        
		
			<Row> 
					<!-- <Spin size="large" fix v-if="spinShow2"></Spin>              
				<!-- <vue-plotly :autoResize="ifResize" :data="enrichGO_data" :layout="enrichGO_layout" :options="enrichGO_options"/>
				<div id="LRPlot_view" style="width: 100%;height:600%; text-aglign:center"></div>

			</Row> 
		</div> -->

    </div>  
    
</template>


<script>
import {getdiffGroup} from '@/api/erythdataservice'
import {getCellChatSigData,geteSigPathNetData}  from '@/api/erythroidAtlas'
import VuePlotly from '@statnett/vue-plotly'
export default {
	name:"CellChat",
	components:{
		VuePlotly,  

	},
    data(){
        return{
				Cell_Chart_RiverCell:{},
				Cell_Chart_RiverPath:{},
				ifResize:true,
				CellChartHotMap_layout:{},
				CellChartHotMap_data:[],
				CellChartHotMap_options:{
					responsive: true,
					displaylogo: false,
					toImageButtonOptions: {
						format: 'svg', // one of png, svg, jpeg, webp
						filename: 'sc_cellchat',
						height: 500,
						width: 700,
						scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
					}
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
				sourceGroup:'vivo',
                contrGroupOfEnrich:'',
                GOformItem:{},
                spinShow2:'true',
                series:this.$store.state.app.CurrentPageToken,
             
                enrichGroup:'',
                contrasts_group:[],
                enrichGroupList:[
				],
				table_name:'all_rna_dev_bulk_vivo',
				source_group:[
					{
						name:'vivo'
					},
					{
						name:'vitro'
					},
					{
						name:'vivo-vitro'
					}

				],
                // goTypeList:[
                //     {
                //         name:'CC'
                //     },
                //     {
                //         name:"MF"
                //     },
                //     {
                //         name:"BP"
                //     },
            	// ],

        }
    },
    methods:{

		  geteSigPathNet_chart(){
			let myChart = this.$echarts.init(document.getElementById("eSigPathNet"));
            myChart.showLoading();
			// this.spinShow2 = true
			var dev_type = 'BM(vitro)'
			var sig_name = 'TGFb'
			geteSigPathNetData(dev_type,sig_name).then(res =>{ 
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
							text: 'Les Miserables',
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
		
		getCellChartHotMap(){
			
			var data = [
			{
				z:[
					[3.08E-10,7.09E-08,4.60E-09,1.77E-09,5.25E-09,2.06E-08],
					[1.03E-09,7.62E-08,5.68E-09,2.89E-09,4.17E-09,1.35E-08],
					[0.004384834,1,0.064925258,0.025005543,0.074077788,0.291360538],
					[0.013612703,1,0.074587455,0.037984126,0.054744687,0.177036742],
				],
				x: ['Erythrocyte','Monocyte','HSPC','B','NK','T'],
				y: ['sender','receiver','mediator','influencer'],
				type: 'heatmap',
				hoverongaps: false
			}];
			
			var layout = {
				title: 'TGFb signaling pathway network',
			}
			this.CellChartHotMap_data = data
			this.CellChartHotMap_layout = layout

		},
        getCellChartView(){
			
			var dev_type = 'BM(vitro)'
			var sig_pattern = 'outgoing'
			
			
			
			getCellChatSigData(dev_type,sig_pattern).then(res=>{
			 	console.log(res.data)
		
			 	var data = res.data
			 	var option_1 = {
			 				title: {
			 					text: 'Highcharts 桑基图'
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
			 					text: 'Highcharts 桑基图'
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
		changedContrGroup(diffgroup){
			let _this = this  
			// alert(this.table_name)
			this.contrastsGroup = diffgroup
			this.getLRPlot_chart(this.table_name,this.contrastsGroup)

		},
		changedSourceGroup(sourceGroup){
			// alert(sourceGroup)
			this.table_name = 'all_rna_dev_bulk_' + sourceGroup
			this.sourceGroup = sourceGroup
			// alert(this.table_name)
			this.getdiff_group(this.table_name)
		},


    },
    mounted(){

		// this.getdiff_group(this.table_name);
		// this.getLRPlot_chart(this.dataset_name,this.comm_type);
		this.getCellChartView(this.dataset_name,this.comm_type);
		this.getCellChartHotMap()
		this.geteSigPathNet_chart();
	}
   

    
}
</script>

<style>
    .lay_out{
        margin: 2% 2%  2% 2%;
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

</style>

