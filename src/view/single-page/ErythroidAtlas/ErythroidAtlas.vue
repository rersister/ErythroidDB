<template>
   <div class="layout">
    <div class="my_layout-content">
      <div id="chart_choice" v-show="isShow">
        <div class="row_choice">
          <span class="h4_title">Organism:&emsp;</span>
          <RadioGroup v-model="Orga_val" class="myOption" @on-change="changeOrgaType($event)">
            <Radio 
              style="font-style:italic;"
              class="myOption"
              v-for="(item, i) in OrgaList"
              :label="item.value"
              :key="i"
            >
              <span class="myOption">{{ item.label }}</span>
            </Radio>
          </RadioGroup>
        </div>
        <!-- Expression profiling -->
        <div class="row_choice">
          <span class="h4_title">Experiment type:&emsp;</span>
          <RadioGroup v-model="DataType_val" class="myOption"  @on-change="changeExperimentType($event)">
            <Radio
              class="myOption"
              v-for="(item, i) in DataTypeList"
              :label="item.value"
              :key="i"
            >
              <span class="myOption">{{ item.label }}</span>
            </Radio>
          </RadioGroup>
        </div>
        

        <div class="row_choice">
          <span class="h4_title">Sequence type: &emsp;</span>
          <RadioGroup v-model="SequType_val" class="myOption" @on-change="changeSequnceType($event)">
            <Radio
              class="myOption"
              v-for="(item, i) in typeList"
              :label="item.value"
              :key="i"
            >
              <span class="myOption">{{ item.label }}</span>
            </Radio>
          </RadioGroup>
        </div>

        <!-- <div class="row_choice">
              <span>Analysis Type:</span>
              <RadioGroup class="myOption" @on-change="changeAnalType($event)">
                <Radio
                  class="myOption"
                  v-for="item in analList"
                  :label="item.value"
                  :key="item.value"
                >
                  <span class="myOption">{{ item.label }}</span>
                </Radio>
              </RadioGroup>
        </div> -->

        </div>

        <!-- <div class="row_choice">
          <span>Cell source:</span>
          <RadioGroup
            class="myOption"
            @on-change="changeDevelopmentType($event)"
          >
            <Radio
              class="myOption"
              v-for="(item, i) in CellSourceList"
              :label="item.value"
              :key="i"
            >
              <span class="myOption">{{ item.label }}</span>
            </Radio>
          </RadioGroup>
        </div> -->

        <!-- <div class="row_choice">
              <a href="javascript:void(0)">
                Dataset:
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <!-- <Select v-model="Datase2" style="width:200px">
                <Option
                  v-for="item in ifCompareList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select> 
              <Select v-model="selectList" multiple style="width:400px">
                <Option
                  v-for="(item, i) in datasetsTypeSource"
                  :value="item.dataset_id"
                  :key="i"
                  >{{ item.dataset_id }}</Option
                >
              </Select>
        </div> -->

        <!-- Whether to compare data sets -->
        <!-- <div class="row_choice">
          <span>Whether to compare datasets?</span>
          <RadioGroup class="myOption" @on-change="if2compare($event)">
            <Radio
              class="myOption"
              v-for="item in ifCompareList"
              :label="item.value"
              :key="item.value"
            >
              <span class="myOption">{{ item.label }}</span>
            </Radio>
          </RadioGroup>
        </div> -->
        
        <div>
        
        </div>
      
      
          
      <div class="row_choice">
        <span>*Tip: After reselecting the above options, analysis needs to be reselected as well.</span>
        <Row :gutter="16" style="background:#eee;padding:20px">
          <h3 class="h3_title">Analysis:</h3>
        </Row>
        <br>
        <!-- value="anal_value='item.value'" -->
        <!--  :value="anal_value" -->
        <div
          class="anal_div"
          v-for="(item,index) in analList"
          @click="analClick(item)"
          :key="index"
          :class="{myactive:currentAnalIndex===item.value}"
        >
          <div @click="changeDom(item.value)">
            <span class="servetitle">{{ item.label }}</span>
          </div>
        </div>
      </div>

      <div class="layout-header">
        <!-- <i-button class="my_button" type="text" @click="toggleClick">
          <Icon type="ios-keypad" class="my_icon"></Icon> -->
          <!-- <Icon type="navicon" size="32"></Icon> -->
        <!-- </i-button> -->

        <!-- <i-button class="my_button" type="text" @click="getPlolyByParms()">
          <Icon type="ios-search" class="my_icon"></Icon> -->
          <!-- <Icon type="navicon" size="32"></Icon> -->
        <!-- </i-button> -->
        <!-- <Button class = 'new_bStyle' type="primary" icon="ios-search" @click="getPlolyByParms()"></Button> -->
      </div>
      
    </div>


    <div class="layout-content-main">
      <!-- <router-view /> -->
      <!-- <All  v-if="dom == 'all_Expression'" :select-list="selectList" :or-ga="orga" /> -->
      <All  v-if="dom == 'all_Expression'"  :select-list="selectList" />
      <AllClutser v-if="dom == 'all_Clutser'" :select-list="selectList"/>
      <AllDiff v-if="dom == 'all_Diff'" :select-list="selectList" />
      <AllEnrich v-if="dom == 'all_Enrich'" :select-list="selectList" />
      <ScPCA v-if="dom == 'scPCA'"  :select-list="selectList"/>
      <FeaturePlot v-if="dom == 'FeaturePlot'" :select-list="selectList"/>


      <!-- <Diff_analysis v-if="childDom == 'Diff_analysis'" /> -->
      <Diffanal v-if="dom == 'Diffanal'" :select-list="selectList"/>
      <!-- <ClustGram v-if="childDom == 'ClustGram'" /> -->
      <ClusterDiffTrajectory v-if="dom == 'ClusterDiffTrajectory'" :select-list="selectList" />
      <ScInterraction v-if="dom == 'ScInterraction'" :select-list="selectList"/>
      <ScCommunication v-if="dom == 'ScCommunication'" :select-list="selectList"/>

    </div>

    <div class="row_choice" >
      <!-- 数据下载栏目  -->
      <h3 class="h3_title">Download： </h3>
      <br>
        <Row >
          
          <Col span="8" > 
            <!-- <div style="text-align: center">                     -->
              <button class="my_button_download" @click="downloadAtlasExpression()">

                  <Icon type="ios-download-outline"></Icon>
                  Expression</button>
                  <i-progress
                    :percent="fileDown.percentage"
                    :status="fileDown.loadDialogStatus"
                    width="40"
                  ></i-progress>
            <!-- </div>       -->
          </col>    
          
          <Col span="8" >
            <button class="my_button_download" @click="downloadAtlasMetaInfo()">
                <!-- <Spin  fix :show="spinShow1"></Spin> -->
              <Icon type="ios-download-outline"></Icon>    
            Meta information</button>
              <i-progress
                      :percent="fileDown2.percentage"
                      :status="fileDown2.loadDialogStatus"
                      width="40"
              ></i-progress>
          </col>

        </Row>
    </div>
    <br>


    <div v-if=ifcellAnno class="row_choice" >
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

    
    <div class="row_choice">
      <h3 class="h3_title">Samples ({{totalRow}}) and group:</h3>
      <br>
                        <Table  stripe
                            :type="true"
                            :model.sync="search"
                            :v-model="search"
                            @on-search="onSearch_Allsample"
                            :data="sgroupData"
                            :columns="sgroupCols">
                        </Table>
                        <!-- FilterTableForAllDateSet   -->
                        <div style="margin: 10px;overflow: hidden">               
                            <div style="float: right;">
                                <Page :total="totalRow"  
                                :current="currentPage" 
                                :page-size="pageSize" 
                                show-total
                                show-sizer
                                @on-change="handleCurrentChange" 
                                @on-page-size-change="handleSizeChange">
                                </Page>                   
                            </div>
                        </div>      
    </div>
    


  </div>
