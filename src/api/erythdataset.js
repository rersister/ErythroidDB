import axios from '@/libs/api.request'


export const getDataset = (datasetName,currentPage,pageSize) => {
	return axios.request({
	  url: 'public/getPageDataSets',
	  data: { 
		'datasetName':datasetName,  //四大模块中的一个模块		
		'pageIndex': currentPage,
		'pageSize': pageSize	
	},
	  method: 'post',
	})
  }


// getDatasetTypeSource
export const getDatasetTypeSource = (table_name,currentPage,pageSize) => {
	return axios.request({
	  url: 'public/getPageDataSetsTypeSource',
	  data: { 
		'table_name':table_name,
		'pageIndex': currentPage,
		'pageSize': pageSize	
	},
	  method: 'post',
	})
}

// getDiffPageDataset(table_name,currentPage,pageSize,this.contrastsGroup)
export const getDiffPageDataset = (table_name,currentPage,pageSize,contrastsGroup) => {
	return axios.request({
	  url: 'public/getDiffPageDataset',
	  data: { 
		'table_name':table_name,
		'pageIndex': currentPage,
		'pageSize': pageSize,	
		'contrastsGroup':contrastsGroup
	},
	  method: 'post',
	})
}
// getSCDiffPageDataset
export const getSCDiffPageDataset = (table_name,currentPage,pageSize,contrastsGroup) => {
	return axios.request({
	  url: 'public/getSCDiffPageDataset',
	  data: { 
		'table_name':table_name,
		'pageIndex': currentPage,
		'pageSize': pageSize,	
		'contrastsGroup':contrastsGroup
	},
	  method: 'post',
	})
}

// getDatasetTypeSourceByCell( cell_name,_this.currentPageTypeSource,_this.pageSizeTypeSource )
export const getDatasetTypeSourceByCell = (cell_name,currentPage,pageSize) => {
	return axios.request({
	  url: 'public/getDatasetTypeSourceByCell',
	  data: { 
		'cell_name': cell_name,
		'pageIndex': currentPage,
		'pageSize': pageSize	
	},
	  method: 'post',
	})
  }

export const searchDataset = (datasetName,search,pageIndex,pageSize)=>{
	return axios.request({
		url: 'public/getPageDataSetsByParms',
		data: { 
		  'datasetName':datasetName,  
		  'search':search,		
		  'pageIndex': pageIndex,
		  'pageSize': pageSize	
	  },
		method: 'post',
	  })	
}  

export const searchDatasetTypeSource = (searchTypeSource,currentPageTypeSource,pageSizeTypeSource,cell_type)=>{
	return axios.request({
		url: 'public/getPageDataSetsTypeSourceByParms',
		data: { 
		   
		  'search':searchTypeSource,
		  'pageIndex': currentPageTypeSource,
		  'pageSize': pageSizeTypeSource,
		  'cell_type' :cell_type
	  },
		method: 'post',
	  })
}

// searchDiffDatasetByParms(searchKeyVal, _this.currentPage,_this.pageSize,this.contrastsGroup)
export const searchDiffDatasetByParms = (series,searchTypeSource, currentPageTypeSource,pageSizeTypeSource,contrastsGroup)=>{
	return axios.request({
		url: 'public/getDiffDatasetByParms',
		data: { 
		  'series':series,
		  'search':searchTypeSource,
		  'pageIndex': currentPageTypeSource,
		  'pageSize': pageSizeTypeSource,
		  'contrastsGroup' :contrastsGroup
	  },
		method: 'post',
	  })
}


// export const getPageDataSetsByParms = (search,currentPage,pageSize) => {
// 	return axios.request({
// 	  url: 'public/getPageDataSetsByParms',
// 	  data: {data:JSON.stringify({
// 		'search': search,
// 		'pageIndex': currentPage,
// 		'pageSize': pageSize
// 	  })},	
// 	  method: 'post',
// 	})
//   }
  
  