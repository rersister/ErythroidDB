<template>
   <div class="layout">
    <div class="my_layout-content">
      <div id="chart_choice" v-show="isShow">
        <div class="row_choice">
          <span>Organism:</span>
          <RadioGroup class="myOption" @on-change="changeOrgaType($event)" >
            <Radio
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
          <span>Experiment Type:</span>
          <RadioGroup class="myOption"  @on-change="changeExperimentType($event)">
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
        

        <!-- <div class="row_choice">
          <span>Development Type:</span>
          <RadioGroup
            class="myOption"
            @on-change="changeDevelopmentType($event)"
          >
            <Radio
              class="myOption"
              v-for="(item, i) in DevelopmentList"
              :label="item.value"
              :key="i"
            >
              <span class="myOption">{{ item.label }}</span>
            </Radio>
          </RadioGroup>
        </div> -->

        <div class="row_choice">
          <span>Sequence Type:</span>
          <RadioGroup class="myOption" @on-change="changeSequnceType($event)">
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
          <!-- dataset 展示页 FilterTableForAllDateSet -->
          <!-- <FilterTableForAllDateSet
            :model.sync="search"
            :v-model="search"
            @on-search="onSearch_datasetTypeSource"
            :data="datasetsTypeSource"
            :columns="tAdatasetTypeSourceColumns"
            @select="selectChange"
            :type="true"
          >
          </FilterTableForAllDateSet> -->
          <!-- <Spin size="large" fix v-if="spinShowTypeSource"></Spin> -->

          <!-- <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page
                :total="totalTypeSource"
                :current="currentPageTypeSource"
                :page-size="pageSizeTypeSource"
                show-elevator
                show-total
                show-sizer
                @on-change="handleCurrentChangeTypeSource"
                @on-page-size-change="handleSizeChangeTypeSource"
              >
              </Page>
            </div>
          </div> -->
        </div>
      
        
        <!-- <div class="row_choice">
          <span>Samples and Groups:</span>
          <RadioGroup class="myOption" @on-change="changeAnalType($event)">
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

        
          <!-- <Dropdown
            placement="bottom-start"
            @on-change="changeAnalType($event)"
          >
            <a href="javascript:void(0)">
              Dataset-2:
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem
                v-for="(item, i) in ifCompareList"
                :key="i"
                :label="item.value"
                >{{ item.label }}</DropdownItem
              >
            </DropdownMenu>
          </Dropdown> -->
          

    
      <div class="row_choice">
        <h3 class="h3_title">Analyze Content:</h3>
        <Row :gutter="16" style="background:#eee;padding:20px">
        </Row>  
        <div
          class="anal_div"
          v-for="(item,index) in analList"
          :key="index"
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

    <div class="row_choice">
              Samples({{totalRow}}) And Group:
                        <Table stripe
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
                                show-elevator 
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
import { getDatatest } from '@/api/erythdataservice'
import { getallDevSampleGroup } from '@/api/erythroidAtlas'
import router from '@/router'
import { mapMutations } from 'vuex'
import FilterTableForAllDateSet from '../../compnents/FilterTableForAllDateSet'
import {
  getDatasetTypeSource,
  searchDatasetTypeSource,
} from '@/api/erythdataset'
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

