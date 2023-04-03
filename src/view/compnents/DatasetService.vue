<template>
  <div>
    <!-- 提供分析服务内容卡片 -->
    <div>
      <Row v-if="ifshowvis">
        <Col span="4"><strong>Visualize Site:</strong></Col>
        <Col span="20"
          ><a :href="getVisHref()">{{ visualize_site }}</a></Col
        >
      </Row>

      <br>
     


      <div class="card"  v-if="ifshowAnalContent">
        <h3 class="h3_title">Analysis:</h3>
        <!-- <Row :gutter="16" style="background:#eee;padding:20px">
        </Row> -->
          <div
            class="anal_div"
            v-for="(AnalyzeType, index) in AnalyzeTypeList"
            @click="analClick(index)"
            :key="index"
            :class="{myactive:currentAnalIndex===index}"
          >
            <div @click="changeDom(AnalyzeType.link)">
              <span class="servetitle">{{ AnalyzeType.name }}</span>
            </div>
          </div>
       
       
      
      </div>


      

    </div>

    <Rna v-if="childDom == 'RNA_Expression'" />
    <PCA v-if="childDom == 'PCA'" />
    <DiffAnalysis v-if="childDom == 'Diff_analysis'" />
    <EnrichGO v-if="childDom == 'EnrichGO'" />
    <scPlotTSNE v-if="childDom == 'scPlotTSNE'" />
    <ClusterMarker v-if="childDom == 'ClusterMarker'" />
    <!-- <Diff_analysis v-if="childDom == 'Diff_analysis'" /> -->
    <sc_Diffanal v-if="childDom == 'sc_Diffanal'" />
    <!-- <ClustGram v-if="childDom == 'ClustGram'" /> -->
    <ClusterDiffTrajectory v-if="childDom == 'ClusterDiffTrajectory'" />
    <ScInterraction v-if="childDom == 'ScInterraction'" />
    <ScCommunication v-if="childDom == 'ScCommunication'" />

    <div v-if=ifcellAnno class="card" >
        <!-- 单细胞页面才显示的 细胞注释信息 -->
        <h3 class="h3_title">Cell annotation information： </h3>
        
        <br>
        <Row>
                <Table 
                class="my-tableStyle"
                :columns="cellAnnoCols" 
                :data="cellAnnoData" 
                size="small" 
                disabled-hover="True"
                ref="table"></Table>
                <!-- <Spin size="large" fix v-if="spinShowSampleSource"></Spin> -->
                <!-- <div style="margin: 10px;overflow: hidden">               
                    <div style="float: right;">
                        <Page :total="totalRow"  
                        :current="currentPage" 
                        :page-size="pageSize" 
                        show-elevator 
                        show-total
                        show-sizer
                        @on-change="handleCurrentChange" 
                        @on-page-size-change="handleSizeChange">
                        </Page>                   
                    </div>
                </div> -->

        </Row> 
    </div>

  </div>
</template>

