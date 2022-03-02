import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    // plugins: [createPersistedState()],
    state: {
        // hmis: ['History', 'Politics', 'Technology', 'Friendship', 'Wisdom', 'Love'],
        // hmis2: ['Happiness', 'Business', 'Movie', 'Music', 'Health', 'Sports'],
        taadss: ['SUAS','Sports', 'Travelling', 'Example-1', 'Example-2'],
        mainText: `Facebook is an American online social media and social networking service owned by Facebook, Inc. Mark Zuckerberg founded Facebook Inc in 2004. He lives in California. Mr. Zuckerberg works in Facebook as the CEO. His friend Eduardo Saverin is his business partner now. His phone no is +19395550113 and their email addresses are 'mark@facebook.com' and 'eduardo@facebook.com' respectively.`,
        options: ['People', 'Places', 'Organizations', 'Emails', 'Numbers', 'Quotations', 'Nouns', 'Pronouns', 'Verbs', 'Prepositions', 'Conjunctions', 'Acronyms'],
        parsedResult: `YOUR RESULT WILL BE APPEARED HERE`,
        loader: false,
        picked: '',
        hmis: [
            {
                name: 'History',
                image: 'https://picsum.photos/id/136/400/200'
            },
            {
                name: 'Politics',
                image: 'https://picsum.photos/id/1010/400/200'
            },
            {
                name: 'Technology',
                image: 'https://picsum.photos/id/201/400/200'
            },
            {
                name: 'Friendship',
                image: 'https://picsum.photos/id/1012/400/200'
            },
            {
                name: 'Wisdom',
                image: 'https://picsum.photos/id/1073/400/200'
            },
            {
                name: 'Love',
                image: 'https://picsum.photos/id/1004/400/200'
            }
        ],
        hmis2: [
            {
                name: 'Happiness',
                image: 'https://picsum.photos/id/129/400/200'
            },
            {
                name: 'Life',
                image: 'https://picsum.photos/id/1003/400/200'
            },
            {
                name: 'Science',
                image: 'https://picsum.photos/id/1079/400/200'
            },
            {
                name: 'Success',
                image: 'https://picsum.photos/id/177/400/200'
            },
            {
                name: 'Inspirational',
                image: 'https://picsum.photos/id/1011/400/200'
            },
            {
                name: 'Famous-Quotes',
                image: 'https://picsum.photos/id/30/400/200'
            }
        ]
    },
	
    getters: {
        hmis: (state) => {
            return state.hmis;
        },
        hmis2: (state) => {
            return state.hmis2;
        },
        taadss: (state) => {
            return state.taadss;
        },
        options: (state) => {
            return state.options;
        },
        mainText: (state) => {
            return state.mainText;
        },
        parsedResult: (state) => {
            return state.parsedResult;
        },
        picked: (state) => {
            return state.picked;
        }
    },
    mutations: {
        mainText: (state, payload) => {
            state.mainText = payload;
        },
        parsedResult: (state, payload) => {
            state.parsedResult = payload;
        },
        loader: (state, payload) => {
            state.loader = payload;
        },
        picked: (state, payload) => {
            state.picked = payload;
        }
    },
    actions: {

    }
});