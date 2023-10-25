<template>
<div>
	<br>
	<h1 class="my_h1">Visualization</h1>
	<br>
	<div style="background: white;">
		<Row :gutter="0">
			<Col span="16" >
				<!-- tsne 图 -->			
				<Spin size="large" fix v-if="spinShow1"></Spin>
				<Plotly :data="TSNE_data" :layout="TSNE_layout" :options="TSNE_options"></Plotly>
			</col>	
			
			<Col span="6"  >
				<i-form :label-width="120"  style="margin-top: 60px;">

						<Form-item label="Plot size: ">                                                  
							<i-select v-model="plotSize" :model.sync="showByGroup" clearable placeholder="Select"  @on-change="changedPlotSize"  filterable>        
								<i-option v-for="(value,index) in plotSize_list" :key='index' :value="value.name">{{ value.name }}</i-option>
							</i-select>
						</Form-item>

						<Form-item label="View by: ">                                                  
							<i-select v-model="if3D" :model.sync="showByGroup" clearable placeholder="Select"  @on-change="changedViewMethod"  filterable>        
								<i-option v-for="(method,index) in viewMethod_list" :key='index' :value="method.name">{{ method.name }}</i-option>
							</i-select>
						</Form-item>

						<Form-item label="Visual method: ">                                                  
							<i-select v-model="VisaulMethod" :model.sync="showByGroup" clearable placeholder="Select view method"  @on-change="changedVisaulMethod"  filterable>        
								<i-option v-for="(method,index) in VisaulMethod_list" :key='index' :value="method.name">{{ method.name }}</i-option>
							</i-select>
						</Form-item>

						<Form-item label="Group: ">                                                  
							<i-select v-model="source" :model.sync="showByGroup" clearable placeholder="Pleace select cell group"  @on-change="changedSource"  filterable>        
								<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
							</i-select>
						</Form-item>

						<Form-item label="Sample: ">                                                  
							<i-select v-model="sample" :model.sync="showBySample" clearable placeholder="Pleace select sample"  @on-change="changedShowSample"  filterable>        
								<i-option v-for="(sample,index) in group_sample_list" :key='index' :value="sample.name">{{ sample.name }}</i-option>
							</i-select>
						</Form-item>

						<Form-item label="Color by: ">                                                  
							<i-select v-model="group" :model.sync="showByGroup" clearable placeholder="Pleace select cell group"  @on-change="changedGroup"  filterable>        
								<i-option v-for="(group,index) in group_type_list" :key='index' :value="group.value">{{ group.name }}</i-option>
							</i-select>
						</Form-item>
			
				</i-form>
			</col>
        </Row> 
					
		
	</div>

	<br>
	<h1 class="my_h1">Feature Plot</h1>
	<br>
	<div style="background: white;">
		
		<Row :gutter="0">
			<Col span="16" >
				<!-- tsne 图 -->			
				<Spin size="large" fix v-if="spinShow2"></Spin>
				<vue-plotly :data="Feature_data" :layout="Feature_layout" :options="Feature_options"/>
			</col>	

			<Col span="6"  >
				<i-form :label-width="120"  style="margin-top: 60px;">
					
						<Form-item label="Plot size: ">                                                  
							<i-select v-model="plotSize2" :model.sync="showByGroup" clearable placeholder="Select"  @on-change="changedPlotSize2"  filterable>        
								<i-option v-for="(value,index) in plotSize_list" :key='index' :value="value.name">{{ value.name }}</i-option>
							</i-select>
						</Form-item>
					
					
						<Form-item label="Group: ">                                                  
							<i-select v-model="source2" :model.sync="showByGroup" clearable placeholder="Pleace select cell group"  @on-change="changedShowGroup2"  filterable>        
								<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
							</i-select>
						</Form-item>
					
					
					
						<Form-item label="Sample: ">                                                  
							<i-select v-model="sample2" clearable placeholder="Pleace select cell group"  @on-change="changedShowSample2"  filterable>        
								<i-option v-for="(sample,index) in group_sample_list2" :key='index' :value="sample.name">{{ sample.name }}</i-option>
							</i-select>
						</Form-item>

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
				</i-form>
			</col>
        </Row> 
		
			
	</div>


	<!-- <router-link to="/Dataset_service">
            <div style="text-align:right;font-size:calc((30/1920) * 100vw);">
               <img width="20%" height="10%" src="@/assets/img/red_sys.jpg"> -->
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
import {getTsneGroup,getTsneDataCol,getTsneData,getFeaturePlot,getGroupSample} from '@/api/erythdataservice'
import {getAllSCFeatureKeyWordsSplitCell,} from '@/api/erythdataset'


