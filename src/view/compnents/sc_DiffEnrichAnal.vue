<template>
<div class="lay_out">
	<h1 class="my_h1">Single Cell Cluster's Difference analysis</h1>
	<div>
		<Row>
			<i-form :label-width="120">
				<i-col span="10">
					<Form-item label="Data source: ">                                                  
						<i-select  clearable placeholder="Pleace select cell source"  @on-change="changedDataSource">        
							<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
                <i-col span="10">
					<Form-item label="Contrast group: ">                                                  
						<i-select  clearable placeholder="Pleace select cluster group"  @on-change="changedDiffChart">        
							<i-option v-for="(group,index) in group_type_list" :key='index' :value="group.name">{{ group.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
			</i-form>
			
        </Row>
 		
		<Row>					
			<!-- 差异表达 -->			
			<Spin size="large" fix v-if="spinShow1"></Spin>
			<!-- <vue-plotly :autoResize="ifResize" :data="diff_data" :layout="diff_layout" :options="diff_options"/> -->
			<vue-plotly :autoResize="ifResize" :data="enrichGO_data" :layout="enrichGO_layout" :options="enrichGO_options"/>

		</Row>
		</Br>
		
	</div>
	<router-link to="/Dataset_service">
		<div style="text-align:right">
			<!-- <img width="20%" height="10%" src="@/assets/img/red_sys.jpg"> -->
			<h3 class='h3_title'>Back To Dataset Service</h3>
			<!-- <p>Sample: 
				<count-to :end="68" count-class="count-style"/>                                                              
			</p> -->
		</div> 
	</router-link>


</div>
    
</template>


<script>
import FilterTable from '../compnents/FilterTable';
import VuePlotly from '@statnett/vue-plotly'
import {getTsneGroup,getClusterContrastGroup,getScDiffEnrich} from '@/api/erythdataservice'
import {getDatasetTypeSource} from '@/api/erythdataset'

const  P_Value_range = {
    0: {
      value: ">0.05",
      name: '>0.05'
    },
    1: {
      value: "=<0.05",
      name: '=<0.05',
      // color: 'red'
    },
  };

export default {
	name:"sc_Diffanal",
	components:{
		VuePlotly,  
		FilterTable,
	},
	data(){
		return{
			series:this.$store.state.app.CurrentPageToken,
			ifResize:true,
			spinShow1:'true',
			diff_data: [], 
			diff_layout: {},              
			contrasts_group:[],

			data_source_list:[],
			source:'',
			
			currentPage: 1,
        	pageSize: 10,
        	totalRow: 400,
			diff_options: { 
				responsive: true,
			},
			contrastsGroup:'',
			sourceGroup:'vivo',
			table_name:'all_rna_dev_bulk_vivo',
			diffData:[],
			diffCols:[
			{
				title: 'Symbol',
				key: 'SYMBOL',
				filter: {
				type: 'Input'
				},
				fixed: 'left',
				// render: (h, params) => {                        
				// return h('div', [
				// 	h('a', {                               
				// 		attrs:{                              
				// 			href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.dataset_id

				// 		},    
				// 	},params.row.dataset_id)
				// 	])
				// }
			},
			{
				title: 'logFC',
				key: 'logFC',
				filter: {
				type: 'Input'
				}

			},
			{
				title: 'unshrunk.logFC',
				key: 'unshrunk.logFC',
				filter: {
				type: 'Input'
				}

			},
			{
				title: 'logCPM',
				key: 'logCPM',
				filter: {
				type: 'Input'
				},
			},
			{
				title: 'P.Value',
				key: 'P.Value',
				filter: {
					type: 'Select',
					option: P_Value_range
				},
			},
			],
			group_type_list:[],
			group:'',
			
			enrichGO_data:[],
			enrichGO_layout:{},
			enrichGO_options:{
				responsive: true,
			},
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
				// alert(datas[1])
				// this.getMarkerChart(this.series,datas[1])
             
           })
		},
		changedDiffChart(group){
            console.log(group)
			this.group = group
			alert(this.series)
			alert(this.source)
			alert(this.group)
			this.getdiffEnrich_chart(this.series,this.source,group)

		},
		changedDataSource(source){
			let _this = this  
			this.source = source
            this.getContrastGroup(this.series,source)
            
		},
		getContrastGroup(){

			getClusterContrastGroup(this.series,this.source).then(res =>{

				let _this = this
                let datas = res.data  
				console.log(datas)
				var data =   datas 
				      
				datas.forEach(key => this.group_type_list.push({
                    name:key
				})) 
				
				// alert(datas[1])
				// this.getMarkerChart(this.series,datas[1])
             
           })

		},


       


      
		

		getdiffEnrich_chart(){

			let _this = this
			_this.spinShow1 = true
            getScDiffEnrich(this.series,this.source,this.group).then(res =>{
                	let datas = res.data 
					var xData = datas.xData  // list 里面装list
					var yData =datas.yData   
					var nData = datas.nData
					var tData = datas.tData
					this.enrichGO_data = []
					for ( var i = 0; i < xData.length; i ++ ) {
						// alert(nData[i])
						var result = {
							x: xData[i],
							y: yData[i],
							name: nData[i],
							type: 'bar',
							orientation :'h',
						};
						this.enrichGO_data.push(result)   
					};

					var layout = {
						title:'the GO('+ this.sourceGroup+ ') enrichment of ' + this.contrastsGroup,
                       
                        xaxis: {
							title:'-log10(p.adjust)',
							// showgrid : TRUE,
						},
						yaxis: {
							// showgrid: TRUE,
                            title:{
                                    text: 'GO Term [-log10(p.adjust)]',
                                    position:'top',
                                    standoff: 40,
                                    yanchor:'top',
                                },
                            // yanchor:'top',
                            // position:'top',
                            automargin: true,
                            
                            rangemode: "normal",
                            dtick: 1,
							// axisLabel: {
                            // // 文件超出长度范围解决
                            // // show:true,
							// interval:0,
							
                            exponentformat: function (params){
                                if( params.length > 30)
                                    return params.substring(0,30) + '...';
                                else
                                    return params;
                            }
                        
                        },
                        margin: {
                            l:650
                        },
                       
                       
					}
				this.enrichGO_layout = layout
                _this.spinShow1 = false
           })   
		},



	},
	mounted(){
		this.getDataSourceList(this.series)
		
		
	}


    
}
</script>

<style>
	.my_h1{
        font-size: calc((40/1920) * 100vw);
        text-align: center;
    }

	.my_select{
		font-size: calc((20/1920) * 100vw);
		width: calc((500/1920) * 100vw);

	}

	.lay_out{
        margin: 2% 2%  2% 2%;
    }

</style>