</template>

<script>
// Datatest
import FilterTable from '../../compnents/FilterTable'
import { getDatatest,getDatasetExpression,getDatasetMetaInfo } from '@/api/erythdataservice'
import {getSCCellAnnoInfo } from '@/api/erythdataset'
import { getallDevSampleGroup,getAllDevType } from '@/api/erythroidAtlas'
import router from '@/router'
import { mapMutations } from 'vuex'
import FilterTableForAllDateSet from '../../compnents/FilterTableForAllDateSet'
import {getDatasetTypeSource,} from '@/api/erythdataset'
import All from '@/view/compnents/all_Expression.vue'
import AllClutser from '@/view/compnents/all_Cluster.vue'
import AllDiff from '@/view/compnents/all_Diffanal.vue'
import AllEnrich from '@/view/compnents/all_Enrich.vue'
import ScPCA from '@/view/compnents/all_sc_pca.vue'
import FeaturePlot from '@/view/compnents/sc_all_ClusterMarker.vue'
import Diffanal from '@/view/compnents/sc_all_Diffanal.vue'
import ClusterDiffTrajectory from '@/view/compnents/sc_all_ClusterDiffTrajectory.vue'
import ScInterraction from '@/view/compnents/all_ScInterraction.vue'
import ScCommunication from '@/view/compnents/all_ScCommunication.vue'
import axios from '@/libs/api.request'



const sample_numbers = {
  0: {
    value: '1-10',
    name: '1-10',
  },
  1: {
    value: '10-20',
    name: '10-20',
    // color: 'red'
  },
  2: {
    value: '20-30',
    name: '20-30',
    // color: 'green'
  },
  3: {
    value: '30-50',
    name: '30-50',
    // color: 'green'
  },
  4: {
    value: '>50',
    name: '>50',
    // color: 'green'
  },
  5: {
    value: 'all',
    name: 'all',
    // color: 'green'
  },
}

