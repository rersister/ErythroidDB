<template>
    <div>
        <h1 class="h1_title">
        Tutorial for Erythroid Database
        </h1>
        <br>
        <p class="p_text">
            Erythroid Database: A database of transcriptome profile of erythroid development. 
                        We developed the erythroid database EryDB, a web-accessible collection of expert curated, 
                        quality assured and pre-analyzed data collected from ~106 datasets comprising 
                        a total of ~3,899 bulk RNA-seq samples and 175,628 single cell erythroid cells from 
                        three species.All datasets were  divided into different developmental stages.
                        Unlike other added-value databases, EryDB allows users to easily retrieve and explore data of specific studies, 
                        determine differentially expressed genes and their functions via principal component analysis, 
                        differential gene expression analysis, gene set enrichment analysis, and transcription factor analysis under certain conditions, 
                        such as in vitro or in vivo. Besides, EryDB integrated single-cell RNA sequencing data to visualize gene expression in 
                        single cell resolution by color-coded t-SNE or UMAP plots.
                        Plots and tables in EryDB are customizable, downloadable and interactive.
                                    
        </p>
        
        <br>
        <br>
        <h1 class="h1_title">
        Home page
        </h1>
        <br>

        <p class="p_text">
           In the quik search box, you can search for genes(GATA1),tissues(Bone Marrow),Dataset ID(GSE102182) and 
           species(homo sapiens). It will redirect you to the corresponding page(Search page) and 
           you will get the datasets related to your input. The clickable  'About EryDB' on the top is a representative display of the simpe introduction of
           this database, and a click will easily hide it.            
        </p>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_homePage.svg" alt="img"></p>
        
        <br>
        <br>
        <p class="p_text">
           In the Home page you can also search datasets by four moudles.
           1. By the cell type; 
           2. By the reported gene; 
           3. By the compound name; 
           4. By the disease type.
        </p>
        <br>
        <br>
        <p class="img_c"><img  width="80%" src="@/assets/img/help_homePage2.svg" alt="img"></p>
    
        <br>
        <br>

        <h3>
            <li>Differentiation</li>
        </h3>
        <br>
        <p class="p_text">
        This moudle allows you to get datasets according to the celltype.            
        </p>

        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_homeDiffer.svg" alt="img"></p>

        <br>
        <br>

        <h3>
            <li>Genes</li>
        </h3>
        <br>
        <p class="p_text">
        This moudle allows you to get datasets according to the reported genes.            
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_homeGenes.svg" alt="img"></p>

        <br>
        <br>
        <h3>
            <li>Compounds</li>
        </h3>
        <br>
        <p class="p_text">
        This moudle allows you to get datasets according to the compounds.            
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_homeCompounds.svg" alt="img"></p>


        <br>
        <br>
        <h3>
            <li>Disease</li>
        </h3>
        <br>
        <p class="p_text">
        This moudle allows you to get datasets according to the Diseases.            
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_homeDiseases.svg" alt="img"></p>


        <br>
        <br>
        <h3>
            Search
        </h3>
        <br>
        <p class="p_text">
           In this page, the advanced search is provided relative to the quick search. 
           In specific, you can search for multiple aspects including cell type,reported gene,compound,speceis,tissue,growth mode,development,and.         
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_search.svg" alt="img"></p>
       
       <br>
        <br>
        <h1 class="h1_title">
            Dataset
        </h1>
        <br>
       
        <p class="p_text">
            When you get the interested dataset from searching,clicking the dataset(each row) 
            will easily redirect you to the corresponding page(Dataset Service)
        </p>
        <br>
        <br>
        <h3>
            <li>Dataset Details</li>
        </h3>
        <br>
        <p class="p_text">
            This panel represents basic details of this study including the 
            dataset id, organism, tissue, growth mode, development type , experiment type, PMID and so on.
        </p>
        <p class="img_c"><img width="80%" src="@/assets/img/help_datasetDetial.svg" alt="img"></p>

        <br>
        <br>
        <h3>
            <li>Dataset Sample</li>
        </h3>
        <br>
        <p class="p_text">
            This panel represents one or multiple samples contained in this dataset, 
            including the information of species, tissue, and cell number.</p>
        <p class="img_c"><img width="80%" src="@/assets/img/help_datasetSample.svg" alt="img"></p>

        <h3>
            <li>Dataset Service</li>
        </h3>
        <br>
        <p class="p_text">
            This panel represents analysis provided by this dataset. 
            In general,datasets of bulk sequence provide  the following analysis function
            1)Expression Profile;
            2)principal Compnents;
            3)Differential Analysis;
            4)Enrichment Analysis.
        </p>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_datasetAnalBulk.svg" alt="img"></p>
        <br>

        <br>
        <h4>
            1)Expression Profile
        </h4>
        <br>
        <p class="p_text">
            The barbox shows the number of expression level of gene in different group. 
            You can input your interested gene through the input box in the upper left corner and 
            get more information from linked wed.
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_expPro.svg" alt="img"></p>
        <br>
        
        <br>
        <h4>
            2)Principal Components
        </h4>
        <br>
        <p class="p_text">
            The dot plot shows the Principal Compoment Analysis of samples in dataset. 
            You can choose your interested group through clicking the dot  in the right lable and 
            get group information from dataset's sample information.
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_BulkPCA.svg" alt="img"></p>
        <br>

        <br>
        <h4>
            3)Differential Analysis
        </h4>
        <br>
        <p class="p_text">
            The dot plot shows the differential expressiona of samples in group. 
            You can click the 'Contrasts Group' to select interested group.
            Here 'LMO2-GATA1' means the LMO2 group versus the GATA1 group.
            The signifcant differential genes is colored by orange and the unsignifcant differential gene is colored by bule.
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_BulkDiff.svg" alt="img"></p>
        <br>
        <p class="p_text">
            In the following table , you can search your interested gene by input the gene symbol.
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_BulkDiffTable.svg" alt="img"></p>
        
        <br>
        <br>
        <h4>
            4)Enrichment Analysis
        </h4>
        <br>
        <p class="p_text">
            The bar plot shows the enrichment of the signifcant differential gene of group. 
            You can click the 'Contrasts Group' to select interested group and click the 'Tpye' to select the interested enrichment type.
            The orange reprents the up group the the blue reprents the down group.
        </p> 
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_BulkEnrich.svg" alt="img"></p>
        <br>



        <br>
        <p class="p_text">
            If this dataset was of single cell sequence,it provides  the following analysis function.
            1)Dimensional Reduction & Feature;
            2)Markers & Enrich;
            3)Differential & Enrich;
            4)Differentiation Trajectory;
            5)Cell-Cell Interraction;
            6)Cell-Cell Communication.
        </p>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_datasetAnalSC.svg" alt="img"></p>
        <br>


        <br>
        <h4>
            1)Dimensional Reduction & Feature
        </h4>
        <br>
        <p class="p_text">
            The PCA,t-SNE or UMAP graph are presented for cell clusters in dataset. 
           The original annotation of cell type in the study is used as reference for clustering results.
            You can customize the visualization chart. Plot size decides the dot size in this chart.View method provides  2D or 3D.
            Visaul Method includes PCA,t-SNE and UMAP. Group means the sample's group.The dot  usually can by colored by Phase(Cells' Phase), Celltype or  orig.ident(original ident).
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_scPCA.svg" alt="img"></p>
        <br>
        <p class="p_text">
            In Feature Plot you can input your interested gene symbol,the you will get the gene expression level in all cells in a choosed group.
            
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_scFeature.svg" alt="img"></p>
        <br>


        <br>
        <h4>
            2)Markers & Enrich
        </h4>
        <br>
        <p class="p_text">
            This panel shows the top cell markers highly specifically expressed in 
            this cell type (with significant high fold change between this cell 
            type and others in relevant scRNA-seq datasets; FDR < 0.05).
       </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_scMarker.svg" alt="img"></p>
        <br>
        <p class="p_text">
            In Cluster's Enrichment Analysis, you can get the enrichment pathway of an interested cell cluster.
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_scMarkerEnrich.svg" alt="img"></p>
        <br>
        

        <br>
        <h4>
            3)Differential & Enrich;
        </h4>
        <br>
       <p class="p_text">
            The dot plot shows the differential expressiona of cells in different group. 
            You can click the 'Contrasts Group' to select interested group.
            Here 'Macrophages-iPSC-VS-Macrophages_PB' means the Macrophages of  iPSC group versus the Macrophages of PB group.
            The signifcant differential genes is colored by orange and the unsignifcant differential gene is colored by bule.
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_scDiffer.svg" alt="img"></p>
        <br>
        <p class="p_text">
            In the following table , you also can search your interested gene by input the gene symbol.
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_scDifferTable.svg" alt="img"></p>
        <br>
        <br>
        <p class="p_text">
            The bar plot shows the enrichment of the signifcant differential gene of cluster. 
            You can click the 'Contrasts Group' to select interested group and click the 'Enrich Tpye' to select the interested enrichment type.
            The orange reprents the up group the the blue reprents the down group.

        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_scDifferEnrich.svg" alt="img"></p>
        <br>
        <!-- help_scDifferEnrich.svg -->

        <br>
        <h4>
            4)Differentiation Trajectory;
        </h4>
        <br>
       <p class="p_text">
            The dot plot shows the differentiation trajectory of cells in a choosed group. 
            You can click the 'Group' to select interested group.Here the first dot plot is Pseudotime Trajectory。
       </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_scPseu.svg" alt="img"></p>
        <br>
        <p class="p_text">
            In the following table , you also can choose your interested group and color the dot by celltype,phanse or orig.ident.
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_scDifferenceTra.svg" alt="img"></p>
        <br>
        

        <br>
        <h4>
            5)Cell-Cell Interraction;
        </h4>
        <br>
       <p class="p_text">
            The plot shows the interaction fact of cell cluster in a choosed group. 
            You can click the 'Group' to select interested group and click the 'Communication type'(all, growth gactor,other,cytokie,checkpoint)
            to define the interrection type.
       </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_scInter.svg" alt="img"></p>
        <br>
        

        <br>
        <h4>
            6)Cell-Cell Communication.
        </h4>
        <br>
       <p class="p_text">
            The plot shows the communication pattern of cell cluster in a choosed group. 
            You can click the 'Group' to select interested group and signal pattern(incoming and outgoing).
            
       </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_scCommu.svg" alt="img"></p>
        <br>
        <br>
        <p class="p_text">
            In the following plot , you  can choose your interested signal name and check the signal name and the contribution of each L-R pair..
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_scCommuNetP.svg" alt="img"></p>
        <br>


        <br>
        <br>
        <h3>
            Erythroid Atlas
        </h3>
        <br>
        <p class="p_text">
           In this page, we provide intergrated datasets for users to query their interested analysis. 
           In specific, you can the choose organism and sequence type to see the intergrated datasets,which provide the same analysis content as a single dataset.
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_eryAtlas.svg" alt="img"></p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_eryAtlas1.svg" alt="img"></p>
        <br>
        <br>
        <p class="p_text">
           In the bottom of this page, we provide the information of  samples and groups about the intergrated datasets. 
        </p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_eryAtlaSample.svg" alt="img"></p>


        <br>
        <br>
        <h3>
            About 
        </h3>
        <br>
        <p class="p_text">
           In this page, we provide the statistic informaton about all the datasets.
           You can the datasets' number,  samples' number ,and cells' number showed by organism, growth mode and tissue</p>
        <br>
        <br>
        <p class="img_c"><img width="80%" src="@/assets/img/help_about.svg" alt="img"></p>
        <br>
        <br>
        
        <h3>
            About  us
        </h3>
        <br>
        <p class="p_text">
          If you have any questions or comments, 
          please feel free to contact us via email (zhenggm@big.ac.cn, fangxd@big.ac.cn).
        </p>
        <br>
    </div>



</template>


<script>
// import VueMarkdown from 'vue-markdown'
// import help from '../../markdown/help.md'

export default {
    name:"help",
    components: {
        // VueMarkdown
    },
    data () {
        return {
            // help: help
        }
    }


    
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


</style>

