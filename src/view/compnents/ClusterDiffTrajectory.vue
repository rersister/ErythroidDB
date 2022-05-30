<template>
<div>
	
	<div>
		<h1>Pseudotime Trajectory</h1>
		<br>
		<Row :gutter="16">
        	<i-form :label-width="120">
				
				<i-col span="8">
					<Form-item label="Group: ">                                                  
						<i-select :model.sync="showByGroup" clearable placeholder="Pleace select cell group"  @on-change="changedShowGroup2">        
							<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
	
			</i-form>
        </Row> 		
		<Row>					
			<!-- tsne 图 -->			
			<Spin size="large" fix v-if="spinShow2"></Spin>
			<vue-plotly :data="pseudo_data" :layout="pseudo_layout" :options="pseudo_options"/>
			
		</Row>
	</div>
	
	<div>
		<h1>Differentiation Trajectory</h1>
		<br>
		<Row>
        	<i-form :label-width="120">
				<i-col span="8">
					<Form-item label="Group: ">                                                  
						<i-select :model.sync="showByGroup" clearable placeholder="Pleace select cell group"  @on-change="changedShowGroup">        
							<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
				<i-col span="8">
					<Form-item label="Color by: ">                                                  
						<i-select :model.sync="showByGroup" clearable placeholder="Pleace select cell group"  @on-change="changedTraChart">        
							<i-option v-for="(group,index) in group_type_list" :key='index' :value="group.name">{{ group.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
			</i-form>
        </Row> 		
		<Row>					
			<!-- tsne 图 -->			
			<Spin size="large" fix v-if="spinShow1"></Spin>
			<vue-plotly :data="Tra_data" :layout="Tra_layout" :options="Tra_options"/>
		</Row>
	</div>



</div>
    
</template>


<script>
import VuePlotly from '@statnett/vue-plotly'
import {getTsneGroup,getTraDataCol,getTraData,getPseudoData} from '@/api/erythdataservice'
export default {
	name:"ClusterDiffTrajectory",
	components:{
		VuePlotly,  

	},
	data(){
		return{
			spinShow1:'true',
			Tra_data: [], 
			Tra_layout: {},              
			contrasts_group:[],
			pseudo_data:[],
			pseudo_layout:{},
			pseudo_options:{
				responsive: true,
			},
			spinShow2:'true',
			Tra_options: {  responsive: true
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

		}
	},
	methods:{

		
		getTraChart(series,source,col){

			let _this = this
			_this.spinShow1 = true
			console.log(this.series)
			getTraData(series,source,col).then(res =>{
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

				this.Tra_data = data
                var Tra_layout={ 
                    
                    title:'Differentiation Trajectory ' + "("+this.series+" "+ source + ")",
                    xaxis: {
						// range: [ 0.75, 5.25 ],
                        title:'Component 1',
                    },
                     yaxis: {
						// range: [0, 8],
                       title:'Component 2'
					},
					

                }         
                this.Tra_layout = Tra_layout
				_this.spinShow1 = false
				
			})
               
		
		
		},
		getTraCol(series,source){
			let _this = this
			getTraDataCol(series,source).then(res =>{
				let datas = res.data  
				console.log(datas)
				_this.colnames = datas
				this.group_type_list = []  
				datas.forEach(key => this.group_type_list.push({
                    name:key
				}))
				
			})
		},
		getPseudoPlot(series,source2){

			let _this = this
			_this.spinShow2 = true
			console.log(this.series)
			
			if( "" == source2 ){
				this.$Message.info('please select data source', 10);
				return 
            } 


            getPseudoData(series,source2).then(res =>{

				
                let datas = res.data  
				console.log(datas)
				var data =   datas           
                this.pseudo_data = data
                    
                var pseudo_layout={ 
                    
                    title: 'Pseudotime Trajectory' + "("+this.series+" "+ source2 + ")",
                    xaxis: {
						// range: [ 0.75, 5.25 ],
                        title:'Component 1',
                    },
                    yaxis: {
						// range: [0, 8],
                       title:'Component 2'
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
                this.pseudo_layout = pseudo_layout
                _this.spinShow2 = false
           })   
		},

		changedShowGroup(source){
			let _this = this  
			this.source = source
            this.getTraCol(this.series,source)
            
		},
		changedShowGroup2(source){
			let _this = this  
			this.source2 = source
			// this.getTraCol(this.series,source)
			this.getPseudoPlot(this.series,source)
		},
		changedTraChart(group){
			console.log(group)
			this.getTraChart(this.series,this.source,group)

		},

		getDataSourceList(series){

			getTsneGroup(this.series).then(res =>{

				let _this = this
                let datas = res.data  
				console.log(datas)
				var data =   datas 
				
				
				// console.log(_this.colnames[0]) 
				this.source = data[0].source_g
				this.source2 = data[0].source_g     
				datas.forEach(function (group) {
					
					console.log(group.source_g)

					_this.data_source_list.push({
						name:group.source_g
					})
					
				}) 

				this.getPseudoPlot(this.series,data[0].source_g)

				this.getTraChart(this.series,data[0].source_g,'celltype')
				
             
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