const source_dict = [
   {
      value: "BM_vitro",
      name: 'Bone Marrow (in vitro)'
    },
    {
      value: "BM_vivo",
      name: 'Bone Marrow (in vivo)'
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
      value: "FL_vivo",
      name: 'Fetal Liver (in vivo)',
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
    {
        value: "Em_vivo",
        name: 'Embryos (in vivo)',
    },
    
  ]

export default {
  name: 'ErythroidAtlas',
  components: {
    FilterTableForAllDateSet,
    // FilterTable,
    All,
    AllClutser,
    AllDiff,
    AllEnrich,

    ScPCA,
    FeaturePlot,
    Diffanal,
    ClusterDiffTrajectory,
    ScInterraction,
    ScCommunication

  },
  data() {
    return {
      tAdatasetTypeSourceColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left',
        },
        {
          title: 'Dataset',
          key:'EryID',
          // key: 'dataset_id',
          filter: {
            type: 'Input',
          },
          fixed: 'left',
          render: (h, params) => {
            if (params.row.dataset_id.indexOf('GSE') > -1) {
              return h('div', [
                h(
                  'a',
                  {
                    attrs: {
                      href:
                        'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=' +
                        params.row.dataset_id,
                    },
                  },
                  params.row.dataset_id
                ),
              ])
            } else {
              return h('div', params.row.dataset_id)
            }

            // return h('div', [
            //   h('a', {
            //         attrs:{
            //           href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.dataset_id

            //         },
            //     },params.row.dataset_id)
            //   ])
          },
        },
        //organism
        {
          title: 'Species',
          key: 'organism',
          filter: {
            type: 'Input',
          },
          className:'table_Orga'
        },
        {
          title: 'Development type',
          key: 'source',
          filter: {
            type: 'Input',
          },
          className:'table_Orga'
        },
        {
          title: 'Title',
          key: 'title',
          filter: {
            type: 'Input',
          },
        },
        {
          title: 'Omics Data Type',
          key: 'experiment_type',
          filter: {
            type: 'Input',
          },
        },
        {
          title: 'Sequence type',
          key: 'sequence_type',
          filter: {
            type: 'Input',
          },
        },
        {
          title: 'Sample number',
          key: 'sample_number',
          filter: {
            type: 'Select',
            option: sample_numbers,
          },
        },
      ],
      cellAnnoData:[],
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
      
      fileDown: {
              loadDialogStatus: false, //弹出框控制的状态
              percentage: 0, //进度条的百分比
              source: {}, //取消下载时的资源对象
      },
      fileDown2: {
              loadDialogStatus: false, //弹出框控制的状态
              percentage: 0, //进度条的百分比
              source: {}, //取消下载时的资源对象
      },

      ifcellAnno: false,
      anal_value:'',
      Orga_val:'hs',
      DataType_val:'ep',
      SequType_val:'bulk',
      currentAnalIndex:'all_Expression',//记录状态变化
      search: '',

      ifShow: false,
      currentPage: 1,
      currentPageTypeSource: 1,
      pageSize: 10,
      pageSizeTypeSource: 10,
      totalTypeSource: 400,
      datasetsTypeSource: [],
      samples_count: '',
      isShow: true,
      spinShowTypeSource: true,
      spanLeft: 5,
      spanRight: 19,
      DataTypeList: [
        {
          id:0,
          value: 'ep',
          label: 'Expression profiling',
        },
      ],
      orga: "hs",
      exper:'ep',
      deve:'',
      OrgaList: [
        {
          id:0,
          value: 'hs',
          label: 'Homo sapiens',
        },
        {
          id:1,
          value: 'mm',
          label: 'Mus musculus',
        },
        {
          id:1,
          value: 'dr',
          label: 'Danio rerio',
        }
        

      ],
      curentSequnceType: 'bulk',
      typeList: [
        {
          id:0,
          value: 'bulk',
          label: 'Bulk',
        },
        {
          id:1,
          value: 'sc',
          label: 'Single cell',
        },
      ],
      ifcompare: '',
      DevelopmentList: [
        {
          value: 'vitro',
          label: 'in vitro',
        },
        {
          value: 'vivo',
          label: 'in vivo',
        },
      ],
      anlType:'',

      analList: [
          {
            label: 'Expression Profile',
            value: 'all_Expression',
          },
          {
            label: 'Principal Component Analysis',
            value: 'all_Clutser',
          },
          {
            label: 'Differential Analysis',
            value: 'all_Diff',
          },
          {
            label: 'Enrichment Analysis',
            value: 'all_Enrich',
          },
        ],
      ifCompareList: [
        {
          value: '1',
          label: 'YES',
        },
        {
          value: '0',
          label: 'NO',
        },
      ],
      source: [],
      cell_type: [],
      currentPage: 1,
      pageSize: 10,
      totalRow: 400,
      sgroupCols: [
        {
          title: 'Dataset',
          // key: 'gid',
          filter: {
            type: 'Input',
          },
          fixed: 'left',
          width:140,
          render: (h, params) => {            
              if (params.row.gid.indexOf("GSE") > -1){
                  return h('div', [
                  h('a', {                               
                        attrs:{                              
                          href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.gid,
                          target:'_blank',
                        },    
                    },params.row.gid)
                  ])
              }else{
                return h('div',params.row.gid)
              
              }     

              // return h('div', [
              //   h('a', {                               
              //         attrs:{                              
              //           href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.dataset_id

              //         },    
              //     },params.row.dataset_id)
              //   ])

            }
        },
        {
          title: 'Sample name',
          key: 'sample_name',
          width:100,
          filter: {
            type: 'Input',
          },
        },
        {
          title: 'Organism',
          key: 'organism',
          width:110,
          filter: {
            type: 'Input',
          },
          className:'table_Orga'

        },
        {
          title: 'Cell type',
          key: 'cell_type',
          // width:100,
          filter: {
            type: 'Input',
          },
        },
        {
          title: 'Tissue',
          width:120,
          key: 'source_cell',
          filter: {
            type: 'Input',
          },
            filterMethod (value, row) {
                return row.address.indexOf(value) > -1;
            }
        },
        {
          title: 'Experiment type',
          width :120,
          key: 'growth_mode',
          filter: {
            type: 'Input',
          },
          className:'table_Orga'
          // filter: {
          //     type: 'Select',
          //     option: P_Value_range
          // },
        },
        //  {
        //   title: 'Development Type',
        //   key: 'development_type',
        //   width :125,
        //   filter: {
        //     type: 'Input',
        //   },
          // filter: {
          //     type: 'Select',
          //     option: P_Value_range
          // },
        // },

        {
          title: 'Group',
          key: 'group',
          filter: {
            type: 'Input',
          },
          // filter: {
          //     type: 'Select',
          //     option: P_Value_range
          // },
        },
      ],
      sgroupData: [],
      // table_name:'',
      table_name: 'all_dataset_source_type',
      selectList: [],
      Datase2: '0',
      dom: '',
      value_anal:'',
    }
  },
  computed: {},
  methods: {
    ...mapMutations(['setCurrentPageToken']),
    // selectChange(data) {
    //   this.selectList = data
    // },
    mockScAnnoTableData(series){
      getSCCellAnnoInfo(series).then( res=>{
          let datas = res.data
          // console.info(datas.list)
          this.cellAnnoData = datas.list                  
          // _this.totalRow = datas.total;
        
        })
    },



    analClick(item){
      // alert(item.value)
      this.currentAnalIndex = item.value
      // this.anal_value = item.value
    },

    changeDom(name){
      // alert("kai shi")
      // alert(this.orga)
      var _this = this
      
      // alert(this.orga)
      if( "" == this.orga ){
                this.$Message.info('please select Organism', 10);
                return
      }
      
   
      if( "" == this.exper ){
                this.$Message.info('please select experiment type', 10);
                return
      }

      // if( "" == this.deve ){
      //           this.$Message.info('please select Development type', 10);
      //           return
      // }

      if( "" == this.curentSequnceType ){
                this.$Message.info('please select sequence type', 10);
                return
      }

      

      var table_name =
        'all_' +
        this.orga +
        '_ep_' + this.curentSequnceType 
      this.table_name = table_name
      if (table_name.indexOf('all_mm_ep_sc') > -1){
					// alert('change')
					this.table_name = 'CRA002445'
			}

      if (table_name.indexOf('all_dr_ep_sc') > -1){
					// alert('change')
					this.table_name = 'GSE152982'
			}

      // this.getAllDevType(this.table_name)
      this.mockTableData(this.table_name, this.currentPage, this.pageSize)

      var select = []
      select.push({
        orga:this.orga,
        exper:this.exper,
        deve:this.deve,
        sequnceType:this.curentSequnceType
      })
      this.selectList = select
     
      _this.dom = name
      // if (this.dom !== name) {
      //   _this.dom = name
      // } else {
      //   _this.dom= ''
      // }


    },
    mockTableDataTypeSource() {
      var _this = this
      ;(_this.spinShowTypeSource = true),
        getDatasetTypeSource(
          _this.table_name,
          _this.currentPageTypeSource,
          _this.pageSizeTypeSource
        ).then((res) => {
          _this.spinShowTypeSource = false
          let datas = res.data
          // console.info(datas.list)
          _this.datasetsTypeSource = datas.list
          _this.totalTypeSource = datas.total
        })
    },
    getAllDevType(table_name){
            let dev_group_type_list = []
            // this.table_name = 'all_hs_ep_bulk'
            // var table_name = selectDict
			// alert(table_name)
            getAllDevType(table_name).then(res =>{
                let datas = res.data 
                //console.log(datas)  
                datas.forEach(key =>{ 
                    
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
            })


    },
    getRandom(min, max) { //根据最小值和最大值产生一个随机数
      return Math.round(Math.random() * (max - min) + min);
    },
    downloadAtlasExpression() {

            let _this = this
            _this.fileDown.percentage = 0

            // single cell 
            if (this.table_name.indexOf('GSE152982') > -1 || this.table_name.indexOf('CRA002445') > -1 ||  this.table_name.indexOf('all_hs_ep_sc') > -1 ){
            
              alert(this.table_name)
                    // this.table_name = 'all_dr_ep_sc'
              // var user_fileName = this.table_name + '.h5ad'
              var user_fileName = this.table_name + '.sce.rds'
              if (this.table_name.indexOf('GSE152982') > -1){

                var user_fileName = 'all_dr_ep_sc' + '.sce.rds'
                // this.currentAnalIndex='Diffanal'
              }

              // CRA002445
              if (this.table_name.indexOf('CRA002445') > -1){
                // alert('change')
                // this.table_name = 'all_dr_ep_sc'
                var user_fileName = 'all_mm_ep_sc' + '.sce.rds'
                // this.currentAnalIndex='Diffanal'
              }
              // 前端提供下载文件不超过  2 G 
              // a.download = user_fileName
              // a.click();
              // this.$Spin.hide()
                    
                    
              axios.request({
                            url:"public/getDatasetExpression",
                            data: {'dataset':this.table_name},
                            method: 'post',
                            contentType: 'application/octet-stream',
                            // dataType: "binary",
                            // responseType:"arraybuffer",
                            responseType: 'blob',
                            params:{},
                            // onDownloadProgress 配置该属性代表允许为下载处理进度事件
                            onDownloadProgress: function (progressEvent) {//axios封装的原生获取下载进度的事件，该回调参数progressEvent中包含下载文件的总进度以及当前进度
                            if (progressEvent.lengthComputable) {
                                              //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                                              //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                                              let progressBar = Math.round(progressEvent.loaded / progressEvent.total * 100) //实时获取最新下载进度
                                              if(progressBar >= 99){
                                                _this.fileDown.percentage = 99;
                                                  // this.title = '下载完成，文件正在编译。';
                                              }else{
                                                _this.fileDown.percentage = progressBar;
                                                  // this.title = '正在下载，请稍等。';
                                              }


                              }
                          }
                    })
                    .then(response =>{
                          // alert('back data')
                          const content = response.data;
                          // alert(content.size)
                          // if (content.size == 0) {
                          //   // this.loadClose();
                          //   this.fileDown.loadDialogStatus = 'wrong';//关闭弹窗
                          //   return;
                          // }

                          let blob = new Blob([response.data],{ type: 'application/octet-stream' });
                          // if (!fileName) {
                          //如果后台返回文件名称
                          //注意一定要和后端协调好返回的数据格式，不然会出现中文乱码问题
                          // fileName = response.headers['content-disposition'].split('filename=').pop();

                          // }
                          
                          // var fileName = this.table_name + '_norm_expression.xls'
                          if ('msSaveOrOpenBlob' in navigator) {
                              window.navigator.msSaveOrOpenBlob(blob, user_fileName);
                          } else {
                              

                              const elink = document.createElement('a');
                              elink.download = user_fileName;
                              elink.style.display = 'none';
                              elink.href = URL.createObjectURL(blob);
                              document.body.appendChild(elink);
                              elink.click();
                              URL.revokeObjectURL(elink.href);
                              document.body.removeChild(elink);
                              //编译文件完成后，进度条展示为100%100
                              this.fileDown.percentage =100;
                              this.fileDown.loadDialogStatus = 'success';//关闭弹窗
                          }
                    })

            
            
            
            }else{
              // bulk
              // alert(this.table_name)
              // alert('bulk data expression')
              axios.request({
                            url:"public/getDatasetExpression",
                            data: {'dataset':this.table_name},
                            method: 'post',
                            contentType: 'application/octet-stream',
                            // dataType: "binary",
                            responseType:"blob",
                            params:{},
                            // onDownloadProgress 配置该属性代表允许为下载处理进度事件
                            onDownloadProgress: function (progressEvent) {//axios封装的原生获取下载进度的事件，该回调参数progressEvent中包含下载文件的总进度以及当前进度
                            if (progressEvent.lengthComputable) {
                                              //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                                              //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                                              let progressBar = Math.round(progressEvent.loaded / progressEvent.total * 100) //实时获取最新下载进度
                                              if(progressBar >= 99){
                                                _this.fileDown.percentage = 99;
                                                  // this.title = '下载完成，文件正在编译。';
                                              }else{
                                                _this.fileDown.percentage = progressBar;
                                                  // this.title = '正在下载，请稍等。';
                                              }
                              }
                          }
              })
              .then( response =>{
                  let blob = new Blob([response.data],{ type: 'application/vnd.ms-excel' });
                  alert('I am back ')
                  // if (!fileName) {
                  //如果后台返回文件名称
                  //注意一定要和后端协调好返回的数据格式，不然会出现中文乱码问题
                  // fileName = response.headers['content-disposition'].split('filename=').pop();

                  // }
                  
                  var fileName = this.table_name + '_norm_expression.xls'
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
                       //编译文件完成后，进度条展示为100%100
                      _this.fileDown.percentage =100;
                      _this.fileDown.loadDialogStatus = 'success';//关闭弹窗

                  }

            })
            }
    },

    downloadAtlasMetaInfo(){
            let _this = this
            _this.fileDown2.percentage = 0
            // getDatasetMetaInfo(this.table_name).
            axios.request({
                            url:"public/getDatasetMetaInfo",
                            data: {'dataset':this.table_name},
                            method: 'post',
                            contentType: 'application/octet-stream',
                            // dataType: "binary",
                            responseType:"blob",
                            params:{},
                            // onDownloadProgress 配置该属性代表允许为下载处理进度事件
                            onDownloadProgress: function (progressEvent) {//axios封装的原生获取下载进度的事件，该回调参数progressEvent中包含下载文件的总进度以及当前进度
                            if (progressEvent.lengthComputable) {
                                              //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                                              //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                                              let progressBar = Math.round(progressEvent.loaded / progressEvent.total * 100) //实时获取最新下载进度
                                              if(progressBar >= 99){
                                                _this.fileDown2.percentage = 99;
                                                  // this.title = '下载完成，文件正在编译。';
                                              }else{
                                                _this.fileDown2.percentage = progressBar;
                                                  // this.title = '正在下载，请稍等。';
                                              }
                              }
                          }
              })
            .then( response =>{


                let blob = new Blob([response.data],{ type: 'application/vnd.ms-excel' });
                // if (!fileName) {
                //如果后台返回文件名称
                //注意一定要和后端协调好返回的数据格式，不然会出现中文乱码问题
                // fileName = response.headers['content-disposition'].split('filename=').pop();

                // }
                

                var fileName = this.table_name + '_sample_metaInfo.xls'
                if (this.table_name.indexOf('GSE152982') > -1){
                  // alert('change')
                  // this.table_name = 'all_dr_ep_sc'
                  var fileName = 'all_dr_ep_sc' + '_sample_metaInfo.xls'
                  // this.currentAnalIndex='Diffanal'
                }

                // CRA002445
                if (this.table_name.indexOf('CRA002445') > -1){
                  // alert('change')
                  // this.table_name = 'all_dr_ep_sc'
                  var fileName = 'all_mm_ep_sc' + '_sample_metaInfo.xls'
                  // this.currentAnalIndex='Diffanal'
                }



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
                    _this.fileDown2.percentage =100;
                    _this.fileDown2.loadDialogStatus = 'success';//关闭弹窗
                }


            })


    },



    changePge() {
    mockTableData
       this.mockTableData(this.table_name, this.currentPage, this.pageSize)
    },

    changeTableColumns() {
      this.tableColumns = this.getTable2Columns()
    },

    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
 
      this.mockTableData(this.table_name, this.currentPage, this.pageSize)
    },
    handleCurrentChangeTypeSource(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
      this.mockTableDataTypeSource()
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val

      this.mockTableData(this.table_name, this.currentPage, this.pageSize)
    },
    handleSizeChangeTypeSource(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSizeTypeSource = val
      this.mockTableDataTypeSource
    },
    
    mockTableData(table_name, currentPage, pageSize) {
      var _this = this
      _this.spinShowTypeSource = true
      getallDevSampleGroup(table_name, currentPage, pageSize).then((res) => {
        _this.spinShowTypeSource = false
        let datas = res.data
        console.log(datas)
        if (datas.signal == 1) {
          _this.sgroupData = datas.list
          _this.totalRow = datas.total
        }
      })

    },

    onSearch_Allsample() {
      // 根据筛选输入框的值进行筛选


    },

    handleSizeChange(val) {
      this.pageSize = val
      // mockTableData(table_name,currentPage,pageSize)
 
      this.mockTableData(this.table_name, this.currentPage, this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val

      this.mockTableData(this.table_name, this.currentPage, this.pageSize)
    },
    toggleClick() {
      this.isShow = !this.isShow
      // if(this.isShow){
      // 	this.btnText = "隐藏"
      // }else{
      // 	this.btnText = "显示"
      // }
    },
    changeOrgaType($value){
      // alert($value)
      // var _this = this
      let _this = this
      _this.fileDown.percentage = 0
      this.orga = $value
      this.currentAnalIndex = ''
      if(this.orga != "" & this.curentSequnceType != "" ){
        // alert(' change sample table')
        var table_name =
                      'all_' +
                      this.orga +
                      '_ep_' +
                      this.curentSequnceType 
        this.table_name = table_name


        if (table_name.indexOf('all_mm_ep_sc') > -1){
					// alert('change')
					this.table_name = 'CRA002445'
          // this.currentAnalIndex='FeaturePlot'

				}

        if (table_name.indexOf('all_dr_ep_sc') > -1){
					// alert('change')
					this.table_name = 'GSE152982'
          // this.currentAnalIndex='Diffanal'
			  }

        // alert('mockTableData')
        this.mockTableData(this.table_name, this.currentPage, this.pageSize)
        if (this.curentSequnceType.indexOf('bulk')> -1) {
            // alert(table_name)
            this.analList = [
              {
                label: 'Expression Profile',
                value: 'all_Expression',
              },
              {
                label: 'Principal Component Analysis',
                value: 'all_Clutser',
              },
              {
                label: 'Differential Analysis',
                value: 'all_Diff',
              },
              {
                label: 'Enrichment Analysis',
                value: 'all_Enrich',
              },
            ]
            // this.currentAnalIndex='all_Expression'
            this.ifcellAnno = false
            
            // this.changeDom(this.currentAnalIndex)
        }else{
          
            this.analList = [
              {
                label: 'Visualization & Feature',
                value: 'scPCA',
              },
              {
                label: "Marker & Enrichment",
                value: 'FeaturePlot',
              },

              {
                  label:"Difference & Enrichment",
                  value:'Diffanal'
              },

              {
                  label:"Differentiation Trajectory",
                  value:'ClusterDiffTrajectory'
              },
              {
                  label:"Cell-Cell Interaction",
                  value:'ScInterraction'
              },

              {
                  label:"Cell-Cell Communication",
                  value:'ScCommunication'
              }


            ]
            this.ifcellAnno = true
            // this.currentAnalIndex='scPCA'

            this.mockScAnnoTableData(this.table_name)
            // alert('changeDom')
            // alert(this.table_name)
            // this.dom= ''
            // this.changeDom('')
            // this.currentAnalIndex 必须和上一次不一样，才能真正的 changeDom ,
            // this.changeDom(this.currentAnalIndex)
            // this.changeDom(this.currentAnalIndex)

            // this.changeDom(this.currentAnalIndex)
            // var select = []
            // select.push({
            //   orga:$value,
            //   exper:this.exper,
            //   deve:this.deve,
            //   sequnceType:this.curentSequnceType
            // })
            // this.selectList = select
            // this.dom = this.currentAnalIndex
            
        }

      }
      
     
      this.dom =''
      // this.changeDom(this.currentAnalIndex)

    },

    changeExperimentType($value){
      let _this = this
      _this.fileDown.percentage = 0
      this.exper = $value

      if(this.orga != "" & this.curentSequnceType != "" ){
        var table_name =
                      'all_' +
                      this.orga +
                      '_ep_' +
                      this.curentSequnceType 
        this.table_name = table_name
        if (table_name.indexOf('all_mm_ep_sc') > -1){
					// alert('change')
					this.table_name = 'CRA002445'
				}
        if (table_name.indexOf('all_dr_ep_sc') > -1){
					// alert('change')
					this.table_name = 'GSE152982'
			  }
        // this.getAllDevType(this.table_name)

        this.mockTableData(this.table_name, this.currentPage, this.pageSize)

      }
    },
    changeSequnceType($value) {
      // alert($value)
      let _this = this
      _this.curentSequnceType = $value
       _this.fileDown.percentage = 0
      this.currentAnalIndex = ''
      // alert(_this.curentSequnceType)
      if(this.orga != "" & _this.curentSequnceType != "" ){
        var table_name =
                      'all_' +
                      this.orga +
                      '_ep_' +
                      this.curentSequnceType 
        this.table_name = table_name
        if (table_name.indexOf('all_mm_ep_sc') > -1){
					// alert('change')
					this.table_name = 'CRA002445'
				}

        if (table_name.indexOf('all_dr_ep_sc') > -1){
					// alert('change')
					this.table_name = 'GSE152982'
			  }
        // this.getAllDevType(this.table_name)
        this.mockTableData(this.table_name, this.currentPage, this.pageSize)
        if (this.curentSequnceType.indexOf('bulk')> -1) {
            this.analList = [
              {
                label: 'Expression Profile',
                value: 'all_Expression',
              },
              {
                label: 'Principal Component Analysis',
                value: 'all_Clutser',
              },
              {
                label: 'Differential Analysis',
                value: 'all_Diff',
              },
              {
                label: 'Enrichment Analysis',
                value: 'all_Enrich',
              },
            ]
            // this.currentAnalIndex='all_Expression'
            this.ifcellAnno = false
          }else {
          
            this.analList = [
              {
                label: 'Visualization & Feature',
                value: 'scPCA',
              },
              {
                label: "Marker & Enrichment",
                value: 'FeaturePlot',
              },

              {
                  label:"Difference & Enrichment",
                  value:'Diffanal'
              },

              {
                  label:"Differentiation Trajectory",
                  value:'ClusterDiffTrajectory'
              },
              {
                  label:"Cell-Cell Interaction",
                  value:'ScInterraction'
              },

              {
                  label:"Cell-Cell Communication",
                  value:'ScCommunication'
              }


            ]
            this.ifcellAnno = true
            // this.currentAnalIndex='scPCA'

            this.mockScAnnoTableData(this.table_name)

        
        }


      }

     
      this.dom =''
      // this.changeDom(this.currentAnalIndex)
      // this.changeDom(this.currentAnalIndex)
      // this.changeDom(this.currentAnalIndex)
      
    },

    if2compare($value) {
      // alert($value)
      this.ifcompare = $value
      if ($value == '1') {


        this.analList = [
            {
              label: 'Expression Profile',
              value: 'all_Expression',
            },
            {
              label: 'Principal Component Analysis',
              value: 'all_Clutser',
            },

         ]

      } else {

        // if (this.selectList.length !=  1) {
        //   return this.$Message.info('Select one at most')
        // }
        this.analList = [
          {
            label: 'Expression Profile',
            value: 'all_Expression',
          },
          {
            label: 'Principal Component Analysis',
            value: 'all_Clutser',
          },
          {
            label: 'Differential Analysis',
            value: 'all_Diff',
          },
          {
            label: 'Enrichment Analysis',
            value: 'all_Enrich',
          },
           {
            label: 'Visualization & Feature',
            value: 'scPCA',
          },
          {
            label: "Marker & Enrichment",
            value: 'FeaturePlot',
          }
        ]


        
      }
    },

    changeDevelopmentType($event) {
      this.deve = $event

      if(this.orga != "" & this.curentSequnceType != "" ){
        var table_name =
                      'all_' +
                      this.orga +
                      '_ep_' +
                      this.curentSequnceType 
        this.table_name = table_name
        if (table_name.indexOf('all_mm_ep_sc') > -1){
					// alert('change')
					this.table_name = 'CRA002445'
				}
        if (table_name.indexOf('all_dr_ep_sc') > -1){
					// alert('change')
					this.table_name = 'GSE152982'
			  }

        // this.getAllDevType(this.table_name)
        this.mockTableData(this.table_name, this.currentPage, this.pageSize)
      }

    },
    changeAnalType($event) {
      // alert($event)
      let _this = this
      this.anlType = $event
    },

    getPlolyByParms() {

      console.log(this.anlType)
      var select = []
      if( "" == this.orga ){
                this.$Message.info('please select Organism', 10);
                return
      }
      
   
      if( "" == this.exper ){
                this.$Message.info('please select experiment type', 10);
                return
      }

      if( "" == this.deve ){
                this.$Message.info('please select development type', 10);
                return
      }

      if( "" == this.curentSequnceType ){
                this.$Message.info('please select sequence type', 10);
                return
      }


      select.push({ 
        orga:this.orga,
        exper:this.exper,
        deve:this.deve,
        sequnceType:this.curentSequnceType
      })

      var table_name =
        'all_' +
        this.orga +
        '_ep_' +
        this.curentSequnceType 
      this.table_name = table_name
      if (table_name.indexOf('all_mm_ep_sc') > -1){
					// alert('change')
					this.table_name = 'CRA002445'
			}
      if (table_name.indexOf('all_dr_ep_sc') > -1){
					// alert('change')
					this.table_name = 'GSE152982'
			}

      // this.getAllDevType(this.table_name)

      this.mockTableData(this.table_name, this.currentPage, this.pageSize)

      this.selectList = select

      if( "" == this.anlType ){
                this.$Message.info('please select Analysis type', 10);
                return
      }
      

      this.dom = this.anlType

      // if (this.selectList.length > 2) {
      //   return this.$Message.info('Select two at most')
      // }
      // return

      // console.log(this.Datase2, this.selectList)
      //   let _this = this
      // alert(this.orga)
      // alert(this.curentSequnceType)
      // alert(this.anlType)
      //  alter(this.curentSequnceType),
      //  alert(this.orga)
      // if ('sc' == this.curentSequnceType) {
      //   let dataset_id = 'FLB000005'
      //   this.setCurrentPageToken(dataset_id)
      // }

      // router.push({
      //   name: this.anlType,

      //   params: {
      //     orga: this.orga,
      //     sequ_type: this.curentSequnceType,
      //     selectList:this.selectList
      //     // cell_type:this.cell_type,
      //     // source : this.source,
      //   },
      // })

    },
  },
  mounted() {
    // this.mockTableDataTypeSource()
    this.anal_value='all_Expression'
    this.changeDom('all_Expression')
  },
  created() {
    // this.mockTableData();
    //this.mockTableDataTypeSource()

  },
}
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  margin-top: 2px;
}

