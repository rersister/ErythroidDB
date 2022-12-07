<template>
    <div>
        <div>
            <Row>
              
                <Collapse v-model="value1">   
                        <Panel name="1" class="Panel_c">
                                About EryDB
                                 <!-- All datasets were divided into different developmental stages. Unlike other added-value databases, EryDB allows users to easily retrieve and explore data of specific studies, determine differentially expressed genes and their functions via principal component analysis, differential gene expression analysis, gene set enrichment analysis, and transcription factor analysis under certain conditions, such as in vitro or in vivo. Besides, EryDB integrated single-cell RNA sequencing data to visualize gene expression in single cell resolution by color-coded t-SNE or UMAP plots. Plots and tables in EryDB are customizable, downloadable and interactive.  -->
                                <p class="p_text" slot="content">
                                    EryDB: a database of transcriptome profile of erythropoiesis and a web-accessible collection of expertly curated, quality-assured, and pre-analyzed data sets covering three species and nine sources, totaling {{allSampleN}} samples and {{allCellN}} single cell. 
                                </p>

                        </Panel>
                </Collapse> 

            </Row>
            <br>
            <Row>
                <Col span="12">
                 <!-- 走马灯 -->
                    <Carousel
                        v-model="value3"             
                        :autoplay="setting.autoplay"
                        :autoplay-speed="setting.autoplaySpeed"
                        :dots="setting.dots"
                        :radius-dot="setting.radiusDot"
                        :trigger="setting.trigger"
                        :arrow="setting.arrow">
                        <!-- <CarouselItem> -->
                            <!-- <a :href="intoDataSet('GSE150774')">  <button @click="intoDataSet('FLB000004')"  style="{cursor='hand'}" > </button> </a> -->
                            <!-- <div class="demo-carousel"><a><img width="90%" height="40%" src="@/assets/img/blood_1.png" alt="img"></a></div> -->
                            
                        <!-- </CarouselItem> -->
                        <!-- <button @click="intoDataSet('GSE32991')"  style="{cursor='hand'}" >  </button>-->
                        <CarouselItem>
                            <!-- <button @click="intoDataSet('FLB000003')"  style="{cursor='hand'}" > </button>-->
                            <div class="demo-carousel"><a><img width="100%"  src="@/assets/img/aboutSBySpecies.svg" alt="img"></a></div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel"><a><img width="80%" src="../../../../src/assets/img/compState.svg" alt="img"></a></div>
                        </CarouselItem>
                        <!-- <CarouselItem>
                            <!-- FLB000002  <button @click="intoDataSet('FLB000002')"  style="{cursor='hand'}" >  </button>
                            <div class="demo-carousel"><a><img width="80%" src="@/assets/img/geneEryDB.svg" alt="img"></a></div>
                        </CarouselItem> -->
                        <CarouselItem>
                            <!-- <button @click="intoDataSet('FLB000003')"  style="{cursor='hand'}" > </button>-->
                            <div class="demo-carousel"><a><img width="80%"  src="@/assets/img/datasetState.svg" alt="img"></a></div>
                        </CarouselItem>
                        
                    </Carousel>
                </Col>
                <Col span="12" class="keyWord">
                            <!-- 数据查询分子名 -->
                    </br>
                    </br>
                    </br>
                    </br>
                    <span >Input Reported Gene/Tissue/Dataset Id/Organism Name:</span>
                    <i-select enter-button="Search" style="width:80%"  @on-search="searchDataSetByKeyName($event)" :model.sync="showByGroup"  :placeholder="search_placeholder"  @on-change="searchDataSetByKeyName($event)"  filterable>        
							<i-option v-for="(value,index) in keyWords_list" :key='index' :value="value.name">{{ value.name }}</i-option>
					</i-select>
                    <Button type="primary" @click="searchByKeyWord()" >Search</Button>
                    <!-- <Input  filterable search enter-button="Search"    @on-search="searchDataSetByKeyName($event)" :placeholder="search_placeholder"/>                          -->
                
                </Col> 
            </Row>

        </div>
        <br>
    <!-- 1780 600 -->
   

        <!-- 内容卡片 -->
        <div class="card">
              <Row style="background:#eee;padding:10px">
                <Col span="8">
                   
                        <Card>
                                <!-- <div class="moudle">
                                    <!-- <img class="moudle_image" src="@/assets/img/subredcell.png"> 
                                    <div class="moudle_title">
                                      <!-- Differentiation 
                                    </div>
                                </div> -->
                                
                                <div class='count_div'>
                                    <p  class='h3_title'>Sample Number
                                        <count-to :end=allSampleN count-class="count-style"/>                                                              
                                    </p>
                                </div>
                        </Card>
                    
                </Col>
                <Col span="8">
                
                        <Card>
                                <!-- <div class="moudle">
                                    <img class="moudle_image" src="@/assets/img/gene.png">
                                    <div class="moudle_title">
                                      Genes
                                    </div>
                                </div> -->
                                
                                <div class='count_div'>
                                    <p  class='h3_title'>Single Cell Number
                                        <count-to :end=allCellN count-class="count-style"/>                                                              
                                    </p>
                                </div>
                        </Card>
                 
                </Col>
                <Col span="8">
                
                <Card>
                        <!-- <div class="moudle">
                            <img class="moudle_image" src="@/assets/img/gene.png">
                            <div class="moudle_title">
                              Genes
                            </div>
                        </div> -->
                        
                        <div class='count_div'>
                            <p  class='h3_title'>Study Number
                                <count-to :end=allStudyN count-class="count-style"/>                                                              
                            </p>
                        </div>
                </Card>
         
        </Col>

            </Row>
            <Row style="background:#eee;padding:10px">
                <Col span="12">
                    <router-link to="/Eryth">
                        <Card>
                                <div class="moudle">
                                    <img class="moudle_image" src="@/assets/img/subredcell.png">
                                    <!-- <div class="moudle_title"> -->
                                    <div class="moudle_title">
                                        Differentiation
                                    </div>
                                    <!-- </div> -->
                                </div>
                                
                                <div class='count_div'>
                                    <p  class='h3_title'>Stage Number
                                        <count-to :end="13" count-class="count-style"/>                                                              
                                    </p>
                                </div>
                        </Card>
                    </router-link>
                </Col>
                <Col span="12">
                    <router-link to="/gene">
                        <Card>
                                <div class="moudle">
                                    <img class="moudle_image" src="@/assets/img/gene.png">
                                    <div class="moudle_title">
                                      Genes
                                    </div>
                                </div>
                                
                                <div class='count_div'>
                                    <p  class='h3_title'>Gene  Number
                                        <count-to :end="124" count-class="count-style"/>                                                              
                                    </p>
                                </div>
                        </Card>
                    </router-link>
                </Col>

            </Row>

            <Row style="background:#eee;padding:10px">
                <Col span="12">
                    <router-link to="/molecules">
                        <Card>
                                <div class="moudle">
                                    <img class="moudle_image" src="@/assets/img/moleclues.jpg">
                                    <div class="moudle_title">
                                    Compounds
                                    </div>
                                </div>
                                
                                <div class='count_div'>
                                    <p  class='h3_title'>Type Number
                                        <count-to :end="9" count-class="count-style"/>                                                              
                                    </p>
                                </div>
                        </Card>
                    </router-link>
                </Col>
                 <Col span="12">
                    <router-link to="/Disease">
                        <Card>
                                <div class="moudle">
                                    <img class="moudle_image" src="@/assets/img/disease.jpg">
                                    <div class="moudle_title">
                                    Diseases
                                    </div>
                                </div>
                                
                                <div class='count_div'>
                                    <p  class='h3_title'>Type Number
                                        <count-to :end="7" count-class="count-style"/>                                                              
                                    </p>
                                </div>
                        </Card>
                    </router-link>
                </Col>

            </Row>


            <!--<Row style="background:#eee;padding:20px">
                <Col> 
                 drugs 
                    <router-link to="/">
                        <Card>
                            <div style="text-align:center">
                                <!-- <img width="25%" height="10%" src="@/assets/img/red_sys.jpg"> 
                                <h3 class='h3_title'>Drug</h3>
                                <!-- <p>Types:<count-to :end="88" count-class="count-style"/></p> 
                                <p class='h3_title'>Sorry, This module function is under development </p>
                            </div>
                            
                        </Card>
                    </router-link>
                </Col>
            </Row>-->
        </div>
       
    
    </div>


