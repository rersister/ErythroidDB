<template>
<div>
	<br>
	<h1 class="my_h1">Visualization</h1>
	<br>
	<div>
		<Row :gutter="2">
        	<i-form :label-width="120">
				<i-col span="6">
					<Form-item label="Plot size: ">                                                  
						<i-select  v-model="plotSize" :model.sync="showByGroup" clearable placeholder="Select"  @on-change="changedPlotSize"  filterable>        
							<i-option v-for="(value,index) in plotSize_list" :key='index' :value="value.name">{{ value.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
				<i-col span="6">
					<Form-item label="View by: ">                                                  
						<i-select  v-model="if3D" :model.sync="showByGroup" clearable placeholder="Select"  @on-change="changedViewMethod"  filterable>        
							<i-option v-for="(method,index) in viewMethod_list" :key='index' :value="method.name">{{ method.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
				<i-col span="6">
					<Form-item label="Visual method: ">                                                  
						<i-select v-model='VisaulMethod' :model.sync="showByGroup" clearable placeholder="Select view method"  @on-change="changedVisaulMethod"  filterable>        
							<i-option v-for="(method,index) in VisaulMethod_list" :key='index' :value="method.name">{{ method.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
				<i-col span="8">
					<Form-item label="Group: ">                                                  
						<i-select v-model="source" :model.sync="showByGroup" clearable placeholder="Pleace select cell group"  @on-change="changedSource"  filterable>        
							<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
				<i-col span="8">
					<Form-item label="Color by: ">                                                  
						<i-select v-model="group" :model.sync="showByGroup" clearable placeholder="Pleace select"  @on-change="changedGroup"  filterable>        
							<i-option v-for="(group,index) in group_type_list" :key='index' :value="group.value">{{ group.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
				<i-col span="8">
					<Form-item>
					<!-- <i-button  shape="circle" icon="ios-search" @click="getTsneShow">Show</i-button> -->
					<!-- <Button type="primary" icon="ios-search"  @click="getTsneShow" >Show</Button> -->
					</Form-item>
				</i-col>
			</i-form>
        </Row> 
		<Row>					
			<!-- tsne 图 -->			
			<Spin size="large" fix v-if="spinShow1"></Spin>
			<!-- vue-plotly -->
			<!--<vue-plotly :data="TSNE_data" :layout="TSNE_layout" :config :options="TSNE_options"/> </Plotly>-->
			<Plotly  :data="TSNE_data" :layout="TSNE_layout" :options="TSNE_options"></Plotly>
		
		</Row>
	</div>

	<div>
		<h1 class="my_h1">Feature Plot</h1>
		<br>
		<Row :gutter="4">
        	<i-form :label-width="120">
				<i-col span="6">
					<Form-item label="Plot size: ">                                                  
						<i-select v-model="plotSize2" :model.sync="showByGroup" clearable placeholder="Select"  @on-change="changedPlotSize2"  filterable>        
							<i-option v-for="(value,index) in plotSize_list" :key='index' :value="value.name">{{ value.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
				<i-col span="8">
					<Form-item label="Group: ">                                                  
						<i-select v-model="source2" clearable placeholder="Pleace select cell group"  @on-change="changedShowGroup2"  filterable>        
							<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
				<i-col span="8">
					<Form-item label="Feature name: ">
						<!-- placeholder="Please input gene symbol" -->
							<i-select 
								v-model="feature_name" 
								enter-button="Search" 
								style="width:120%"  
								@on-search="getFeatureByName($event)"  
								placeholder="Please input gene symbol"  
								@on-change="getFeatureByName($event)"  filterable>        
									<i-option v-for="(value,index) in keyWords_list" :key='index' :value="value.name">{{ value.name }}</i-option>
							</i-select>
							<!-- <Button type="primary" @click="addFeatureByName($event)" >Add</Button> -->
							<!-- <Input search enter-button="Add" @on-search="addFeatureByName($event)" placeholder="Please input gene symbol"/> -->
						
						<!-- <Input v-model="feature_name" search enter-button="Search" @on-search="getFeatureByName($event)" /> -->
					</Form-item>
				</i-col>
				
			</i-form>
        </Row> 
		<Row>
			<!-- tsne 图 -->			
			<Spin size="large" fix v-if="spinShow2"></Spin>
			<vue-plotly :data="Feature_data" :layout="Feature_layout" :options="Feature_options"/>
		</Row>
	</div>


	<!-- <router-link to="/Dataset_service">
            <div style="text-align:right;font-size:calc((30/1920) * 100vw);">
                <!-- <img width="20%" height="10%" src="@/assets/img/red_sys.jpg"> -->
                <!-- <h3>Back To Dataset Service</h3> -->
                <!-- <p>Sample: 
                    <count-to :end="68" count-class="count-style"/>                                                              
                </p> 
            </div> 
	</router-link> -->

</div>
    
</template>


<script>
import VuePlotly from '@statnett/vue-plotly'
import {Plotly} from 'vue-plotly'
import {getTsneGroup,getTsneDataCol,getTsneData,getFeaturePlot} from '@/api/erythdataservice'
import {getAllSCFeatureKeyWordsSplitCell,} from '@/api/erythdataset'

export default {
	name:"scPlotTSNE",
	components:{
		VuePlotly,  
		Plotly
	},
	data(){
		return{
			keyWords_list:[],
			spinShow1:'true',
			spinShow2:'true',
			TSNE_data: [], 
			TSNE_layout: {},              
			contrasts_group:[],
			TSNE_options:{  
				responsive: true,
				// displaylogo: false,
                // toImageButtonOptions: {
                //     format: 'svg', // one of png, svg, jpeg, webp
                //     filename: 'sc_cluster_image',
                //     // height: 500,
                //     // width: 700,
                //     scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
                // }

			},
			Feature_data:[],
			Feature_layout:{},
			Feature_options:{
				responsive: true,
				displaylogo: false,
                toImageButtonOptions: {
                    format: 'svg', // one of png, svg, jpeg, webp
                    filename: 'sc_feature_image',
                    // height: 500,
                    // width: 700,
                    scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
                }
			},
			showByGroup:'',
			series:this.$store.state.app.CurrentPageToken,
			source:'',
			source2:'',
			if3D:'2D',
			VisaulMethod:'UMAP',
			group_type_list: [ 
				{
					id:"0",
					name:"Original identity",
					value:"orig.ident"
					
				},
				{
					id:'1',
					name:"Cell type",
					value:"celltype"
				},
				{
					id:'2',
					name:"Phase",
					value:"Phase"
				}
				],
			group:'',
			data_source_list:[],
			data_source_listF:[],
			viewMethod_list:[
				{'name':'2D'},
				{'name':'3D'}
			],
			plotSize_list:[
				{'name':'2'},
				{'name':'4'},
				{'name':'6'},
				{'name':'8'},
				{'name':'10'},
				],
			plotSize:'4',
			plotSize2:'4',
			VisaulMethod_list:[
				{'name':'PCA'},
				{'name':'tSNE'},
				{'name':'UMAP'}

			],

			colnames:[],
			feature_name:'',

		}
	},
	methods:{

		getAllscFeatureSplitCell(series,source){

			getAllSCFeatureKeyWordsSplitCell(series,source).then(res=>{

				let mykeyWord_list = res.data.keywords
				this.feature_name = mykeyWord_list[0].name
				this.keyWords_list = mykeyWord_list

			})
		},

		getFeatureByName(feature_name){
			let _this = this
			_this.feature_name = feature_name
			this.getFeaturePlot(this.series,this.source2,feature_name)

		},

		getFeaturePlot(series,source2,feature_name){

			let _this = this
			console.log(this.series)
			console.log(feature_name)
			if( "" == source2 ){
				this.$Message.info('please select data source', 10);
				return 
            } 
			if( "" == feature_name ){
				this.$Message.info('please input gene symbol', 10);
				return 
            } 

			_this.spinShow2 = true
            getFeaturePlot(series,source2,feature_name).then(res =>{
                let datas = res.data
				console.log('getFeaturePlotData')
				console.log(datas)
				var featurename = datas.featurename
				this.feature_name= featurename
				this.searchVivoGene = featurename
				var xData = datas.x_list
				var yData =datas.y_list
				var zData = datas.feature_list
				var iftsne = datas.iftsne
				// alert(iftsne)
				var result = {
					mode: 'markers',
        			type: 'scatter',
					y: yData,
					x :xData,
					marker: {
						size: this.plotSize2,
						color:zData,
						colorscale:'Viridis',
						colorbar:{
							thickness:20
						}
					},
					
				};
				this.Feature_data = []
				this.Feature_data.push(result);
				var title_x= 'UMAP 1'
				var title_y = 'UMAP 2'
				if(iftsne === true){
					title_x = 'tSNE 1'
					title_y = 'tSNE 2'
				}
				let layout = {
					title:  this.searchVivoGene +' expression level (' +this.series+'; Group: '+ source2 +')',
					xaxis: {
                        title:title_x,
                    },
                    yaxis: {
                       title:title_y
					},
					legend: {
						y: 0.5,
						yref: 'paper',
						font: {
						family: 'Arial, sans-serif',
						size: 20,
						color: 'grey',
						}
					},
				}
                this.Feature_layout = layout
                _this.spinShow2 = false
           })   
		},
		
		getTsneChart(series,source,col,if3D,VisualM){

			let _this = this
			_this.spinShow1 = true
			console.log(this.series)
			// alert(source)
			
			getTsneData(series,source,col,if3D,VisualM).then(res =>{
				let datas = res.data  
				console.log(datas)
				
				var xData = datas.xData  // list 里面装list
                var yData =datas.yData   
				var gData = datas.gData
				var signal = datas.signal

				//alert(signal)

				if(signal === 'no'){
					// this.$Message.info('This visual(UMAP) is temporary not available,please try other visual method', 50);
                    // _this.spinShow1 = false
					// this.VisaulMethod = 'tSNE'
					// this.getTsneChart(series,source,col,if3D,this.VisaulMethod)
					// return
				}

				if (this.VisaulMethod === 'PCA'){
					var xtitle = 'PC_1'
					var ytitle = 'PC_2'
					var ztitle = 'PC_3'
					var tmp_title = 'PCA'

				}

				if(this.VisaulMethod === 'UMAP'){
					var xtitle = 'UMAP_1'
					var ytitle = 'UMAP_2'
					var ztitle = 'UMAP_3'
					var tmp_title = 'UMAP'
				}
				if(this.VisaulMethod === 'tSNE'){
					var xtitle = 'tSNE_1'
					var ytitle = 'tSNE_2'
					var ztitle = 'tSNE_3'
					var tmp_title = 'tSNE'
				}

				if(this.if3D == '3D'){

					var zData = datas.zData
					let data = []
					for ( var i = 0; i < xData.length; i ++ ) {
						// alert(nData[i])
						var result = {
							x: xData[i],
							y: yData[i],
							z: zData[i],
							mode: 'markers',
							type: 'scatter3d',
							name: gData[i],
							// text: gData[i],                       
							marker: { size: this.plotSize }
						};

						data.push(result)   
					};

					this.TSNE_data = data

					var TSNE_layout={ 
						
						title: tmp_title+ '	plot' + " ("+this.series + "; Group: "+ source+")",
						scene:{
							xaxis: {
								// range: [ 0.75, 5.25 ],
								title:xtitle,
								},
							yaxis: {
								// range: [0, 8],
								title:ytitle,
							},

							zaxis: {
								// range: [0, 8],
								title:ztitle,
							},
						},
						margin: {
							l: 50,
							r: 50,
							b: 50,
							t: 50
						}
					}         
					this.TSNE_layout = TSNE_layout

					_this.spinShow1 = false


				}else{

					let data = []
					//alert( this.plotSize)
					for ( var i = 0; i < xData.length; i ++ ) {
						// alert(nData[i])
						var result = {
							x: xData[i],
							y: yData[i],
							mode: 'markers',
							type: 'scatter',
							name: gData[i],
							// text: gData[i],                       
							marker: { size: this.plotSize }
						};
						data.push(result)   
					};

					this.TSNE_data = data
					
					var TSNE_layout={ 
						
						title: tmp_title+ '	plot' + " ("+this.series + "; Group: "+ source+")",
						xaxis: {
							// range: [ 0.75, 5.25 ],
							title:xtitle,
						},
						yaxis: {
							// range: [0, 8],
							title:ytitle
						},
					}         
					this.TSNE_layout = TSNE_layout
					_this.spinShow1 = false


					}

					
				
			})
               
		
		
		},
		getTsneCol(series,source){
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

		changedSource(source){
			let _this = this  
			this.source= source
            //this.getTsneCol(this.series,source)
            this.getTsneShow()
		},
		changedViewMethod(method){
			//this.ViewMethod = method
			this.if3D = method
			this.getTsneShow()
		},
		changedPlotSize(value){
			this.plotSize = value
			this.getTsneShow()
		},
		changedPlotSize2(value){
			this.plotSize2 = value

			this.getFeaturePlot(this.series,this.source2,this.feature_name)
		},
		changedVisaulMethod(method){
			this.VisaulMethod = method
			this.getTsneShow()
		},

		changedShowGroup2(source){
			// source group
			let _this = this  
			this.source2= source
            // this.getTsneCol(this.series,source)
            this.getFeaturePlot(this.series,this.source2,this.feature_name)
		},
		changedGroup(group){
			console.log(group)
			//getTsneChart(series,source,col,if3D,VisualM)
			this.group = group
			this.getTsneShow()

		},

		getTsneShow(){

			this.getTsneChart(this.series,this.source,this.group,this.if3D,this.VisaulMethod)
		},



		getDataSourceList(series){

			getTsneGroup(this.series).then(res =>{

				let _this = this
                let datas = res.data  
				console.log()
				console.log(datas)
				var data =   datas 
				datas.forEach(function (group) {

							_this.data_source_list.push({
								name:group.source_g
							})
							
							
					
				}) 
				
				
				// datas.pop()
				datas.forEach(function (group) {
					if (group.if_anal === 'yes'){
								console.log(group.source_g)

								_this.data_source_listF.push({
									name:group.source_g
								})
							}
				}) 
				//series,source,col,if3D,VisualM)
				this.source = datas[0].source_g
				this.if3D = '2D'
				this.group = 'celltype'
				this.VisaulMethod= 'UMAP'
				this.getTsneChart(this.series,data[0].source_g,'celltype','2D','UMAP')

				this.source2 = datas[0].source_g
				this.getAllscFeatureSplitCell(this.series,datas[0].source_g)
				this.getFeaturePlot(this.series,datas[0].source_g,'needFind')
           })
		}
	},
	mounted(){
		// this.group_type_list[1]['id']
		this.getDataSourceList(this.series)
		
	}


    
}
</script>

<style>



.ivu-input-group-append{
  background: #870909!important;
  color: #fff!important;
  border-color:#870909!important;
}

.ivu-input-search {
  background: #870909!important;
  color: #fff!important;
  border-color:#870909!important;

}
.ivu-input-search:hover{
      background: #e6b9b8 !important;
      color: #fff !important;
      border-color: #ea898c !important;
}
</style>

