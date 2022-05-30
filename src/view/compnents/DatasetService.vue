<template>
  <div>
    <!-- 提供分析服务内容卡片 -->
    <div class="card">
      <Row v-if="ifshowvis">
        <Col span="4"><strong>Visualize Site:</strong></Col>
        <Col span="20"
          ><a :href="getVisHref()">{{ visualize_site }}</a></Col
        >
      </Row>

      <div v-if="ifshowAnalContent">
        <h3 class="h3_title">Analyze Content:</h3>
        <Row :gutter="16" style="background:#eee;padding:20px">
          <Col v-if="showSubAnalContent">{{ SubAnalContent }}</Col>
          <!--<Col span="4" v-for="(AnalyzeType,index) in AnalyzeTypeList" :key='index' :value="AnalyzeType.name" >
							<div class='anal_div' >
								<div @click="changeDom(AnalyzeType.link)"><span class="servetitle"  >{{ AnalyzeType.name }}</span></div>
								<router-link :to="AnalyzeType.link" style="font-size:'font-size:calc((20/1920) * 100vw);'">
										<img width="20%" height="10%" src="@/assets/img/red_sys.jpg">
										<div ><span class="servetitle"  >{{ AnalyzeType.name }}</span></div>
								</router-link>                 
							</div>
					</Col>-->
        </Row>
        <div
          class="anal_div"
          v-for="(AnalyzeType, index) in AnalyzeTypeList"
          :key="index"
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
  </div>
</template>

