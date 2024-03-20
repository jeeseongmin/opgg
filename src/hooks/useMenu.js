import React, {useEffect} from 'react';
import commonStore from 'modules/zustand/commonStore';

const useMenu = ({menuName}) => {
	const {selectedMenu, setSelectedMenu} = commonStore(
		(state) => state,
	);
	
	useEffect(() => {
		setSelectedMenu(menuName);
	}, []);
	
	return selectedMenu;
};

export default useMenu;
