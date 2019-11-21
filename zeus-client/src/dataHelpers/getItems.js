import API from './hnAPI';

const getHNObj = async (id) => {
	let result;

	await API.get(`item/${id}.json`)
		.then(res => {
			if (res.data.deleted) {
				result = {id: id, error: true, deleted: true}
			} else {
				result = res.data;
			}
		})
		.catch(() => result = {id: id, error: true, deleted: false})

	return result;
};



const getItems = async (itemsToGet) => {

	const promises = itemsToGet.map(async item => {
		const comment = await getHNObj(item);
		return comment;
	})

	const comments = await Promise.all(promises);

	return comments;

};

export default getItems;