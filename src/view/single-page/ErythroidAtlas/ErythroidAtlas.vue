<template>
    <div class="layout">
        <div class="my_layout-content">

            <div id="chart_choice" v-show="isShow">
                <div class="row_choice">
                    <span >Organism:</span>
                    <RadioGroup class="myOption" @on-change='changeOrgaType($event)'>                     
                        <Radio class="myOption" v-for="item in OrgaList" :label="item.value" >                
                            <span class="myOption">{{ item.label }}</span>
                        </Radio>                   
                    </RadioGroup>
                </div>
                <!-- Expression profiling -->
                <div class="row_choice">
                    <span >Experiment Type:</span>
                    <RadioGroup class="myOption">                     
                        <Radio class="myOption" v-for="item in DataTypeList" :label="item.value" >                
                            <span class="myOption">{{ item.label }}</span>
                        </Radio>                   
                    </RadioGroup>
                </div>
                <div class="row_choice">
                    <span >Sequence type:</span>
                    <RadioGroup class="myOption" @on-change='changeSequnceType($event)'>                     
                        <Radio class="myOption" v-for="item in typeList" :label="item.value" >                
                            <span class="myOption">{{ item.label }}</span>
                        </Radio>                   
                    </RadioGroup>
                </div>
                
                <div class="row_choice">

                     Samples({{totalRow}}) And Group:
                                <filter-table 
                                    
                                    @on-search="onSearch_diff"
                                    :data="sgroupData"
                                    :columns="sgroupCols">
                                </filter-table>
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
                </div>
                <div class="row_choice">
                    <span >Analysis type:</span>
                    <RadioGroup class="myOption"   @on-change='changeAnalType($event)'>
                        <Radio class="myOption" v-for="item in analList" :label="item.value" >
                            <span class="myOption">{{ item.label }}</span>
                        </Radio>           
                    </RadioGroup>
                </div>                 
            </div>
           
            <div class="layout-header">
                 
                   
                            
                                               
                                    
                           
                   
                
                <i-button class="my_button" type="text" @click="toggleClick">
                   
                    <Icon type="ios-keypad" class="my_icon"></Icon>
                    <!-- <Icon type="navicon" size="32"></Icon> -->
                </i-button>
                
                <i-button class="my_button" type="text"  @click="getPlolyByParms()">
                    <Icon type="ios-search" class="my_icon"></Icon>
                    <!-- <Icon type="navicon" size="32"></Icon> -->
                </i-button>             
                <!-- <Button class = 'new_bStyle' type="primary" icon="ios-search" @click="getPlolyByParms()"></Button> -->
                
            </div>
       

            
                
                

        </div>
        
        <div class="layout-content-main">
                    <router-view/> 
        </div> 
    </div>


</template>


<script>

