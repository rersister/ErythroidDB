<template>
  <div>
    <Table
      border
      class="h1_title"
      :data="filters"
      :columns="tableColumnsFilters"
      stripe
    >
    </Table>

    <!--  @on-row-click="intoDataSet"  想办法设置在 组件使用层 -->
    <!--  border 去掉border 少 不对齐感 -->
    <Table
      class="h1_title"
      @on-row-click="intoDataSet"
      @on-selection-change="onChange"
      height="500"
      :show-header="false"
     
      :data="data"
      :columns="columns"
      stripe
    >
    </Table>
  </div>
</template>

<script>
import router from '@/router'
import routers from '@/router/routers'
import { mapMutations } from 'vuex'
export default {
  name: 'FilterTableForAllDateSet',
  props: {
    columns: Array, //列描述数据对象
    data: Array, //表格数据
    type: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      filters: [
        {
          title: '',
        },
      ],
      tableColumnsFilters: [],
      search: {}, //过滤条件保存的对象,就是保存Input框和Select中值
      dataset_id: '',
    }
  },
  created() {
    for (let index in this.columns) {
      let filter = {}

      /**
       * 因为是采用的两个表的形式,过滤表中显示查询的Input,Select条件输组件,表头显示的是数据表的表头,渲染的数据是传入的columns中的filter字段
       * 数据表隐藏表头,只显示数据,渲染的数据是传入的columns中的key值
       */
      //将传入的列描述数据对象(columns) 的title和width 复制给 过滤表的列描述数据对象(tableColumnsFilters)
      this.$set(filter, 'title', this.columns[index].title)
      if (this.columns[index].width) {
        this.$set(filter, 'width', this.columns[index].width)
      }

      let render = (h) => {}
      /**
         * 需要有搜索的列, 只要在 列描述数据对象columns中配置 filter属性就行如下:
         {
            title: '名字',
            key: '_id',
            filter: {
              type: 'Input'
            }
          },
         {
           title: '交易金额 (元)',
           key: 'money',
           filter: {
             type: 'Select',
             option:status //选项
           }
         },
         */
      //如果存在 过滤选项
      if (this.columns[index].filter) {
        //过滤为 下拉选择框
        if (
          this.columns[index].filter.type &&
          this.columns[index].filter.type === 'Select'
        ) {
          render = (h) => {
            return h(
              this.columns[index].filter.type,
              {
                props: {
                  placeholder: 'Choose ' + this.columns[index].title,
                  value: 0, //Select选项列表一般 0 为全部
                },
                on: {
                  'on-change': (val) => {
                    if (val === 0) {
                      //当选项是全部的时候删除 search中该字段的过滤条件
                      this.$delete(this.search, this.columns[index].key)
                      this.load()
                      return
                    }
                    //添加字段过滤条件
                    // 判读val 输入的值是否是空格，去空格后再加入

                    if (val.split(' ').join('').length === 0) {
                      this.$Message.info('Please check your input', 15)
                      this.load()
                      return
                    } else {
                      this.$set(
                        this.search,
                        this.columns[index].key,
                        val.split(' ').join('')
                      )
                      this.load()
                    }
                  },
                },
              },
              this.createOptionsRender(index, h)
            )
          }
        } else {
          //如果是输入框
          render = (h) => {
            //获取输入框的值,为了减少数据库的压力,我这里是
            //通过回车和点击搜索按钮才进行数据过滤查询,如果
            //要输入框变化就进行过滤,把 this.load()放到
            //input事件方法就行了
            let inputValue = {}
            return h(this.columns[index].filter.type, {
              props: {
                placeholder: 'Input ' + this.columns[index].title,
                icon: 'ios-search',
              },
              on: {
                input: (val) => {
                  inputValue = val
                  if (!inputValue) {
                    this.validInputValue(index, inputValue)
                  }
                },
                //input框后面的搜索按钮的点击事件
                'on-click': () => {
                  this.validInputValue(index, inputValue)
                },
                'on-enter': () => {
                  this.validInputValue(index, inputValue)
                },
              },
            })
          }
        }
      }

      this.$set(filter, 'render', render)
      this.tableColumnsFilters.push(filter)

      // let fi = {};
      // let ren = (h) => {};
      // if (this.columns[index].ren){
      //    ren = (h) => {
      //       return this.columns[index].ren.html;
      //     }
      // }
      // // this.$set(fi, 'render', ren);
      // this.columns.push(ren);
    }
  },
  methods: {
    ...mapMutations(['setCurrentPageToken']),
    
    onChange(selection){
      const selectList = selection.map((e) => {
        return e.dataset_id
      })
      this.$emit('select', selectList)
    },
    createOptionsRender(index, h) {
      //选项渲染
      let optionRender = []
      if (this.columns[index].filter.option) {
        let option = this.columns[index].filter.option
        for (let i in option) {
          optionRender.push(
            h(
              'Option',
              {
                props: {
                  value: option[i].value,
                },
              },
              option[i].name
            )
          )
        }
      }
      return optionRender
    },
    //重新加载数据
    load() {
      //会执行一个load的事件
      this.$emit('on-search', this.search)
      this.$emit('on-row-click', this.dataset_id)
    },

    //验证输入框的值
    validInputValue(index, inputValue) {
      if (!inputValue) {
        this.$delete(this.search, this.columns[index].key)
        this.load()
        return
      }
      this.$set(this.search, this.columns[index].key, inputValue)
      this.load()
    },

    intoDataSet(data, index, event) {
      // alert(data.dataset);
      if(this.type) return;
      this.setCurrentPageToken(data.dataset_id)
      // this.setCurrentPageToken(data.EryID)
      router.push({
        name: 'Dataset_detail',
        params: {
          dataset: data.dataset_id,
        },
      })
    },
    
  },
}
</script>

<style scoped>
.ivu-table .demo-table-info-row td {
  background-color: #2db7f5;
  color: #fff;
}

/* .h1_title {
  font-size: calc((40 / 1920) * 100vw);
} */

</style>
