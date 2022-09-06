<template>
<div>
    <br/>
	<h1 class="my_h1">Differential Analysis</h1>
    <br>
	<div>
		<Row>
        	<i-form :label-width="120">
				<i-col span="8">
					<Form-item label="Contrasts Group: ">                                                  
						<i-select  clearable placeholder="Pleace select contrasts group"  @on-change="changedContrGroup">        
							<i-option v-for="(group,index) in contrasts_group" :key='index' :value="group.name">{{ group.name }}</i-option>
						</i-select>
					</Form-item>
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
                <span>Input Gene Symbol:</span>
                <Input search enter-button="Search"  @on-search="searchDiffDataSetByKeyName($event)" :placeholder="search_placeholder"/>                         
            </Col>                                                                                                                                                       
        </Row>
        <br/>
        <Row>

			<!-- <filter-table 
                  @on-search="onSearch_diff"
                  :data="diffData"
                  :columns="diffCols">
            </filter-table> -->
             
        
            <Table :columns="diffCols" :data="diffData" size="small" ref="table"></Table>
            <Spin size="large" fix v-if="spinShowTypeSource"></Spin>
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



</div>
    
</template>


<script>
import FilterTable from '../compnents/FilterTable';
import VuePlotly from '@statnett/vue-plotly'
import {getdiffGroup,getDiffData,getDatasetSourceInfoData} from '@/api/erythdataservice'
import {getDatasetTypeSource,getDiffPageDataset,getDiffPageDatasetByGene,searchDiffDatasetByParms} from '@/api/erythdataset'

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
                "sortable": true,
				filter: {
				type: 'Input'
				},
				fixed: 'left',
				
			},
			{
				title: 'logFC',
				key: 'logFC',
                "sortable": true,
				filter: {
				type: 'Input'
				}

			},
			{
				title: 'logCPM',
				key: 'logCPM',
                "sortable": true,
				filter: {
				type: 'Input'
				}

			},
			{
				title: 'FDR',
				key: 'FDR',
                "sortable": true,
				filter: {
				type: 'Input'
				},
			},
			{
				title: 'PValue',
				key: 'PValue',
                "sortable": true,
				filter: {
					type: 'Select',
					option: P_Value_range
				},
			},
            ],
            
		}
	},
	methods:{
        onSearch_diff(searchKeyVal){
        	var _this = this
			for (let key in searchKeyVal){
                // alert(key)
                // alert(searchTypeSource[key])
                var value = searchKeyVal[key]
                // alert(typeof(value))
                if ( typeof(value) === 'object'){
                    // alert('yes')  输入了空值  HSPC  
                    this.$Message.info('Please check your input   ');
                    return;
                }else{
                    // alert('no')  不输入空
                    // alert(value.replace(/\s*/g,'').length) + key,15
                    if (value.replace(/\s*/g,'').length.length === 0){
                        this.$Message.info('Please check your input ' );
                        this.load();
                        return;
                    }else{
                        continue;
                    }
                
                }
            }
        	searchDiffDatasetByParms(this.series,searchKeyVal, _this.currentPage,_this.pageSize,this.contrastsGroup).then( res=>{
            
				_this.spinShowTypeSource = false                    
                let datas = res.data
                // console.log(datas)
				if (datas.signal === 1){
                    // 有值
                    // alert("有值")
                   _this.diffData = datas.list                  
				   _this.totalRow = datas.total;
					

				}else{
					this.$Message.info('No related datasets',15);
				}
            })

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

        searchDiffDataSetByKeyName($event){
            var _this = this;      

            if( "" == $event ){
				this.$Message.info('Please input gene symbol', 10);
				return 
            } 

            _this.spinShowTypeSource = true, 
            // alert("==")
            // alert(contrastsGroup)

            
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
                   
                    title:'Differential analysis of ' + diffgroup +'( '+this.series+';Source:' + this.Dsource + ";Growth Mode:"+ this.Dgrowth_mode +')',

                //    subtitle: {
                //             text: 'Data Souce:' + this.series
                //     },
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

            
            this.getdiff_chart(this.series,diffgroup)
            this.contrastsGroup = diffgroup
            // alert(diffgroup)
            this.mockTableData(this.series,this.currentPage,this.pageSize,diffgroup)
            
        },

        getDatasetSourceInfo(series){
             let _this = this
             getDatasetSourceInfoData(this.series).then(res =>{
                let datas =res.data
                console.log(datas)
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




</style>

