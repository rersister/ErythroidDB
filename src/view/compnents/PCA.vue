<template>


<div>

	<!-- 
		Principal component analysis -->
    <br/>
	<h1 class="my_h1">Principal Component Analysis (PCA)</h1>
	<Row>
		<!-- 相似性分析 MDS 聚类图-->
		<Spin size="large" fix v-if="spinShow3"></Spin>
		<vue-plotly :data="sim_data" :layout="sim_layout" :options="sim_options"/>
        <Button type="primary" size="large" @click="exportPCAData()"><Icon type="ios-download-outline"></Icon>Download Data</Button>

	</Row>
 

</div>
    
</template>


<script>
import VuePlotly from '@statnett/vue-plotly'
import {getsimData,getDatasetSourceInfoData,getPCAData} from '@/api/erythdataservice'
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
                displaylogo: false,
                toImageButtonOptions: {
                    format: 'svg', // one of png, svg, jpeg, webp
                    filename: 'pca_image',
                    height: 500,
                    width: 700,
                    scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
                }
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

                const capitalizedFirst = this.Dgrowth_mode[0].toUpperCase();
                const rest = this.Dgrowth_mode.slice(1);
                var myCagrowth_type = capitalizedFirst + rest 
                // alert(this.Dgrowth_mode) 
                // alert(myCagrowth_type)
                var layout={ 
                   
                    title:'PCA'+' ('+ this.series +'; Source:' + this.Dsource + "; Experiment type: "+ myCagrowth_type  +')',

                    

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
        },

        exportPCAData() {
            let _this = this
            this.$Spin.show({
                    render: (h) => {
                        return h('div', [
                            h('Icon', {
                                'class': 'demo-spin-icon-load',
                                props: {
                                    type: 'ios-loading',
                                    size: 18
                                }
                            }),
                            h('div', 'Dowloding')
                        ])
                    }
            });
            getPCAData(this.series).then( response =>{
                let blob = new Blob([response.data],{ type: 'application/vnd.ms-excel' });
                //如果后台返回文件名称
                //注意一定要和后端协调好返回的数据格式，不然会出现中文乱码问题
                var fileName = this.series + '_pca_data.xls'
                if ('msSaveOrOpenBlob' in navigator) {
                    window.navigator.msSaveOrOpenBlob(blob, fileName);
                } else {
                    const elink = document.createElement('a');
                    elink.download = fileName;
                    elink.style.display = 'none';
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href);
                    document.body.removeChild(elink);
                }
                this.$Spin.hide()

            })
            this.$Loading.finish();
        },
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




</style>

