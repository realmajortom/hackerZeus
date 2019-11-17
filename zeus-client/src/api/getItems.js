import API from './API';

export default function getItems(arr) {
	let newComms = [];

	for (let i = 0; i < arr.length; i++) {
		API.get(`item/${arr[i]}.json`).then(res => {
			if (res.data !== null && res.data.deleted !== true) {
				newComms.push(res.data);
			}
		});
	}

	return newComms;
}