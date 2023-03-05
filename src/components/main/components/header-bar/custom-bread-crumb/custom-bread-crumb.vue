<template>
    <div>
         <Breadcrumb>
            <!-- <BreadcrumbItem to="/home" >Home</BreadcrumbItem> -->
            <BreadcrumbItem  class="breadCru" v-for="item in list.slice(0,list.length-1)" :to="item.to" :key="`bread-crumb-${item.name}`">           
             <Icon :type="item.icon || ''"></Icon>
             {{ showTitle(item) }}
            </BreadcrumbItem>
            <BreadcrumbItem  class="breadCru" v-for="item in list.slice(list.length-1,list.length)"  :key="`bread-crumb-${item.name}`">           
             <Icon :type="item.icon || ''"></Icon>
             {{ showTitle(item) }}
            </BreadcrumbItem>

         </Breadcrumb>
    </div>
</template>


<script>
import { showTitle } from '@/libs/util'

export default {
    
    name:"customBreadCrumb",
    props:{
        list:{
             type: Array,
             default: () => []

        },


     },

    computed: {
        seeList() {
            alert(this.list)
        }
    },
     methods:{
        showTitle (item) {
            // alert(item.to)
            // if('Dataset_detail'==item.name){
            //     return item.name
            // }
            
           
            return showTitle(item, this)
        },
     

    },
      
    
    



}
</script>

<style>

    .breadCru{
        font-size: calc((20/1920) * 100vw);
    }


</style>