.layout-menu-left {
  background: #464c5b;
}
.layout_choice {
  margin: 2% 8% 2% 12%;
  color: white;
  font-size: calc((10 / 1920) * 100vw);
}

.my_button_download {
        border: none;
        border-radius: 4px;
        width: 220px;
        height: 50px;
        background-color:#eee;
        color: rgb(12, 1, 1);
        font-size: 18px;
    }

  .my_button_download:hover {
      background:#a85557;
      color: azure;
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
  margin: 10px;
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

.search_b {
  /* #808695 */
  margin: 2% 2% 2% 2%;
  color: white;
  border: #464c5b;
  background: #464c5b;
  width: calc((100 / 1920) * 100vw);
}
.new_bStyle {
  background-color: #808695;
  border-color: #808695;
  width: calc((240 / 1920) * 100vw);
  font-size: calc((20 / 1920) * 100vw);
  color: white;
}
.new_bStyle:hover {
  background-color: #464c5b;
}

#chart_choice {
  /* height:calc((120/1920) * 100vw) */
}

/* calc((6/1920) * 100vw) */
.myslot {
  padding: calc((14 / 1920) * 100vw) calc((24 / 1920) * 100vw);
  width: calc((340 / 1920) * 100vw);
  background: #515a6e;
}

.myslot_title {
  font-size: calc((20 / 1920) * 100vw);
  margin: 2% 8% 2% 2%;
}
.my_icon {
  margin-right: calc((8 / 1920) * 100vw);
  font-size: calc((30 / 1920) * 100vw);
}
.myEchoice {
  font-size: calc((20 / 1920) * 100vw);
  width: calc((240 / 1920) * 100vw);
  /* height: calc((50/1920) * 100vw);; */
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden; /*这个参数根据需要来绝对要不要*/
}

