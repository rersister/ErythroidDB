import axios from '@/libs/api.request'


export const getDataset = dataset => {
	return axios.request({
	  url: 'public/getDatasetByDateset',
	  data: {'dataset':dataset},
	  method: 'post',
	}) 
  }

//  getDatasetGroup 
export const getDatasetGroup  = dataset => {
	return axios.request({
	  url: 'public/getDatasetGroup',
	  data: {'dataset':dataset},
	  method: 'post',
	}) 
}


export const getAllExpreStack = (dataset,tableTypes) => {
	return axios.request({
		url:'public/getAllExpreStack',
		data:{'dataset':dataset,'tableTypes':tableTypes},
		method:'post',
	})

}


export const getSequenceEchartByTabletype = (dataset,tableType)  =>{
	return axios.request({
		url:'public/getSequenceEchartByTabletype',
		data:{'dataset':dataset,'tableType':tableType},
		method:'post',
	})	
}


export const getSpecifExpreOptionsByName = (series,tableType,specif_name)  =>{
	return axios.request({
		url:'public/getSpecifExpreOptionsByName',
		data:{
			'series':series,
			'tableType':tableType,
			'specif_name':specif_name,
		},
		method:'post',
	})

}

// 后期考虑不要
export const getPageExpressionTableData = (dataset,tableType,standardized_mode,currentPage,pageSize)  => {
	return axios.request({
		url:'public/getPageExpressionTableData',
		data:{
			'dataset': dataset,
			'tableType': tableType,
			'standardized_mode': standardized_mode,
			'pageIndex': currentPage,
			'pageSize': pageSize,
		},
		method:'post',
		headers: {
			'Access-Control-Allow-Credentials':'true',
			'Access-Control-Allow-Methods':'POST'
		}
	})

}

export const getExpreRange = ( dataset,tableType) => {
	return axios.request({

		url:'public/getExpreRange',
		data:{
			'dataset':dataset,
			'tableType':tableType,

		},
		method:'post',
	
	})
	
}


export const getMicroInfo = (micType,value) => {

	return axios.request({

		url:'public/getMicroInfo',
		data:{
			micType: micType,
			value:value,
		},
		method:'post',

	})


}

export const getdiffGroup = (table_name) => {
	return axios.request({

		url:'public/getDiffGroup',
		data:{
			table_name: table_name,
		},
		method:'post',
	})

}

export const getTsneGroup = (series) => {
	return axios.request({

		url:'public/getTsneGroup',
		data:{
			series: series,
			// showBygroup:showBygroup
		},
		method:'post',
	})

}
// getSigName(this.series,this.source)
export const getSigName = (series,source) => {
	return axios.request({

		url:'public/getSigName',
		data:{
			series:series,
			source:source,
			// showBygroup:showBygroup
		},
		method:'post',
	})

}
// getTsneData(series,group)
export const getTsneDataCol = (series,group) => {
	return axios.request({

		url:'public/getTsneDataCol',
		data:{
			series: series,
			group:group
		},
		method:'post',
	})

}

// getEachSig(series,source,sigName)
export const getEachSig = (series,source,sigName) => {
	return axios.request({

		url:'public/getEachSig',
		data:{
			series: series,
			source:source,
			sigName:sigName
		},
		method:'post',
	})

}

// getTraDataCol
export const getTraDataCol = (series,group) => {
	return axios.request({

		url:'public/getTraDataCol',
		data:{
			series: series,
			group:group
		},
		method:'post',
	})

}


// getTsneData
export const getTsneData = (series,source,col) => {
	return axios.request({

		url:'public/getTsneData',
		data:{
			series: series,
			source:source,
			col:col
		},
		method:'post',
	})

}
// getTraData
export const getTraData = (series,source,col) => {
	return axios.request({

		url:'public/getTraData',
		data:{
			series: series,
			source:source,
			col:col
		},
		method:'post',
	})

}

// getFeaturePlot
export const getFeaturePlot = (series,source,featurename) => {
	return axios.request({

		url:'public/getFeaturePlot',
		data:{
			series: series,
			source:source,
			featurename:featurename
		},
		method:'post',
	})

}

// getPseudoData(series,source)
export const getPseudoData = (series,source) => {
	return axios.request({

		url:'public/getPseudo',
		data:{
			series: series,
			source:source,
		
		},
		method:'post',
	})

}


// getClusterMarker(this.series,this.source)
export const getClusterMarker = (series,source)=>{
	return axios.request({

		url:'public/getClusterMarker',
		data:{
			series: series,
			source:source,
			
		},
		method:'post',
	})
}


// getClusterEncihGroup
export const getClusterEncihGroup = (series,source)=>{
	return axios.request({

		url:'public/getClusterEncihGroup',
		data:{
			series: series,
			source:source,
			
		},
		method:'post',
	})
}

// getClusterEnrichData(this.series,this.source,this.group)

export const getClusterEnrichData = (series,source,group)=>{
	return axios.request({

		url:'public/getClusterEnrich',
		data:{
			series: series,
			source:source,
			group:group,
			
		},
		method:'post',
	})
}

// getClusterContrastGroup
export const getClusterContrastGroup = (series,source)=>{
	return axios.request({

		url:'public/getClusterContrastGroup',
		data:{
			series: series,
			source:source,
		},
		method:'post',
	})
}
// getClusterDiff(this.series,this.source,this.group)
export const getSCClusterDiff = (series,source,group)=>{
	return axios.request({

		url:'public/getSCClusterDiff',
		data:{
			series: series,
			source:source,
			group:group,
		},
		method:'post',
	})
}

// getScDiffEnrich(this.series,this.source,this.group)
export const getScDiffEnrich = (series,source,group)=>{
	return axios.request({

		url:'public/getScDiffEnrich',
		data:{
			series: series,
			source:source,
			group:group,
		},
		method:'post',
	})
}

export const getDiffData = (series,diff_group) => {
	return axios.request({

		url:'public/getDiffData',
		data:{
			series: series,
			diff_group:diff_group,
		},
		method:'post',
	})
}

// getEnrichData enrichGroup
export const getEnrichData = (series,contrGroupOfEnrich,goType) => {
	return axios.request({

		url:'public/getEnrichData',
		data:{
			series: series,
			contrGroupOfEnrich:contrGroupOfEnrich,
			// enrichGroup:enrichGroup,
			goType:goType
		},
		method:'post',
	})
}
// this.source,this.cell_type
export const getsimData = (series) => {
	return axios.request({

		url:'public/getsimData',
		data:{
			series: series,
			
		},
		method:'post',
	})
} 



// series
export const getDatatest = () => {
	return axios.request({

		url:'public/getDatatest',
		data:{
			// series: series,
		
		},
		method:'post',
	})
} 