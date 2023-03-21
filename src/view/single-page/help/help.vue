<template>
    <div>
 
    <!-- 导航区域 -->

    
        
    <div>
        <ul class="navs" >
            <button class="help_button" @click="isActive = !isActive" ><Icon type="ios-arrow-down"></Icon></button>
            <collapse>
                <div class="container" v-show="isActive">
                    <li><a href="#Home" class="a1"><strong>1.Home</strong></a></li>
                    <li><a href="#Differentiation">&nbsp;&nbsp;1.1 Differentiation</a></li>
                    <li><a href="#Genes">&nbsp;&nbsp;1.2 Genes</a></li>
                    <li><a href="#Compounds">&nbsp;&nbsp;1.3 Compounds</a></li>
                    <li><a href="#Disease">&nbsp;&nbsp;1.4 Disease</a></li>
                    <li><a href="#Search"><strong>2. Search</strong></a></li>
                    <li><a href="#Dataset">&nbsp;&nbsp;2.1 Dataset</a></li>
                    <li><a href="#DatasetService">&nbsp;&nbsp;2.2 Dataset Service</a></li>
                    <!-- Analysis of bulk RNA-seq datasets -->
                    <li><a href="#DatasetService">&nbsp;&nbsp;&nbsp;2.2.1 Bulk RNA-seq</a></li>    

                    <li><a href="#ExpressionProfile">&nbsp;&nbsp;&nbsp;&nbsp;1) Expression Profile</a></li>
                    <li><a href="#PrincipalComponents">&nbsp;&nbsp;&nbsp;&nbsp;2) PCA</a></li>
                    <li><a href="#DifferentialAnalysis">&nbsp;&nbsp;&nbsp;&nbsp;3) Differential Analysis</a></li>
                    <!-- Enrichment Analysis -->
                    <li><a href="#EnrichmentAnalysis">&nbsp;&nbsp;&nbsp;&nbsp;4) Enrichment Analysis</a></li>
                    <!-- Dimensional Reduction & Feature -->
                    
                    <li><a href="#DatasetServiceSC">&nbsp;&nbsp;2.2.2 scRNA-seq</a></li>

                    <li><a href="#DRF">&nbsp;&nbsp;&nbsp;&nbsp;1) Visualization & Feature</a></li>
                    <li><a href="#ME">&nbsp;&nbsp;&nbsp;&nbsp;2) Marker & Enrichment</a></li>
                    <li><a href="#DE">&nbsp;&nbsp;&nbsp;&nbsp;3) Difference & Enrichment</a></li>

                    <!-- Differentiation Trajectory -->
                    <li><a href="#DT">&nbsp;&nbsp;&nbsp;&nbsp;4) Differentiation Trajectory</a></li>
                    <!-- Cell-Cell Interraction -->
                    <li><a href="#CCI">&nbsp;&nbsp;&nbsp;&nbsp;5) Cell-Cell Interaction</a></li>
                    <!-- Cell-Cell Communication. -->
                    <li><a href="#CCC">&nbsp;&nbsp;&nbsp;&nbsp;6) Cell-Cell Communication</a></li>
                    <li><a href="#Erythroid"><strong>3. Erythroid Atlas</strong></a></li>
                    <li><a href="#About"><strong>4. About</strong></a></li>
                </div>
            </collapse>
        </ul>
        
    </div>
    <!-- 内容区域 -->
    <div class="content">
       
        <!-- <div>content-0</div>
        <div>content-1</div>
        <div>content-2</div>
        <div>content-3</div>
        <div>content-4</div> -->

        <div>
            <h1 class="h1_title" >
                Tutorial for EryDB: Erythroid Database
            </h1>
            <br>
            <p class="p_text" id="Home">
                EryDB was developed as an open-access and comprehensive database dedicated to the collection, integration, analysis, and visualization of transcriptomic data for erythropoiesis and diseases related to it. Currently, the database contains expertly curated quality-assured data of 3,802 samples and 1,167,800 single cells derived from 94 public studies of three species (Homo sapiens, Mus musculus, and Danio rerio), nine tissue types, and seven diseases. EryDB allows users to not only browse molecular features of erythropoiesis among tissues and species, but also to perform computational analyses of single-cell and bulk RNA-seq data, thus serving as a convenient platform for customized queries and analyses.                                                     
            </p>
        </div>

        <div >
            <h1 class="h1_title">
            1. Home page
            </h1>
            <br>

            <p class="p_text">
                The clickable “About EryDB” at the top of the page opens a simple summary of the database; 
                another click closes it. In the quick search box, users can search for genes, tissues, dataset IDs, and species. 
                Datasets related to the search are displayed in a clickable table on the “Search” page.            
            </p>
          
            <!-- <p class="img_c"><img width="80%" src="@/assets/img/help_homePage.svg" alt="img"></p> -->
            <p class="img_c"><img width="100%" src="@/assets/img/help_homePage.png" alt="img"></p>

            <!-- test_home.png -->
            <!-- <p class="img_c"><img width="100%" src="@/assets/img/test_home.png" alt="img"></p> -->


            <p class="p_text">
                The datasets can also be searched by selecting one of the four categories displayed on the home page: <br>
                1.1 Differentiation;<br>
                1.2. Genes; <br>
                1.3. Compounds; <br>
                1.4. Diseases.
            </p>
          
            <p  class="img_c"><img  width="80%" src="@/assets/img/help_homePage2.jpg" alt="img"></p>
        </div >

        <br id="Differentiation" >
        <br>
        <br>
        <br>
        <br>
        <br>
        <div >
            <h3>
                <li >1.1 Differentiation</li>
            </h3>
            <br>
            <p class="p_text">
            This module allows the datasets to be search by cell type stage.            
            </p>

            <p class="img_c"><img width="80%" src="@/assets/img/help_homeDiffer.jpg" alt="img"></p>

        </div>
        

        <br id="Genes" >
        <br>
        <br>
        <br>
        <br>
        <br>
        <div >
            <h3>
                <li>1.2 Genes</li>
            </h3>
            <br>
            <p class="p_text">
            This module allows the datasets to be searched by reported genes.            
            </p>
          
            <p class="img_c"><img width="80%" src="@/assets/img/help_homeGenes.jpg" alt="img"></p>

        </div>


        <br id = 'Compounds' >
        <br>
        <br>
        <br>
        <br>
        <br>
        <div >
            <h3>
                <li>1.3 Compounds</li>
            </h3>
            <br>
            <p class="p_text">
            This module allows the datasets to be searched by compound name.            
            </p>
            
            <p class="img_c"><img width="80%" src="@/assets/img/help_homeCompounds.jpg" alt="img"></p>
        </div>


        <br  id='Disease'>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div >
            <h3>
                <li>1.4 Diseases</li>
            </h3>
            <br>
            <p class="p_text">
            This module allows the datasets to be searched by disease type.         
            </p>
        
            <p class="img_c"><img width="80%" src="@/assets/img/help_homeDiseases.jpg" alt="img"></p>
        </div>


        <br id="Search">
        <br>
        <br>
        <br>
        <br>
        <br>
        <div>
            <h3 class="h1_title">
                2. Search page
            </h3>
            <br>
            <p class="p_text">
                An advanced search is provided on this page. 
                The results can be filtered according to cell type, reported gene, compound type, disease type, species, tissue, experiment type, and/or omics type and are displayed in a clickable table.</p>
            <br>
            <br>
            <p class="img_c"><img width="100%" src="@/assets/img/help_search.jpg" alt="img"></p>
        
        <br id="Dataset">
        <br>        
        <br>
        <br>    
        <br>
            <h1 class="h1_title" >
                2.1 Dataset Service page
            </h1>
            <br>
        
            <p class="p_text">
                After obtaining the dataset(s) of interest, 
                detailed information about the dataset(s) can be obtained by clicking on any of the items in a row of the table. 
                This opens the Dataset Service page, which contains:<br>
                1) dataset details such as the dataset ID, organism name, tissue type, experiment type, 
                omics type, summary of the study, and other information about the selected dataset;<br> 
                2) details about the samples in the dataset including sample ID, sample name, 
                tissue type, and cell number;<br>
                3) the analysis functions.
            </p>
            <br>
            <br>
            <h3>
                <li>Dataset Details</li>
            </h3>
            <br>
            <!-- <p class="p_text">
                This panel represents basic details of this dataset including the 
                dataset id, organism, tissue, growth mode, development type, experiment type, study’s citation id and so on.
            </p> -->
            <p class="img_c"><img width="100%" src="@/assets/img/help_datasetDetial.png" alt="img"></p>

            <br>
            <br>
            <h3>
                <li>Dataset Sample</li>
            </h3>
            <br>
            <!-- <p class="p_text">
                This panel represents one or multiple samples contained in this dataset, 
                including the information of species, tissue, and cell number.</p> -->
            <p class="img_c"><img width="80%" src="@/assets/img/help_datasetSample.jpg" alt="img"></p>
            

            <br id="DatasetService">
            <br>        
            <br>
            <br>    
            <br>
            <h3 class="h1_title" >
                <li>2.2 Dataset Service</li>
            </h3>
            <br>
            <p class="p_text">
                <strong>2.2.1 Analysis of bulk RNA-seq datasets</strong>
                <br>
                <!-- <br> -->
                EryDB provides the following analysis functions for the selected databset:  <br>
                1) Expression Profile; <br>
                2) Principal Component Analysis (PCA);  <br>
                3) Differential Analysis; <br> 
                4) Enrichment Analysis.
            </p>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_datasetAnalBulk.jpg" alt="img"></p>
            
            
            
            <br  id = 'ExpressionProfile' >
            <br>
            <br>
            <br>
            <br>
            <h4>
                1) Expression Profile
            </h4>
            <br>
            <p class="p_text">
                The box plot shows the expression levels of genes in different cell type groups 
                in the selected dataset. More information about a gene of interest can be 
                obtained by typing the gene symbol in the input box. 
                This opens a link to information on the web.
            </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_expPro.png" alt="img"></p>
            
            <br id = 'PrincipalComponents'>
            <br>
            <br>
            <br>
            <br>
            <h4 >
                2) Principal Component Analysis (PCA)
            </h4>
            <br>
            <p class="p_text">
                A dot plot that shows the results of the principal component analysis of 
                samples in the selected dataset is displayed. The group 
                of interest can be selected be clicking the corresponding dot in the 
                label on the right of the plot. 
                This displays group information from sample information in the dataset.
            </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_BulkPCA.jpg" alt="img"></p>
            
            
            <br id = 'DifferentialAnalysis'>
            <br>
            <br>
            <br>
            <br>
            <h4 >
                3) Differential Analysis
            </h4>
            <br>
            <p class="p_text">
                A volcano plot that shows the differential expression of samples in a group is displayed. 
                The “Comparsion Group” box can be used to select the groups to be compared. 
                For example, selecting “LMO2-GATA1” will compare the LMO2 group with the GATA1 group. 
                The group information is provided in Sample’s and Group Panel. 
           </p>
         
            <p class="img_c"><img width="80%" src="@/assets/img/help_BulkDiff.jpg" alt="img"></p>
            <br>
            <p class="p_text">
                A table that contains log fold change(logFC), P values(PValue), and other information about the all the 
                genes in the plot is also provided. Details about a gene of 
                interest can be obtained by typing the gene symbol in the input box above the table.
            </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_BulkDiffTable.png" alt="img"></p>
            
            <br id = 'EnrichmentAnalysis'>
            <br>
            <br>
            <br>
            <br>
            <h4 id = 'EnrichmentAnalysis'>
                4) Enrichment Analysis
            </h4>
            <br>
            <p class="p_text">
                A bar plot that shows the functional enrichment results of the significantly differentially expressed genes in a selected group is displayed. 
                The “Contrasts Group” box can be used to select the groups to be compared. 
                The “Type'” box can be used to select the enrichment type: one of the three categories in the gene ontology (GO-CC, cellular component; GO-MF, molecular function; GO-BP, biological process; or KEGG. 
                Orange indicates highly enriched terms; blue indicates negatively enriched terms.
            </p> 
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_BulkEnrich.png" alt="img"></p>
            
            
            <br id='DatasetServiceSC'>
            <br>
            <br>
            <br>
            <br>
            <p class="p_text">
                <strong>2.2.2 Analysis of single-cell RNA-seq datasets</strong><br>
                EryDB provides the following analysis functions for the selected database:<br>
                1) Visualization & Feature;<br>
                2) Marker & Enrichment;<br>
                3) Difference & Enrichment;<br>
                4) Differentiation Trajectory;<br>
                5) Cell–Cell Interaction;<br>
                6) Cell–Cell Communication.
            </p>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_datasetAnalSC.jpg" alt="img"></p>
            
            
            <br id = 'DRF'>
            <br>
            <br>
            <br>
            <br>
            <h4 >
                1) Visualization & Feature
            </h4>
            <br>
            <p class="p_text">
                A principal component analysis (PCA), t-SNE, or 
                UMAP graph is displayed for cell clusters in the selected dataset. 
                The original annotation of cell type is used as the reference for the clustering results. 
                The visualization chart can be customized. Plot Size decides the dot size in the chart; 
                View options are 2D or 3D; Visual Method can be PCA, t-SNE, or UMAP; 
                Group can be used to select the tissue type; and “Color” box can be used to select the 
                dots to be colored according to cell phase (Phase), cell type (Celltype) or original identity (orig.ident). 
                </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_scPCA.jpg" alt="img"></p>
            <br>
            <p class="p_text">
                The displayed Feature Plot can be customized by inputting the symbol of a gene of interest. 
                The expression levels of the selected gene in all cells in a chosen group will be displayed.
            </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_scFeature.jpg" alt="img"></p>
            
            <br id = 'ME'>
            <br>
            <br>
            <br>
            <br>
            <h4 >
                2) Marker & Enrichment
            </h4>
            <br>
            <p class="p_text">
                A heatmap that shows the top cell markers that are highly specifically expressed (significant high fold change; FDR <0.05) 
                in each cell type in the selected dataset is displayed. 
                A bar plot that shows the functional enrichment results of the 
                significantly differentially expressed genes in a cell cluster of interest is 
                displayed as Cluster’s Enrichment Analysis. 
            </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_scMarker.jpg" alt="img"></p>
            <br>
            <p class="p_text">
                The “Enrichment Cluster” box can be used to select the cell cluster. The “Enrichment Type” box can be used to select the enrichment type: 
                one of the three categories in the gene ontology (GO-CC, cellular component; GO-MF, molecular function; GO-BP, biological process; or KEGG. 
            </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_scMarkerEnrich.jpg" alt="img"></p>
            
            <br id = 'DE'>
            <br>
            <br>
            <br>
            <br>
            <h4 >
                3) Difference & Enrichment;
            </h4>
            <br>
        <p class="p_text">
            A volcano dot plot that shows the differential expression of cells in a selected group is displayed. 
            The “Contrasts Group” box can be used to select the groups to be compared. 
            For example, selecting “Macrophages-iPSC-VS-Macrophages_PB” will compare 
            the Macrophages of iPSC group and the Macrophages of PB group. 
            The group information is provided in Sample’s and Group Panel. 
           </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_scDiffer.jpg" alt="img"></p>
            <br>
            <p class="p_text">
                A table that contains fold change, P values, and other information about the 
            all the genes in the plot is also provided. Details about a gene of interest 
            can be obtained by typing the gene symbol in the input box above the table.
            </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_scDifferTable.png" alt="img"></p>
            <br>
            <br>
            <p class="p_text">
                A bar plot that shows the enrichment of significantly differentially expressed genes 
                in a cluster of interest is displayed. You “Contrasts Group” box can be used to select 
                the group of interest. 
                The “Enrichment Type” box can be used to select the interested enrichment type: one of the three categories in the gene ontology (GO-CC, cellular component; GO-MF, molecular function; GO-BP, biological process; or KEGG. Orange indicates highly enriched terms; blue indicates negatively enriched terms.
            </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_scDifferEnrich.jpg" alt="img"></p>
            
            
            <br id = 'DT'>
            <br>
            <br>
            <br>
            <br>
            <h4 >
                4) Differentiation Trajectory;
            </h4>
            <br>
        <p class="p_text">
            Dot plots that show pseudotime and differentiation trajectories of cells in a chosen group are displayed. 
            </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_scPseu.png" alt="img"></p>
            <br>
            <p class="p_text">
                The “Group” boxes can be used to select the group of interest and the “Color” box can be used to color the 
            dots according to the group cell phase (Phase), cell type (Celltype) or original identity (orig.ident).
           </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_scDifferenceTra.png" alt="img"></p>
            
            <br id = 'CCI'>
            <br>
            <br>
            <br>
            <br>
            <h4 >
                5) Cell-Cell Interaction;
            </h4>
            <br>
        <p class="p_text">
            The interaction of the cell cluster in a chosen group is displayed in an interaction 
            atlas. The “Group” box can be used to select the group of interest. 
            The “Communication type” box can be used to select the interaction 
            type (all, growth factor, other, cytokine, checkpoint).
        </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_scInter.png" alt="img"></p>
            
            
            <br id = 'CCC'>
            <br>
            <br>
            <br>
            <br>
            <h4 id = 'CCC'>
                6) Cell-Cell Communication.
            </h4>
            <br>
        <p class="p_text">
            A plot that shows the communication patterns of a cell cluster in a chosen group is displayed. 
            The “Group” box can be used to select the group of interest. 
            The “Signal pattern” box can be used to select the signal type (incoming or outgoing). 
            A plot that shows the names of the signals, 
            their communication patterns, and the contribution of each L-R pair is displayed.
        </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_scCommu.png" alt="img"></p>
            <br>
            <br>
            <p class="p_text">
                A plot that shows the names of the signals, 
            their communication patterns, and the contribution of each L-R pair is displayed.
            </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_scCommuNetP.jpg" alt="img"></p>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_scContribution.jpg" alt="img"></p>
            <br>

        </div>

        <br id="Erythroid">
        <br>
        <br>
        <br>
        <br>
        <br>
        <div >
            <h3 class="h1_title">
                3. Erythroid Atlas
            </h3>
            <br>
            <p class="p_text">
                The Erythroid Atlas was constructed to provide integrated datasets that can be queried to obtain the analysis of interest to a user. The organism, experiment type, and sequence type can be selected and the relevant datasets are integrated and provided as a single dataset.
                
            </p>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_eryAtlas.png" alt="img"></p>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_eryAtlas1.jpg" alt="img"></p>
            <br>
            <p class="p_text">
                At the bottom of this page, a table that contains information about the samples and groups in the integrated dataset is provided.
            </p>
            <br>
            <br>
            <p class="img_c"><img width="80%" src="@/assets/img/help_eryAtlaSample.jpg" alt="img"></p>

        </div>

        <br id = "About">
        <br>
        <br>
        <br>
        <br>
        <br>
        <div>
            <h3 class="h1_title">
                4. About 
            </h3>
            <br>
            <p class="p_text">
                Clicking on “About” at the top right-hand corner opens page provides the statistics 
                for all the datasets in EryDB, including number of datasets, sample number, 
                and cell number by organism, experiment type, and tissue. 
                In future releases of EryDB, the transcriptomic data will be continuously updated, 
                and other types of omics data will be added, including epigenomic, proteomic, metabolomic, 
                and genomic data, 
                as well as next-generation omics data types. </p>
            
            <p class="img_c"><img width="80%" src="@/assets/img/help_about.jpg" alt="img"></p>
         
            
            <h3>
                About  us
            </h3>
            <br>
            <p class="p_text">
                If you have any questions or suggestions, 
                please feel free to contact us by email (zhenggm@big.ac.cn, fangxd@big.ac.cn).
            </p>
            <br>
        </div>
    </div>
