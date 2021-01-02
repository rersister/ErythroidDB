<template>
<div>

	
	<h1>t_SNE analysis</h1>
	<div>
		<Row>
        	<i-form :label-width="120">
				<i-col span="8">
					<Form-item label="Data source: ">                                                  
						<i-select :model.sync="showByGroup" clearable placeholder="Pleace select cell group"  @on-change="changedShowGroup">        
							<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
				<i-col span="8">
					<Form-item label="Group by: ">                                                  
						<i-select :model.sync="showByGroup" clearable placeholder="Pleace select cell group"  @on-change="changedTsneChart">        
							<i-option v-for="(group,index) in group_type_list" :key='index' :value="group.name">{{ group.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
			</i-form>
        </Row> 		
		<Row>					
			<!-- tsne 图 -->			
			<Spin size="large" fix v-if="spinShow1"></Spin>
			<vue-plotly :data="TSNE_data" :layout="TSNE_layout" :options="TSNE_options"/>
		</Row>
	</div>

	<div>
		<h1>Feature Plot</h1>
		<Row :gutter="16">
        	<i-form :label-width="120">
				
				<i-col span="8">
					<Form-item label="Data source: ">                                                  
						<i-select :model.sync="showByGroup" clearable placeholder="Pleace select cell group"  @on-change="changedShowGroup2">        
							<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
				<i-col span="12">
					<Form-item label="Input feature name: ">
						<Input search enter-button="Search" @on-search="getFeatureByName($event)" placeholder="Please input gene symbol"/>
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
import {getTsneGroup,getTsneDataCol,getTsneData,getFeaturePlot} from '@/api/erythdataservice'
export default {
	name:"PlotTSNE",
	components:{
		VuePlotly,  

	},
	data(){
		return{
			spinShow1:'true',
			spinShow2:'true',
			TSNE_data: [], 
			TSNE_layout: {},              
			contrasts_group:[],
			TSNE_options: {  responsive: true
			},
			Feature_data:[],
			Feature_layout:{},
			Feature_options:{
				responsive: true,
			},
			showByGroup:'',
			series:this.$store.state.app.CurrentPageToken,
			source:'',
			source2:'',
			group_type_list : [ 
				// {
				// 	id:"0",
				// 	name:"Sample's Source "
				// },
				// {
				// 	id:'1',
				// 	name:"Cell Cluster"
				// }
				
				],
			data_source_list:[],
			colnames:[],
			feature_name:'',

		}
	},
	methods:{
		getFeatureByName(feature_name){
			let _this = this
			this.getFeaturePlot(this.series,this.source2,feature_name)

		},

		getFeaturePlot(series,source2,feature_name){

			let _this = this
			_this.spinShow2 = true
			console.log(this.series)
			console.log(feature_name)
			if( "" == source2 ){
				this.$Message.info('please select data source', 10);
				return 
            } 


            getFeaturePlot(series,source2,feature_name).then(res =>{

				
                let datas = res.data  
				console.log(datas)
				 var data =   datas           
              

                this.Feature_data = data
                    
                var Feature_layout={ 
                    
                    title: feature_name + ' Feature Plot' + "("+this.series+" "+ source2 + ")",
                    xaxis: {
						// range: [ 0.75, 5.25 ],
                        title:'t_SNE 1',
                    },
                    yaxis: {
						// range: [0, 8],
                       title:'t_SNE 2'
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
                this.Feature_layout = Feature_layout
                _this.spinShow2 = false
           })   
		},
		getTsneChart(series,source,col){

			let _this = this
			_this.spinShow1 = true
			console.log(this.series)
			getTsneData(series,source,col).then(res =>{
				let datas = res.data  
				console.log(datas)
				
				var xData = datas.xData  // list 里面装list
                var yData =datas.yData   
				var gData = datas.gData
				let data = []
                for ( var i = 0; i < xData.length; i ++ ) {
                    // alert(nData[i])
                    var result = {
                        x: xData[i],
                        y: yData[i],
                        mode: 'markers',
                        type: 'scatter',
                        name: gData[i],
                        // text: gData[i],                       
                        marker: { size: 6 }
                    };
                    data.push(result)   
				};

				this.TSNE_data = data
                var TSNE_layout={ 
                    
                    title:  't_SNE Plot' + "("+this.series + "/"+ source+")",
                    xaxis: {
						// range: [ 0.75, 5.25 ],
                        title:'tSNE 1',
                    },
                    yaxis: {
						// range: [0, 8],
                       title:'tSNE 2'
					},


					

                }         
                this.TSNE_layout = TSNE_layout
				_this.spinShow1 = false
				
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

		changedShowGroup(source){
			let _this = this  
			this.source= source
            this.getTsneCol(this.series,source)
            
		},
		changedShowGroup2(source){
			let _this = this  
			this.source2= source
            // this.getTsneCol(this.series,source)
            
		},
		changedTsneChart(group){
			console.log(group)
			this.getTsneChart(this.series,this.source,group)

		},

		getDataSourceList(series){

			getTsneGroup(this.series).then(res =>{

				let _this = this
                let datas = res.data  
				console.log(datas)
				var data =   datas 
				       
				datas.forEach(key => this.data_source_list.push({
                    name:key
				})) 
				
				// this.getTsneCol(this.series,data[0])
				// console.log("===")
				// console.log(_this.colnames[0]) 
				this.getTsneChart(this.series,data[0],'phase')
				this.getFeaturePlot(this.series,datas[0],'CD36')
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




</style>

