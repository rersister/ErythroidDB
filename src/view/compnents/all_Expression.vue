<template>
    <div class="lay_out">
        <div>
            <h1 class="my_h1">Expression profiling(vivo)</h1>
            <Row>
                <Col span="12">
                    <i-select placeholder="Please choose cell source" clearable style="width:80%" @on-change='changeVivoCellSource($event)'>
                        <i-option v-for="item in vivoSourceList" :value="item.value" >{{ item.label }}</i-option>
                    </i-select>
                </Col>
                <Col span="12">
                    <!-- 数据查询分子名 -->
                    <Input search enter-button="Search" @on-search="searchVivoBygene($event)" placeholder="Please input gene symbol"/>                         
                </Col>

            </Row>
            <div>
                <Row>					
                    <!-- tsne 图 -->			
                    <!-- <Spin size="large" fix v-if="spinShow1"></Spin> -->
                    <vue-plotly id='vivoE_chart' :autoResize="ifResize" :data="vivo_data" :layout="vivo_layout" :options="vivo_options"/>
                </Row>
            </div>
        </div>
        <div>
            <h1 class="my_h1">Expression profiling(vitro)</h1>
            <Row>
                <Col span="12">
                    <i-select placeholder="Please choose cell source" clearable style="width:80%" @on-change='changeVivtroCellSource($event)($event)'>
                        <i-option v-for="item in vitroSourceList" :value="item.value" >{{ item.label }}</i-option>
                    </i-select>
                </Col>
                <Col span="12">
                    <!-- 数据查询分子名 -->
                    <Input search enter-button="Search" @on-search="searchVivtroBygene($event)" placeholder="Please input gene symbol"/>                         
                </Col>

            </Row>
            <div class="plotly_chat">
                <!-- <Row>					 -->
                    <!-- tsne 图 -->			
                    <!-- <Spin size="large" fix v-if="spinShow1"></Spin> class = "plo_my"-->
                    <vue-plotly :watchShallow="ifResize" :autoResize="ifResize"  :data="vitro_data" :layout="vitro_layout" :options="vitro_options"/>
                <!-- </Row> -->
            </div>
        </div>
	</div>
   
     
</template>