const P_Value_range = {
  0: {
    value: '>0.05',
    name: '>0.05',
  },
  1: {
    value: '=<0.05',
    name: '=<0.05',
    // color: 'red'
  },
}

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
          key: 'dataset_id',
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
        },
        {
          title: 'Development Type',
          key: 'source',
          filter: {
            type: 'Input',
          },
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
          value: 'ep',
          label: 'Expression profiling',
        },
      ],
      orga: "hs",
      exper:'ep',
      deve:'',
      OrgaList: [
        {
          value: 'hs',
          label: 'Homo sapiens',
        },
        {
          value: 'mm',
          label: 'Mus musculus',
        },
      ],
      curentSequnceType: 'bulk',
      typeList: [
        {
          value: 'bulk',
          label: 'Bulk',
        },
        {
          value: 'sc',
          label: 'Single Cell',
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
      CellSourceList: [
        {
          value: 'CB',
          label: 'CB',
        },
        {
          value: 'FL',
          label: 'FL',
        },
        {
          value: 'BM',
          label: 'BM',
        },

        {
          value: 'PB',
          label: 'PB',
        },
        {
          value: 'SP',
          label: 'SP',
        },
        {
          value: 'YS',
          label: 'YS',
        },

        {
          value: 'ESC',
          label: 'ESC',
        },

        {
          value: 'cardiac',
          label: 'cardiac',
        },

        {
          value: 'J2E',
          label: 'J2E',
        },

        {
          value: 'K562',
          label: 'K562',
        },

        {
          value: 'iPSc',
          label: 'iPSc',
        },
      ],
      analList: [
          {
            label: 'Expression Profile',
            value: 'all_Expression',
          },
          {
            label: 'Principal Components',
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
          title: 'Gid',
          key: 'gid',
          filter: {
            type: 'Input',
          },
          fixed: 'left',
          render: (h, params) => {            
              if (params.row.gid.indexOf("GSE") > -1){
                  return h('div', [
                  h('a', {                               
                        attrs:{                              
                          href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.gid

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
          title: 'Sid',
          key: 'sample_name',
          filter: {
            type: 'Input',
          },
        },
        {
          title: 'Organism',
          key: 'organism',
          filter: {
            type: 'Input',
          },
        },
        {
          title: 'Cell Type',
          key: 'cell_type',
          width:200,
          filter: {
            type: 'Input',
          },
        },
        {
          title: 'Cell Source',
          width:200,
          key: 'source_cell',
          filter: {
            type: 'Input',
          },
        },
        {
          title: 'Growth Mode',
          width :100,
          key: 'growth_mode',
          filter: {
            type: 'Input',
          },
          // filter: {
          //     type: 'Select',
          //     option: P_Value_range
          // },
        },
         {
          title: 'Development Type',
          key: 'development_type',
          width :125,
          filter: {
            type: 'Input',
          },
          // filter: {
          //     type: 'Select',
          //     option: P_Value_range
          // },
        },
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
    }
  },
  computed: {},
  methods: {
    ...mapMutations(['setCurrentPageToken']),
    // selectChange(data) {
    //   this.selectList = data
    // },

    changeDom(name) {
      var select = []
      if( "" == this.orga ){
                this.$Message.info('please select Organism', 10);
                return
      }
      
   
      if( "" == this.exper ){
                this.$Message.info('please select Experiment Type', 10);
                return
      }

      // if( "" == this.deve ){
      //           this.$Message.info('please select Development type', 10);
      //           return
      // }

      if( "" == this.curentSequnceType ){
                this.$Message.info('please select Sequence type', 10);
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
      this.mockTableData(table_name, this.currentPage, this.pageSize)

      this.selectList = select



      if (this.dom !== name) {
        this.dom = name
      } else {
        this.dom= ''
      }


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

    onSearch_datasetTypeSource(searchTypeSource) {
      var _this = this
      // alert('jinlai')
      // alert(Object.keys(searchTypeSource))
      // var keys = Object.keys(searchTypeSource)
      // alert(typeof(keys))
      // alert(searchTypeSource)
      // if ( keys.replace(/\s*/g,'').length.length === 0 === 0 ){
      //     // alert('yes')  输入了空值
      //     this.$Message.info('Please check your input of  ' + key,15);
      //     return;
      // }
      for (let key in searchTypeSource) {
        // alert(key)
        // alert(searchTypeSource[key])
        var value = searchTypeSource[key]
        // alert(typeof(value))
        if (typeof value === 'object') {
          // alert('yes')  输入了空值  HSPC
          this.$Message.info('Please check your input   ')
          return
        } else {
          // alert('no')  不输入空
          // alert(value.replace(/\s*/g,'').length) + key,15
          if (value.replace(/\s*/g, '').length.length === 0) {
            this.$Message.info('Please check your input of  ')
            this.load()
            return
          } else {
            continue
          }
        }
      }
      searchDatasetTypeSource(
        searchTypeSource,
        _this.currentPageTypeSource,
        _this.pageSizeTypeSource,
        _this.cell_name
      ).then((res) => {
        _this.spinShowTypeSource = false
        let datas = res.data
        if (datas.signal === 0) {
          // 0 表示无相关数据
          this.$Message.info('No related datasets', 15)
        } else {
          _this.datasetsTypeSource = datas.list
          _this.totalTypeSource = datas.total
        }
      })
    },

    changePge() {
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
    changeOrgaType($value) {
      // alert($value)
      this.orga = $value
      
      if(this.orga != "" & this.curentSequnceType != "" ){
        var table_name =
                      'all_' +
                      this.orga +
                      '_ep_' +
                      this.curentSequnceType 
      
        this.table_name = table_name
        this.mockTableData(table_name, this.currentPage, this.pageSize)
      }
      

      if (this.curentSequnceType == 'bulk') {
        this.analList = [
          {
            label: 'Expression Profile',
            value: 'all_Expression',
          },
          {
            label: 'Principal Components',
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
      } else {
        // alert(this.orga)
        if ( this.orga == 'hs'){
             this.analList = [
          {
            label: 'Single Cell Visualization & Feature',
            value: 'scPCA',
          },
          {
            label: "Cluster's Markers & Enrich",
            value: 'FeaturePlot',
          },

          {
              label:"Differential & Enrich",
              value:'Diffanal'
          },

          {
              label:"Differentiation Trajectory",
              value:'ClusterDiffTrajectory'
          },
          {
              label:"Cell-Cell Interraction",
              value:'ScInterraction'
          },

          {
              label:"Cell-Cell Communication",
              value:'ScCommunication'
          }


        ]

        }else{
          this.analList = []
        }

       
        
      }

    },

    changeExperimentType($value){
      this.exper = $value

      if(this.orga != "" & this.curentSequnceType != "" ){
        var table_name =
                      'all_' +
                      this.orga +
                      '_ep_' +
                      this.curentSequnceType 
      
        this.table_name = table_name
        this.mockTableData(table_name, this.currentPage, this.pageSize)
      }
    },
    changeSequnceType($value) {
      // alert($value)
      this.curentSequnceType = $value

      if(this.orga != "" & this.curentSequnceType != "" ){
        var table_name =
                      'all_' +
                      this.orga +
                      '_ep_' +
                      this.curentSequnceType 
      
        this.table_name = table_name
        this.mockTableData(table_name, this.currentPage, this.pageSize)
      }

      if (this.curentSequnceType == 'bulk') {
        this.analList = [
          {
            label: 'Expression Profile',
            value: 'all_Expression',
          },
          {
            label: 'Principal Components',
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
      } else {
        // alert(this.orga)
        if ( this.orga == 'hs'){
             this.analList = [
          {
            label: 'Single Cell Visualization & Feature',
            value: 'scPCA',
          },
          {
            label: "Cluster's Markers & Enrich",
            value: 'FeaturePlot',
          },

          {
              label:"Differential & Enrich",
              value:'Diffanal'
          },

          {
              label:"Differentiation Trajectory",
              value:'ClusterDiffTrajectory'
          },
          {
              label:"Cell-Cell Interraction",
              value:'ScInterraction'
          },

          {
              label:"Cell-Cell Communication",
              value:'ScCommunication'
          }


        ]

        }else{
          this.analList = []
        }

       
        
      }

    },

    if2compare($value) {
      // alert($value)
      this.ifcompare = $value
      if ($value == '1') {

        // if (this.selectList.length !=  2) {
        //   return this.$Message.info('Select two at most')
        // }

        this.analList = [
            {
              label: 'Expression Profile',
              value: 'all_Expression',
            },
            {
              label: 'Principal Components',
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
            label: 'Principal Components',
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
            label: 'Single Cell Visualization & Feature',
            value: 'scPCA',
          },
          {
            label: "Cluster's Markers & Enrich",
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
        this.mockTableData(table_name, this.currentPage, this.pageSize)
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
                this.$Message.info('please select Experiment Type', 10);
                return
      }

      if( "" == this.deve ){
                this.$Message.info('please select Development type', 10);
                return
      }

      if( "" == this.curentSequnceType ){
                this.$Message.info('please select Sequence type', 10);
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
      this.mockTableData(table_name, this.currentPage, this.pageSize)

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
  font-size: calc((20 / 1920) * 100vw);
  /* height:calc((20/1920) * 100vw) */
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

.h3_title {
  font-size: calc((35 / 1920) * 100vw);

}

.servetitle {
  font-size: calc((20 / 1920) * 100vw);
  cursor: pointer;
}
</style>
