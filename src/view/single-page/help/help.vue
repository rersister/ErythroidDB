<template>
    <div>
        <h1>
        Tutorial for Erythroid Database
        </h1>
        <br>
        <span>
            Erythroid Database: A database of transcriptome profile of erythroid development. 
                        we developed the erythroid database EryDB, a web-accessible collection of expert curated, 
                        quality assured and pre-analyzed data collected from ~106 datasets comprising 
                        a total of ~3,899 bulk RNA-seq samples and 175,628 single cell erythroid cells from 
                        three species.All datasets were  divided into different developmental stages.
                        Unlike other added-value databases, EryDB allows users to easily retrieve and explore data of specific studies, 
                        determine differentially expressed genes and their functions via principal component analysis, 
                        differential gene expression analysis, gene set enrichment analysis, and transcription factor analysis under certain conditions, 
                        such as in vitro or in vivo. Besides, EryDB integrated single-cell RNA sequencing data to visualize gene expression in 
                        single cell resolution by color-coded t-SNE or UMAP plots.
                        Plots and tables in EryDB are customizable, downloadable and interactive.
                                    
        </span>
        
        <br>
        <br>
        <h1>
        Home page
        </h1>
        <br>

        <span>
           In the quik search box, you can search for genes(GATA1),tissues(Bone Marrow),Dataset ID(GSE102182) and 
           species(homo sapiens). It will redirect you to the corresponding page(Search page) and 
           you will get the datasets related to your input. The clickable  'About EryDB' on the top is a representative display of the simpe introduction of
           this database, and a click will easily hide it.            
        </span>
        <br>
        <img width="80%" src="@/assets/img/help_homePage.svg" alt="img">
        
        <br>
        <br>
        <span>
           In the Home page you can also search datasets by four moudles.
           1. By the cell type; 
           2. By the reported gene; 
           3. By the compound name; 
           4. By the disease type.
        </span>
        <br>
        <br>
        <img width="80%" src="@/assets/img/help_homePage2.svg" alt="img">

        <br>
        <br>

        <h3>
            <li>Differentiation</li>
        </h3>
        <br>
        <span>
        This moudle allows you to get datasets according to the celltype.            
        </span>
        <br>
        <br>
        <img width="80%" src="@/assets/img/help_homeDiffer.svg" alt="img">

        <br>
        <br>

        <h3>
            <li>Genes</li>
        </h3>
        <br>
        <span>
        This moudle allows you to get datasets according to the reported genes.            
        </span>
        <br>
        <br>
        <img width="80%" src="@/assets/img/help_homeGenes.svg" alt="img">

        <br>
        <br>
        <h3>
            <li>Compounds</li>
        </h3>
        <br>
        <span>
        This moudle allows you to get datasets according to the compounds.            
        </span>
        <br>
        <br>
        <img width="80%" src="@/assets/img/help_homeCompounds.svg" alt="img">


        <br>
        <br>
        <h3>
            <li>Disease</li>
        </h3>
        <br>
        <span>
        This moudle allows you to get datasets according to the Diseases.            
        </span>
        <br>
        <br>
        <img width="80%" src="@/assets/img/help_homeDiseases.svg" alt="img">


        <br>
        <br>
        <h3>
            Search
        </h3>
        <br>
        <span>
           In this page, the advanced search is provided relative to the quick search. 
           In specific, you can search for multiple aspects including cell type,reported gene,compound,speceis,tissue,growth mode,development,and.         
        </span>
        <br>
        <br>
        <img width="80%" src="@/assets/img/help_search.svg" alt="img">
       
       <br>
        <br>
        <h1>
            Dataset
        </h1>
        <br>
       
        <span>
            When you get the interested dataset from searching,clicking the dataset(each row) 
            will easily redirect you to the corresponding page(Dataset Service)
        </span>
        <br>
        <br>
        <h3>
            <li>Dataset Details</li>
        </h3>
        <br>
        <span>
            This panel represents basic details of this study including the 
            dataset id, organism, tissue, growth mode, development type , experiment type, PMID and so on.
        </span>
        <img width="80%" src="@/assets/img/help_datasetDetial.svg" alt="img">

        <br>
        <br>
        <h3>
            <li>Dataset Sample</li>
        </h3>
        <br>
        <span>
            This panel represents one or multiple samples contained in this dataset, 
            including the information of species, tissue, and cell number.</span>
        <img width="80%" src="@/assets/img/help_datasetSample.svg" alt="img">

        <h3>
            <li>Dataset Service</li>
        </h3>
        <br>
        <span>
            This panel represents analysis provided by this dataset. 
            In general,datasets of bulk sequence provide  the following analysis function
            1)Expression Profile;
            2)principal Compnents;
            3)Differential Analysis;
            4)Enrichment Analysis.
        </span>
        <br>
        <img width="80%" src="@/assets/img/help_datasetAnalBulk.svg" alt="img">
        <br>

        <br>
        <h4>
            1)Expression Profile
        </h4>
        <br>
        <span>
            The barbox shows the number of expression level of gene in different group. 
            You can input your interested gene through the input box in the upper left corner and 
            get more information from linked wed.
        </span>
        <br>
        <br>
        <img width="80%" src="@/assets/img/help_expPro.svg" alt="img">
        <br>
        
        <br>
        <h4>
            2)Principal Components
        </h4>
        <br>
        <span>
            The dot plot shows the Principal Compoment Analysis of samples in dataset. 
            You can choose your interested group through clicking the dot  in the right lable and 
            get group information from dataset's sample information.
        </span>
        <br>
        <br>
        <img width="80%" src="@/assets/img/help_BulkPCA.svg" alt="img">
        <br>

        <br>
        <h4>
            3)Differential Analysis
        </h4>
        <br>
        <span>
            The dot plot shows the Principal Compoment Analysis of samples in dataset. 
            You can choose your interested group through clicking the dot  in the right lable and 
            get group information from dataset's sample information.
        </span>
        <br>
        <br>
        <img width="80%" src="@/assets/img/help_BulkPCA.svg" alt="img">
        <br>

        <span>
            Datasets of single sequence provide  the following analysis function
            1)Dimensional Reduction & Fetaure;
            2)Markers & Enrich;
            3)Differential & Enrich;
            4)Differentiation Trajectory;
            5)Cell-Cell Interraction;
            6)Cell-Cell Communication.
        </span>
        <br>
        <img width="80%" src="@/assets/img/help_datasetAnalSingleCell.svg" alt="img">

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




</style>

