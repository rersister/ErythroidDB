<template>



    <div>
        <h1 class='h1_title' > 
              About Dataset
        </h1>
        <br>
        <Row>
            

            <span>
                Show by:
            <Icon type="ios-arrow-down"></Icon>
            </span>
            <Select v-model="Datase2" style="width:150px" @on-change="changeStaType($event)">
                <Option
                v-for="item in typeList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
                >
            </Select>

          </Dropdown>
            <!--数据分类统计 -->			
			<Spin size="large" fix v-if="spinShow1"></Spin>
			<vue-plotly :data="type_data" :layout="type_layout" :options="type_options"/>
		
        </Row>

        <h1 class='h1_title' > 
              About Us
        </h1>
        <br>
        <!-- contact -->
        <Row>
            <Col span="12">
                
                    <h4><strong>Email:</strong></h4>
                    <br>
                    <p>fangxd@big.ac.cn</p>
                    <br>
                    <h4><strong>Contributors:</strong></h4>
                    <br>
                    <p>GuangMin Zheng</p>
                    <p>Hongzhu Qu</p>
                    <p>Zhaojun Zhang</p>
                    <p>Xiangdong Fang</p>
                    <br>
                    <h4><strong>Address:</strong></h4>
                    <br>
                    <p>Key Laboratory of Genome Sciences and Information</p>
                    <p>Beijing Institute of Genomics</p>
                    <p>Chinese Academy of Sciences</p>
                    <p>(China National Center for Bioinformation)</p>
                    <p>1 Beichen West Road, Chaoyang District</p>
                    <p>Beijing 100101, China</p>
                </Col>
            
                <Col span="12">
                    <img width="100%" src="@/assets/img/address.png" alt="img">
                    <!-- <img th:src="@{/img/address.png}" alt="Cinque Terre" align="middle" width="540px" height="400px"> -->
                    <br>
                </Col>
        </Row>
    </div>
   
     
</template>


<script>

import VuePlotly from '@statnett/vue-plotly'
import {getDataTypeInfo} from '@/api/erythdataset'

export default {
    name:"about",
    components:{
		VuePlotly,  
	},
	data(){

		return{
            typeList: [
                {
                    value: 'organism',
                    label: 'Organism',
                },
               
                {
                    value: 'development_type',
                    label: 'Experiment type',
                },
                {
                    value: 'cell_source',
                    label: 'Tissue',
                },

            ],
            spinShow1:'true',
            type_data:[],
			type_layout: {},              
			type_options: {
                responsive: true,
                    displaylogo: false,
                    toImageButtonOptions: {
                        format: 'svg', // one of png, svg, jpeg, webp
                        filename: 'data_state',
                        // height: 500,
                        // width: 700,
                        scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
                }
            },
            Datase2:'organism',
        }
    },
    methods:{

        getType_chart(type_name){
			let _this = this
			_this.spinShow1 = true
        //     getDiffData(this.series,diffgroup).then(res =>{
        //         let datas = res.data  
        //         // console.log(datas)             
        //         var data = [
        //                  {
        //                     x: datas.no_signifcant.logFC,
        //                     y: datas.no_signifcant.adj_P_Val,
        //                     mode: 'markers',
        //                     type: 'scatter',
        //                     name: 'Not Signifcant',
        //                     text: datas.no_signifcant.genes,
        //                     marker: { size: 4 }
        //                 },            
        //               {
        //                 x: datas.signifcant.logFC,
        //                 y: datas.signifcant.adj_P_Val,
        //                 mode: 'markers',
        //                 type: 'scatter',
        //                 name: 'Signifcant',
        //                 text: datas.signifcant.genes,
        //                 marker: { size:4 }
        //               },
                
        //         ]

        //         this.diff_data = data
                    
        //         var diff_layout={ 
                   
        //             title:'Differential analysis ' + diffgroup,

        //         //    subtitle: {
        //         //             text: 'Data Souce:' + this.series
        //         //     },
        //             xaxis: {
        //                 title:'Log2(FC)',
        //             },
        //              yaxis: {
        //                title:'-Log2(adj.P.Val)'
        //             },

        //         }         
        //         this.diff_layout = diff_layout
        //         _this.spinShow1 = false
        //    }) 
        
            getDataTypeInfo(type_name).then(res =>{
                let datas = res.data  
                console.log(datas)
                let vdata = datas.vdata
                let ldata = datas.ldata
                let vname = datas.vname
                let ultimateColors = datas.uColors
                var data = []   
                for ( var i = 0; i < vdata.length; i ++ ) {
						// alert(nData[i])
						var result = {
							values: vdata[i],
							labels: ldata[i],
							domain: {column:i},
							name: vname[i],
							hoverinfo :'label+percent+name',
                            textinfo:'value',
                            marker: {
                                colors: ultimateColors[i]
                            },

                            hole: .4,
                            // colors:'#FF7F0E',
                            type: 'pie'
						};
						data.push(result)   
				};
                // var data = [
                // {
                //     values: [16, 15, 12, 6, 5, 4, 42],
                //     labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
                //     domain: {column: 0},
                //     name: 'GHG Emissions',
                //     hoverinfo: 'label+percent+name',
                //     hole: .4,
                //     type: 'pie'
                // },
                // {
                //     values: [27, 11, 25, 8, 1, 3, 25],
                //     labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
                //     text: 'CO2',
                //     textposition: 'inside',
                //     domain: {column: 1},
                //     name: 'CO2 Emissions',
                //     hoverinfo: 'label+percent+name',
                //     hole: .4,
                //     type: 'pie' 
                // },
                //     {
                //     values: [30, 62 ,25, 8, 1, 3, 25],
                //     labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
                //     text: 'CO2',
                //     textposition: 'inside',
                //     domain: {column: 2},
                //     name: 'CO2 Emissions',
                //     hoverinfo: 'label+percent+name',
                //     hole: .4,
                //     type: 'pie' 
                // }
                // ];
            
           
                var layout = {
                    title: 'Dataset information statistics',
                    annotations: [
                        {
                        font: {
                            size: 18
                        },
                        showarrow: false,
                        text: 'Dataset',
                        x: 0.12,
                        y: 0.5
                        },
                        {
                        font: {
                            size: 18
                        },
                        showarrow: false,
                        text: 'Sample',
                        x: 0.5,
                        y: 0.5
                        },
                        {
                        font: {
                            size: 18
                        },
                        showarrow: false,
                        text: 'Cell',
                        x: 0.86,
                        y: 0.5
                        }
                    ],
                    // height: 400,
                    // width:900,
                    showlegend: true,
                    grid: {rows: 1, columns: 3}
                };


                this.type_data = data
                this.type_layout = layout
                _this.spinShow1 = false
            })

            
        },

        changeStaType($event){
            // alert($event)
            // let _this = this
            this.type_name = $event
            this.getType_chart($event);
        },

    },
    mounted(){
       
        var type_name = 'organism'
        this.getType_chart(type_name);


    }

}
</script>



<style>


.ivu-card{
    font-size: 18px;
}

.h1_title{
    font-weight: bold;
}
</style>

