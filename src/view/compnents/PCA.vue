<template>


<div>

	<!-- 
		Principal component analysis -->
	<h1>Principal Component Analysis</h1>
	<Row>
		<!-- 相似性分析 MDS 聚类图-->
		<Spin size="large" fix v-if="spinShow3"></Spin>
		<vue-plotly :data="sim_data" :layout="sim_layout" :options="sim_options"/>

	</Row>
	<router-link to="/Dataset_service">
            <div style="text-align:right;font-size:calc((30/1920) * 100vw);">
                <!-- <img width="20%" height="10%" src="@/assets/img/red_sys.jpg"> -->
                <h3>Back To Dataset Service</h3>
                
            </div> 
	</router-link>  

</div>
    
</template>


<script>
import VuePlotly from '@statnett/vue-plotly'
import {getsimData,getDatasetGroup} from '@/api/erythdataservice'
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
                   
                    title:'Similarity analysis('+this.series+'('+ this.source+')'+')',

                    

                    xaxis: {
                        title:'Leading logFC dim 1',
                    },
                     yaxis: {
                       title:'Leading logFC dim 2'
                    },

                }           
                this.sim_layout = layout
                _this.spinShow3 = false

           })

        },
        getDatasetSampleGroup(){
             let _this = this
             getDatasetGroup(this.$store.state.app.CurrentPageToken).then(res =>{
                let datas =res.data
                console.log(datas)
                let samples_data = datas.sample
                let datasetsource = datas.source
                _this.source = datasetsource
                // let gse = datas.gse
                // let group = datas.group               
                // var samples_string = 'gid   ' + 'sample ' + 'group' +"<br/>"
                // if (samples_data != null){
                //     for (var i=0;i<samples_data.length;i++){ 
                //         samples_string = samples_string + "<a href=https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=" + gse[i] +">"+ gse[i] +"</a>"+' ' +samples_data[i]+'    '+group[i]+"<br/>"
                        
                //     }


                // }
                // _this.samples = samples_string
                
            })
        }
	},
	
	mounted (){
        //alert(this.series)
        this.getDatasetSampleGroup();
		this.getsim_chart(this.series);


	}

    
}
</script>

<style>

    .h3_title{
		font-size:calc((30/1920) * 100vw);
		   
	}


</style>

