<template>
    <div class="options">
        <!-- <div class="card mb-2">
            <div class="card-header fw-bold">HMI Options</div>
            <div class="card-body">
                <div class="btn-group-vertical d-block" role="group">
                    <button v-for="hmi in hmis" v-bind:key="hmi" v-on:click="hmiParse(hmi)" type="button" class="btn btn-outline-success">{{hmi}}</button>
                </div>
            </div>
        </div> -->
        <div class="card mb-4">
            <div class="card-header fw-bold">NER Options</div>
            <div class="card-body">
                <div class="btn-group-vertical d-block" role="group">
                    <button v-for="taads in taadss" v-bind:key="taads" v-on:click="taadsParse(taads)" type="button" class="btn btn-outline-success">{{taads}}</button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header fw-bold">Addition</div>
            <div class="card-body">
                <div class="btn-group-vertical d-block mb-3" role="group">
					<div class="input-group mb-3">
						<input v-model="conName" type="text" class="form-control" placeholder="Entity">
					</div>
					<select v-model="conOpt" class="form-select">
						<option value="Person" selected>Person</option>
						<option value="Place">Place</option>
						<option value="Organization">Organization</option>
					</select>
                </div>
                <button v-on:click="teach" v-bind:disabled="!conName" type="button" class="btn btn-sm btn-success float-end">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
	import nlp from 'compromise';
	import {mapGetters} from 'vuex';

	export default {
		data: function() {
			return {
				conName: null,
				conOpt: 'Person'
			}
		},
		computed: {
			...mapGetters([
				'hmis', 'taadss', 'picked', 'parsedResult'
			])
		},
		methods: {
			hmiParse: function(value) {
				this.$store.commit('loader', true);
				if(value == 'Random') {
					fetch('https://api.quotable.io/random')
					.then(response => response.json())
					.then(data => {
						this.$store.commit('parsedResult', data.content);
						this.$store.commit('picked', '');
						this.$store.commit('loader', false);
					});
				} else {
					fetch('https://api.quotable.io/random?tags='+value.toLowerCase())
					.then(response => response.json())
					.then(data => {
						this.$store.commit('parsedResult', data.content);
						this.$store.commit('picked', '');
						this.$store.commit('loader', false);
					});
				}
			},
			taadsParse: function(urlId) {
				this.$store.commit('loader', true);
				fetch('http://localhost:3000/api/taads/'+urlId.toLowerCase())
				.then(response => response.json())
				.then(data => {
					console.log(data);
					this.$store.commit('parsedResult', `YOUR PARSED ENTITY WILL BE APPEARED HERE`);
					this.$store.commit('mainText', data);
					this.$store.commit('picked', '');
					this.$store.commit('loader', false);
				});
			},
			teach: function() {
				if(this.conName) {
					nlp.extend((Doc, world) => {
						let nerObj = {};
						nerObj[this.conName] = this.conOpt;
						world.addWords(nerObj);
					});
					this.conName = '';
					console.log(this.conOpt);
				}
			}
		}
	}

</script>