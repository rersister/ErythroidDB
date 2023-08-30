<template>
    <div class="lay_out">   
          <h1 class="my_h1">Principal Component Analysis (Organism: {{orga_name}})</h1>
          <!-- <h1 class="my_h1">Expression profiling ({{selectList[0]}})</h1> -->
        </Br>     
        <Row>
          
            <i-form :label-width="100">
                <Col span="12">
                    <i-select v-model="cell_source" placeholder="Please choose source" clearable style="width:80%" @on-change='changeCellSource($event)'  filterable>
                        <i-option  v-for="item in SourceList" :value="item.value" >{{ item.label }}</i-option>
                    </i-select>  
                </Col>
				<Col span="12">

						<i-select v-model="colorby" style="width:70%" clearable placeholder="Pleace select cell group"  @on-change="changedClustChart($event)"  filterable>        
							<i-option   v-for="group in group_type_list" :value="group.value">{{ group.name }}</i-option>
						</i-select>
                        <!-- <Button type="primary" @click="getPCAByKey($event)" >Search</Button> -->
				</Col>
			</i-form>
        </Row>
        </Br>
        <Row>
            <div>
                <!-- 相似性分析 MDS 聚类图-->
            <Spin size="large" fix v-if="spinShow3"></Spin>


            <vue-plotly :autoResize="ifResize" :data="clusterbyifVivo_data" :layout="clusterbyifVivo_layout" :options="clusterbyifVivo_options"/>

            </div>
        </Row>
        <!-- <Row>
            <h1 class="my_h1">Unsupervised Clustering group by Cell type</h1>
            <div>
               相似性分析 MDS 聚类图
            <Spin size="large" fix v-if="spinShow2"></Spin>
            <vue-plotly :autoResize="ifResize" :data="clusterbyCellType_data" :layout="clusterbyCellType_layout" :options="clusterbyCellType_options"/>

            </div>
        </Row> -->
        <!-- <Row>
            <h1 class="my_h1">Unsupervised Clustering group by source and cell </h1>
            <div>
                相似性分析 MDS 聚类图
            <Spin size="large" fix v-if="spinShow1"></Spin>
            <vue-plotly :autoResize="ifResize" :data="clusterbySourceCell_data" :layout="clusterbySourceCell_layout" :options="clusterbySourceCell_options"/>

            </div>
        </Row> -->
	</div>
   
     
</template>


<script>
import VuePlotly from '@statnett/vue-plotly'
import {getClusterDataAll,getAllDevType} from '@/api/erythroidAtlas'
const source_dict = [
   {
      value: "BM_vitro",
      name: 'Bone Marrow (in vitro)'
    },
    {
      value: "BM_vivo",
      name: 'Bone Marrow (in vivo)'
    },

    {
      value: "CB_vivo",
      name: 'Cord Blood (in vivo)',
      // color: 'red'
    },
     {
      value: "CB_vitro",
      name: 'Cord Blood (in vitro)',
      // color: 'green'
    },
     {
      value: "PB_vitro",
      name: 'Peripheral Blood (in vitro)',
      // color: 'green'
    },
    {
      value: "FL_vitro",
      name: 'Fetal Liver (in vitro)',
      // color: 'green'
    },

    {
      value: "FL_vivo",
      name: 'Fetal Liver (in vivo)',
      // color: 'green'
    },

     {
      value: "PB_vivo",
      name: 'Peripheral Blood (in vivo)',
      // color: 'green'
    },
    {
      value: "iPSC_vitro",
      name: 'Induced Pluripotent Stem Cells (in vitro)',
      // color: 'green'
    },
    {
        value: "Em_vivo",
        name: 'Embryos (in vivo)',
    },
    
  ]
