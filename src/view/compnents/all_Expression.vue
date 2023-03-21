<template>
    <div class="lay_out">
        <div>
         
            <h1 class="my_h1">Expression Profile (Organism: {{orga_name}})</h1>
            <!-- <h1 class="my_h1">Expression Profiling ({{selectList[0]}})</h1> -->
            </Br>
            <Row>
                <Col span="12">
                    <i-select v-model="cell_source"  placeholder="Please choose source" clearable style="width:80%" @on-change='changeCellSource($event)'  filterable>
                        <i-option v-for="item in SourceList" :value="item.value" >{{ item.label }}</i-option>
                    </i-select>  
                </Col>
                <Col span="12">
                    <!-- 数据查询分子名 -->
                    <!-- <Input search enter-button="Search" @on-search="searchBygene($event)" placeholder="Please input gene symbol"/>                          -->
                    <i-select v-model="searchGene" placeholder="Please input gene symbol" clearable style="width:80%" @on-change='changeGsymbol($event)'  filterable>
                        <i-option v-for="item in GeneList" :value="item.value" >{{ item.label }}</i-option>
                    </i-select>
                    <Button type="primary" @click="searchBygene($event)" >Search</Button>
                </Col>

            </Row>
            </Br>
            <div>
                <Row>					
                    <!-- tsne 图 -->			
                    <!-- <Spin size="large" fix v-if="spinShow1"></Spin> -->
                    <vue-plotly id='vivoE_chart' :autoResize="ifResize" :data="vivo_data" :layout="vivo_layout" :options="vivo_options"/>
                </Row>
            </div>
        </div>
        <div v-show="ifShow">
            <!-- <h1 class="my_h1" v-show="ifShow" >Expression profiling ({{selectList[1]}})</h1> -->
            <Row v-show="ifShow">
                <!-- <Col span="12">
                    <i-select placeholder="Please choose cell source" clearable style="width:80%" @on-change='changeVivtroCellSource($event)($event)'>
                        <i-option v-for="item in vitroSourceList" :value="item.value" >{{ item.label }}</i-option>
                    </i-select>
                </Col> -->
                <Col span="12" v-show="ifShow">
                    <!-- 数据查询分子名 -->
                    <Input search enter-button="Search" @on-search="searchVivtroBygene($event)" placeholder="Please input gene symbol"/>                         
                </Col>

            </Row>
            <div v-show="ifShow">
                <!-- <Row>					 -->
                    <!-- tsne 图 -->			
                    <!-- <Spin size="large" fix v-if="spinShow1"></Spin> class = "plo_my"-->
                    <vue-plotly v-show="ifShow" :autoResize="ifResize2"  :data="vitro_data" :layout="vitro_layout" :options="vitro_options"/>
                <!-- </Row> -->
            </div>
        </div>
	</div>
   
     
</template>


<script>
// getAllDevExpreBulkData
import {getAllDevExpreBulkData,getAllDevType,getAllDevGene} from '@/api/erythroidAtlas'
import VuePlotly from '@statnett/vue-plotly'

const source_dict = [
   {
      value: "BM_vitro",
      name: 'Bone Marrow (in vitro)'
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
      value: "PB_vivo",
      name: 'Peripheral Blood (in vivo)',
      // color: 'green'
    },
    {
      value: "iPSC_vitro",
      name: 'Induced Pluripotent Stem Cells (in vitro)',
      // color: 'green'
    },
    
  ]


