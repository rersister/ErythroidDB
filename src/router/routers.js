import Main from '@/components/main'
import DatasetDetail from '@/view/eryth/DatasetDetail.vue'
import ErythroidAtlas from '@/view/single-page/ErythroidAtlas'
import Main_sub from '@/components/main/main_sub'

export default [
    {
        path: '/',
        name: '_home',
        redirect: '/home',
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    hideInMenu: true,
                    title: 'Home',
                    notCache: true,
                    icon: 'md-home'
                },
                component: () =>
                    import ('@/view/single-page/home')
            },
            
            {
                path: '/Erythroid_Atlas',
                name: 'Erythroid Atlas',
               
                meta: { title: "Erythroid Atlas" },
                // component: resolve => require(['@/view/single-page/ErythroidAtlas'], resolve),
                component: ErythroidAtlas,
                children:[

                    {
                        path:'/all_Expression',
                        name:'all_Expression',
                        meta:{
                            title: 'Expression Profiling',
                        },
                        component: () =>
                            import ('@/view/compnents/all_Expression.vue'),
                    },
                    //all_PCA
                    {
                        path:'/all_Clutser',
                        name:'all_Clutser',
                        meta:{
                            title: 'Unsupervised Clustering',
                        },
                        component: () =>
                            import ('@/view/compnents/all_Cluster.vue'),
                    },
                   //all_diff
                   {
                        path:'/all_Diff',
                        name:'all_Diff',
                        meta:{
                            title: 'Differential analysis',
                        },
                        component: () =>
                            import ('@/view/compnents/all_Diffanal.vue'),
                    },
                    //all_Enrich
                    {
                        path:'/all_Enrich',
                        name:'all_Enrich',
                        meta:{
                            title: 'Enrichment Analysis',
                        },
                        component: () =>
                            import ('@/view/compnents/all_Enrich.vue'),
                    },
                    // sc pca
                    {
                        path :'/scPCA',
                        name:'scPCA',
                        meta:{
                            title:'Single Cell Visualization'
                        },
                        component: () =>
                            import ('@/view/compnents/all_sc_pca.vue'),
                    },
                    //all LRPlot single cell 
                    {
                        path:'/LRPlot',
                        name:'LRPlot',
                        meta:{
                            title: 'LRPlot',
                        },
                        component: () =>
                            import ('@/view/compnents/LRPlot.vue'),
                    },
                    // CellChat
                    {
                        path:'/CellChat',
                        name:'CellChat',
                        meta:{
                            title: 'CellChat',
                        },
                        component: () =>
                            import ('@/view/compnents/CellChat.vue'),

                    },
                ]
            },
            {
                path: '/help',
                name: 'Help',
                meta: { title: "Help" },
                component: resolve => require(['@/view/single-page/help'], resolve)
            },
            {
                path: '/about',
                name: 'About',
                meta: { title: "About" },
                component: resolve => require(['@/view/single-page/about'], resolve)
            },
            // {
            //     path :'/Search',
            //     name:'Search',
            //     meta: { title: "Search" },
            //     component: resolve => require(['@/components/main/main_sub'], resolve)
                
            // },

        ]
    },

    {
        path :'/Search',
        name:'Search',
        redirect: '/main_sub',
        component: Main,
        meta: { title: "Search" },
        // component: resolve => require(['@/components/main/main_sub'], resolve)
        children: [
            {
                path: '/main_sub',
                name: 'main_sub',
                meta: {
                    hideInMenu: true,
                    title: 'main_sub',

                },
                component: () =>
                    import ('@/components/main/main_sub'),
            },
            
        ]
    },
    
    {
        path: '/Dataset-Service',
        name: 'Dataset-Service',
        component: Main,
        meta: {    
            
            title: "Dataset Service",
        },

        children: [

            {
                path: '/Dataset_detai',
                name: 'Dataset_detail',
                redirect: '/Dataset_service',
                meta: {
                    hideInMenu: true,
                    title: "Dataset Detail",

                },
                // component: () =>
                //     import ('@/view/eryth/Dataset-service.vue')
                component:DatasetDetail,
                children:[
                    {
                        path: '/Dataset_service',
                        name: 'Dataset_service',
                        meta: {
                            hideInMenu: true,
                            title: 'Dataset Service',
        
                        },
                        component: () =>
                            import ('@/view/compnents/DatasetService.vue'),
                    },

                    // {
                    //     path:'/RNA_Expression',
                    //     name:'RNA_Expression',
                    //     meta:{
                    //         title: 'RNA Expression',
                    //     },
                    //     component: () =>
                    //         import ('@/view/compnents/RNA_Expression.vue'),
                    // },
                    //
                    //name:"Principal components",
						// link:'PCA'
                    {
                        path :'/PCA',
                        name:'Principal Component Analysis',
                        meta:{
                            title:'Principal Component Analysis'
                        },
                        component: () =>
                            import ('@/view/compnents/PCA.vue'),

                    },
                    // 	name:"Difference analysis",
						// link:'Diff_analysis'
                    {
                        path :'/Diff_analysis',
                        name:'Differential analysis',
                        meta:{
                            title:'Differential analysis'
                        },
                        component: () =>
                            import ('@/view/compnents/Diff_analysis.vue'),

                    },
                    //	name:"Enrichment Analysis",
                        // link:'EnrichGO'
                    {
                        path :'/EnrichGO',
                        name:'Enrichment Analysis',
                        meta:{
                            title:'Enrichment Analysis'
                        },
                        component: () =>
                            import ('@/view/compnents/EnrichGO.vue'),
                    },
                    //	name:"Enrichment Analysis",
                    // link:'EnrichGO'
                    {
                        path :'/PlotTSNE',
                        name:'Single Cell PCA',
                        meta:{
                            title:'Single Cell PCA'
                        },
                        component: () =>
                            import ('@/view/compnents/scPlotTSNE.vue'),
                    },
                    // {
                    //     path :'/FeaturePlot',
                    //     name:'Single Cell Feature Plot ',
                    //     meta:{
                    //         title:'Single Cell t_SNE'
                    //     },
                    //     component: () =>
                    //         import ('@/view/compnents/FeaturePlot.vue'),
                    // },
                    // ClusterMarker
                    {
                        path :'/ClusterMarker',
                        name:'Single Cell Cluster Marker ',
                        meta:{
                            title:'Single Cell Cluster Marker'
                        },
                        component: () =>
                            import ('@/view/compnents/ClusterMarker.vue'),
                    },
                    // ClusterEnrichGO
                    {
                        path :'/ClusterEnrichGO',
                        name:'Single Cell Cluster EnrichGO',
                        meta:{
                            title:'Single Cell Cluster EnrichGO'
                        },
                        component: () =>
                            import ('@/view/compnents/ClusterEncihGO.vue'),
                    },
                    // ClusterDiffAnal
                    {
                        path :'/ClusterDiffAnal',
                        name:'Single Cell Cluster Differential Anlayze',
                        meta:{
                            title:'Single Cell Cluster Differential Anlayze'
                        },
                        component: () =>
                            import ('@/view/compnents/sc_Diffanal.vue'),
                    },
                    // ClusterDiffEnrichAnal
                    {
                        path :'/ClusterDiffEnrichAnal',
                        name:'Single Cell Cluster Differential Enrich Anlayze',
                        meta:{
                            title:'Single Cell Cluster Differential Enrich Anlayze'
                        },
                        component: () =>
                            import ('@/view/compnents/sc_DiffEnrichAnal.vue'),
                    },
                    // ClusterDiffTrajectory
                    {
                        path :'/ClusterDiffTrajectory',
                        name:'Single Cell Cluster Differentiation Trajectory',
                        meta:{
                            title:'Single Cell Cluster Differentiation Trajectory'
                        },
                        component: () =>
                            import ('@/view/compnents/ClusterDiffTrajectory.vue'),
                    },
                    // ScInterraction
                    {
                        path :'/ScInterraction',
                        name:'Single Cell Interraction',
                        meta:{
                            title:'Single Cell Interraction'
                        },
                        component: () =>
                            import ('@/view/compnents/ScInterraction.vue'),
                    },
                    // ScCommunication

                    {
                        path :'/ScCommunication',
                        name:'Single Cell Communication',
                        meta:{
                            title:'Single Cell Communication'
                        },
                        component: () =>
                            import ('@/view/compnents/ScCommunication.vue'),
                    },

                    

                ]

            },
         
        ]
    },


    {
        path: '/Eryth',
        name: 'differentiation',
        redirect: '/Eryth_index',
        component: Main,
        meta: {    
            title: "Differentiation",
        },

        children: [
            {
                path: '/Eryth_index',
                name: 'Eryth_index',
                meta: {
                    hideInMenu: true,
                    title: 'Erythropoiesis-index',

                },
                component: () =>
                    import ('@/view/eryth'),
            },
            
        ]
    },


    
    {
        path: '/disease',
        name: 'disease',
        redirect: '/Disease_index',
        component: Main,
        meta: {
            title: "Diseases",


        },
        children: [
            {
                path: '/Disease_index',
                name: 'Disease_index',
                meta: {
                    hideInMenu: true,
                    title: 'Disease-index',
                },
                component: () =>
                    import ('@/view/disease'),
            },
        ]
    },

    {
        path: '/gene',
        name: 'genes',
        redirect: '/gene_index',
        component: Main,
        meta: {
            title: "Genes",


        },
        children: [{
                path: '/gene_index',
                name: 'gene_index',
                meta: {
                    hideInMenu: true,
                    title: 'gene-index',

                },
                component: () =>
                    import ('@/view/genes'),
            },

        ]
    },

    {
        path: '/molecules',
        name: 'molecules',
        redirect: '/molecules_index',
        component: Main,
        meta: {
            title: "Compounds",


        },

        children: [
            {
                path: '/molecules_index',
                name: 'molecules_index',
                meta: {
                    hideInMenu: true,
                    title: 'molecules-index',

                },
                component: () =>
                    import ('@/view/molecules'),
            },

        ]
    },


    {
        path: '/clustgram',
        name: 'ClustGram',
        meta: { title: "ClustGram" },
        component: () =>
            import ('@/view/eryth/ClustGram.vue')

    },

    {
        path: '/401',
        name: 'error_401',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/error-page/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/error-page/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/error-page/404.vue')
    }








]