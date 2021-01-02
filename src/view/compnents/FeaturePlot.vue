<template>
<div>
	<h1>Feature Plot</h1>
	<div>
		<Row :gutter="16">
        	<i-form :label-width="120">
				<!-- <i-col span="8">
					<Form-item label="Select Feature: ">                                                  
						<i-select :model.sync="showByGroup" clearable placeholder="Pleace select feature name"  @on-change="changedFeatureName">        
							<i-option v-for="(gene,index) in feature_list" :key='index' :value="gene.name">{{ gene.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col> -->
				<i-col span="8">
					<Form-item label="Data source: ">                                                  
						<i-select :model.sync="showByGroup" clearable placeholder="Pleace select cell group"  @on-change="changedShowGroup">        
							<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
				<i-col span="12">

					<Input search enter-button="Search" @on-search="getFeatureByName($event)" placeholder="Please input gene symbol"/>
					<!-- <Form-item label="Input feature name: ">
						<Input search enter-button="Search" @on-search="getFeatureByName($event)" :placeholder="search_placeholder"/> 
					</Form-item> -->
				</i-col>
			</i-form>
        </Row> 		
		<Row>					
			<!-- tsne 图 -->			
			<Spin size="large" fix v-if="spinShow1"></Spin>
			<vue-plotly :data="TSNE_data" :layout="TSNE_layout" :options="TSNE_options"/>
		</Row>
	</div>
	<router-link to="/Dataset_service">
            <div style="text-align:right">
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
import {getFeaturePlot,getTsneGroup} from '@/api/erythdataservice'
export default {
	name:"FeaturePlot",
	components:{
		VuePlotly,  

	},
	data(){
		return{
			feature_name:'',
			spinShow1:'true',
			TSNE_data: [], 
			TSNE_layout: {},              
			contrasts_group:[],
			TSNE_options: {  responsive: true},
			showByGroup:'',
			series:this.$store.state.app.CurrentPageToken,
			data_source_list:[],
			source:'',
			feature_list : [ {
					
					name:"C1QC"
				},
				{
					
					name:"HIST1H4C"
				}],


		}
	},
	methods:{

		changedShowGroup(source){
			let _this = this  
			this.source = source
            // this.getFeaturePlot(this.series,source)
			
			
		},
		getFeaturePlot(series,source,feature_name){

			let _this = this
			_this.spinShow1 = true
			console.log(this.series)
			console.log(feature_name)
            getFeaturePlot(this.series,this.source,feature_name).then(res =>{

				
                let datas = res.data  
				console.log(datas)
				 var data =   datas           
              

                this.TSNE_data = data
                    
                var TSNE_layout={ 
                    
                    title: feature_name + '   Feature Plot',
                    xaxis: {
						// range: [ 0.75, 5.25 ],
                        title:'t_SNE 1',
                    },
                     yaxis: {
						// range: [0, 8],
                       title:'t_SNE 2'
					},
					

                }         
                this.TSNE_layout = TSNE_layout
                _this.spinShow1 = false
           })   
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
				       
				datas.forEach(key => this.data_source_list.push({
                    name:key
				})) 
				
				// this.getTsneCol(this.series,data[0])
				// console.log("===")
				// console.log(_this.colnames[0]) 
				this.getTsneChart(this.series,data[0],'phase')
             
           })
		}

	},
	mounted(){
		this.getDataSourceList(this.series)
        // this.getFeaturePlot(this.series,this.feature_list[1]['name'])
	}


    
}
</script>

<style>




</style>

