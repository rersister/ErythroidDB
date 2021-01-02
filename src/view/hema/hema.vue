<template>
    <div>        
        <Row>
          <h1>
            View all reasearch datasets about diseases of erythroid
          </h1>
          <div>
            <!-- dataset 展示页  -->
              <filter-table 
                    
                    @on-search="onSearch"
                    :data="datasets"
                    :columns="tableColumns">
                    
              </filter-table>
              <Spin size="large" fix v-if="spinShow"></Spin>
          </div>        
          <div style="margin: 10px;overflow: hidden">               
                <div style="float: right;">
                    <Page :total="total"  
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
        </Row>

        <Row>
          <!-- 选择不同疾病进行突变查询 -->
          <h1>
            View all variants based on a certin type of diseases
          </h1>
          <Tabs type="card">
            <Tab-pane label="标签一">标签一的内容</Tab-pane>
            <Tab-pane label="标签二">标签二的内容</Tab-pane>
            <Tab-pane label="标签三">标签三的内容</Tab-pane>
          </Tabs>
        </Row>
        <Row >
          <!-- <router-link to="/Eryth_index/HSPC">HSPC</router-link>
          <router-link to="/Eryth_index/iPS">iPS</router-link>
          <router-link to="/Eryth_index/ES">ES</router-link> -->
          <router-view/>
        </Row>



    </div>
    

    
    
</template>


<script>
import { checkStatus } from '@/libs/util'
import { getDataset,getPageDataSetsByParms } from '@/api/erythdataset'
import FilterTable from '../compnents/FilterTable';
import { type } from 'os';
 const sample_numbers = {
    0: {
      value: "1-10",
      name: '1-10'
    },
    1: {
      value: "10-20",
      name: '10-20',
      // color: 'red'
    },
    2: {
      value: "20-30",
      name: '20-30',
      // color: 'green'
    },
    3: {
      value: "30-50",
      name: '30-50',
      // color: 'green'
    },
    4: {
      value: ">50",
      name: '>50',
      // color: 'green'
    },
    5: {
      value: "all",
      name: 'all',
      // color: 'green'
    },

  };



