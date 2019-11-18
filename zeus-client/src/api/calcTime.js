const calcTime = (unixTime) => {

	const postTime = new Date(unixTime * 1000);

	const currentTime = new Date();

	const diff = currentTime.getTime() - postTime.getTime();

	if (diff < 3600000) {

		let mins = Math.round(diff / 60000);

		return mins === 1 ? '1 minute' : `${mins} minutes`;

	} else if (diff < 3600000 * 24) {

		let hrs = Math.round(diff / 3600000);

		return hrs === 1 ? '1 hour' : `${hrs} hours`;

	} else {

		let days = Math.round(diff / (3600000 * 24));

		return days === 1 ? '1 day' : `${days} days`;

	}

}


export default calcTime;