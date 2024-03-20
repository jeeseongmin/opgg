import {create} from 'zustand';

const summonerStore = create((set) => ({
	summonerInfo: {},
	
	setSummonerInfo: (value) => set(() => ({summonerInfo: value})),
}));

export default summonerStore;