export default {
    name:"AllExpression",
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
           ifShow: false,
           ifResize:true,
           ifResize2:true,
           vitro_data:[],
           vivo_data:[],
           vivo_layout:{},
           vitro_layout:{},
           vivo_options:{
                responsive: true,
                displaylogo: false,
                toImageButtonOptions: {
                    format: 'svg', // one of png, svg, jpeg, webp
                    filename: 'all_expression',
                    height: 500,
                    width: 700,
                    scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
                }
           },
           vitro_options:{
                    responsive: true,
					displaylogo: false,
					toImageButtonOptions: {
						format: 'svg', // one of png, svg, jpeg, webp
						filename: 'all_expression',
						height: 500,
						width: 700,
						scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
					}
           },
           SourceList:[
           ],
           GeneList:[],
           vitroSourceList:[
                {
                    value: 'BM_vitro', // 传入后台的查询值
                    label: 'BM (in vitro)'
                },
                {
                    value: 'CB_vitro',
                    label: 'CB (in vitro)'
                },
                {
                    value: 'FL_vitro',
                    label: 'FL (in vitro)'
                },
                {
                    value: 'ESC_vitro',
                    label: 'ESC (in vitro)'
                },
                {
                    value: 'PB_vitro',
                    label: 'PB (in vitro)'
                },
                {
                    value: 'vitro',
                    label: 'All (in vitro)'
                }
           ],
           cell_source:'',
           vitro_source:'vitro',
           searchGene: 'AATK',
           searchVitroGene:'AATK'
        }
    },
    watch:{
        selectList: {
            handler(val){
                console.log(val)
                var table_name =
                    'all_' +
                    val[0].orga +
                    '_ep_' +
                    val[0].sequnceType 
                this.table_name = table_name
                this.getAllDevType(table_name)
                this.getAllDevGene(table_name)

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

        getAllDevType(table_name){
            let dev_group_type_list = []
            // this.table_name = 'all_hs_ep_bulk'
            // var table_name = selectDict
			// alert(table_name)
            getAllDevType(table_name).then(res =>{
                let datas = res.data 
                //console.log(datas)  
                datas.forEach(key =>{ 
                    // alert(key)
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
				//this.getdiff_chart(table_name,datas[0])
                this.cell_source = datas[0]
                this.searchGene = "GATA1"
                this.searchBygene("GATA1")
               
            })


        },

        getAllDevGene(table_name){

             let all_gene_list = []
            // this.table_name = 'all_hs_ep_bulk'
            // var table_name = selectDict
			// alert(table_name)
            getAllDevGene(table_name).then(res =>{
                let datas = res.data 
                //console.log(datas)  
                datas.forEach(key =>{ 
                    
                     
                    all_gene_list.push({
                            value:key,
                            label:key,
                    })
                   
                  
                
                    
                
                })
                this.GeneList = all_gene_list

            })

        },

        getVitroExpreChart(){
        },
        getVivoExpreChart(cell_source,searchGene){
            let _this = this
            // alert(cell_source)

            

        },
        searchVivtroBygene($event){
            // alert(this.vitro_source)
            // alert($event)
            this.searchVitroGene = $event
            if( "" == this.vitro_source ){
                this.$Message.info('please select source', 10);
                return
            } 
            if( "" ==  $event ){
                this.$Message.info('please input gene symbol', 10);
                return
            } 
            
            getAllDevExpreBulkData(this.selectList[1],this.searchVitroGene).then( res =>{
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
                    }

                    let layout1 = {
                        title:  this.searchVitroGene +' expression level (Source: '+ this.cell_source+')',
                        // autosize:true,
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
                    let layout = {
                        title:  this.searchGene +' expression level (Source: '+ this.selectList[1]+')',
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
                    this.vitro_layout = layout
                }

            })
        },

        changeGsymbol($event){
            this.searchGene= $event
        },

        searchBygene(){
            // alert(this.cell_source)
            // alert(this.searchGene)
            // this.searchGene= $event
            if( "" == this.cell_source ){
                this.$Message.info('please select source', 10);
                return
            } 
            if( "" ==  this.searchGene ){
                this.$Message.info('please input gene symbol', 10);
            } 
            // alert('进来')
            // this.$options.methods.getVivoExpreChart(this.cell_source,this.searchGene)
            // alert(this.searchGene)
            getAllDevExpreBulkData(this.selectList[0],this.searchGene,this.cell_source).then( res =>{
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
                    }

                    var cell_source_full_name  = ''
                    source_dict.forEach(element => {
                        if(element.value == this.cell_source){
                           cell_source_full_name = element.name
                        }
                    });

                    let layout = {
                        title:  this.searchGene +' expression level (Source: '+ cell_source_full_name+')',
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
                            zerolinewidth: 2,
                            title:"Normalized value",
                        },
                        xaxis:{

                            title:"Group"
                        },
                        margin: {
                                l: 40,
                                r: 40,
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
       
        searchSelect1(val,searchGene){

            getAllDevExpreBulkData(val,searchGene).then( res =>{
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
                        }
                        let layout = {
                            title:  this.searchGene +' expression level (Source: '+ this.selectList[0]+')',
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
        searchSelect2(val,searchGene){
            getAllDevExpreBulkData(val,searchGene).then( res =>{
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
                    }

                    let layout1 = {
                        title:  this.searchVitroGene +' expression level (Source: '+ this.vitro_source+')',
                        // autosize:true,
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
                    let layout = {
                        title:  this.searchGene +' expression level (Source: '+ this.selectList[1]+')',
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
                    this.vitro_layout = layout
                }

            })
        },
        changeCellSource($event){
            // alert($event)
            this.cell_source = $event
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
            }

            let layout = {
                title: 'AAGAB expression level (CB)',
                yaxis: {
                    autorange: true,
                    showgrid: true,
                    zeroline: true,
                    dtick: 5,
                    gridcolor: 'rgb(255, 255, 255)',
                    gridwidth: 1,
                    zerolinecolor: 'rgb(255, 255, 255)',
                    zerolinewidth: 2,
                    title:"Normalized value"
                },
                xaxis:{

                    title:"Group"
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
           


        },

      
         

       
    },
    
    mounted(){
        // alert(this.selectList)
       
    },
    created(){
        
    },
    
    

}


</script>



<style>
    .lay_out{
        margin: 2% 2%  2% 2%;
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

