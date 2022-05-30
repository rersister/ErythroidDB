<template>
<div>
	
	<div>
		<h1>Cluster's Markers HeatMap</h1>
		<br>
		<Row :gutter="16">					
				<i-form :label-width="120">
					<i-col span="8">
						<Form-item label="Group: ">                                                  
							<i-select :model.sync="showByGroup" clearable placeholder="Pleace select cell group"  @on-change="changedShowGroup">        
								<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
							</i-select>
						</Form-item>
					</i-col>
					<i-col span="12">
						<Form-item label="Add feature name: ">
							<Input search enter-button="Add" @on-search="addFeatureByName($event)" placeholder="Please input gene symbol"/>
						</Form-item>
					</i-col>
				
					<i-col span="3">
						<Button type="primary" @click="reFeatureByName($event)" >Remove</Button>
					</i-col>
				</i-form>
		</Row> 
		<Row>
		<div>
			<Spin size="large" fix v-if="spinShow1"></Spin>
			<vue-plotly  :data="ClusterHotMapMarkerdata" :layout="ClusterHotMapMarker_layout" :options="ClusterHotMapMarker_option"/>
		</div>
		</Row>
	</div>
	

	<div>
		<h1>Cluster's Enrichment Analysis</h1> 	
		<br>		
		<Row :gutter="16">		     
			<i-form :label-width="120">
				<i-col span="10"> 
					<Form-item label="Enrich Cluster: ">                                                  
						<i-select :model.sync="showByGroup" clearable placeholder="Pleace select cluster group"  @on-change="changedEnrichChart">        
							<i-option v-for="(group,index) in group_type_list" :key='index' :value="group.name">{{ group.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>

				<i-col span="10">
                                            
                
					<Form-item label="Enrich Type: ">
						<i-select  clearable  placeholder="Pleace select Enrich Type" @on-change="changeEnrichType">                    
							<i-option v-for="(goType,index) in goTypeList" :key='index' :value="goType.value">{{ goType.name }}</i-option>
						</i-select>
					</Form-item>
                </i-col>

			</i-form>
		</Row>
		<Row>
			<!-- <div id="enrichGO_echart" style="width: 100%;height:600%; text-aglign:center"></div>  -->
		<div>
			<Spin size="large" fix v-if="spinShow2"></Spin>             
			<vue-plotly :watchShallow="ifResize" :autoResize="ifResize"  :data="enrich_data" :layout="enrich_layout" :options="enrich_option"/>
		</div>
		</Row>
	</div>





</div>
    
</template>

<script>
import VuePlotly from '@statnett/vue-plotly'
import {getFeatureBygroup,getTsneDataCol,getTsneGroup,getClusterMarker,getClusterEncihGroup,getClusterEnrichData} from '@/api/erythdataservice'
export default {
	name:"ClusterMarker",
	components:{
		VuePlotly,  

	},
	data(){
		return{
			ifResize:true,
			ClusterHotMapMarkerdata:[],
			enrich_data:[],
			enrichType:'CC',
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
			ClusterHotMapMarker_option:{
				responsive: true,
			},
			enrich_option:{
				responsive: true,
			},
			ClusterHotMapMarker_layout:{
				title: 'Identity features for each cluster',
					xaxis: {
						// range: [ 0.75, 5.25 ],
                        title:'Cell cluster',
						tickmode: 'array',
						automargin: true,
						titlefont: { size:15},

                    },
                    yaxis: {
						// range: [0, 8],
                       title:'Feature name',
					   tickmode: 'array',
					   automargin: true,
					   titlefont: { size:15},
					},
			},
			enrich_layout:{},
			spinShow2:'true',
			enrichShow:false,
			// feature_name:'',
			spinShow1:'true',
			TSNE_data: [], 
			TSNE_layout: {}, 
			// makres_Chart:{},             
			contrasts_group:[],
			TSNE_options: { responsive: true },
			showByGroup:'',
			series:this.$store.state.app.CurrentPageToken,
			data_source_list:[],
			source:'',
			source2:'',
			group_type_list:[],
			z_list :[],
			y_list:[],
			x_list:[],
			feature_list : [ {
					
					name:"C1QC"
				},
				{
					
					name:"HIST1H4C"
				}
			],
			
			
		}
	},
	methods:{
		
		addFeatureByName(feature_name){
			var _this = this
			console.log("feature_name")
			console.log(feature_name)
			if (typeof this.source == 'undefined' ){
				
				this.$Message.info('Please select data source firstly', 10);

			}else{


				if (typeof feature_name == 'undefined'  || feature_name == null ){
					this.$Message.info('Please input gene name ', 10);
					
				}else{
					_this.spinShow1 = true
					getFeatureBygroup(this.series,this.source,feature_name).then(res => {
					
					let datas = res.data
					console.log(datas.col_list)

					if (datas.col_list===0){
						// alert(datas.message)
					
						this.$Message.info('no data about this feature', 10);
					
						var z_list = this.z_list 
						
						var  y_list = this.y_list
						var x_list = this.x_list
						var data = [{
							// z: [[1, null, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
							z:z_list,
							x:x_list,
							// y: ['Morning', 'Afternoon', 'Evening'],
							y:y_list,
							type: 'heatmap',
							colorscale: 'YlGnBu',
							textposition:'outside', cliponaxis :FALSE,
							hoverongaps: false
						}];
						var layout = {
								title: 'Identity features for each cluster',
								autosize: false,
								
								xaxis: {
									// range: [ 0.75, 5.25 ],
									title:'Cell cluster',
								
									tickmode: 'array',
									automargin: true,
									titlefont: { size:40},
									
								},
								yaxis: {
									// range: [0, 8],
								title:'Feature name'
								},title: 'Identity features for each cluster',
					xaxis: {
						// range: [ 0.75, 5.25 ],
                        title:'Cell cluster',
						tickmode: 'array',
						automargin: true,
						titlefont: { size:15},

                    },
                    yaxis: {
						// range: [0, 8],
                       title:'Feature name',
					   tickmode: 'array',
					   automargin: true,
					   titlefont: { size:15},
					},
								
							}
							
						_this.ClusterHotMapMarker_layout = layout
						this.ClusterHotMapMarkerdata = data
						_this.spinShow1 = false


					}else{
						this.z_list.push(datas.col_list)
						var z_list = this.z_list 
						this.y_list.push(datas.feature_name)
						var  y_list = this.y_list
						var x_list = this.x_list
						var data = [{
							// z: [[1, null, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
							z:z_list,
							x:x_list,
							// y: ['Morning', 'Afternoon', 'Evening'],
							y:y_list,
							type: 'heatmap',
							colorscale: 'YlGnBu',
							hoverongaps: false
						}];
						var layout = {
								title: 'Identity features for each cluster',
								xaxis: {
									// range: [ 0.75, 5.25 ],
									title:'Cell cluster',
									tickmode: 'array',
									automargin: true,
									titlefont: { size:15},

								},
								yaxis: {
									// range: [0, 8],
								title:'Feature name',
								tickmode: 'array',
								automargin: true,
								titlefont: { size:15},
								},
								
							}
							
						this.ClusterHotMapMarker_layout = layout
						this.ClusterHotMapMarkerdata = data

						_this.spinShow1 = false

					}
				})
					}
			
			}
			
		},

		reFeatureByName(){
			console.log('feature_name')
			var _this = this
			// _this.spinShow1 = true

			this.z_list.pop()
			var z_list = this.z_list 

			this.y_list.pop()
			var  y_list = this.y_list

			var x_list = this.x_list
			console.log(this.y_list)
			console.log(this.z_list)
			var data = [{
					// z: [[1, null, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
					z:z_list,
					x:x_list,
					// y: ['Morning', 'Afternoon', 'Evening'],
					y:y_list,
					type: 'heatmap',
					colorscale: 'YlGnBu',
					hoverongaps: false
				}];

			var layout = {
					title: 'Identity features for each cluster',
					xaxis: {
						// range: [ 0.75, 5.25 ],
                        title:'Cell cluster',
						tickmode: 'array',
						automargin: true,
						titlefont: { size:15},

                    },
                    yaxis: {
						// range: [0, 8],
                       title:'Feature name',
					   tickmode: 'array',
					   automargin: true,
					   titlefont: { size:15},
					},
				}
			
			this.ClusterHotMapMarker_layout = layout
			this.ClusterHotMapMarkerdata = data
			// _this.spinShow1 = false


		},


		changeEnrichType(enrichType){
            let _this = this
            this.enrichType = enrichType
			this.getEnrichChart()
        },
		
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
            getClusterEnrichData(this.series,this.source,this.group,this.enrichType).then(res =>{ 
                // alert(res.datas)
                let datas = res.data 
				console.log("====")
                console.log(datas.log_p_adjust)
				console.log(datas.Description)
 
				var data = [{
				
					x:datas.log_p_adjust,
					// y: ['Morning', 'Afternoon', 'Evening'],
					y:datas.Description,
					type: 'bar',
					orientation: 'h',
					// colorscale: 'YlGnBu',
					// hoverongaps: false
				}];
				
				var layout = {
					title: 'Enrichment'+"("+this.enrichType+") of " + this.group +'('+this.source+')',
					xaxis: {
						title: '-log10(p.adjust)',
						showgrid: false,
						zeroline: false
					},
					yaxis: {
						title: ' Term [-log10(p.adjust)]',
						showline: false,
						tickmode: 'array',
					    automargin: true,
					    titlefont: { size:15},
					},
					
				}
				this.enrich_layout = layout
				this.enrich_data = data
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
				console.log("enrich group")
                let datas = res.data
				console.log(datas)
				this.group_type_list= []
				this.group = datas[0]
                datas.forEach(key => this.group_type_list.push({
                    name:key
				})) 

				this.getEnrichChart()
            })
        },
		
		pcaMeta(series,source){
			let _this = this
			getTsneDataCol(series,source).then(res =>{
				let datas = res.data  
				console.log(datas)
				_this.colnames = datas
				this.group_type_list = []  
				
				datas.forEach(key => this.group_type_list.push({
                    name:key
				}))
				
			})
		},

		changedShowGroup(source){

			if (typeof source === 'undefined' ){
				
				this.source = source

			}else{
				let _this = this  
				this.source = source
				// this.getFeaturePlot(this.series,source)
				this.source2 = source
				this.getMarkerChart(this.series,this.source)
				// this.pcaMeta(this.series,source)
				this.getEnrichGroup(this.series,this.source)

			}
			

		},

		changedMarkerChart(group_col){
			// console.log(group)
			this.getMarkerChart(this.series,this.source)

		},
		// series,source
		getMarkerChart(series,source){

			let _this = this

			_this.spinShow1 = true
			// alert('for markerChart')
			// alert(source)
			
            getClusterMarker(series,source).then(res =>{
                let datas = res.data  
				// console.log("---")
				// alert(datas.series)
				
				var z_list = datas.d_res
				this.z_list = datas.d_res
				this.y_list =  datas.col_list
				this.x_list = datas.group
				var x_list = datas.group
				var y_list = datas.col_list

				// console.log(z_list)

				// console.log(x_list)
				
				// console.log('y_list')
				// // y
				// console.log(y_list)
				var data = [{
					// z 里每个长度和 x （细胞类数）长度一样, 总长度和 y （marker数目）一样长 
					// 图中省略了 部分maker 未标lable
					// z: [[1, null, 30, 50, 1], [20, 1, 60, 80, 30], [30, 60, 1, -10, 20]],
					z:z_list,
					x:x_list,
					// y: ['Morning', 'Afternoon', 'Evening'],
					y:y_list,
					type: 'heatmap',
					colorscale: 'YlGnBu',
					// hoverongaps: false
				}];
				
				var layout = {
					title: 'Identity features for each cluster(' + source+')',
					xaxis: {
						// range: [ 0.75, 5.25 ],
                        title:'Cell cluster',
						tickmode: 'array',
						automargin: true,
						titlefont: { size:15},

                    },
                    yaxis: {
						// range: [0, 8],
                       title:'Feature name',
					   tickmode: 'array',
					   automargin: true,
					   titlefont: { size:15},
					},
					
				}

				this.ClusterHotMapMarker_layout = layout
				this.ClusterHotMapMarkerdata = data

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
				this.source = data[0].source_g
				this.source2 = data[0].source_g     
				datas.forEach(function (group) {
					
						console.log(group.source_g)

						_this.data_source_list.push({
							name:group.source_g
						})
			
				}) 

				// alert(data[0].source_g)
				this.getMarkerChart(this.series,data[0].source_g)
				this.getEnrichGroup(this.series,data[0].source_g)

             
           })
		}

	},
	mounted(){
		this.getDataSourceList(this.series)


	}


    
}
</script>


<style scoped>

.ivu-input-search {
  background: #870909!important;
  color: #fff!important;
  border-color:#870909!important;

}

</style>