<template>



    <div class="lay_out">      <!-- enrichGO analysis -->  

        <h1 class="my_h1">Enrichment Analysis  ({{orga_name}}) </h1> 
        </Br>
        <div>
            <Row>
                <!-- <Col span="12">
                    <i-select placeholder="Pleace select cell source" clearable style="width:80%" @on-change='changedSourceGroup'>
                        <i-option v-for="(source,index) in source_group" :key='index' :value="source.name">{{ source.name }}</i-option>
                    </i-select>
                </Col> -->
                <Col span="12">
                    <!-- 数据查询分子名 -->
                    <i-select :model.sync="contrastsGroup" clearable placeholder="Pleace select contrasts group"  @on-change="changedContrGroup">        
                        <i-option v-for="(group,index) in contrasts_group" :key='index' :value="group.name">{{ group.name }}</i-option>
                    </i-select>
                </Col>
            </Row>
             
            </Br>
		
			<Row> 
                <div>
                    <Spin size="large" fix v-if="spinShow2"></Spin>             
                    <vue-plotly :autoResize="ifResize" :data="enrichGO_data" :layout="enrichGO_layout" :options="enrichGO_options"/>
                </div>
            </Row> 
		</div>

    </div>  
    
</template>


<script>
import {getdiffGroup} from '@/api/erythdataservice'
import {getAllEnrichData}  from '@/api/erythroidAtlas'
import VuePlotly from '@statnett/vue-plotly'
export default {
	name:"all_Enrich",
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
				enrichGO_data:[],
				enrichGO_layout:{},
				enrichGO_options:{
                    responsive: true,
                },
				contrasts_group:[],
				contrastsGroup:'',
				sourceGroup:'vivo',
                contrGroupOfEnrich:'',
                GOformItem:{},
                spinShow2:'true',
                series:this.$store.state.app.CurrentPageToken,
             
                enrichGroup:'',
                enrichGroupList:[
				],
				table_name:'all_rna_dev_bulk_vivo',
				source_group:[
					{
						name:'vivo'
					},
					{
						name:'vitro'
					},
					{
						name:'vivo-vitro'
					}

				],
                // goTypeList:[
                //     {
                //         name:'CC'
                //     },
                //     {
                //         name:"MF"
                //     },
                //     {
                //         name:"BP"
                //     },
            	// ],

        }
    },
    watch:{
        selectList: {
            handler(val){
                //console.log(val)
                
                // if (val[0].deve == 'vivo'){

                // }else{

                // }
				var table_name =
                    'all_' +
                    val[0].orga +
                    '_ep_' +
                    val[0].sequnceType 
                this.table_name = table_name

                this.getdiff_group(this.table_name);

                this.getdiff_group(this.table_name);
				                if (val[0].orga == 'hs'){
                    this.orga_name = 'Homo sapiens'

                }
                if(val[0].orga == 'mm'){
                    this.orga_name = 'Mus musculus'
                }
                
            },
            immediate:true
        },
      
        
    },
    methods:{
       
        getenrich_chart(table_name,contrastsGroup){

			this.spinShow2 = true
		
			// var trace1 = {
			// 	y: ['giraffes', 'orangutans', 'monkeys'],
			// 	x: [20, 14, 23],
			// 	name: 'SF Zoo',
			// 	type: 'bar',
			// 	orientation :'h',
			// };

			// var trace2 = {
			// y: ['gir', 'orang', 'monke'],
			// x: [-12, -18, -29],
			// name: 'LA Zoo',
			// type: 'bar',
			// orientation :'h',
			
			// };

			// var data = [trace2,trace1];

			// var layout = {};
			// this.enrichGO_data = data
			// this.enrichGO_layout = layout
            //alert(table_name)
            //alert(contrastsGroup)
            
			getAllEnrichData(table_name,contrastsGroup).then(res =>{ 
					let datas = res.data 
					var xData = datas.xData  // list 里面装list
					var yData =datas.yData   
					var nData = datas.nData
					var tData = datas.tData
					this.enrichGO_data = []
					for ( var i = 0; i < xData.length; i ++ ) {
						// alert(nData[i])
						var result = {
							x: xData[i],
							y: yData[i],
							name: nData[i],
							type: 'bar',
							orientation :'h',
						};
						this.enrichGO_data.push(result)   
					};

					var layout = {
						title:'GO (in '+ this.sourceGroup+ ') enrichment of ' + this.contrastsGroup,
                        bargap: 0.25,
                        xaxis: {
							title:'-log10(p.adjust)',
							// showgrid : TRUE,
						},
						yaxis: {
							// showgrid: TRUE,
                            title:{
                                    text: 'GO Term [-log10(p.adjust)]',
                                    position:'top',
                                    standoff: 40,
                                    yanchor:'top',
                                },
                            // yanchor:'top',
                            // position:'top',
                            automargin: true,
                            
                            rangemode: "normal",
                            dtick: 1,
							// axisLabel: {
                            // // 文件超出长度范围解决
                            // // show:true,
							// interval:0,
							
                            exponentformat: function (params){
                                if( params.length > 30)
                                    return params.substring(0,30) + '...';
                                else
                                    return params;
                            }
                        
                        },
                        margin: {
                            l:650
                        },
                       
                       
					}
					this.enrichGO_layout = layout
           })
           this.spinShow2 = false
		
		
		
		},
        changedContrGroupOfEnrich(contr_group){ 
            let enrich_group_list = []
            let _this = this
            let enrich_lists = contr_group.split('-')
           
            enrich_lists.forEach(key => enrich_group_list.push({
                name:key
            }))
            _this.enrichGroupList = enrich_group_list
            this.contrGroupOfEnrich = contr_group
                
          
        },
        changeGoType(goType){
            let _this = this
            this.goType = goType
        },
        changenrichType(enrichGroup){
            let _this = this
            this.enrichGroup = enrichGroup
		},
		
		getdiff_group(table_name){
            let contrasts_group_type_list = []
            let enrich_group_list = []
			let _this = this
			// alert(table_name)
            getdiffGroup(table_name).then(res =>{
                let datas = res.data 
                // console.log(datas)  
                datas.forEach(key => contrasts_group_type_list.push({
                    name:key
                }))
				this.contrasts_group = contrasts_group_type_list
				this.contrastsGroup = datas[0]
				// alert(this.contrastsGroup)
				this.getenrich_chart(this.table_name,this.contrastsGroup)
				
                // enrichGroup = datas[0].split('-')[0]
                // goType = 'CC'
               
            })
		},
		changedContrGroup(diffgroup){
			let _this = this  
		
			this.contrastsGroup = diffgroup

			this.getenrich_chart(this.table_name,this.contrastsGroup)

		},
		// changedSourceGroup(sourceGroup){
		// 	// alert(sourceGroup)
		// 	this.table_name = 'all_rna_dev_bulk_' + sourceGroup
		// 	this.sourceGroup = sourceGroup
		// 	// alert(this.table_name)
		// 	this.getdiff_group(this.table_name)
		// },


    },
    mounted(){

        this.getdiff_group(this.table_name);
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




</style>

