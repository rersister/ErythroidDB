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

// getEryGeneScore
export const getEryGeneScore = (table_name,currentPage,pageSize) => {
	return axios.request({
	  url: 'public/getEryGeneScore',
	  data: { 
		'table_name':table_name,
		'pageIndex': currentPage,
		'pageSize': pageSize	
	},
	  method: 'post',
	})
}

export const getEryGeneScoreByKeyName = (keyname,table_name,currentPage,pageSize) => {
	return axios.request({
	  url: 'public/getEryGeneScoreByKeyName',
	  data: { 
		'keyname':keyname,
		'table_name':table_name,
		'pageIndex': currentPage,
		'pageSize': pageSize	
	},
	  method: 'post',
	})
}


//getDataTypeInfo
export const getDataTypeInfo = (type_name) => {
	return axios.request({
	  url: 'public/getDataTypeInfo',
	  data: { 
		'type_name':type_name
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

// getDiffPageDatasetByGene
export const getDiffPageDatasetByGene = (gene,table_name,currentPage,pageSize,contrastsGroup) => {
	return axios.request({
	  url: 'public/getDiffPageDatasetByGene',
	  data: { 
		'table_name':table_name,
		'pageIndex': currentPage,
		'pageSize': pageSize,	
		'contrastsGroup':contrastsGroup,
		'gene':gene,
	},
	  method: 'post',
	})
}
// getDiffPageDatasetBySort
export const getDiffPageDatasetBySort= (sortableKey,sortableOrder,table_name,currentPage,pageSize,contrastsGroup) => {
	return axios.request({
	  url: 'public/getDiffPageDatasetBySort',
	  data: { 
		'sortableOrder':sortableOrder,
		'sortableKey':sortableKey,
		'table_name':table_name,
		'pageIndex': currentPage,
		'pageSize': pageSize,	
		'contrastsGroup':contrastsGroup,
	},
	  method: 'post',
	})
}


//getDiffPageDatasetBySort(this.sortableKey,this.sortableOrder,this.series,this.currentPage,this.pageSize,this.contrastsGroup)
export const getDiffPageDatasetBySortGene = (gene,sortableKey,sortableOrder,table_name,currentPage,pageSize,contrastsGroup) => {
	return axios.request({
	  url: 'public/getDiffPageDatasetBySortGene',
	  data: { 
		'sortableOrder':sortableOrder,
		'sortableKey':sortableKey,
		'table_name':table_name,
		'pageIndex': currentPage,
		'pageSize': pageSize,	
		'contrastsGroup':contrastsGroup,
		'gene':gene,
	},
	  method: 'post',
	})
}

// getAllSampleNumber
export const getAllSampleCellNumber = () => {
	return axios.request({
	  url: 'public/getAllSampleCellNumber',
	  data: { 
		
		
	},
	  method: 'post',
	})
}


// getSampleGroupPageDataset
export const getSampleGroupPageDataset = (series,currentPage,pageSize) => {
	return axios.request({
	  url: 'public/getSampleGroupPageDataset',
	  data: { 
		'series':series,
		'pageIndex': currentPage,
		'pageSize': pageSize,	
		
	},
	  method: 'post',
	})
}

// getSCCellAnnoInfo 
export const getSCCellAnnoInfo = (series) => {
	return axios.request({
	  url: 'public/getSCCellAnnoInfo',
	  data: { 
		'series':series,
		
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

// getSCDiffPageDatasetByGene
export const getSCDiffPageDatasetByGene = (gene,table_name,currentPage,pageSize,contrastsGroup) => {
	return axios.request({
	  url: 'public/getSCDiffPageDatasetByGene',
	  data: { 
		'gene':gene,
		'table_name':table_name,
		'pageIndex': currentPage,
		'pageSize': pageSize,	
		'contrastsGroup':contrastsGroup
	},
	  method: 'post',
	})
}

// getSCDiffPageDatasetBySortGene
export const getSCDiffPageDatasetBySortGene = (inputGenePat,sortableKey,sortableOrder,table_name,currentPage,pageSize,contrastsGroup) => {
	return axios.request({
	  url: 'public/getSCDiffPageDatasetBySortGene',
	  data: { 
		'gene':inputGenePat,
		'sortableKey':sortableKey,
		'sortableOrder':sortableOrder,
		'table_name':table_name,
		'pageIndex': currentPage,
		'pageSize': pageSize,	
		'contrastsGroup':contrastsGroup
	},
	  method: 'post',
	})
}


export const getSCDiffPageDatasetBySort = (sortableKey,sortableOrder,table_name,currentPage,pageSize,contrastsGroup) => {
	return axios.request({
	  url: 'public/getSCDiffPageDatasetBySort',
	  data: { 
	
		'sortableKey':sortableKey,
		'sortableOrder':sortableOrder,
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

//getDatasetTypeSourceByCompundsType
export const getDatasetTypeSourceByCompundsType = (compunds_type,currentPage,pageSize) => {
	return axios.request({
	  url: 'public/getDatasetTypeSourceByCompundsType',
	  data: { 
		'compunds_type': compunds_type,
		'pageIndex': currentPage,
		'pageSize': pageSize	
	},
	  method: 'post',
	})
  }

//getDatasetTypeSourceByCompundsType
export const getDatasetTypeSourceByDiseaseType = (compunds_type,currentPage,pageSize) => {
	return axios.request({
	  url: 'public/getDatasetTypeSourceByDiseaseType',
	  data: { 
		'disease_type': compunds_type,
		'pageIndex': currentPage,
		'pageSize': pageSize	
	},
	  method: 'post',
	})
  }


// getDatasetTypeSourceByGene
export const getDatasetTypeSourceByGene = (compunds_type,currentPage,pageSize) => {
	return axios.request({
	  url: 'public/getDatasetTypeSourceByGene',
	  data: { 
		'gene': compunds_type,
		'pageIndex': currentPage,
		'pageSize': pageSize	
	},
	  method: 'post',
	})
  }


//getDatasetGene
export const getDatasetGene = () => {
	return axios.request({
	  url: 'public/getDatasetGene',
	  data: { 
	},
	  method: 'post',
	})
}

export const getDatasetKeyWords = () =>{
	return axios.request({
		url: 'public/getDatasetKeyWords',
		data: { 
	  },
		method: 'post',
	  })
}

// getAllSCFeatureKeyWords
export const getAllSCFeatureKeyWords = (series,group) =>{
	return axios.request({
		url: 'public/getAllSCFeatureKeyWords',
		data: { 
			'series':series,
			'group':group

	  	},
		method: 'post',
	  })
}

// getAllSCFeatureKeyWordsSplitCell
export const getAllSCFeatureKeyWordsSplitCell = (series,group) =>{
	return axios.request({
		url: 'public/getAllSCFeatureKeyWordsSplitCell',
		data: { 
			'series':series,
			'group':group
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

export const searchDatasetTypeSource = (searchTypeSource,currentPageTypeSource,pageSizeTypeSource,cell_type,real_cell_type_name)=>{
	return axios.request({
		url: 'public/getPageDataSetsTypeSourceByParms',
		data: { 
		   
		  'search':searchTypeSource,
		  'pageIndex': currentPageTypeSource,
		  'pageSize': pageSizeTypeSource,
		  'cell_type' :cell_type,
		  'real_cell_type_name' :real_cell_type_name
	  },
		method: 'post',
	  })
}

export const getDatasetDataByMultiInput=(table_name,currentPageTypeSource,pageSizeTypeSource,select)=>{
	return axios.request({
		url: 'public/getDatasetDataByMultiInput',
		data: { 
		  'table_name':table_name,
		  'pageIndex': currentPageTypeSource,
		  'pageSize': pageSizeTypeSource,
		  'select':select
	  },
		method: 'post',
	  })
}

// ingetDatasetDataByKeyParam
export const getDatasetDataByKeyParam = (table_name,currentPage,pageSize,keyParam) => {
	return axios.request({
	  url: 'public/getPageDataSetByKeyParam',
	  data: { 
		'table_name':table_name,
		'pageIndex': currentPage,
		'pageSize': pageSize,
		'keyParam':keyParam
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
  
  