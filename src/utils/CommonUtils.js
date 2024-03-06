export const getColorClass = ({type, point}) => {
	if (type === 'grade') {
		if (point >= 6) return 'top';
		if (point >= 5) return 'best';
		else if (point >= 4) return 'excellent';
		else if (point >= 3) return 'good';
		else return 'normal';
	} else {
		if (point >= 50) return 'excellent';
		else return 'normal';
	}
};