// Datatest
import FilterTable from '../../compnents/FilterTable'
import {getDatatest} from '@/api/erythdataservice'
import {getallDevSampleGroup} from '@/api/erythroidAtlas'
import router from '@/router'
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
        name:"ErythroidAtlas",
        components:{
            
            FilterTable,
        },
        data () {
                return {
                    samples_count:'',
                    isShow:true,
                    spanLeft: 5,
                    spanRight: 19,
                    DataTypeList:[
                        {
                            value:'ep',
                            label:'Expression profiling',
                        },
                    ],
                    orga:'',
                    OrgaList:[
                        {
                            value:'hs',
                            label:'Homo sapiens',
                        },
                        {
                            value:'mm',
                            label:'Mus musculus'
                        }

                    ],
                    curentSequnceType:'',
                    typeList: [
                        {
                            value: 'bulk',
                            label: 'Bulk'
                        },
                        {
                            value: 'sc',
                            label: 'Single Cell'
                        },
                    
                    ],
                    analList:[

                    ],
                    source:[],
                    cell_type:[],
                    currentPage: 1,
                    pageSize: 10,
                    totalRow: 400,
                    sgroupCols:[
                    {
                        title: 'Gid',
                        key: 'gid',
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
                        title: 'Sid',
                        key: 'sample_name',
                        filter: {
                        type: 'Input'
                        }

                    },
                    {
                        title: 'Cell Type',
                        key: 'cell_type',
                        filter: {
                        type: 'Input'
                        }

                    },
                    {
                        title: 'Dev type',
                        key: 'source',
                        filter: {
                        type: 'Input'
                        },
                    },
                    {
                        title: 'Dev & Cell',
                        key: 'source_cell',
                        filter: {
                            type: 'Input'
                        },
                        // filter: {
                        //     type: 'Select',
                        //     option: P_Value_range
                        // },
                    },             
                ],
                sgroupData:[],
                table_name:'',
                    
                }
        },
        computed: {
          
        },
        methods: {


            mockTableData(table_name,currentPage,pageSize){
                var _this = this;      
                _this.spinShowTypeSource = true, 
                getallDevSampleGroup(table_name,currentPage,pageSize).then( res=>{
                    
                    
                    _this.spinShowTypeSource = false                    
                    let datas = res.data

                    if (datas.signal == 1){

                        console.info(datas.list)
                        _this.sgroupData = datas.list                  
                        _this.totalRow = datas.total;
                    }else{

                    }
                    
                })
            },
            onSearch_diff(){

            },
            handleSizeChange(val){
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                // mockTableData(table_name,currentPage,pageSize)
                this.mockTableData(this.table_name,this.currentPage,this.pageSize)
		    },
                handleCurrentChange(val){
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.mockTableData(this.table_name,this.currentPage,this.pageSize)
            },
            toggleClick () {
               this.isShow = !this.isShow
				// if(this.isShow){
				// 	this.btnText = "隐藏"
				// }else{
				// 	this.btnText = "显示"
				// }
            },
            changeOrgaType($value){
                // alert($value)
                this.orga = $value
                var table_name = 'all_'+this.orga +'rna'+'_dev_'+this.curentSequnceType+'cluster'
                this.table_name = table_name
            },
            changeSequnceType($value){
                // alert($value)
                this.curentSequnceType = $value
                var table_name = 'all_'+this.orga +'rna'+'_dev_'+this.curentSequnceType+'cluster'
                this.mockTableData(table_name,this.currentPage,this.pageSize)
                this.table_name = table_name
                if($value == 'bulk' ){
                    this.analList = [ 
                        {
                            label:'Expression Profile',
                            value:'all_Expression'
                        },
                        {
                            label:"Principal Components",
                            value:'all_Clutser'
                        },
                        {
                            label:"Differential Analysis",
                            value:'all_Diff'
                        },
                        {
                            label:"Enrichment Analysis",
                            value:'all_Enrich'
                        },

                        
                    ]
                }else{
                    this.analList = [ 
                      
                        {
                            label:"Single Cell t_SNE & Feature",
                            value:'PlotTSNE'
                        },
                        {
                            label:"Cluster's Markers & Enrich",
                            value:'FeaturePlot'
                        },
                        {
                            label:"Differential & Enrich",
                            value:'Diff_analysis'
                        },
                        {
                            label:"Differential Trajectory",
                            value:'EnrichGO'
                        },
                        {
                            label:"Single Cell Interraction",
                            value:'LRPlot'
                        },
                        {
                            label:"Single Cell Communication",
                            value:'CellChat'
                        }

                    ]
                }
            },
            changeAnalType($event){
                // alert($event)
                let _this = this
                this.anlType = $event
            },
            
            getPlolyByParms(){
            //   let _this = this
            //   alert(this.orga)
            //   alert(this.curentSequnceType)
            
              router.push({
                name: this.anlType,
                
                params: {
                    orga:this.orga,
                    sequ_type:this.curentSequnceType
                    // cell_type:this.cell_type,
                    // source : this.source,

                }
        
        });


            }
          
        },
        mounted(){

           

        }
        




}
</script>

<style scoped>
   .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
 
    .layout-menu-left{
        background: #464c5b;
    }
    .layout_choice{
        margin: 2% 8%  2% 12%;
        color: white;
        font-size: calc((10/1920) * 100vw);
      

    }
    .search_b{
        /* #808695 */
        margin: 2% 2%  2% 2%;
        color: white;
        border:  #464c5b;
        background:  #464c5b;
        width:  calc((100/1920) * 100vw);
    }
    .new_bStyle{
        background-color: #808695;
        border-color:#808695;
        width:  calc((240/1920) * 100vw);
        font-size: calc((20/1920) * 100vw);
        color: white;
    
    }
    .new_bStyle:hover{
        background-color:#464c5b
    }

    #chart_choice{
        /* height:calc((120/1920) * 100vw) */
    }

    /* calc((6/1920) * 100vw) */
    .myslot{
        padding: calc((14/1920) * 100vw) calc((24/1920) * 100vw);
        width:  calc((340/1920) * 100vw);
        background: #515a6e;
    }

    .myslot_title{
        font-size: calc((20/1920) * 100vw);
        margin: 2% 8%  2% 2%;

    }
    .my_icon{
        margin-right: calc((8/1920) * 100vw);
        font-size: calc((30/1920) * 100vw);
    }
    .myEchoice{
        font-size: calc((20/1920) * 100vw);
        width:  calc((240/1920) * 100vw);
        /* height: calc((50/1920) * 100vw);; */
        word-wrap:break-word; 
        word-break:break-all; 
        overflow: hidden;/*这个参数根据需要来绝对要不要*/

    }

    .my_layout-content{
        font-size: calc((20/1920) * 100vw);
    }
    .myOption{
        font-size: calc((20/1920) * 100vw);
        /* height:calc((20/1920) * 100vw) */
      

    }

    .ivu-select-large.ivu-select-single .ivu-select-selection {
        height:calc((20/1920) * 100vw)
    }
    
    .my_layout_content{
        width:  calc((340/1920) * 100vw);
    }
    .row_choice{
        margin: 2% 2%  2% 2%;
    }

    .layout-header{
        height: calc((70/1920) * 100vw);
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        line-height: calc((70/1920) * 100vw);;
    }

    .btn, .btn:active, .btn:focus {
        outline: 0;
    }


    .btn>span {
        vertical-align: middle;
    }

    .my_button{
        padding: calc((6/1920) * 100vw) calc((15/1920) * 100vw) calc((6/1920) * 100vw) calc((15/1920) * 100vw);
        font-size: calc((14/1920) * 100vw);;
        border-radius: calc((4/1920) * 100vw);
    }


</style>

