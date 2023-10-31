import axios from '@/libs/api.request'


export const getDataset = dataset => {
	return axios.request({
	  url: 'public/getDatasetByDateset',
	  data: {'dataset':dataset},
	  method: 'post',
	}) 
}


export const  getPCAData  =dataset => {
	return axios.request({
	  url: 'public/getPCAData',
	  data: {'dataset':dataset},
	  method: 'post',
	  contentType: 'application/octet-stream',
	  responseType:"arraybuffer"
	}) 

}

export const getExportEnrichData = (series,contrGroupOfEnrich,goType) => {
	return axios.request({

		url:'public/getExportEnrichData',
		data:{
			series: series,
			diff_group:contrGroupOfEnrich,
			goType:goType
		},
		method: 'post',
	  contentType: 'application/octet-stream',
	  responseType:"arraybuffer"
	})
}

export const getDatasetExpression =dataset => {
	return axios.request({
	  url: 'public/getDatasetExpression',
	  data: {'dataset':dataset},
	  method: 'post',
	  contentType: 'application/octet-stream',
	//   dataType: "binary",
	  responseType:"arraybuffer",
	  
	  //注意 需要规定后台返回文件流格式
	//   contentType: 'application/json;charset=utf-8',
    //         // 💢💢💢指定服务器返回的类型,因为我们要返回文件流,所以类型为二进制数据
    //         dataType: "binary",
    //         // 💢💢💢原生 XMLHttpRequest 的属性,设置响应类型为blob,接收文件流
    //         xhrFields: {
    //             'responseType': 'blob'
    //         },
    //         success: function (result, status, xhr) {

    //             // 可通过XMLHttpRequest对象,获取响应头
    //             console.log(xhr);

    //             // 浏览器兼容
    //             const download_URL = (window.URL || window.webkitURL).createObjectURL(result);

    //             // 创建a标签,模拟点击下载
    //             const a_link = document.createElement('a');
    //             a_link.href = download_URL;
    //             // 利用了a标签的download属性,指定文件名称
    //             a_link.download = param.fileName;
    //             document.body.appendChild(a_link);
    //             a_link.click();

    //             setTimeout(function () {
    //                 // 移除内存中的临时文件路径和为下载而创建的a标签
    //                 URL.revokeObjectURL(download_URL);
    //                 a_link.remove();
    //             }, 10000);
    //         },
    //         error: function (xhr, textStatus, errorMessage) {

    //             // 从响应头中获取异常信息,如果包含中文的话会乱码因此 后台URLEncoder.encode() + 前台decodeURIComponent() 防止乱码
    //             const errorInfo = decodeURIComponent(xhr.getResponseHeader("errorInfo"));

    //             // 对错误信息进行展示
    //             alert(errorInfo);
    //         }

	}) 
}


export const getDatasetMetaInfo =dataset => {
	return axios.request({
		url: 'public/getDatasetMetaInfo',
		data: {'dataset':dataset},
		method: 'post',
		contentType: 'application/octet-stream',
		responseType:"arraybuffer"

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

export const getGroupSample = (series,group) => {
	return axios.request({
		url:'public/getSCGroupSample',
		data:{
			series: series,
			group : group 
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
export const getTsneData = (series,source,sample,col,if3D,VisualM) => {
	return axios.request({

		url:'public/getTsneData',
		data:{
			series: series,
			source:source,
			sample:sample,
			col:col,
			if3D:if3D,
			VisualM:VisualM
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
export const getFeaturePlot = (series,source,sample,featurename) => {
	return axios.request({

		url:'public/getFeaturePlot',
		data:{
			series: series,
			source:source,
			sample:sample,
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

// addFeatureByName
export const getFeatureBygroup = (series,source,feature_name,cluster_list)=>{
	return axios.request({

		url:'public/getFeatureBygroup',
		data:{
			series: series,
			source:source,
			feature_name:feature_name,
			cluster_list:cluster_list,
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
			// group_col:group_col
			
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

export const getClusterEnrichData = (series,source,group,enrichType)=>{
	return axios.request({

		url:'public/getClusterEnrich',
		data:{
			series: series,
			source:source,
			group:group,
			enrichType:enrichType,
			
		},
		method:'post',
	})
}

// getClusterContrastGroup
export const getSCDiffContrastGroup = (series)=>{
	return axios.request({

		url:'public/getSCDiffContrastGroup',
		data:{
			series: series,
			// source:source,
		},
		method:'post',
	})
}

export const getSCEnrichContrastGroup = (series)=>{
	return axios.request({

		url:'public/getSCEnrichContrastGroup',
		data:{
			series: series,
			// source:source,
		},
		method:'post',
	})
}

// getClusterDiff(this.series,this.source,this.group)
export const getSCClusterDiff = (series,group)=>{
	return axios.request({

		url:'public/getSCClusterDiff',
		data:{
			series: series,
			// source:source,
			group:group,
		},
		method:'post',
	})
}

// getScDiffEnrich(this.series,this.source,this.group)
export const getScDiffEnrich = (series,group,enrichType)=>{
	return axios.request({

		url:'public/getScDiffEnrich',
		data:{
			series: series,
			// source:source,
			group:group,
			enrichType:enrichType
		},
		method:'post',
	})
}

export const getDiffData = (series,diff_group,foldChange,Pvalue) => {
	return axios.request({

		url:'public/getDiffData',
		data:{
			series: series,
			diff_group:diff_group,
			foldChange:foldChange,
			Pvalue:Pvalue
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

// getDatasetSourceInfoData
export const getDatasetSourceInfoData  =  (series) => {
	return axios.request({
	  url: 'public/getDatasetSourceInfoData',
	  data: {
		  'series':series
		},
	  method: 'post',
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