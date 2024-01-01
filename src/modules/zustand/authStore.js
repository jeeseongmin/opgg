import {create} from 'zustand';

const authStore = create((set) => ({
	opggAuth: false,
	riotAuth: false,

	setOpggAuth: (value) => set((state) => ({opggAuth: value})),
	setRiotAuth: (value) => set((state) => ({riotAuth: value})),
}));

export default authStore;
