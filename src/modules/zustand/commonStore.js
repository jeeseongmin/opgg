import {create} from 'zustand';

const commonStore = create((set) => ({
	selectedMenu: 'HOME',
	
	setSelectedMenu: (value) => set(() => ({selectedMenu: value})),
}));

export default commonStore;