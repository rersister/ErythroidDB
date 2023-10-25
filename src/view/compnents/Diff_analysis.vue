<template>
<div>
    <br/>
	<h1 class="my_h1">Differential Analysis</h1>
    <br>
	<div>
		<Row>
        	<i-form :label-width="120">
				<i-col span="8">
					<Form-item label="Comparsion group: ">                                                  
						<i-select v-model="contrastsGroup" clearable placeholder="Pleace select contrasts group"  @on-change="changedContrGroup">        
							<i-option v-for="(group,index) in contrasts_group" :key='index' :value="group.name">{{ group.name }}</i-option>
						</i-select>
                        <!-- <span>eg: </span> -->
					</Form-item>
                    
				</i-col>
                <i-col span="12">
                    <div style="margin-left: 4px; ">
					<span>
						e.g, late_basoE-orthoE means the late_basoE  group versus the orthoE group
					</span>
				</div>
                </i-col>
                
			</i-form>
        </Row> 		
		<Row>					
			<!-- 差异表达 -->			
			<Spin size="large" fix v-if="spinShow1"></Spin>
			<vue-plotly :data="diff_data" :layout="diff_layout" :options="diff_options"/>
            
		</Row>


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

            <Table 
                :columns="diffCols" 
                :data="diffData" 
                size="small"
                v-on:on-sort-change="onSortTable" 
                ref="table">
            </Table>

            <Spin size="large" fix v-if="spinShowTypeSource"></Spin>
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
		</Row>
        <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon>Download Data</Button>

	</div>



</div>
    
</template>


