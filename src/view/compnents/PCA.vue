<template>


<div>

	<!-- 
		Principal component analysis -->
    <br/>
	<h1>Principal Component Analysis(PCA)</h1>
	<Row>
		<!-- 相似性分析 MDS 聚类图-->
		<Spin size="large" fix v-if="spinShow3"></Spin>
		<vue-plotly :data="sim_data" :layout="sim_layout" :options="sim_options"/>

	</Row>
 

</div>
    
</template>


<script>
import VuePlotly from '@statnett/vue-plotly'
import {getsimData,getDatasetSourceInfoData} from '@/api/erythdataservice'
export default {
	name:"PCA",
	components:{
		VuePlotly,  

	},
	data(){
		return{
			series:this.$store.state.app.CurrentPageToken,
			spinShow3:'true',
			sim_data:[],
			sim_layout:{},
			sim_options:{
                responsive: true,
            },
            source:'',
            Dsource:'',
            Dgrowth_mode:''
		}
	},
	methods:{

		getsim_chart(series){
            
            var _this = this
            getsimData(this.series).then(res =>{
                let datas = res.data  
                console.log(datas)             
                // var data = [
                //     {
                //         x: datas.x_list,
                //         y: datas.y_list,
                //         mode: 'markers',
                //         type: 'scatter',
                //         name: 'fetal',
                //         text: datas.sample,
                        
                //         marker: { size: 15 }
                //     },
                //     {
                //         x: datas.x_list,
                //         y: datas.y_list,
                //         mode: 'markers',
                //         type: 'scatter',
                //         name: 'adult',
                //         text: datas.sample,                       
                //         marker: { size: 15 }
                //     },              
                // ]

                this.sim_data = datas.data                    
                var layout={ 
                   
                    title:'PCA of '+this.series+'( Source:' + this.Dsource + ";Growth Mode:"+ this.Dgrowth_mode +')',

                    

                    xaxis: {
                        title:'Dim 1',
                    },
                     yaxis: {
                       title:'Dim 2'
                    },

                }           
                this.sim_layout = layout
                _this.spinShow3 = false

           })

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
	
	mounted (){
        //alert(this.series)
        // this.getDatasetSampleGroup();
        this.getDatasetSourceInfo(this.series)
		this.getsim_chart(this.series);


	}

    
}
</script>

<style>

    .h3_title{
		font-size:calc((30/1920) * 100vw);
		   
	}


</style>