export default {
	name:"allScPlotTSNE",
	components:{
		VuePlotly,  
		Plotly
	},

	props:{
        selectList:{
            type:Array,
            default:() =>[]
        },
       
    },

	data(){
		return{
			keyWords_list:[],
			orga:'',
            sequ_type:'',
            // table_name:'all_hs_ep_sc_sample_group',
			showBySample:'',
            table_name:'',
			spinShow1:'true',
			spinShow2:'true',
			sourceGroup:'',
			TSNE_data: [], 
			TSNE_layout: {},              
			contrasts_group:[],
			TSNE_options: {  responsive: true
			},
			Feature_data:[],
			Feature_layout:{},
			Feature_options:{
				responsive: true,
				displaylogo: false,
				toImageButtonOptions: {
					format: 'svg', // one of png, svg, jpeg, webp
					filename: 'sc_all_feature',
					height: 500,
					width: 700,
					scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
				}
			},
			showByGroup:'',
			series:'',
			source:'',
			source2:'',
			if3D:'',
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
			group_sample_list:[],
			group_sample_list2:[],
			sample:'',
			sample2:'',
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

	watch:{
        selectList: {
            handler(val){
                // console.log(val)
                
				var table_name =
                    'all_' +
                    val[0].orga +
                    '_ep_' +
                    val[0].sequnceType 

				
				// alert(table_name)
                this.table_name = table_name

				if (table_name.indexOf('all_mm_ep_sc') > -1){
					// alert('change')
					this.table_name = 'CRA002445'
				}
				if (table_name.indexOf('all_dr_ep_sc') > -1){
					// alert('change')
					this.table_name = 'GSE152982'
			  	}
				  
				if(val[0].orga == 'dr'){
                    this.orga_name = 'Danio rerio'
                }

                if (val[0].orga == 'hs'){
                    this.orga_name = 'Homo sapiens'

                }
                if(val[0].orga == 'mm'){
                    this.orga_name = 'Mus musculus'
                }
				


                // if (val.length > 1) {
                //     alert(val)
                    // this.ifShow = true
                    // this.searchSelect1(val[0],this.searchGene)
                    // this.searchSelect2(val[1],this.searchGene)
                // }else{
                    // alert(this.selectList[0])
                    // this.ifShow = false
                    // this.searchSelect1(val[0],this.searchGene)
                // }
                
            },
            immediate:true
        },
      
        
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
			this.feature_name = feature_name
			this.getFeaturePlot(this.table_name,this.source2,this.sample2,feature_name)

		},

		getFeaturePlot(series,source2,sample2,feature_name){

			let _this = this
			_this.spinShow2 = true
			console.log(this.table_name)
			console.log(feature_name)
			if( "" == source2 ){
				this.$Message.info('please select data source', 10);
				return 
            } 

            getFeaturePlot(series,source2,sample2,feature_name).then(res =>{

				
                let datas = res.data
				console.log('getFeaturePlotData')  
				console.log(datas)			
				// var data =   datas           
				
				var featurename = datas.featurename
				this.searchVivoGene = featurename
				this.feature_name = featurename
				var xData = datas.x_list
				var yData =datas.y_list
				var zData = datas.feature_list
				var iftsne = datas.iftsne	

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
				// alert(this.vivo_data)
				this.Feature_data = []
				this.Feature_data.push(result);
				var title_x= 'UMAP 1'
				var title_y = 'UMAP 2'
				if(iftsne === true){
					title_x = 'tSNE 1'
					title_y = 'tSNE 2'
				}


				let layout = {
					title:  this.searchVivoGene +' expression level'+ " (Organism: "+ this.orga_name + "; Group: "+ source2 +")",
					xaxis: {
						// range: [ 0.75, 5.25 ],
                        title:title_x,
                    },
                    yaxis: {
						// range: [0, 8],
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


		getTsneChart(series,source,sample,col,if3D,VisualM){

			let _this = this
			_this.spinShow1 = true
			console.log(this.table_name)
			// alert(source)
			
			getTsneData(series,source,sample,col,if3D,VisualM).then(res =>{
				let datas = res.data  
				console.log(datas)
				
				var xData = datas.xData  // list 里面装list
                var yData =datas.yData   
				var gData = datas.gData
				var signal = datas.signal

				//alert(signal)

				if(signal === 'no'){
					this.$Message.info('this visual is temporary not available,please try other visual method', 50);
                    _this.spinShow1 = false
					return
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
						
						title: tmp_title+ '	plot' + " (Organism: "+ this.orga_name + "; Group: "+ source+")",
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
						
						title: tmp_title+ '	plot' + " (Organism: "+ this.orga_name + "; Group: "+ source+")",
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
            //this.getTsneCol(this.table_name,source)
			this.getGroupSampleData(this.table_name,source)
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
			this.getFeaturePlot(this.table_name,this.source2,this.feature_name)
		},
		changedVisaulMethod(method){
			this.VisaulMethod = method
			this.getTsneShow()
		},
		changedShowGroup2(source){
			// source group
			let _this = this  
			this.source2= source
            // this.getTsneCol(this.table_name,source)
			this.getGroupSampleData2(this.table_name,source)
			this.getFeaturePlot(this.table_name,this.source2,this.sample2,this.feature_name)
            
		},
		changedGroup(group){
			console.log(group)
			//getTsneChart(series,source,col,if3D,VisualM)
			this.group = group
			this.getTsneShow()
			

		},

		getTsneShow(){

			this.getTsneChart(this.table_name,this.source,this.sample,this.group,this.if3D,this.VisaulMethod)
		},

		changedShowSample(sample){
			let _this = this  
			_this.sample= sample
            //this.getTsneCol(this.table_name,source)
			// this.getGroupSampleData(this.table_name,source)
            this.getTsneShow()

		},
		changedShowSample2(sample){
			let _this = this  
			_this.sample2 = sample
			this.getFeaturePlot(this.table_name,this.source2,sample,this.feature_name)

		},
		getGroupSampleData(series,group){
			let _this = this
			_this.sample = 'All'
			_this.group_sample_list = []
			_this.group_sample_list.push({
				name:'All'
			})
			getGroupSample(series,group).then(res =>{
				let datas = res.data  
				console.log()
				console.log(datas)
				datas.forEach(function (e_sample) {
							_this.group_sample_list.push({
								name:e_sample.sample
							})
				}) 
			})
		},

		getGroupSampleData2(series,group){
			let _this = this
			_this.sample2 = 'All'
			_this.group_sample_list2 = []
			_this.group_sample_list2.push({
				name:'All'
			})
			getGroupSample(series,group).then(res =>{
				let datas = res.data  
				console.log()
				console.log(datas)
				datas.forEach(function (e_sample) {
							_this.group_sample_list2.push({
								name:e_sample.sample
							})
				}) 
			})
		},
		getDataSourceList(series){

			// alert(series)
			getTsneGroup(series).then(res =>{

				let _this = this
                let datas = res.data  
				
				// alert(datas)
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
				this.source=data[0].source_g
				
				// 得到样本列表名称
				this.getGroupSampleData(this.table_name,this.source)
				this.getGroupSampleData2(this.table_name,this.source)


				this.if3D = '2D'
				
				this.VisaulMethod = 'UMAP'
				this.group='celltype'
				this.getTsneChart(series,data[0].source_g,this.sample,'celltype','2D','UMAP')
				this.source2=data[0].source_g
				this.getAllscFeatureSplitCell(series,datas[0].source_g)
				this.getFeaturePlot(series,datas[0].source_g,this.sample2,'needFind')


           })
		}
	},
	mounted(){
		// this.group_type_list[1]['id']
		// all_hsrna_dev_diff
		// this.sequ_type = this.$route.params.sequ_type;
    	// this.orga_name = this.$route.params.orga;
      	var table_name = this.table_name
		// alert(this.table_name)
		this.getDataSourceList(this.table_name)
		
	}


    
}
</script>

<style>



</style>

