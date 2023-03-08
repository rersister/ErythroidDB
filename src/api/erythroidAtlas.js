import axios from '@/libs/api.request'

// getAllDevExpreBulkData this.vitro_source,this.searchVivoGene
export const getAllDevExpreBulkData = (source,gene_symbol,cell_source) => {
	return axios.request({
	  url: 'public/getAllDevExpreBulkData',
	  data: { 
		source:source,
		gene_symbol:gene_symbol,
		cell_source:cell_source
	},
	  method: 'post',
	})
  }

// getClusterDataAll
export const getClusterDataAll = (selectList,group_by,source) => {
	return axios.request({
		url:'public/getClusterDataAllDev',
		data:{
			selectList: selectList,
			group_by:group_by,
			source:source
		},
		method:'post',
	})
}
// getallDevSampleGroup(table_name,currentPage,pageSize)
export const getallDevSampleGroup = (table_name,currentPage,pageSize) => {
	return axios.request({
	  url: 'public/getallDevSampleGroup',
	  data: { 
		'table_name':table_name,
		'pageIndex': currentPage,
		'pageSize': pageSize,	
		
	},
	  method: 'post',
	})
}

// getAllDevType
export const getAllDevType = (table_name) => {
	return axios.request({

		url:'public/getAllDevType',
		data:{
			table_name: table_name,
		},
		method:'post',
	})

}

// getAllDevGene
export const getAllDevGene = (table_name) => {
	return axios.request({

		url:'public/getAllDevGene',
		data:{
			table_name: table_name,
		},
		method:'post',
	})

}

// getAlldiffGroup
export const getAlldiffGroup = (table_name) => {
	return axios.request({

		// url:'public/getClusterDataAllDev',
		url:'public/getAlldiffGroupData',
		data:{
			
			table_name:table_name
		
		},
		method:'post',
	})
}


// getEnrichData
export const getAllEnrichData = (table_name,contrastsGroup) => {
	return axios.request({

		url:'public/getAllEnrichData',
		data:{
			table_name:table_name,
			contrastsGroup:contrastsGroup,
		},
		method:'post',
	})
}

// getLRPlotData(dataset_name,comm_type)
// export const getLRPlotData = (dataset_name,source,comm_type) => {
// 	return axios.request({

// 		url:'public/getLRPlotData',
// 		data:{
// 			dataset_name:dataset_name,
// 			source:source,
// 			comm_type:comm_type,
// 		},
// 		method:'post',
// 	})
// }

// getNetViewData
export const getNetViewData = (dataset_name,source,comm_type) => {
	return axios.request({

		url:'public/getLRPlotData',
		data:{
			dataset_name:dataset_name,
			source:source,
			comm_type:comm_type,
		},
		method:'post',
	})
}

// getCellSourceData
export const getCellSourceData = () => {
	return axios.request({

		url:'public/getCellSourceData',
		data:{
			
		},
		method:'post',
	})
}
// getCellChatSigData(dev_type,sig_pattern)
export const getCellChatSigData =(series,dev_type,sig_pattern) => {
	return axios.request({

		url:'public/getCellChatSigData',
		data:{
			series:series,
			dev_type:dev_type,
			sig_pattern:sig_pattern
			
		},
		method:'post',
	})
}

// geteSigPathNetData(dev_type,sig_name) 
export const geteSigPathNetData =(series,dev_type,sig_pattern) => {
	return axios.request({

		url:'public/geteSigPathNetData',
		data:{
			series:series,
			dev_type:dev_type,
			sig_pattern:sig_pattern
			
		},
		method:'post',
	})
}
// getCellChartRcontri(series,dev_type,sigName)
export const getCellChartRcontri =(series,dev_type,sigName) => {
	return axios.request({

		url:'public/getCellChartRcontri',
		data:{
			series:series,
			dev_type:dev_type,
			sigName:sigName
			
		},
		method:'post',
	})
}