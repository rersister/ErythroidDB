<template>
<div class="lay_out">
	<h1 class="my_h1">Differential Analysis (Organism: {{orga_name}})</h1>
	</Br>
	<div>
		<Row :gutter="4">
			<!-- <Col span="12">
				<i-select placeholder="Pleace select cell's development type" clearable style="width:80%" @on-change='changedSourceGroup'>
					<i-option v-for="(source,index) in source_group" :key='index' :value="source.name">{{ source.name }}</i-option>
				</i-select>
			</Col> -->
			<!-- <i-form >
				<i-col span="8">
					<Form-item label="Contrasts group: ">
						                                                  
						
					</Form-item>
				</i-col>
			</i-form> -->
			<Col span="10">
				<!-- 数据查询分子名 -->
				
				<i-select v-model="contrastsGroup" clearable placeholder="Pleace select/input contrasts group"  @on-change="changedContrGroup"  filterable>        
					<i-option v-for="(group,index) in contrasts_group" :key='index' :value="group.name">{{ group.name }}</i-option>
				</i-select>
				
			</Col>
			<Col span="12">
				<div style="margin-left: 4px; ">
					<span>
						e.g, late_basoE_CB_vitro-orthoE_CB_vitro means the late_basoE_CB_vitro  group versus the orthoE_CB_vitro group
					</span>
				</div>
				
			</Col>
			
        </Row>
		</Br>
		<Row>					
			<!-- 差异表达 -->			
		
			<Spin size="large" fix v-if="spinShow1"></Spin>
			<vue-plotly :autoResize="ifResize" :data="diff_data" :layout="diff_layout" :options="diff_options"/>
		
		</Row>
		</Br>
		<Row>
            <Col span="12">
                <!-- 数据查询分子名 -->
                <span>Input gene symbol:</span>
                
                <!-- <i-select style="width:80%"
                                v-model=specif_name   
                                @on-change="search_value($event)"  filterable>        
							    <i-option v-for="(value,index) in keyWords_list" :key='index' :value="value.name">{{ value.name }}</i-option>
				</i-select>
                <Button class='button_mystyle' @click="searchDiffDataSetByKeyName($event)" >Search</Button> -->
                <Input search enter-button="Search"  @on-search="searchDiffDataSetByKeyName($event)" :placeholder="search_placeholder"/>                         
            </Col>                                                                                                                                                       
        </Row>
        <br/>
		<Row>
			
			<Spin size="large" fix v-if="spinShowTypeSource"></Spin>
			<Table 

                  :data="diffData"
                  :columns="diffCols"
				  v-on:on-sort-change="onSortTable" 
				  ref="table">
			</Table>

			<div style="margin: 10px;overflow: hidden">               
                  <div style="float: right;">
                      <Page :total="totalRow"  
                      :current="currentPage" 
                      :page-size="pageSize" 
                      show-total
                      show-sizer
                      @on-change="handleCurrentChange" 
                      @on-page-size-change="handleSizeChange">
                      </Page>                   
                  </div>
            </div>
			<Button type="primary" size="large" @click="exportExcel"><Icon type="ios-download-outline"></Icon>Download</Button>
			</Br>
		</Row>
	</div>
	


</div>
    
</template>


<script>
import FilterTable from '../compnents/FilterTable';
import VuePlotly from '@statnett/vue-plotly'
import {getdiffGroup,getDiffData} from '@/api/erythdataservice'
import {getDiffPageDataset,getDiffPageDatasetByGene,
	getDiffPageDatasetBySort,
    getDiffPageDatasetBySortGene} from '@/api/erythdataset'