<script>
// getAllDevExpreBulkData
import {getAllDevExpreBulkData,} from '@/api/erythroidAtlas'
import VuePlotly from '@statnett/vue-plotly'
export default {
    name:"all_Expression",
    components:{
		VuePlotly, 

	},
    data(){
        return{
           ifResize:true,
           vitro_data:[],
           vivo_data:[],
           vivo_layout:{},
           vitro_layout:{},
           vivo_options:{
               responsive: true,
           },
           vitro_options:{
                responsive: true,
           },
           vivoSourceList:[
                {
                    value: 'PB', // 传入后台的查询值
                    label: 'PB'
                },
                {
                    value: 'CB',
                    label: 'CB'
                },
                {
                    value: 'BM',
                    label: 'BM'
                },
                {
                    value: 'vivo',
                    label: 'All(vivo)'
                }
           ],
           vitroSourceList:[
                {
                    value: 'BM_vitro', // 传入后台的查询值
                    label: 'BM(vitro)'
                },
                {
                    value: 'CB_vitro',
                    label: 'CB(vitro)'
                },
                {
                    value: 'FL_vitro',
                    label: 'FL(vitro)'
                },
                {
                    value: 'ESC_vitro',
                    label: 'ESC(vitro)'
                },
                {
                    value: 'PB_vitro',
                    label: 'PB(vitro)'
                },
                {
                    value: 'vitro',
                    label: 'All(vitro)'
                }
           ],
           vivo_source:'vivo',
           vitro_source:'vitro',
           searchVivoGene: 'AATK',
           searchVitroGene:'AATK'
        }
    },
	methods:{
         getVitroExpreChart(){

            
           


        },
        getVivoExpreChart(vivo_source,searchVivoGene){
            let _this = this
            // alert(vivo_source)

            

        },
        searchVivtroBygene($event){
            // alert(this.vitro_source)
            // alert($event)
            this.searchVitroGene = $event
            if( "" == this.vitro_source ){
                this.$Message.info('please select cell source', 10);
                return
            } 
            if( "" ==  $event ){
                this.$Message.info('please input gene symbol', 10);
                return
            } 
            
            getAllDevExpreBulkData(this.vitro_source,this.searchVitroGene).then( res =>{
                let datas = res.data
                console.log(res.data)
                if (datas.signal == 0){
                    // alert(datas.message)
                    this.$Message.info("Please check your input(no such gene)", 10);
                    this.spinShow4 = false
                    
                }else{
                    // alert(datas.xData)
                    // alert(datas.yData)
                    this.vitro_data = []
                    var xData = datas.xData
                    var yData =datas.yData
                    for ( var i = 0; i < xData.length; i ++ ) {
                        var result = {
                            type: 'box',
                            y: yData[i],
                            name: xData[i],
                            boxpoints: 'all',
                            jitter: 0.5,
                            whiskerwidth: 0.2,
                            fillcolor: 'cls',
                            marker: {
                                size: 2
                            },
                            line: {
                                width: 1
                            }
                        };
                        // alert(this.vivo_data)
                        this.vitro_data.push(result);
                    };
                    let layout = {
                        title:  this.searchVitroGene +' expression level in  erythroid differentiation('+ this.vitro_source+')',
                        autosize:true,
                        yaxis: {
                            
                            autorange: true,
                            rangemode :"normal",
                            // range: list(0,20), 
                            showgrid: true,
                            zeroline: true,
                            // dtick: 5,
                            gridcolor: 'rgb(255, 255, 255)',
                            gridwidth: 1,
                            zerolinecolor: 'rgb(255, 255, 255)',
                            zerolinewidth: 2
                        },
                        margin: {
                                l: 40,
                                r: 30,
                                b: 80,
                                t: 100
                            },
                        paper_bgcolor: 'rgb(243, 243, 243)',
                        plot_bgcolor: 'rgb(243, 243, 243)',
                        showlegend: false,
                        

                    };
                    
                    this.vitro_layout = layout
                }

            })
        },
        searchVivoBygene($event){
            // alert(this.vivo_source)
            // alert($event)
            this.searchVivoGene= $event
            if( "" == this.vivo_source ){
                this.$Message.info('please select cell source', 10);
            } 
            if( "" ==  $event ){
                this.$Message.info('please input gene symbol', 10);
            } 
            // alert('进来')
            // this.$options.methods.getVivoExpreChart(this.vivo_source,this.searchVivoGene)
            // alert(this.searchVivoGene)
            getAllDevExpreBulkData(this.vivo_source,this.searchVivoGene).then( res =>{
                let datas = res.data
                console.log(res.data)
                if (datas.signal == 0){
                    // alert(datas.message)
                    this.$Message.info("Please check your input(no such gene)", 10);
                    this.spinShow4 = false
                    
                }else{
                    // alert(datas.xData)
                    // alert(datas.yData)
                    this.vivo_data = []
                    var xData = datas.xData
                    var yData =datas.yData
                    for ( var i = 0; i < xData.length; i ++ ) {
                        var result = {
                            type: 'box',
                            y: yData[i],
                            name: xData[i],
                            boxpoints: 'all',
                            jitter: 0.5,
                            whiskerwidth: 0.2,
                            fillcolor: 'cls',
                            marker: {
                                size: 2
                            },
                            line: {
                                width: 1
                            }
                        };
                        // alert(this.vivo_data)
                        this.vivo_data.push(result);
                    };
                    let layout = {
                    title:  this.searchVivoGene +' expression level in  erythroid differentiation('+ this.vivo_source+')',
                    bargap: 0.25,
                    yaxis: {
                        
                        autorange: true,
                        rangemode :"normal",
                        // range: list(0,20), 
                        showgrid: true,
                        zeroline: true,
                        // dtick: 5,
                        gridcolor: 'rgb(255, 255, 255)',
                        gridwidth: 1,
                        zerolinecolor: 'rgb(255, 255, 255)',
                        zerolinewidth: 2
                    },
                    margin: {
                            l: 40,
                            r: 30,
                            b: 80,
                            t: 100
                        },
                        paper_bgcolor: 'rgb(243, 243, 243)',
                        plot_bgcolor: 'rgb(243, 243, 243)',
                        showlegend: false
                    };
                    this.vivo_layout = layout
                }

            })
        
        },
       
        changeVivoCellSource($event){
            // alert($event)
            this.vivo_source = $event
        },
        changeVivtroCellSource($event){
           this.vitro_source = $event

        },
        getrandom(num , mul){
            var value = [ ];
                for (var i = 0; i <= num; i++ ) {
                    var rand = Math.random() * mul;
                    value.push(rand);
                }
                return value;
        },
        gettpmE_chart(){
            
            var xData = ['MEP<br>', 'BFU-E<br>',
                'CFU-E<br>', 'pro-E<br>',
                'early<br>basophilic', 'late<br>basophilic',
                'polychromatic<br>', 'orthochromatic<br>',
                'reticulocyte<br>'];

            var yData = [
                    this.$options.methods.getrandom(30 ,10),
                    this.$options.methods.getrandom(30, 20),
                    this.$options.methods.getrandom(30, 25),
                    this.$options.methods.getrandom(30, 40),
                    this.$options.methods.getrandom(30, 45),
                    this.$options.methods.getrandom(30, 30),
                    this.$options.methods.getrandom(30, 20),
                    this.$options.methods.getrandom(30, 15),
                    this.$options.methods.getrandom(30, 43),
                ];
            var colors = ['rgba(93, 164, 214, 0.5)', 'rgba(255, 144, 14, 0.5)', 'rgba(44, 160, 101, 0.5)', 'rgba(255, 65, 54, 0.5)', 'rgba(207, 114, 255, 0.5)', 'rgba(127, 96, 0, 0.5)', 'rgba(255, 140, 184, 0.5)', 'rgba(79, 90, 117, 0.5)', 'rgba(222, 223, 0, 0.5)'];

           

            for ( var i = 0; i < xData.length; i ++ ) {
                var result = {
                    type: 'box',
                    y: yData[i],
                    name: xData[i],
                    boxpoints: 'all',
                    jitter: 0.5,
                    whiskerwidth: 0.2,
                    fillcolor: 'cls',
                    marker: {
                        size: 2
                    },
                    line: {
                        width: 1
                    }
                };
                this.tpmE_data.push(result);
            };

            let layout = {
                title: 'AAGAB expression level in  erythroid differentiation(CB)',
                yaxis: {
                    autorange: true,
                    showgrid: true,
                    zeroline: true,
                    dtick: 5,
                    gridcolor: 'rgb(255, 255, 255)',
                    gridwidth: 1,
                    zerolinecolor: 'rgb(255, 255, 255)',
                    zerolinewidth: 2
                },
                margin: {
                    l: 40,
                    r: 30,
                    b: 80,
                    t: 100
                },
                paper_bgcolor: 'rgb(243, 243, 243)',
                plot_bgcolor: 'rgb(243, 243, 243)',
                showlegend: false
            };

            this.tpmE_layout = layout
           


        }

      
           

       
    },
    mounted(){
      
        // this.gettpmE_chart()  
        this.searchVivoBygene(this.searchVivoGene)
        this.searchVivtroBygene(this.searchVitroGene)

        window.onresize = ()=>{
    　　　　
         
        }
    }


}
</script>



<style>
    .lay_out{
        margin: 2% 2%  2% 2%;
    }

    .my_h1{
        font-size: calc((40/1920) * 100vw);
        text-align: center;
    }
    .my_input{
        font-size: calc((40/1920) * 100vw);
        width:calc((100/1920) * 100vw); 
    }

    .plotly_chat{
        width:calc((1700/1920) * 100vw); 
    }
    .plo_my{

        height: 100%;
        width: 100%;
    }
</style>

