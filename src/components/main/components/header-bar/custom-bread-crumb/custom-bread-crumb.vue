<template>
    <div>
         <Breadcrumb>
            <BreadcrumbItem  class="breadCru" v-for="item in list" :to="item.to" :key="`bread-crumb-${item.name}`">           
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
     methods:{
        showTitle (item) {
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