.my_layout-content {
  font-size: calc((20 / 1920) * 100vw);
}
.myOption {
  font-size: 16px;
  /* height:calc((20/1920) * 100vw) */
  font-weight: normal;
}

.ivu-select-large.ivu-select-single .ivu-select-selection {
  height: calc((20 / 1920) * 100vw);
}

.my_layout_content {
  width: calc((340 / 1920) * 100vw);
}
.row_choice {
  margin: 2% 2% 2% 2%;
  
}

.layout-header {
  height: calc((70 / 1920) * 100vw);
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  line-height: calc((70 / 1920) * 100vw);
}

.btn,
.btn:active,
.btn:focus {
  outline: 0;
}

.btn > span {
  vertical-align: middle;
}

.my_button {
  padding: calc((6 / 1920) * 100vw) calc((15 / 1920) * 100vw)
    calc((6 / 1920) * 100vw) calc((15 / 1920) * 100vw);
  font-size: calc((14 / 1920) * 100vw);
  border-radius: calc((4 / 1920) * 100vw);
}

.h3_title{
  font-weight: bold;
}
.h4_title{
  font-weight: bold;
  
}
.servetitle {
  font-size: 18px;
  cursor: pointer;
}


/* .ivu-table-row{
  cursor: pointer !important;
} */
/* :deep(.ivu-table tr:hover){
  cursor: auto;
} */

/* :deep(.ivu-table-row-hover){
  cursor:default ;
} */

/* .ivu-table-body tr{
  cursor:auto !important;
} */
</style>
