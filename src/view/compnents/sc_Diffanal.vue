<template>
<div class="lay_out">
	<h1 class="my_h1">Single Cell Cluster's Differential  Analysis</h1>
	<br>
	<div>
		<Row>
			<i-form :label-width="120">
				<!-- <i-col span="10">
					<Form-item label="Data source: ">                                                  
						<i-select  clearable placeholder="Pleace select cell source"  @on-change="changedDataSource">        
							<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col> -->
                <i-col span="10">
					<Form-item label="Contrast Cluster: ">                                                  
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
			<vue-plotly :autoResize="ifResize" :data="diff_data" :layout="diff_layout" :options="diff_options"/>
		
		</Row>
		</Br>

		<Row>
			<i-form :label-width="120">
				<i-col span="12">
					<Form-item label="Input Gene: ">                                                  
						 <Input search enter-button="Search"    @on-search="searchSCDiffDataSetByKeyName($event)" :placeholder="search_placeholder"/>                         
					</Form-item>
				</i-col>
			</i-form>
		</Row>
		<Row>
			<!-- <filter-table 
                
                  @on-search="onSearch_diff"
                  :data="diffData"
                  :columns="diffCols">
            </filter-table> -->
			

			<Table :columns="diffCols" :data="diffData" size="small" ref="table"></Table>
			<div style="margin: 10px;overflow: hidden">               
                  <div style="float: right;">
                      <Page :total="totalRow"  
                      :current="currentPage" 
                      :page-size="pageSize" 
                      show-elevator 
                      show-total
                      show-sizer
                      @on-change="handleCurrentChange" 
                      @on-page-size-change="handleSizeChange">
                      </Page>                   
                  </div>
            </div>
		</Row>
	</div>
	<br>
	<div>
		<h1 class="my_h1">Single Cell Cluster's Enrichment Analysis</h1>
		<br>
		<Row>
			<i-form :label-width="120">
				<!-- <i-col span="8">
					<Form-item label="Data source: ">                                                  
						<i-select  clearable placeholder="Pleace select cell source"  @on-change="changedDataSource2">        
							<i-option v-for="(source,index) in data_source_list" :key='index' :value="source.name">{{ source.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col> -->
                <i-col span="8">
					<Form-item label="Contrast Cluster: ">                                                  
						<i-select  clearable placeholder="Pleace select cluster group"  @on-change="changedDiffChart2">        
							<i-option v-for="(group,index) in group_type_list2" :key='index' :value="group.name">{{ group.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
				<i-col span="8">
                                            
                
					<Form-item label="Enrich type: ">
						<i-select :model.sync="enrichGroup" clearable  placeholder="Pleace select Enrich Type" @on-change="changeEnrichType">                    
							<i-option v-for="(goType,index) in goTypeList" :key='index' :value="goType.value">{{ goType.name }}</i-option>
						</i-select>
					</Form-item>
                </i-col>

			</i-form>
			
        </Row>
 		
		<Row>					
			<!-- 富集分析图 -->			
			<Spin size="large" fix v-if="spinShow2"></Spin>
			<!-- <vue-plotly :autoResize="ifResize" :data="diff_data" :layout="diff_layout" :options="diff_options"/> -->
			<vue-plotly :autoResize="ifResize" :data="enrichGO_data" :layout="enrichGO_layout" :options="enrichGO_options"/>

		</Row>
	</div>



</div>
    
</template>


<script>
import FilterTable from '../compnents/FilterTable';
import VuePlotly from '@statnett/vue-plotly'
import {getdiffGroup,getTsneGroup,getSCClusterDiff,getSCEnrichContrastGroup,getSCDiffContrastGroup,getScDiffEnrich} from '@/api/erythdataservice'
import {getDatasetTypeSource,getSCDiffPageDatasetByGene,getSCDiffPageDataset} from '@/api/erythdataset'

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
			enrichGroup:'',
			search_placeholder:'Please input gene symbol',
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
			series:this.$store.state.app.CurrentPageToken,
			ifResize:true,
			spinShow1:'true',
			spinShow2:'true',
			diff_data: [], 
			diff_layout: {},              
			contrasts_group:[],
			enrichGO_layout:{},
			data_source_list:[],
			source:'',
			source2:'',
			currentPage: 1,
        	pageSize: 10,
        	totalRow: 400,
			diff_options: { 
				responsive: true,
			},
			sourceGroup:'vivo',
	
			diffData:[],
			diffCols:[
			{
				title: 'Symbol',
				key: 'symbol',
				"sortable": true,
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
				title: 'p_val',
				key: 'p_val',
				"sortable": true,
				filter: {
				type: 'Input'
				}

			},
			{
				title: 'avg_logFC',
				key: 'avg_logFC',
				"sortable": true,
				filter: {
				type: 'Input'
				}

			},
			{
				title: 'pct.1',
				key: 'pct.1',
				"sortable": true,
				filter: {
				type: 'Input'
				}

			},
			{
				title: 'pct.2',
				key: 'pct.2',
				"sortable": true,
				filter: {
				type: 'Input'
				},
			},
			{
				title: 'p_val_adj',
				key: 'p_val_adj',
				"sortable": true,
				filter: {
					type: 'Select',
					option: P_Value_range
				},
			},
			],
			group_type_list:[],
			group_type_list2:[],
			group:'',
			gorup2:'',
			enrichGO_data:[],
			enrichType:'CC',
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
				var data =   datas 
				this.source = data[0].source_g
				this.source2 = data[0].source_g     
				datas.forEach(function (group) {
					
								console.log(group.source_g)

								_this.data_source_list.push({
									name:group.source_g
								})
					
				}) 

				// alert(datas[1])
				this.getContrastGroup(this.series,data[0].source_g)
				this.getContrastGroup2(this.series,data[0].source_g)
				// alert(datas[1])
				// this.getMarkerChart(this.series,datas[1])
             
           })
		},

		changedDiffChart(group){
            console.log(group)
			this.group = group
			// alert(this.series)
			// alert(this.source)
			// alert(this.group)
			

			if (typeof group === 'undefined' ){
				
				this.group = group

			}else{

				this.group = group
				this.getdiff_chart(this.series,this.source,group)
				var table_name = this.series 
				this.mockTableData(table_name,this.currentPage,this.pageSize,group)
			}



		},

		changedDiffChart2(group){
            console.log(group)
			this.group2 = group
			// alert(this.series)
			// alert(this.source)
			// alert(this.enrichType)
			// this.getdiff_chart(this.series,this.source,group)
			this.getdiffEnrich_chart(this.series,group,this.enrichType)

		},
		changeEnrichType(enrichType){
            let _this = this
            this.enrichType = enrichType
			this.getdiffEnrich_chart(this.series,this.group2,enrichType)
        },

		changedDataSource(source){
			let _this = this  
			this.source = source
            this.getContrastGroup(this.series,source)
            
		},
		changedDataSource2(source){
			let _this = this  
			this.source2 = source
			this.getContrastGroup2(this.series,source)
			
			
            
		},

		getdiffEnrich_chart(series,group2,enrichType){
			let _this = this
			_this.spinShow2 = true
			// alert(enrichType)
            getScDiffEnrich(series,group2,enrichType).then(res =>{
                	let datas = res.data 
					console.log("enrich data ")
					console.log(datas)
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
						title: 'Enrichment('+this.enrichType +')' +' of ' + group2 ,
                       
                        xaxis: {
							title:'-log10(p.adjust)',
							// showgrid : TRUE,
						},
						yaxis: {
							// showgrid: TRUE,
                            title:{
                                    text: ' Term [-log10(p.adjust)]',
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
                            l:300
                        },
                       
                       
					}
				this.enrichGO_layout = layout
                _this.spinShow2 = false
           }) 

		},

		getDiffContrastGroup(series){

			getSCDiffContrastGroup(series).then(res =>{

				let _this = this
                let datas = res.data  
				console.log(datas)
				var data =   datas 
				
				_this.group = datas[0]
				_this.group_type_list = []
				datas.forEach(key => _this.group_type_list.push({
                    name:key
				})) 
				// + "_" + source
				var table_name = series   // 传过去的table_name 包含 series
				// var table_name = series
				// alert(table_name)
				this.getdiff_chart(this.series,this.source,datas[0])
				this.mockTableData(table_name,this.currentPage,this.pageSize,datas[0]) 
             
           })
		},


		getEnrichContrastGroup2(){

			getSCEnrichContrastGroup(this.series,this.source2).then(res =>{
				
				let _this = this
                let datas = res.data  
				console.log(datas)
				var data =   datas 
				this.group_type_list2 = []      
				datas.forEach(key => this.group_type_list2.push({
                    name:key
				})) 
				this.group2 = datas[0]
				this.getdiffEnrich_chart(this.series,datas[0],this.enrichType)
             
           })

		},

        onSearch_diff(searchKeyVal){
        	var _this = this
        
			for (let key in searchKeyVal){
				// alert(key)
				// alert(searchKeyVal[key])
				var value = searchKeyVal[key]
				// alert(typeof(value))
				if ( typeof(value) === 'object'){
					// alert('yes')  输入了空值
					this.$Message.info('Please check your input of  ' + key,15);
					return;
				}else{
					// alert('no')  不输入空
					// alert(value.replace(/\s*/g,'').length)
					if (value.replace(/\s*/g,'').length.length === 0){
						this.$Message.info('Please check your input of  ' + key,15);
						this.load();
						return;
					}else{
					continue;
					}
				
				}
        	}
        	searchDatasetByParms(searchKeyVal, _this.currentPage,_this.pageSize).then( res=>{
            
				_this.spinShowTypeSource = false                    
				let datas = res.data
				if (datas.signal === 1){
					this.$Message.info('No related datasets',15);

				}else{
					_this.datasets = datas.list                  
					_this.total = datas.total;
				}
			})
		},


      
		// getdiff_group(table_name){
        //     let contrasts_group_type_list = []
        //     let enrich_group_list = []
		// 	let _this = this
		// 	// alert(table_name)
        //     getdiffGroup(table_name).then(res =>{
        //         let datas = res.data 
        //         console.log(datas)  
        //         datas.forEach(key => contrasts_group_type_list.push({
        //             name:key
        //         }))
        //         this.contrasts_group = contrasts_group_type_list
		// 		this.getdiff_chart(table_name,datas[0])
		// 		this.mockTableData(table_name,this.currentPage,this.pageSize)
        //         // enrichGroup = datas[0].split('-')[0]
        //         // goType = 'CC'
               
        //     })
		// },
		

		getdiff_chart(){

			let _this = this
			_this.spinShow1 = true
            getSCClusterDiff(this.series,this.group).then(res =>{
                let datas = res.data  
                console.log(datas)             
                var data = [
                         {
                            x: datas.no_signifcant.logFC,
                            y: datas.no_signifcant.adj_P_Val,
                            mode: 'markers',
                            type: 'scatter',
                            name: 'Not Signifcant',
                            text: datas.no_signifcant.genes,
                            marker: { size: 4 }
                        },            
                      {
                        x: datas.signifcant.logFC,
                        y: datas.signifcant.adj_P_Val,
                        mode: 'markers',
                        type: 'scatter',
                        name: 'Signifcant',
                        text: datas.signifcant.genes,
                        marker: { size:4 }
                      },
                
                ]

                this.diff_data = data
                    
                var diff_layout={ 
                   
                    title:'Differential Analysis ' + this.group ,
					subtitle: {
                            text: 'Data Souce:' + this.series
                    },
					xaxis: {
                        title:'Log2(FC)',
                    },
                     yaxis: {
                       title:'-Log2(adj.P.Val)'
                    },

                }         
                this.diff_layout = diff_layout
                _this.spinShow1 = false
           })   
		},

		changedContrGroup(diffgroup){
			let _this = this  
			// alert(this.table_name)
			this.getdiff_chart(this.series,diffgroup)
			// var table_name = this.series + "_"+this.source
			var table_name = this.series
			// alert(table_name)
			this.mockTableData(table_name,this.currentPage,this.pageSize,diffgroup) 
			
            
		},

		changedSourceGroup(sourceGroup){
			// alert(sourceGroup)
			this.table_name = 'all_rna_dev_bulk_' + sourceGroup
			this.sourceGroup = sourceGroup
			// alert(this.table_name)
			// this.getdiff_group(this.table_name)
		},

	
		mockTableData(table_name,currentPage,pageSize,group){
			//  table_name  含有 source 信息
			// alert(table_name)
			var _this = this;      
            _this.spinShowTypeSource = true, 
            // alert("==")
		
			getSCDiffPageDataset(table_name,currentPage,pageSize,group).then( res=>{

				_this.spinShowTypeSource = false                    
				let datas = res.data
                console.log(datas)
				if (datas.signal == 1){

					console.info(datas.list)
					_this.diffData = datas.list                  
					_this.totalRow = datas.total;
				}else{

				}
				
			})
		},
		
		searchSCDiffDataSetByKeyName($event){
			//  table_name  含有 source 信息
			// alert(table_name)
			if( "" == $event ){
				this.$Message.info('Please input gene symbol', 10);
				return 
            } 
			var _this = this;      
            _this.spinShowTypeSource = true, 
            // alert("==")
		
			getSCDiffPageDatasetByGene($event,this.series,this.currentPage,this.pageSize,this.group).then( res=>{

				_this.spinShowTypeSource = false                    
				let datas = res.data
                console.log(datas)
				if (datas.signal == 1){

					console.info(datas.list)
					_this.diffData = datas.list                  
					_this.totalRow = datas.total;
				}else{

				}
				
			})
		},
		handleSizeChange(val){
			console.log(`每页 ${val} 条`);
			this.pageSize = val;
			// mockTableData(table_name,currentPage,pageSize)
			// this.mockTableData(this.table_name,this.currentPage,this.pageSize,this.source)
			var table_name = this.series 
			this.mockTableData(table_name,this.currentPage,this.pageSize,this.group)
		},
		handleCurrentChange(val){
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          var table_name = this.series
		  this.mockTableData(table_name,this.currentPage,this.pageSize,this.group)
      },

	},
	mounted(){
		// this.getDataSourceList(this.series)

		this.getDiffContrastGroup(this.series)
		this.getEnrichContrastGroup2(this.series)

		// var table_name = 'all_rna_dev_bulk_vivo'
		// this.getdiff_group(table_name);
		
		// this.mockTableData(table_name,this.currentPage,this.pageSize)
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