</template>


<script>
import router from '@/router'
import routers from '@/router/routers'
import CountTo from '@/components/count-to'
import {mapMutations,} from 'vuex'
import {getAllSampleCellNumber,getDatasetKeyWords,} from '@/api/erythdataset'

export default {
    name:"home",
    components:{
        CountTo
    },
    data () {
            return {
               keyWords_list:[
                    {
                        name:'Danio rerio',
                    },
                    {
                        name:'Homo sapiens',
                    },
                    {  
                        name:'Mus musculus',
                    }

                ],
                value1: '1',
                // all_sampleN:3900,
                // all_cellN:175628,
                value3: 0,
                allSampleN:3900,
                allCellN:175628,
                allStudyN:88,
                setting: {
                    autoplay: true,
                    autoplaySpeed: 4000,
                    dots: 'inside',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'hover' 
                },
                InputKeyName:'',
                active:'',
                
                search_placeholder:'GATA1/Bone Marrow/GSE102182/Homo sapiens'
            }
        },
    methods:{

            ...mapMutations([
            'setCurrentPageToken',
        ]),
        yr(){
            this.active="color:grey"
        },
        yc(){
            this.active =''
        },

        getAllkeyWords(){

            getDatasetKeyWords().then(res=>{

                this.keyWords_list = res.data.keywords
                console.log("this.keyWords_list")
                console.log(res.data.keywords)
                
            })
           

            // this.keyWords_list.push()

        },
        getAllSampleCellN(){
            getAllSampleCellNumber().then(res => {
				console.log(res.data)
                let _this = this
                let datas = res.data
				console.log(datas.allsampleN)
				_this.allSampleN = datas.allsampleN
                _this.allCellN = datas.allcellN
                _this.allStudyN =  datas.allstudyN
            })
        },

        searchDataSetByKeyName(InputKeyName){
            let _this = this
            _this.InputKeyName = InputKeyName
            // alert(InputKeyName)
           

        },

        searchByKeyWord(){
             router.push({
                name: 'Search',
                params: {
                    KeyName: this.InputKeyName,
                },
            })
        },

        intoDataSet(dataset_id){               
        
         // alert(data.dataset);
        console.log(dataset_id)
        this.setCurrentPageToken(dataset_id)
        router.push({
           name: "Dataset_detail",
           params: {

             dataset : dataset_id,

           }
        
         });


       }

    },
    mounted(){
		this.getAllSampleCellN()
        this.getAllkeyWords()




	}
    
}
</script>


