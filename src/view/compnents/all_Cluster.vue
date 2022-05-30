<template>
    <div class="lay_out">
        
          <h1 class="my_h1">Principal Components Analysis({{orga_name}})</h1>
          <!-- <h1 class="my_h1">Expression profiling ({{selectList[0]}})</h1> -->
        </Br>     
        <Row>
          
            <i-form :label-width="100">
				<i-col span="8">
					<Form-item label="Color by: ">                                                  
						<i-select  clearable placeholder="Pleace select cell group"  @on-change="changedClustChart($event)">        
							<i-option v-for="(group,index) in group_type_list" :key='index' :value="group.name">{{ group.name }}</i-option>
						</i-select>
					</Form-item>
				</i-col>
			</i-form>
            
        </Row>
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
                <!-- 相似性分析 MDS 聚类图
            <Spin size="large" fix v-if="spinShow2"></Spin>
            <vue-plotly :autoResize="ifResize" :data="clusterbyCellType_data" :layout="clusterbyCellType_layout" :options="clusterbyCellType_options"/>

            </div>
        </Row> -->
        <!-- <Row>
            <h1 class="my_h1">Unsupervised Clustering group by source and cell </h1>
            <div>
                <!-- 相似性分析 MDS 聚类图
            <Spin size="large" fix v-if="spinShow1"></Spin>
            <vue-plotly :autoResize="ifResize" :data="clusterbySourceCell_data" :layout="clusterbySourceCell_layout" :options="clusterbySourceCell_options"/>

            </div>
        </Row> -->
	</div>
   
     
</template>


<script>
import VuePlotly from '@statnett/vue-plotly'
import {getClusterDataAll,} from '@/api/erythroidAtlas'
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
            spinShow1:'true',
			clusterbyifVivo_data:[],
			clusterbyifVivo_layout:{},
            clusterbyifVivo_options:{
                responsive: true,
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
            group_type_list : [ 
				{
					id:"0",
                    name:"development type ",
                    value:'development_type'
				},
				{
					id:'1',
                    name:"cell type ",
                    value:'cell_type'
                },
                {
                    id:'2',
                    name:"development and cell type " ,
                    value:'group'
                }
        
				
				],
        }
    },
    watch:{
        selectList: {
            handler(val){
                // console.log(val)
                
                if (val[0].orga == 'hs'){
                    this.orga_name = 'Homo sapiens'

                }
                if(val[0].orga == 'mm'){
                    this.orga_name = 'Mus musculus'
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
	  changedClustChart(value){
        //   alert(value)
          let _this = this
          this.group_type_list.forEach(function(item){
              if(item.name == value){
                  _this.colorby = item.value
              }

          })
        //   alert(_this.colorby)
        var table_name = 'all_'+this.orga +'rna'+'_dev_'+this.sequ_type+'cluster'
        var colorby = _this.colorby  //source / group / order 
        this.getCluster_chart3(this.selectList,colorby)

      },
	  getCluster_chart3(selectList,colorby){
        //   redcell.all_hsrnadev_bulkcluster
            // var table_name = 'all_'+this.orga +'rna'+'dev_'+this.sequ_type+'cluster'
            // var colorby = this.colorby  //source / group / order 
            var _this = this
            getClusterDataAll(selectList[0],colorby).then(res =>{
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
                                
                var layout={ 
                   
                    title:'',
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
                   
                    title:'Principal Components Analysis(in {{selectList[0].deve}})',
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
                   
                    title:'Principal Components Analysis(in {{selectList[0].deve}})',
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
       this.getCluster_chart3(this.selectList,colorby)
    //    this.getCluster_chart3('all_rna_dev');
    //    this.getCluster_chart2('all_rna_dev');
    //    this.getCluster_chart1('all_rna_dev');
    }


}
</script>



<style>
    .my_h1{
        font-size: calc((40/1920) * 100vw);
        text-align: center;
    }

    .lay_out{
        margin: 2% 2%  2% 2%;
    }



</style>