<script>
import { getDatasetSequenceType } from '@/api/datasetService'
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
      AnalyzeTypeList: [
        {
          name: 'Expression Profile',
          link: 'RNA_Expression',
        },
        {
          name: 'Principal Components',
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
    getVisHref() {
      return this.visualize_site
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
                    name: 'Dimensional Reduction & Feature',
                    link: 'scPlotTSNE',
                  },

                  // {
                  // 	name:"Single Cell Feature Plot",
                  // 	link:'FeaturePlot'
                  // },
                  {
                    name: 'Markers & Enrich',
                    link: 'ClusterMarker',
                  },
                  // {
                  // 	name:"Cluster's Enrich Analyze",
                  // 	link:"ClusterEnrichGO"
                  // },
                  {
                    name: 'Differential & Enrich',
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
                    name: 'Cell-Cell Interraction',

                    link: 'ScInterraction',
                  },
                  // Single Cell Communication
                  {
                    name: 'Cell-Cell Communication',

                    link: 'ScCommunication',
                  },
                ]
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
                      name: 'Principal Components',
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
                      name: 'Difference analysis',
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

          // if(this.ifAnal.indexOf('1') > -1){
          //   if (data.sequencing_type.indexOf('Single Cell') > -1) {
          //                 if (data.visualize_site != null) {
          //                   this.ifshowvis = true
          //                 } else {
          //                   this.ifshowAnalContent = true
          //                   //  如果时单细胞数据，单细胞数据所提供的数据分析功能
          //                   this.AnalyzeTypeList = [
          //                     {
          //                       name: 'PCA & Feature',
          //                       link: 'PlotTSNE',
          //                     },

          //                     // {
          //                     // 	name:"Single Cell Feature Plot",
          //                     // 	link:'FeaturePlot'
          //                     // },
          //                     {
          //                       name: 'Markers & Enrich',
          //                       link: 'ClusterMarker',
          //                     },
          //                     // {
          //                     // 	name:"Cluster's Enrich Analyze",
          //                     // 	link:"ClusterEnrichGO"
          //                     // },
          //                     {
          //                       name: 'Differential & Enrich',
          //                       link: 'sc_Diffanal',
          //                     },
          //                     // {
          //                     // 	name:"Cluster's Differential Enrich Analyze",
          //                     // 	link:"ClusterDiffEnrichAnal"
          //                     // },
          //                     // trajectory Cluster's
          //                     {
          //                       name: 'Differentiation Trajectory',
          //                       link: 'ClusterDiffTrajectory',
          //                     },
          //                     // Single Cell Interraction
          //                     {
          //                       name: 'Cell-Cell Interraction',

          //                       link: 'ScInterraction',
          //                     },
          //                     // Single Cell Communication
          //                     {
          //                       name: 'Cell-Cell Communication',

          //                       link: 'ScCommunication',
          //                     },
          //                   ]
          //                 }
          //   }else {
          //                 this.ifshowAnalContent = true
          //                 var _this = this
          //                 let experiment_type_list = data.experiment_type.split(',')
          //                 // alert(data.experiment_type.indexOf("Expression profiling"))
          //                 if (data.experiment_type.indexOf('Expression profiling') >= 0) {
          //                   //alert(data.sequencing_type)
          //                   if (data.sequencing_type.indexOf('Bulk') >= 0) {
          //                     this.AnalyzeTypeList = [
          //                       {
          //                         name: 'Expression Profile',
          //                         link: 'RNA_Expression',
          //                       },
          //                       {
          //                         name: 'Principal Components',
          //                         link: 'PCA',
          //                       },
          //                       {
          //                         name: 'Differential Analysis',
          //                         link: 'Diff_analysis',
          //                       },
          //                       // {
          //                       //   name: 'Enrichment Analysis',
          //                       //   link: 'EnrichGO',
          //                       // },
          //                       // {
          //                       //   name: 'ClusterGrammer',
          //                       //   link: 'ClustGram',
          //                       // },
          //                     ]
          //                   } else {
          //                     this.AnalyzeTypeList = [
          //                       {
          //                         name: 'Difference analysis',
          //                         link: 'Diff_analysis',
          //                       },
          //                       {
          //                         name: 'Enrichment Analysis',
          //                         link: 'EnrichGO',
          //                       },
          //                       {
          //                         name: 'Single Cell t_SNE',
          //                         link: 'PlotTSNE',
          //                       },
          //                       {
          //                         name: 'Single Cell Feature Plot',
          //                         link: 'FeaturePlot',
          //                       },
          //                     ]
          //                   }
          //                 }
          //   }

          // }else {
          //               if (data.sequencing_type.indexOf('Single Cell') > -1) {
          //                 if (data.visualize_site != null) {
          //                   this.ifshowvis = true
          //                 } else {
          //                   this.ifshowAnalContent = true
          //                   //  如果时单细胞数据，单细胞数据所提供的数据分析功能
          //                   this.AnalyzeTypeList = [
          //                     {
          //                       name: 'PCA & Feature',
          //                       link: 'PlotTSNE',
          //                     },

          //                     // {
          //                     // 	name:"Single Cell Feature Plot",
          //                     // 	link:'FeaturePlot'
          //                     // },
          //                     {
          //                       name: 'Markers & Enrich',
          //                       link: 'ClusterMarker',
          //                     },
          //                     // {
          //                     // 	name:"Cluster's Enrich Analyze",
          //                     // 	link:"ClusterEnrichGO"
          //                     // },
          //                     {
          //                       name: 'Differential & Enrich',
          //                       link: 'sc_Diffanal',
          //                     },
          //                     // {
          //                     // 	name:"Cluster's Differential Enrich Analyze",
          //                     // 	link:"ClusterDiffEnrichAnal"
          //                     // },
          //                     // trajectory Cluster's
          //                     {
          //                       name: 'Differentiation Trajectory',
          //                       link: 'ClusterDiffTrajectory',
          //                     },
          //                     // Single Cell Interraction
          //                     {
          //                       name: 'Cell-Cell Interraction',

          //                       link: 'ScInterraction',
          //                     },
          //                     // Single Cell Communication
          //                     {
          //                       name: 'Cell-Cell Communication',

          //                       link: 'ScCommunication',
          //                     },
          //                   ]
          //                 }
          //               } else {
          //                 this.ifshowAnalContent = true
          //                 var _this = this
          //                 let experiment_type_list = data.experiment_type.split(',')
          //                 // alert(data.experiment_type.indexOf("Expression profiling"))
          //                 if (data.experiment_type.indexOf('Expression profiling') >= 0) {
          //                   //alert(data.sequencing_type)
          //                   if (data.sequencing_type.indexOf('Bulk') >= 0) {
          //                     this.AnalyzeTypeList = [
          //                       {
          //                         name: 'Expression Profile',
          //                         link: 'RNA_Expression',
          //                       },
          //                       {
          //                         name: 'Principal Components',
          //                         link: 'PCA',
          //                       },
          //                       // {
          //                       //  name: 'Differential Analysis',
          //                       //  link: 'Diff_analysis',
          //                       //},
          //                       //{
          //                       //  name: 'Enrichment Analysis',
          //                       //  link: 'EnrichGO',
          //                       //},
          //                       // {
          //                       //   name: 'ClusterGrammer',
          //                       //   link: 'ClustGram',
          //                       // },
          //                     ]
          //                   } else {
          //                     this.AnalyzeTypeList = [
          //                       {
          //                         name: 'Difference analysis',
          //                         link: 'Diff_analysis',
          //                       },
          //                       {
          //                         name: 'Enrichment Analysis',
          //                         link: 'EnrichGO',
          //                       },
          //                       {
          //                         name: 'Single Cell t_SNE',
          //                         link: 'PlotTSNE',
          //                       },
          //                       {
          //                         name: 'Single Cell Feature Plot',
          //                         link: 'FeaturePlot',
          //                       },
          //                     ]
          //                   }
          //                 }
          //                 // (data.exalertperiment_type.indexOf("SNP genotyping"))
          //                 // if(data.experiment_type.indexOf("SNP genotyping")>=0){

          //                 // 	this.AnalyzeTypeList = [ {
          //                 // 			name:'Expression profiling',
          //                 // 			link:'RNA_Expression'
          //                 // 		},
          //                 // 	]
          //                 // }
          //               }


          // }
          
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
.h3_title {
  font-size: calc((35 / 1920) * 100vw);

}
.servetitle {
  font-size: calc((20 / 1920) * 100vw);
  cursor: pointer;
}
.anal_div {
  display: inline-block;
  background: white;
  border: 1px;
  border-color: black;
  border-radius: 4px;
  text-align: center;
  transition: all 0.2s ease-in-out;
  margin-right: 15px;
  padding: 0 15px;
  height: calc((100 / 1920) * 100vw);
  line-height: calc((100 / 1920) * 100vw);
  font-size: calc((30 / 1920) * 100vw);
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
  background: #eee;
}
</style>