</div>



</template>


<script>
import collapse from "../../../assets/js/collapse";
export default {
    name:"help",
    components: {
        // VueMarkdown
        collapse
    },
    data () {
        return {
            
            isActive: true
        };
    },

    mounted() {
    },

    destroy() {
   },

     methods: {
    // 滚动监听器
  
    
  }, 
}
</script>

<style>

.p_text{
    font-size:18px;
    text-align: justify;


}

.img_c{
    text-align: center;
}

    /* 内容区的样式 */
.content {
  background-color: white;
  /* width: 500px; */
}

.content div {
  /* width: 100%; */
  /* height: 600px; */
  font-size: 18px;
  padding: 20px;
  /* background-color: #7ec384; */
}
.content div:nth-child(2n) {
  /* background-color: #847ec3; */
}

/* 导航栏的样式 */
.navs {
    position: fixed;
    top: 125px;
    left: 10px;
    background-color: #efefef;
    cursor: pointer;

}


.help_button{
    width: 40px;
    height: 40px;
    border: none;
    background-color: #f5f7f9;
    color: black;
    font-size: 16px;
    /* background-color:transparent;  */
}


.container li {
  padding: 0 0px;
  line-height: 1.6;
  font-size: 16px;
}
/* 当导航被点亮后改变颜色 */
.container li a {
  color: black;
  /* background-color: #e2e2e2; */
}

.container li a:active{

   color: red;

  }

.container {
    width: 250px;
    position: fixed;
    /* left: 10px; */
    background-color: #f5f7f9;
    cursor: pointer;
    list-style-type: none;
}

</style>