import {export_json_to_excel} from '@/assets/js/Export2Excel'


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
	name:"all_Diffanal",
	components:{
		VuePlotly,  
		FilterTable,
	},
	props:{
        selectList:{
            type:Array,
            default:() =>[]
        },
       
    },
	data(){
		return{

			orga_name:'',
			spinShowTypeSource:'true',
			ifResize:true,
			spinShow1:'true',
			diff_data: [], 
			diff_layout: {},              
			contrasts_group:[],
			source_group:[
				{
					name:'vivo',
					value:'vivo'
				},
				{
					name:'vitro',
					value:'vitro'
				},
				{	

					name:"same cell's stage(over source)",
					value:'samec'
				}

			],
			currentPage: 1,
        	pageSize: 10,
        	totalRow: 400,
			diff_options: { 
				responsive: true,
                displaylogo: false,
                toImageButtonOptions: {
                   format: 'svg', // one of png, svg, jpeg, webp
                    filename: 'all_diff',
                    height: 500,
                    width: 700,
                    scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
                }
			},
			contrastsGroup:'',
			sourceGroup:'vivo',
			table_name:'all_rna_dev_bulk_vivo',
			diffData:[],
			diffCols:[
			{
				title: 'Symbol',
				key: 'SYMBOL',
				// "sortable": true,
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
				"sortable": true,
				// filter: {
				// type: 'Input'
				// }

			},
			{
				title: 'AveExpr',
				key: 'logCPM',
				"sortable": true,
				// filter: {
				// type: 'Input'
				// }

			},
			{
				title: 'adj.P.value',
				key: 'FDR',
				"sortable": true,
				// filter: {
				// type: 'Input'
				// },
			},
			{
				title: 'P.value',
				key: 'P.Value',
				"sortable": true,
				filter: {
					type: 'Select',
					option: P_Value_range
				},
			},
			],
			orga:this.$route.params.orga,
            sequ_type:this.$route.params.sequ_type,
			sortableKey:'',
            sortableOrder:'',
			inputGenePat:'',
		}
	},
	watch:{
        selectList: {
            handler(val){
                //console.log(val)
                
                var table_name =
                    'all_' +
                    val[0].orga +
                    '_ep_' +
                    val[0].sequnceType 
                this.table_name = table_name

				this.getdiff_group(table_name);

				if (val[0].orga == 'hs'){
                    this.orga_name = 'Homo sapiens'

                }
                if(val[0].orga == 'mm'){
                    this.orga_name = 'Mus musculus'
                }

				if(val[0].orga == 'dr'){
                    this.orga_name = 'Danio rerio'
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
		searchDiffDataSetByKeyName($event){
            var _this = this;      

            if( "" == $event ){
				this.$Message.info('Please input gene symbol', 10);
                this.mockTableData(this.table_name,this.currentPage,this.pageSize,this.contrastsGroup)
				return

            } 
            _this.spinShowTypeSource = true, 
            _this.inputGenePat = $event
			getDiffPageDatasetByGene($event,this.table_name,this.currentPage,this.pageSize,this.contrastsGroup).then( res=>{

				_this.spinShowTypeSource = false                    
				let datas = res.data
                // console.log(datas)
				if (datas.signal == 1){

					// console.info(datas.list)
					_this.diffData = datas.list                  
					_this.totalRow = datas.total;
				}else{
                   
				}
				
			})
		

        },

		onSortTable ({ column, key, order }) {
            // console.log('onSortTable')
            // console.log(key)
            // console.log(order)
            // console.log(column)
            this.sortableKey = key
            this.sortableOrder = order
            // this.changeColumn = { key, order }
            this.handleSortTable()
        },
		handleSortTable(){

				if(this.sortableOrder === 'normal'){
					return
				}else{
					var _this = this;      
				_this.spinShowTypeSource = true
				// alert(this.inputGenePat)
				if( "" == this.inputGenePat ){
					getDiffPageDatasetBySort(this.sortableKey,this.sortableOrder,this.table_name,this.currentPage,this.pageSize,this.contrastsGroup).then( res=>{
						_this.spinShowTypeSource = false                    
						let datas = res.data
						if (datas.signal == 1){
							_this.diffData = datas.list                  
							_this.totalRow = datas.total;
						}else{
						}
					})

				}else{
					getDiffPageDatasetBySortGene(this.inputGenePat,this.sortableKey,this.sortableOrder,this.table_name,this.currentPage,this.pageSize,this.contrastsGroup).then( res=>{
						_this.spinShowTypeSource = false                    
						let datas = res.data
						if (datas.signal == 1){
							_this.diffData = datas.list                  
							_this.totalRow = datas.total;
						}else{
						}
					})
				}

				}




		},

		formatJson(filterVal,tableData){
			return tableData.map((v)=>{
				// console.log('v:')
				// console.log(v)
				return filterVal.map((j) =>{
					// console.log(v[j])
					return v[j]
				})

			})

		},
		exportExcel(){
				const tHeader = ['Symbol','logFC','AveExpr','adj.P.Val','P.Value']
				const filterVal = ['SYMBOL','logFC','logCPM','FDR','P.Value']
				const filename = 'diff-data'
				// console.log('exportExcell')
				// console.log(this.diffData)   //  this.diffData 只是 diffData当前页，应该不止当前页
				// const tableData = JSON.stringify(this.diffData)
				const data = this.formatJson(filterVal,this.diffData)
				// console.log(data )

				export_json_to_excel({
					header: tHeader,
					data,
					filename
				})

		
		},
      
		getdiff_group(table_name){
            let contrasts_group_type_list = []
            let enrich_group_list = []
			let _this = this
			// alert(table_name)
            getdiffGroup(table_name).then(res =>{
                let datas = res.data 
                //console.log(datas)  
                datas.forEach(key => contrasts_group_type_list.push({
                    name:key
                }))
                this.contrasts_group = contrasts_group_type_list
				this.getdiff_chart(table_name,datas[0])
				this.contrastsGroup = datas[0]
				this.mockTableData(table_name,this.currentPage,this.pageSize,datas[0])
                // enrichGroup = datas[0].split('-')[0]
                // goType = 'CC'
               
            })
		},
		
		getdiff_chart(table_name,diffgroup){

			let _this = this
			_this.spinShow1 = true
            getDiffData(table_name,diffgroup).then(res =>{
                let datas = res.data  
                console.log(datas)             
                var data = [
                         {
                            x: datas.no_signifcant.logFC,
                            y: datas.no_signifcant.adj_P_Val,
                            mode: 'markers',
                            type: 'scatter',
                            name: 'Not signifcant',
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
                   
                    title:'Differential Analysis ' + diffgroup,
                    xaxis: {
                        title:'Log2(FC)',
                    },
                     yaxis: {
                       title:'-Log10(P value)'
                    },

                }         
                this.diff_layout = diff_layout
                _this.spinShow1 = false
           })   
		},
		changedContrGroup(diffgroup){
			let _this = this  
			// alert(this.table_name)
			this.getdiff_chart(this.table_name,diffgroup)
			// alert(diffgroup)
			this.mockTableData(this.table_name,this.currentPage,this.pageSize,diffgroup)
            
		},
		changedSourceGroup(sourceGroup){
			// alert(sourceGroup)
			let _this = this
			this.source_group.forEach(function(item){
              if(item.name == sourceGroup){
                  _this.sourceGroup = item.value
              }

         	})
			//var table_name = 'all_'+this.orga +'rna'+'_dev_'+this.sourceGroup+'_'+this.sequ_type
			
			// this.sourceGroup = sourceGroup
			// alert(this.table_name)
			this.getdiff_group(table_name)

			
		},

		mockTableData(table_name,currentPage,pageSize,contrastsGroup){

			var _this = this;      
			_this.spinShowTypeSource = true, 
			console.log("start_table_mode")
			getDiffPageDataset(table_name,currentPage,pageSize,contrastsGroup).then( res=>{

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
			this.mockTableData(this.table_name,this.currentPage,this.pageSize,this.contrastsGroup)
		},
		handleCurrentChange(val){
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.mockTableData(this.table_name,this.currentPage,this.pageSize,this.contrastsGroup)
      	},

	},
	mounted(){
		// all_hsrna_dev_diff
		// this.sequ_type = this.$route.params.sequ_type;
    	// this.orga = this.$route.params.orga;
      	// var table_name = 'all_'+this.orga +'rna'+'_dev_'+this.sourceGroup+this.sequ_type
		// var table_name = 'all_hs_ep_bulk'
		
		// this.mockTableData(table_name,this.currentPage,this.pageSize)


	}


    
}
</script>

<style>


	.my_select{
		font-size: calc((20/1920) * 100vw);
		width: calc((500/1920) * 100vw);

	}

	.lay_out{
        margin: 2% 2%  2% 2%;
    }
	.ivu-table-border td, .ivu-table-border th {
    	/* border-right: 1px solid #e8eaec; */  
	}
</style>

