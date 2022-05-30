<template>
    <div id="wrap" class='container'>

    <div class='row viz_title' id='clustergram_title'>
    Clustergrammer
    </div>

    <div class="row" >
      <div id='container-id-1' class='clustergrammer_container'>
          <div class='wait_message'>Please wait ...</div>
      </div>
    </div>

    <div class='row viz_description' id='clustergram_desc'>
      <p>Above is a clustergram/heatmap visualization of your input matrix. The rows and columns have been hierarchically clustered, using the Scipy library in Python, using cosine distance and average linkage. Red/blue cells in the matrix represent positive/negative values in your matrix. The visualization interactive (zoomable, reorderable, filterable) and shareable - the current URL is permanent and shareable.</p>
    </div>



    <!-- <div class='row viz_title' id='col_sim_title'>
      Column Similarity Matrix
    </div>

    <div class="row" >
      <div id='container-id-2' class='clustergrammer_container sim_mat_container'>
          <div class='wait_message'>Please wait ...</div>
      </div>
    </div>

    <div class='row viz_description' id='col_sim_desc'>
      <p>Above is a similarity matrix of the columns in your input matrix. The cells in the matrix represent the similarity between columns, where red/blue represent positive/negative similarity (measured as 1 - cosine-distance). Similarity matrices offer a more detailed view of the similarities and differences between rows/columms, e.g. blue cells indicate data points that behave 'oppositely' and this can not be easily seen in a clustergram/heatmap view.</p>
    </div>



    <div class='row viz_title' id='row_sim_title'>
      Row Similarity Matrix
    </div>

    <div class="row" >
      <div id='container-id-3' class='clustergrammer_container sim_mat_container'>
          <div class='wait_message'>Please wait ...</div>
      </div>
    </div>

    <div class='row viz_description' id='row_sim_desc'>
      <p>Above is a similarity matrix of the rows in your input matrix. The cells in the matrix represent the similarity between rows, where red/blue represent positive/negative similarity (measured as 1 - cosine-distance). </p>
    </div> -->


  </div>


</template>


<script>
import routers from '@/router/routers'
export default {
    name:"ClustGram",
    data(){
          return{
            spinShow1:true,
            series:this.$store.state.app.CurrentPageToken,
          }
        

    },
    methods:{

          // string = mult_view.json clstergram
        make_clust(string){
           

           make_clust(string);
           this.spinShow1=false
        },

    },
     mounted () {   
        
        // this.make_clust('hspc-1_mirna_fpkm_view.json');
        var json_file = this.series + '_expreDiff_TPM_log2_view.json'
        this.make_clust(json_file);
                   
    },
    watch:{
        '$route':'getParams'


    }



}
</script>

<style>

@import '../../css/custom.css';
@import '../../css/bootstrap.css';
@import '../../css/font-awesome.min.css';

#clustgram_wrapper{
    padding: 16px;
    overflow: scroll;

}
#container-id-1{
        width: 100px;
        height: 600px;
        
        
    }    
html, body {
        max-width: 100%;
        /* overflow-y:hidden; */
      }
      /* Wrapper for page content to push down footer */
      /* Negative indent footer by its height */
      /* Pad bottom by footer height */
      #wrap {
        min-height: 100%;
        min-width: 800px;
      }
      /* Set the fixed height of the footer here */
      #footer {
        height: 60px;
        background-color: #f5f5f5;
        text-align: center;
        background-color: #f5f5f5;
        font-size: 13px;
        padding-left:10px;
        padding-right:10px;
        margin-top: 50px;
      }
      #footer_text_container{
        margin-top: 10px;
        margin-bottom: 0px;
        min-width: 950px;
      }
      .clustergrammer_container{
        width: 1140px;
        height: 750px;
        margin-bottom: 10px;
        overflow: hidden;
      }
      .viz_title{
        width: 100%;
        font-size: 30px;
        font-weight: 300;
        /*margin-left: -10px;*/
        margin-top: 10px;
        margin-bottom: 20px;
        border-bottom: 1px solid #DEDEDE;
      }
      .viz_description{
        font-size: 16px;
        font-weight: 300;
        margin-top: 10px;
        margin-left: 5px;
        margin-right: 20px;
        text-align: justify;
        margin-bottom: 30px;
      }


</style>

