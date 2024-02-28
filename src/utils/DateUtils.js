/**
 * 매치 일자가 현재 시간으로부터 얼마나 이전인지 계산하는 함수
 */
export const getDiffDateToKr = ({gameInfo}) => {
	let endTime = gameInfo.gameEndTimestamp;
	if (!endTime) return null;
	let before_date = Math.floor(new Date(endTime).getTime() / 1000);
	let now_date = Math.floor(Date.now() / 1000);
	let now = Date.now();
	if (sameDate(new Date(endTime), new Date(now))) {
		// 시간 계산하기
		let beforeHours = new Date(endTime).getHours();
		let afterHours = new Date(now).getHours();
		if (beforeHours === afterHours) {
			let beforeMinutes = new Date(endTime).getMinutes();
			let afterMinutes = new Date(now).getMinutes();
			return `${afterMinutes - beforeMinutes}분 전`;
		}
		return `${afterHours - beforeHours}시간 전`;
	}
	
	return `${Math.floor((now_date - before_date) / (60 * 60 * 24))}일 전`;
	
	function sameDate(before, after) {
		let sameYear = before.getFullYear() === after.getFullYear();
		let sameMonth = before.getMonth() === after.getMonth();
		let sameDate = before.getDate() === after.getDate();
		
		if (sameYear && sameMonth && sameDate) return true;
		return false;
	}
};

/**
 * 매치 시작 시간과 끝 시간을 계산하여 텍스트를 가져오는 함수
 */
export const getDuration = ({gameInfo}) => {
	let duration = gameInfo.gameDuration;
	if (!duration) return null;
	let hour, minute, second;
	
	if (duration >= 3600) {
		hour = Math.floor(Math.floor(duration / 60) / 60);
		minute = Math.floor((duration - (hour * 60 * 60)) / 60);
		second = duration - (hour * 60 * 60) - (minute * 60);
		return `${hour}시 ${minute}분 ${second}초`;
	}
	if (duration < 3600) {
		minute = Math.floor(duration / 60);
		second = duration - (minute * 60);
		return `${minute}분 ${second}초`;
	}
};