export default {
    name:"all_Cluster",
    components:{
		VuePlotly,  

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
            ifResize:true,
          	series:this.$store.state.app.CurrentPageToken,
            spinShow3:'true',
            spinShow2:'true',
            SourceList:[
            ],
            spinShow1:'true',
			clusterbyifVivo_data:[],
			clusterbyifVivo_layout:{},
            clusterbyifVivo_options:{
                responsive: true,
                displaylogo: false,
                toImageButtonOptions: {
                    format: 'svg', // one of png, svg, jpeg, webp
                    filename: 'all_pca',
                    height: 500,
                    width: 700,
                    scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
                }
            },
            clusterbyCellType_data:[],
			clusterbyCellType_layout:{},
            clusterbyCellType_options:{
                responsive: true,
            },
            clusterbySourceCell_data:[],
			clusterbySourceCell_layout:{},
            clusterbySourceCell_options:{
                responsive: true,
            },
            orga:this.$route.params.orga,
            sequ_type:this.$route.params.sequ_type,
            table_name:'all_hsrna_dev_cluster',
            colorby:'',
            cell_source:'',
            group_type_list : [ 
				// {
				// 	id:"0",
                //     name:"Experiment type ",
                //     value:'development_type'
				// },
				{
					id:'1',
                    name:"Cell type ",
                    value:'cell_type'
                },
                {
                    id:'2',
                    name:"Experiment and cell type " ,
                    value:'group'
                }
        
				
				],
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
                this.table_name = table_name
                this.getAllDevType(table_name)
                // alert(this.selectList)
                // this.getCluster_chart3(this.selectList,'cell_type','BM_vitro')

                if (val[0].orga == 'hs'){
                    this.orga_name = 'Homo sapiens'

                }
                if(val[0].orga == 'mm'){
                    this.orga_name = 'Mus musculus'
                }
                // alert(val[0].orga)
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

      getAllDevType(table_name){
            let dev_group_type_list = []
            // this.table_name = 'all_hs_ep_bulk'
            // var table_name = selectDict
			// alert(table_name)
            getAllDevType(table_name).then(res =>{
                let datas = res.data 
                // 得到不同分化体系名字
                console.log('dev_type')
                console.log(datas)  
                datas.forEach(key =>{ 
                    
                    source_dict.forEach(element => {
                        if(element.value == key){
                            dev_group_type_list.push({
                                value:key,
                                label:element.name
                            })
                        }
                    });
                
                    
                
                })
                this.SourceList =dev_group_type_list
                this.cell_source = datas[0]
                this.colorby = "cell_type"
                this.getCluster_chart3(this.selectList,this.colorby,this.cell_source)
            })


        },
    
      changeCellSource($event){
            // alert($event)
            this.cell_source = $event
            this.getPCAByKey()
      },

      getPCAByKey(){

        // alert(this.selectList)
        // alert(this.cell_source)
        // alert(this.colorby)
        this.getCluster_chart3(this.selectList,this.colorby,this.cell_source)

      },
	  changedClustChart(value){
        //   alert(value)
        let _this = this
        this.group_type_list.forEach(function(item){
            if(item.name == value){
                _this.colorby = item.value
            }

        })
        this.getPCAByKey()


        //   alert(_this.colorby)
        //var table_name = 'all_'+this.orga +'rna'+'_dev_'+this.sequ_type+'cluster'
        

      },
	  getCluster_chart3(selectList,colorby,source){
        //   redcell.all_hsrnadev_bulkcluster
            // var table_name = 'all_'+this.orga +'rna'+'dev_'+this.sequ_type+'cluster'
            // var colorby = this.colorby  //source / group / order 
            var _this = this
            // alert(selectList[0])
            getClusterDataAll(selectList[0],colorby,source).then(res =>{
                let datas = res.data  
                console.log(datas)             
                var xData = datas.xData  // list 里面装list
                var yData =datas.yData   
                var nData = datas.nData
                var tData = datas.tData
                this.clusterbyifVivo_data = []
                for ( var i = 0; i < xData.length; i ++ ) {
                    // alert(nData[i])
                    var result = {
                        x: xData[i],
                        y: yData[i],
                        mode: 'markers',
                        type: 'scatter',
                        name: nData[i],
                        text: tData[i],                       
                        marker: { size: 15 }
                    };
                    this.clusterbyifVivo_data.push(result)   
                };
                var cell_source_full_name  = ''
                    source_dict.forEach(element => {
                        if(element.value == this.cell_source){
                           cell_source_full_name = element.name
                        }
                });                
                var layout={ 
                    
                    title:'Principal Component Analysis (Source: '+cell_source_full_name +')',
                    xaxis: {
                        title:'Leading logFC dim 1',
                    },
                     yaxis: {
                         
                       title:'Leading logFC dim 2',
                       axisLabel: {
                            // 文件超出长度范围解决
                            // show:true,
                            interval:0,
                            formatter: function (params){
                                if( params.length > 30)
                                    return params.substring(0,30) + '...';
                                else
                                    return params;
                            }
                        },

                    },

                }           
                this.clusterbyifVivo_layout = layout
                _this.spinShow3 = false

           })

        },

      getCluster_chart2(series){
            var groupby = 'cell_type'  //source / group / order 
            var _this = this
            getClusterDataAll(this.table_name,groupby).then(res =>{
                let datas = res.data  
                console.log(datas)             
                var xData = datas.xData  // list 里面装list
                var yData =datas.yData   
                var nData = datas.nData
                var tData = datas.tData
                for ( var i = 0; i < xData.length; i ++ ) {
                    // alert(nData[i])
                    var result = {
                        x: xData[i],
                        y: yData[i],
                        mode: 'markers',
                        type: 'scatter',
                        name: nData[i],
                        text: tData[i],                       
                        marker: { size: 15 }
                    };
                    this.clusterbyCellType_data.push(result)   
                };
                                
                var layout={ 
                   
                    title:'Principal Component Analysis (in {{selectList[0].deve}})',
                    xaxis: {
                        title:'Leading logFC dim 1',
                    },
                     yaxis: {
                       title:'Leading logFC dim 2'
                    },

                }           
                this.clusterbyCellType_layout= layout
                _this.spinShow2 = false

           })

        },


      getCluster_chart1(series){
            var groupby = 'source_cell'  //source / group / order 
            var _this = this
            getClusterDataAll(this.table_name,groupby).then(res =>{
                let datas = res.data  
                console.log(datas)             
                var xData = datas.xData  // list 里面装list
                var yData =datas.yData   
                var nData = datas.nData
                var tData = datas.tData
                for ( var i = 0; i < xData.length; i ++ ) {
                    // alert(nData[i])
                    var result = {
                        x: xData[i],
                        y: yData[i],
                        mode: 'markers',
                        type: 'scatter',
                        name: nData[i],
                        text: tData[i],                       
                        marker: { size: 15 }
                    };
                    this.clusterbySourceCell_data.push(result)   
                };
                                
                var layout={ 
                   
                    title:'Principal Component Analysis (in {{selectList[0].deve}})',
                    xaxis: {
                        title:'Leading logFC dim 1',
                    },
                     yaxis: {
                       title:'Leading logFC dim 2'
                    },

                }           
                this.clusterbySourceCell_layout = layout
                _this.spinShow1 = false

           })

        },


       
    },
    mounted(){
    //   all_rna_dev  this.series
    //    alert(this.$route.params.cell_type)
    //    alert(this.$route.params.cell_type)
    //  orga:this.orga,
    //  sequ_type:this.curentSequnceType
    //    alert(this.$route.params.sequ_type)
    //    alert(this.$route.params.orga)
       this.sequ_type = this.$route.params.sequ_type;
       this.orga = this.$route.params.orga;
       var table_name = 'all_'+this.orga +'rna'+'_dev_'+this.sequ_type+'cluster'
       var colorby = 'cell_type'  //source / group / order 
       this.getCluster_chart3(this.selectList,colorby,'BM_vivo')
    //    this.getCluster_chart3('all_rna_dev');
    //    this.getCluster_chart2('all_rna_dev');
    //    this.getCluster_chart1('all_rna_dev');
    }


}




</script>



<style>


    .lay_out{
        margin: 2% 2%  2% 2%;
    }



</style>