export default {
    name:"hema",
    components: {FilterTable},
    data(){
      return {
        spinShow:true,
        currentPage: 1,
        pageSize: 10,
        total: 400,
        datasets: [],
        datasetname :'disease',
        tableColumns: [
          {
            title: 'Dataset',
            key: 'series',
            filter: {
              type: 'Input'
            },
            fixed: 'left',
            render: (h, params) => {                        
              return h('div', [
                h('a', {                               
                      attrs:{                              
                        href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.dataset

                      },    
                  },params.row.dataset)
                ])
              }
          },
          {
            title: 'Title',
            key: 'title',
            filter: {
              type: 'Input'
            }
          },
          {
            title: 'PubMed',
            key: 'citation(s)',
            filter: {
              type: 'Input'
            }
          },
          {
            title: 'Status',
            key: 'status',
            filter: {
              type: 'Input'
            },
          },
          {
            title: 'Sample number',
            key: 'sample_numbers',
            filter: {
              type: 'Select',
              option: sample_numbers
            },
          },
          // {
          //   title: 'cell_types',
          //   key: 'cell_types',
          //   filter: {
          //     type: 'Input'
          //   },
          //   render: (h, params) => {
          //               return h('div', [
          //                   h('span', {
          //                       style: {
          //                           display: 'inline-block',
          //                           width: '100%',
          //                           overflow: 'hidden',
          //                           textOverflow: 'ellipsis',
          //                           whiteSpace: 'nowrap'
          //                       },
          //                       domProps: {
          //                           title: params.row.cell_types
          //                       }
          //                   }, params.row.cell_types)
          //               ])
          //   }


          // },
          // {
          //   title: 'Samples',
          //   key: 'samples',
          //   filter: {
          //     type: 'Input'
          //   },
          //   render: (h, params) => {
          //               return h('div', [
          //                   h('span', {
          //                       style: {
          //                           display: 'inline-block',
          //                           width: '100%',
          //                           overflow: 'hidden',
          //                           textOverflow: 'ellipsis',
          //                           whiteSpace: 'nowrap'
          //                       },
          //                       domProps: {
          //                           title: params.row.samples
          //                       }
          //                   }, params.row.samples)
          //               ])
          //   }
          // },
          // {
          //   title: 'Series',
          //   key: 'series',
          //   filter: {
          //     type: 'Input'
          //   },
          // },
          // {
          //   title: 'Platform',
          //   key: 'platform',
          //   filter: {
          //     type: 'Input'
          //   },
          // },
          // {
          //   title: 'Sequence type',
          //   key: 'sequencing_type',
          //   filter: {
          //     type: 'Input'
          //   },

            
          // },
          // {
          //   title: 'Standardized mode',
          //   key: 'standardized_mode',
          //   filter: {
          //     type: 'Input'
          //   },
          // },

          // {
          //   title: 'Reference',
          //   key: 'reference',
          //   filter: {
          //     type: 'Input'
          //   },
           
          // },
            // render: (h, params) => {
            //   return h('Tag', {
            //     slot: 'context',
            //     props: {
            //       color: this.formatStatus(params.row.status, userStatus).color
            //     }
            //   }, this.formatStatus(params.row.status, userStatus).name)
            // }
         
        ],
      }

    },
    methods:{
      mockTableData () {
        var _this = this;      
        _this.spinShow = true, 
        getDataset(_this.datasetname, _this.currentPage,_this.pageSize ).then( res=>{
            // let checkres = checkStatus(res)           
            // alert(checkres.data.code)
            // if(checkres.data.code == 404 ){

            //   alter(checkres.data.message)
            //   alter(checkres.data.data)
            // }
            _this.spinShow = false                    
            let datas = res.data
            console.info(datas.list)
            // console.info(datas.total)
            // let inputdata = [];    
            // console.log(datas.list)
            _this.datasets = datas.list                  
            _this.total = datas.total;
        })
        // 404 还有为连接上服务都会catch到
        // .catch( err =>{    
           
        //    if (err.statusText == undefined){
        //       console.log("connection refuse")          
        //    }
        // })
       
        



      },



      changePge(){

          this.mockTableData();
      },

      changeTableColumns () {
          this.tableColumns = this.getTable2Columns();
      },

      handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.mockTableData()

      },
      handleSizeChange(val){
          console.log(`每页 ${val} 条`);
          this.pageSize = val;
          this.mockTableData()

      },

      /**
       * 格式化状态
       * @param value 状态值
       * @param status 状态对象
       * @returns {*} 返回状态
       */
      // formatStatus(value, status) {
      //   return status[value] || {value: '', name: ''};
      // },
      onSearch(search) {
        var _this = this
        //模拟数据库查询数据
        //这个search应该是传到后台,然后台来根据条件查询数据库
        // alert('查询条件：'+JSON.stringify(search,null,4));
        // alert(search);
        // axios.post("http://localhost:8081/public/getPageDataSetsByParms",
        // {
        //     data:JSON.stringify({
        //         search: search,
        //         pageIndex: _this.currentPage,
        //         pageSize: _this.pageSize
        //       })
        // },
        // {
        //     headers: {
        //         'Access-Control-Allow-Credentials':'true',
        //         'Access-Control-Allow-Methods':'POST'
        //     }
        // }).then(function (response) {
        //     // _this.loading = false;
        //     //  datas = JSON.parse(response.data);
        //     // console.info(response) 带有回应头的所有数据
        //     // console.info(response.data) 
        //     // let datas = response.data;

        //     // if(datas.content === "404"){
        //     // //this.loading = false;

        //     // }else {
        //         // _this.loading = false;    
        //         // console.info(datas) 
        //         _this.spinShow = false,
        //         console.info("======================================================");
        //         // let tr_data = JSON.parse(datas)
        //         // datas = JSON.parse(response.data)
        //         let datas = response.data
        //         console.info(datas.list)
        //         console.info(datas.total)
        //         let inputdata = [];
        //         // datas.list.forEach((e,i)=>{
        //         //     // console.log(e.Gene)
        //         //     inputdata.push({
        //         //         Gene:e.Gene,
        //         //         HSC_FPKM:e.HSC_FPKM,
        //         //         P2_FPKM:e.P2_FPKM,
        //         //         P3_FPKM:e.P3_FPKM,
        //         //         P4_FPKM:e.P4_FPKM,
        //         //         P5_FPKM:e.P5_FPKM,
        //         //         RBC_FPKM:e.RBC_FPKM

        //         //     })
        //         // })
        //         console.log(datas.list)
        //         _this.datasets = datas.list
        //         // _this.tableData = inputdata
        //         // _this.tableData = inputdata ;
        //         _this.total = datas.total;

        //     // }
        // }); 

        getPageDataSetsByParms(search,_this.currentPage,_this.pageSize).then( res=>{         
                
                // alert(res.statusText)
                _this.spinShow = false               
                let datas = res.data
                console.info(datas.list)
                console.info(datas.total)           
                console.log(datas.list)
                _this.datasets = datas.list            
                _this.total = datas.total;
        })


      },

      intoDataSet(){

        // alert('Into');

      }
        

        
    },
    created() {
      this.mockTableData();



    },
}

</script>

<style>




</style>