<style lang="less">
@designWidth: 1920;

    .function {
        .px2vw(@px) {
            return: unit(( @px/@designWidth )*100, vw);
        }
    }
    .card Card{
        float: left;

        
    }
    .count-style{
        font-size:calc((70/1920) * 100vw);
        //  !important calc((90/1920) * 100vw) 
    }


    .Panel_c{
        font-size:16px;
    }
    .p_text{
        font-size:18px;
        text-align: justify;


    }
    .keyWord{
        font-size:18px;
    }

   .moudle {
        float: left;
        text-align: center;
        margin-left: 20%;
        height: 90px;
        line-height: 40px;
        min-width: 90px;
    }

    .moudle_image{
        block:true;
        float: left; 
        margin-bottom:5% ;
        width: calc((100/1920) * 100vw) ;
        height:calc((100/1920) * 100vw);
        line-height: calc((100/1920) * 100vw);

    }
    .moudle_title{
        // margin-top:1%;
        // margin-left:15%;
        font-size: 20px;
        // text-align:top;
        // padding-left:40%;
        font-weight:bold


       
    }
    .demo-carousel{
        margin:auto auto;
        text-align:center;
        
    }
    
 

    
    .count_div{
        text-align:center ;height:10%
    }

    .ivu-input-search {
 
        background: #a85557!important;
        color: #fff!important;
        border-color: #a85557!important;
        font-size:18px;
    }
    .ivu-input-search:hover{
        background: #e6b9b8 !important;
        color: #fff !important;
        border-color: #ea898c !important;
    }
    .ivu-btn-primary {
        background: #a85557!important;
        color: #fff!important;
        border-color: #a85557!important;
    }
</style>