<script>
import { getDatasetSequenceType } from '@/api/datasetService'
import {getSCCellAnnoInfo } from '@/api/erythdataset'
import Rna from './RNA_Expression.vue'
import PCA from './PCA.vue'
import DiffAnalysis from './Diff_analysis.vue'
import EnrichGO from './EnrichGO.vue'
import ClustGram from '@/view/eryth/ClustGram.vue'
import scPlotTSNE from './scPlotTSNE.vue'
import ClusterMarker from './ClusterMarker.vue'
import Diff_analysis from './Diff_analysis.vue'
import sc_Diffanal from './sc_Diffanal.vue'
import ClusterDiffTrajectory from './ClusterDiffTrajectory.vue'
import ScInterraction from './ScInterraction.vue'
import ScCommunication from './ScCommunication.vue'
export default {
  name: 'DatasetService',
  components: {
    Rna,
    PCA,
    DiffAnalysis,
    EnrichGO,
    ClustGram,
    scPlotTSNE,
    ClusterMarker,
    Diff_analysis,
    sc_Diffanal,
    ClusterDiffTrajectory,
    ScInterraction,
    ScCommunication
  },
  data() {
    return {
      ifshowvis: false,
      showSubAnalContent: false,
      SubAnalContent: '',
      ifshowAnalContent: false,
      experiment_type: '',
      visualize_site: '',
      series: this.$store.state.app.CurrentPageToken,
      currentAnalIndex:-1,
      cellAnnoCols:[
                            {
                                title: 'Cell type abbreviation',
                                key: 'refPaper_name',
                                "sortable": true,
                                filter: {
                                type: 'Input'
                                },
                                // fixed: 'left',
                                // width:200,
                                // render: (h, params) => {  
                                //     if (params.row.gid.indexOf("GSM") > -1){
                                //         return h('div', [
                                //         h('a', {                               
                                //                 attrs:{                              
                                //                 href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.gid,
                                //                 target:'_blank',                    
                                //                 },    
                                //             },params.row.gid)
                                //         ])
                                //     }if(params.row.gid.indexOf("EGAD") > -1){
                                //         return h('div', [
                                //         h('a', {                               
                                //                 attrs:{                              
                                //                 href:'https://web2.ega-archive.org/datasets/'+params.row.gid.split('_')[0],
                                //                 target:'_blank',

                                //                 },    
                                //             },params.row.gid)
                                //         ])

                                //     } else{
                                //         return h('div',params.row.gid)
                                
                                //     }  
                                // }   

                                
                            },
                            {
                                title: 'Cell name full name',
                                key: 'full_cell_name',
                                "sortable": true,
                                width:400,

                            },
                           
                        
                ],  
      cellAnnoData:[],
      AnalyzeTypeList: [
        {
          name: 'Expression Profile',
          link: 'RNA_Expression',
        },
        {
          name: 'Principal Component Analysis',
          link: 'PCA',
        },
        {
          name: 'Differential Analysis',
          link: 'Diff_analysis',
        },
        {
          name: 'Enrichment Analysis',
          link: 'EnrichGO',
        },
        // {
        //   name: 'ClusterGrammer',
        //   link: 'ClustGram',
        // },
      ],
      childDom: '',
      ifcellAnno: false,
    }
  },
  methods: {
    changeDom(name) {
      if (this.childDom !== name) {
        this.childDom = name
      } else {
        this.childDom = ''
      }
    },
    analClick(index){
      this.currentAnalIndex = index;
    },
    getVisHref() {
      return this.visualize_site
    },

    mockScAnnoTableData(series){
  
      getSCCellAnnoInfo(series).then( res=>{
          let datas = res.data
          // console.info(datas.list)
          this.cellAnnoData = datas.list                  
          // _this.totalRow = datas.total;
         
        })
    },


    getDatasetSequenceType() {
      
      console.log(this.$store.state.app.CurrentPageToken)

      getDatasetSequenceType(this.$store.state.app.CurrentPageToken).then(
        (res) => {
          let data = res.data
          console.log('data:')
          console.log(data)
          this.experiment_type = data.experiment_type
          this.sequencing_type = data.sequencing_type
          this.ifAnal = data.if_Anal
          this.visualize_site = data.visualize_site
          if (this.ifAnal.indexOf('yes') > -1) {
            if (data.sequencing_type.indexOf('Single Cell') > -1) {
              if (data.visualize_site != null) {
                this.ifshowvis = true
              } else {
                this.ifshowAnalContent = true
                //  如果时单细胞数据，单细胞数据所提供的数据分析功能
                this.AnalyzeTypeList = [
                  {
                    name: 'Visualization & Feature',
                    link: 'scPlotTSNE',
                  },

                  // {
                  // 	name:"Single Cell Feature Plot",
                  // 	link:'FeaturePlot'
                  // },
                  {
                    name: 'Marker & Enrichment',
                    link: 'ClusterMarker',
                  },
                  // {
                  // 	name:"Cluster's Enrich Analyze",
                  // 	link:"ClusterEnrichGO"
                  // },
                  {
                    name: 'Difference & Enrichment',
                    link: 'sc_Diffanal',
                  },
                  // {
                  // 	name:"Cluster's Differential Enrich Analyze",
                  // 	link:"ClusterDiffEnrichAnal"
                  // },
                  // trajectory Cluster's
                  {
                    name: 'Differentiation Trajectory',
                    link: 'ClusterDiffTrajectory',
                  },
                  // Single Cell Interraction
                  {
                    name: 'Cell-Cell Interaction',

                    link: 'ScInterraction',
                  },
                  // Single Cell Communication
                  {
                    name: 'Cell-Cell Communication',

                    link: 'ScCommunication',
                  },
                ]

                this.ifcellAnno = true
                this.mockScAnnoTableData(this.$store.state.app.CurrentPageToken)
              }
            } else {
              this.ifshowAnalContent = true
              var _this = this
              let experiment_type_list = data.experiment_type.split(',')
              // alert(data.experiment_type.indexOf("Expression profiling"))
              if (data.experiment_type.indexOf('Expression profiling') >= 0) {
                //alert(data.sequencing_type)
                if (data.sequencing_type.indexOf('Bulk') >= 0) {
                  this.AnalyzeTypeList = [
                    {
                      name: 'Expression Profile',
                      link: 'RNA_Expression',
                    },
                    {
                      name: 'Principal Component Analysis',
                      link: 'PCA',
                    },
                    {
                      name: 'Differential Analysis',
                      link: 'Diff_analysis',
                    },
                    {
                      name: 'Enrichment Analysis',
                      link: 'EnrichGO',
                    },
                    // {
                    //   name: 'ClusterGrammer',
                    //   link: 'ClustGram',
                    // },
                  ]
                } else {
                  this.AnalyzeTypeList = [
                    {
                      name: 'Differential analysis',
                      link: 'Diff_analysis',
                    },
                    {
                      name: 'Enrichment Analysis',
                      link: 'EnrichGO',
                    },
                    {
                      name: 'Single Cell t_SNE',
                      link: 'scPlotTSNE',
                    },
                    {
                      name: 'Single Cell Feature Plot',
                      link: 'FeaturePlot',
                    },
                  ]
                }
              }
              // (data.exalertperiment_type.indexOf("SNP genotyping"))
              // if(data.experiment_type.indexOf("SNP genotyping")>=0){

              // 	this.AnalyzeTypeList = [ {
              // 			name:'Expression profiling',
              // 			link:'RNA_Expression'
              // 		},
              // 	]
              // }
            }
          }

          if(this.ifAnal.indexOf('1') > -1){
            if (data.sequencing_type.indexOf('Single Cell') > -1) {
                          if (data.visualize_site != null) {
                            this.ifshowvis = true
                          } else {
                            this.ifshowAnalContent = true
                            //  如果时单细胞数据，单细胞数据所提供的数据分析功能
                            this.AnalyzeTypeList = [
                              {
                                name: 'PCA & Feature',
                                link: 'PlotTSNE',
                              },

                              // {
                              // 	name:"Single Cell Feature Plot",
                              // 	link:'FeaturePlot'
                              // },
                              {
                                name: 'Marker & Enrichment',
                                link: 'ClusterMarker',
                              },
                              // {
                              // 	name:"Cluster's Enrich Analyze",
                              // 	link:"ClusterEnrichGO"
                              // },
                              {
                                name: 'Difference & Enrichment',
                                link: 'sc_Diffanal',
                              },
                              // {
                              // 	name:"Cluster's Differential Enrich Analyze",
                              // 	link:"ClusterDiffEnrichAnal"
                              // },
                              // trajectory Cluster's
                              {
                                name: 'Differentiation Trajectory',
                                link: 'ClusterDiffTrajectory',
                              },
                              // Single Cell Interraction
                              {
                                name: 'Cell-Cell Interaction',

                                link: 'ScInterraction',
                              },
                              // Single Cell Communication
                              {
                                name: 'Cell-Cell Communication',

                                link: 'ScCommunication',
                              },
                            ]
                          }
            }else {
                          this.ifshowAnalContent = true
                          var _this = this
                          let experiment_type_list = data.experiment_type.split(',')
                          // alert(data.experiment_type.indexOf("Expression profiling"))
                          if (data.experiment_type.indexOf('Expression profiling') >= 0) {
                            //alert(data.sequencing_type)
                            if (data.sequencing_type.indexOf('Bulk') >= 0) {
                              this.AnalyzeTypeList = [
                                {
                                  name: 'Expression Profile',
                                  link: 'RNA_Expression',
                                },
                                {
                                  name: 'Principal Component Analysis',
                                  link: 'PCA',
                                },
                                // {
                                //   name: 'Differential Analysis',
                                //   link: 'Diff_analysis',
                                // },
                                // {
                                //   name: 'Enrichment Analysis',
                                //   link: 'EnrichGO',
                                // },
                                // {
                                //   name: 'ClusterGrammer',
                                //   link: 'ClustGram',
                                // },
                              ]
                            } else {
                              this.AnalyzeTypeList = [
                                {
                                  name: 'Differential analysis',
                                  link: 'Diff_analysis',
                                },
                                {
                                  name: 'Enrichment Analysis',
                                  link: 'EnrichGO',
                                },
                                {
                                  name: 'Single Cell t_SNE',
                                  link: 'PlotTSNE',
                                },
                                {
                                  name: 'Single Cell Feature Plot',
                                  link: 'FeaturePlot',
                                },
                              ]
                            }
                          }
            }

          }
          
          
        }
      )
    },


  },
  mounted() {
    this.getDatasetSequenceType()
  },
}
</script>
<style>

.servetitle {
  font-size: 18px;
  cursor: pointer;
}

.anal_div {
  display: inline-block;
  background:  #eee;
  border: 1px;
  border-color: black;
  border-radius: 4px;
  text-align: center;
  transition: all 0.2s ease-in-out;
  margin-right: 15px;
  margin-top: 8px;
  padding: 0 15px;
  height: calc((100 / 1920) * 100vw);
  line-height: calc((100 / 1920) * 100vw);
  font-size: 18px;
  /* padding:calc((5/1920) * 100vw) calc((1/1920) * 100vw) calc((1/1920) * 100vw) calc((1/1920) * 100vw); */
  /* width:calc((250/1920) * 100vw);
		text-align:center;
		overflow: hidden;
		padding:calc((5/1920) * 100vw) calc((5/1920) * 100vw) calc((5/1920) * 100vw) calc((5/1920) * 100vw);
		background: white;
		border: 1px;
		border-color: black;
		border-radius: 4px;
		transition: all .2s ease-in-out;
		position: relative; */
}
.anal_div:hover {
  background:#a85557;
  color: azure;
}

.myactive{
  background:#a85557;
  color: azure;
}

.card{
  margin: 2% 2% 2% 2%;
  /* background: #eee; */
  
}
</style>
