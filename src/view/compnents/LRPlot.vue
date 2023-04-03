<template>



    <div class="lay_out">      <!-- enrichGO analysis -->  

        <h1 class="my_h1">Single Cell Interaction Atlas </h1> 
        <div>
            <Row>
                <Col span="12">
                    <i-select placeholder="Pleace select cell source" clearable style="width:80%" @on-change='changedSourceGroup'  filterable>
                        <i-option v-for="(source,index) in source_group" :key='index' :value="source.name">{{ source.name }}</i-option>
                    </i-select>
                </Col>
                <Col span="12">
                    <!-- 数据查询分子名 -->
                    <i-select :model.sync="contrastsGroup" clearable placeholder="Pleace select contrasts group"  @on-change="changedContrGroup">        
                        <i-option v-for="(group,index) in contrasts_group" :key='index' :value="group.name">{{ group.name }}</i-option>
                    </i-select>
                </Col>
            </Row>
             
        
		
			<Row> 
					<!-- <Spin size="large" fix v-if="spinShow2"></Spin>              -->
				<!-- <vue-plotly :autoResize="ifResize" :data="enrichGO_data" :layout="enrichGO_layout" :options="enrichGO_options"/> -->
				<div id="Net_view" style="width: 100%;height:600%; text-aglign:center"></div>

			</Row> 
		</div>
		<h1 class="my_h1">Single Cell Interaction Biomolecular</h1> 
		<div>
            <Row>
                <Col span="12">
                    <i-select placeholder="Pleace select cell source" clearable style="width:80%" @on-change='changedSourceGroup'  filterable>
                        <i-option v-for="(source,index) in source_group" :key='index' :value="source.value">{{ source.name }}</i-option>
                    </i-select>
                </Col>
                <Col span="12">
                    <!-- 数据查询分子名 -->
                    <i-select :model.sync="contrastsGroup" clearable placeholder="Pleace select contrasts group"  @on-change="changedContrGroup"  filterable>        
                        <i-option v-for="(group,index) in contrasts_group" :key='index' :value="group.name">{{ group.name }}</i-option>
                    </i-select>
                </Col>
            </Row>
             
        
		
			<Row> 
					<!-- <Spin size="large" fix v-if="spinShow2"></Spin>              -->
				<!-- <vue-plotly :autoResize="ifResize" :data="enrichGO_data" :layout="enrichGO_layout" :options="enrichGO_options"/> -->
				<div id="LRPlot_view" style="width: 30%;height:200%; text-aglign:center"></div>

			</Row> 
		</div>

    </div>  
    
</template>


<script>
import {getdiffGroup} from '@/api/erythdataservice'
import {getNetViewData,getCellSourceData}  from '@/api/erythroidAtlas'
import VuePlotly from '@statnett/vue-plotly'
export default {
	name:"LRPlot",
	components:{
		VuePlotly,  

	},
    data(){
        return{
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
					// {
					// 	name:'BM(vivo)',
					// 	value:'bm_vivo'
					// },
					// {
					// 	name:'vitro',
					// 	value:'cb_vitro'
					// },
					// {
					// 	name:'vivo-vitro'
					// }

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
        getNetView(){
			let myChart = this.$echarts.init(document.getElementById("Net_view"));
            myChart.showLoading();
			// this.spinShow2 = true
			var dataset_name = 'erthy'
			var comm_type = 'all'
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
							text: 'Les Miserables',
							subtext: 'Circular layout',
							top: 'top',
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
        getLRPlot_chart(dataset_name,source,comm_type){

			let myChart = this.$echarts.init(document.getElementById("LRPlot_view"));
            myChart.showLoading();
			// this.spinShow2 = true
			var dataset_name = 'erthy'
			var comm_type = 'all'
			getNetViewData(dataset_name,source,comm_type).then(res =>{ 
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
				this.getLRPlot_chart(this.table_name,this.source,this.contrastsGroup)
				
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
		this.getLRPlot_chart(this.dataset_name,this.comm_type);
		this.getNetView(this.dataset_name,this.comm_type);
		this.getCellSource()
	}
   

    
}
</script>

<style>
    .lay_out{
        margin: 2% 2%  2% 2%;
    }






</style>