<script>
import FilterTable from '../compnents/FilterTable';
import VuePlotly from '@statnett/vue-plotly'
import {getdiffGroup,getDiffData,getDatasetSourceInfoData} from '@/api/erythdataservice'
import {getDatasetTypeSource,getDiffPageDataset,
    getDiffPageDatasetByGene,
    getDiffPageDatasetBySort,
    getDiffPageDatasetBySortGene} from '@/api/erythdataset'

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
	name:"Diff_analysis",
	components:{
		VuePlotly,  
        FilterTable,
	},
	data(){

		return{
            series:this.$store.state.app.CurrentPageToken,
            spinShow1:'true',
            search_placeholder:'Please input gene symbol',
            Dsource:'',
            Dgrowth_mode:'',
            spinShowTypeSource:true,
            inputGenePat:'',
			diff_data: [], 
			diff_layout: {},              
			contrasts_group:[],
			diff_options: {
                responsive: true,
                displaylogo: false,
                toImageButtonOptions: {
                    format: 'svg', // one of png, svg, jpeg, webp
                    filename: 'diff_image',
                    height: 500,
                    width: 700,
                    scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
                }
            },
            
            diffData:[],
			contrastsGroup:'',
            totalRow: 400,
            currentPage: 1,
            pageSize: 10,
            table_name:'all_rna_dev_bulk_vivo',
            diffCols:[
                {
                    title: 'Symbol',
                    key: 'SYMBOL',
                    // "sortable": true,
                    // filter: {
                    //     type: 'Input'
                    // },
                    fixed: 'left',
                    
                },
                {
                    title: 'logFC',
                    key: 'logFC',
                    "sortable": 'custom',
                    filter: {
                        type: 'Input'
                    }

                },
                {
                    title: 'logCPM',
                    key: 'logCPM',
                    "sortable": 'custom',
                    filter: {
                        type: 'Input'
                    }

                },
                {
                    title: 'FDR',
                    key: 'FDR',
                    "sortable":'custom',
                    filter: {
                        type: 'Input'
                    },
                },
                {
                    title: 'P.value',
                    key: 'P.Value',
                    "sortable": 'custom',
                    filter: {
                        type: 'Select',
                        option: P_Value_range
                    },
                },
            ],
            sortableKey:'',
            sortableOrder:'',
		}
	},
	methods:{
       
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

        
     
 
        exportData(type){
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: 'diff_data'
                    });
                }else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: '排序和过滤后的数据',
                        original: false
                    });
                }else if (type === 3) {
                    this.$refs.table.exportCsv({
                        filename: '自定义数据',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
                  
        },
        handleCurrentChange(val){
        //   console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.mockTableData(this.series,this.currentPage,this.pageSize,this.contrastsGroup)
        },

        handleSizeChange(val){
			// console.log(`每页 ${val} 条`);
			this.pageSize = val;
			// mockTableData(table_name,currentPage,pageSize)
			this.mockTableData(this.series,this.currentPage,this.pageSize,this.contrastsGroup)
		},
        mockTableData(table_name,currentPage,pageSize,contrastsGroup){

			var _this = this;      
            _this.spinShowTypeSource = true, 
            // alert("==")
            // alert(contrastsGroup)
			getDiffPageDataset(table_name,currentPage,pageSize,contrastsGroup).then( res=>{

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


        handleSortTable(){

            if(this.sortableOrder === 'normal'){
                return
            }else{
                var _this = this;      
            _this.spinShowTypeSource = true
            if( "" == this.inputGenePat ){
                getDiffPageDatasetBySort(this.sortableKey,this.sortableOrder,this.series,this.currentPage,this.pageSize,this.contrastsGroup).then( res=>{
                    _this.spinShowTypeSource = false                    
                    let datas = res.data
                    if (datas.signal == 1){
                        _this.diffData = datas.list                  
                        _this.totalRow = datas.total;
                    }else{
                    }
			    })

            }else{
                getDiffPageDatasetBySortGene(this.inputGenePat,this.sortableKey,this.sortableOrder,this.series,this.currentPage,this.pageSize,this.contrastsGroup).then( res=>{
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
        searchDiffDataSetByKeyName($event){
            var _this = this;      

            if( "" == $event ){
                _this.inputGenePat = ''
				this.$Message.info('Please input gene symbol', 10);
                this.mockTableData(this.series,this.currentPage,this.pageSize,this.contrastsGroup)
				return

            } 
            _this.spinShowTypeSource = true, 
            _this.inputGenePat = $event
			getDiffPageDatasetByGene($event,this.series,this.currentPage,this.pageSize,this.contrastsGroup).then( res=>{

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
		getdiff_group(series){
            let contrasts_group_type_list = []
            let enrich_group_list = []
            let _this = this
            // alert(_this.series)
            getdiffGroup(series).then(res =>{
                let datas = res.data 
                // console.log(datas)  

               
                // alert(datas[0])
                datas.forEach(key => contrasts_group_type_list.push({
                    name:key
                }))
                this.contrasts_group = contrasts_group_type_list
                this.getdiff_chart(this.series,datas[0])
                this.contrastsGroup = datas[0]
                // alert(this.contrastsGroup)
                this.mockTableData(this.series,this.currentPage,this.pageSize,datas[0])
            })
		},
		getdiff_chart(series,diffgroup){

			let _this = this
			_this.spinShow1 = true
            getDiffData(this.series,diffgroup).then(res =>{
                let datas = res.data  
                // console.log(datas)             
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
                const capitalizedFirst = this.Dgrowth_mode[0].toUpperCase();
                const rest = this.Dgrowth_mode.slice(1);
                var myCagrowth_type = capitalizedFirst + rest 

                var diff_layout={ 
                   
                    title:'Differential analysis of ' + diffgroup  +' ('+this.series+ "; Experiment type: "+ myCagrowth_type +')',

                //    subtitle: {
                //         title:' ('+this.series+'; Source:' + this.Dsource + "; Experiment type: "+ myCagrowth_type +')',
                //     },
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

            
            this.getdiff_chart(this.series,diffgroup)
            this.contrastsGroup = diffgroup
            // alert(diffgroup)
            this.mockTableData(this.series,this.currentPage,this.pageSize,diffgroup)
            
        },

        getDatasetSourceInfo(series){
             let _this = this
             getDatasetSourceInfoData(this.series).then(res =>{
                let datas =res.data
                // console.log(datas)
                _this.Dsource = datas.source
                _this.Dgrowth_mode = datas.growth_mode
                
            })
        }
	},
	mounted(){
        var table_name = 'all_rna_dev_bulk_vivo';
        // alert(this.series);
        this.getDatasetSourceInfo(this.series)
        this.getdiff_group(this.series);
        // alert(this.contrastsGroup)
        


	}


    
}
</script>

<style>

.button_mystyle{
    background:#a85557!important;
    color: #fff!important;
    border-color:#a85557!important;
    margin-top:5px;
}

.ivu-input-search {
    cursor: pointer;
    padding: 0 16px!important;
    background: #870909!important;
    color: #fff!important;
    border-color: #870909!important;
    transition: all .2s ease-in-out;
    position: relative;
    z-index: 2;
}

.ivu-input-search {
    cursor: pointer;
    padding: 0 16px!important;
    background: #870909!important;
    color: #fff!important;
    border-color: #870909!important;
    transition: all .2s ease-in-out;
    position: relative;
    z-index: 2;
}

</style>

