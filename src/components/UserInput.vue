<template>
    <div class="inputArea">
        <div class="card">
            <div class="card-header fw-bold">User Input Area:</div>
            <div class="card-body">
                <textarea v-model="mainText" class="form-control mb-3" rows="9"></textarea>
                <div v-for="option in options" v-bind:key="option" class="form-check form-check-inline mx-2 my-1">
                    <input v-model="picked" v-on:change="parseData" v-bind:value="option" v-bind:id="option" type="radio" class="optinput form-check-input" name="option">
                    <label v-bind:for="option" class="form-check-label">{{option}}</label>
                </div>
            </div>
            <div class="card-footer">
                <button v-on:click="jsonDownload" v-bind:disabled="isDisabled" class="btn btn-sm btn-success">SAVE AS JSON</button>
                <button v-on:click="reset" class="btn btn-sm btn-danger mx-5">RESET</button>
            </div>
        </div>
        <div class="d-flex justify-content-between align-items-center bg-white border mt-4 mb-3">
            <div class="d-flex py-2 text-white px-1 bg-hs">
                <span class="d-flex align-items-center fw-bold px-2">Result</span>
            </div>
            <marquee v-html="parsedResult" class="news-scroll" behavior="scroll" direction="left" onmouseover="this.stop();" onmouseout="this.start();"></marquee>
        </div>
    </div>
</template>

<script>
	import nlp from 'compromise';
	import nlpNumbers from 'compromise-numbers';
	import {mapGetters} from 'vuex';
	nlp.extend(nlpNumbers);
	let parsedData = [];

	export default {
		data: function() {
			return {
				isDisabled: true,
			}
		},
		computed: {
			...mapGetters([
				'options', 'parsedResult'
			]),
			mainText: {
				get() {
					return this.$store.state.mainText;
				},
				set(value) {
					this.$store.commit('mainText', value);
				}
			},
			picked: {
				get() {
					return this.$store.state.picked;
				},
				set(value) {
					this.$store.commit('picked', value);
				}
			}
		},
		watch: {
			
		},
		methods: {
			parseData: function() {
				this.$store.commit('loader', true);
				if(this.mainText) {
					let nlpText = nlp(this.mainText);
					if(this.picked == 'People') {
						parsedData = nlpText.people().out('array');
					}
					else if(this.picked == 'Places') {
						parsedData = nlpText.places().out('array');
					}
					else if(this.picked == 'Emails') {
						parsedData = nlpText.emails().out('array');
					}
					else if(this.picked == 'Organizations') {
						parsedData = nlpText.organizations().out('array');
					}
					else if(this.picked == 'Numbers') {
						let numResult = nlpText.numbers().out('array');
						let phnResult = nlpText.phoneNumbers().out('array');
						parsedData = numResult.concat(phnResult);
					}
					else if(this.picked == 'Quotations') {
						parsedData = nlpText.quotations().out('array');
					}
					else if(this.picked == 'Nouns') {
						parsedData = nlpText.nouns().out('array');
					}
					else if(this.picked == 'Pronouns') {
						parsedData = nlpText.pronouns().out('array');
					}
					else if(this.picked == 'Verbs') {
						parsedData = nlpText.verbs().out('array');
					}
					else if(this.picked == 'Prepositions') {
						parsedData = nlpText.prepositions().out('array');
					}
					else if(this.picked == 'Conjunctions') {
						parsedData = nlpText.conjunctions().out('array');
					}
					else if(this.picked == 'Acronyms') {
						parsedData = nlpText.acronyms().out('array');
					}
					if(parsedData.length >= 1) {
						this.isDisabled = false;
						parsedData.push(`<span class="text-success">(Total: ${parsedData.length})</span>`);
						this.$store.commit('parsedResult', parsedData.join(`<span class="dot"></span>`));
						console.log(parsedData.length);
					}
					else{
						this.$store.commit('parsedResult', `<span class="text-danger fw-bold">NO MATCH FOUND, PLEASE CHOOSE OTHER OPTIONS</span>`);
					}
				}
				else {
					parsedData = [];
					this.$store.commit('parsedResult', `<span class="text-danger fw-bold">PLEASE CHOOSE ANY DATA TO PARSE</span>`);
				}
				this.$store.commit('loader', false);
			},
			jsonDownload: function() {
				if(parsedData.length >= 1) {
					const blobFile = new Blob([JSON.stringify(parsedData, null, 2)], {type:'application/json'});
					let saving = document.createElement('a');
					saving.download = 'NER.json';
					saving.href = window.URL.createObjectURL(blobFile);
					saving.textContent = 'Download Ready';
					saving.style = 'display:none';
					saving.click();
				}
				else {
					this.$store.commit('parsedResult', `<span class="text-danger fw-bold">YOU HAVE NO PARSED DATA TO SAVE AS JSON FILE</span>`);
				}
			},
			reset: function() {
				parsedData = [];
				this.mainText = '';
				this.$store.commit('parsedResult', `YOUR RESULT WILL BE APPEARED HERE`);
				this.picked = '';
				this.isDisabled = true;
			}
		}
	}
</script>

<style>
	.bg-hs{background-color:#34495e; color:#fff;}
	.optinput{transform:scale(1.2); cursor:pointer;}
	label{cursor:pointer;}
	.dot{height:10px; width:10px; margin:0 5px; background-color:#012d5c; border-radius:50%; display:inline-block;}
</style>