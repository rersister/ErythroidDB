import axios from '@/libs/api.request'

export const getDatasetExperiType = dataset_serid => {
	return axios.request({
	  url: 'public/getDatasetExperiType',
	  data: {'dataset_serid':dataset_serid},
	  method: 'post',
	})
}

// getDatasetSequenceType

export const getDatasetSequenceType = dataset_serid => {
	return axios.request({
	  url: 'public/getDatasetSequenceType',
	  data: {'dataset_serid':dataset_serid},
	  method: 'post',
	})
}