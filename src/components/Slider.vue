<template>
    <div class="ourslide">
        <div class="row mb-3">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner" role="listbox">
                    <div class="carousel-item active">
                        <div class="row">
                            <div class="col-md-2 col-sm-4 col-4" v-for="hmi in hmis" v-bind:key="hmi.name" v-on:click="hmiParse(hmi.name)">
                                <div class="card border border-info mb-2">
                                    <img class="card-img-top" v-bind:src="hmi.image" alt="None">
                                    <div class="card-body p-1">
                                        <h6 class="card-title text-center">{{hmi.name}}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row">
                            <div class="col-md-2 col-sm-4 col-4" v-for="demo in hmis2" v-bind:key="demo.name" v-on:click="hmiParse(demo.name)">
                                <div class="card border border-info mb-2">
                                    <img class="card-img-top" v-bind:src="demo.image" alt="None">
                                    <div class="card-body p-1">
                                        <h6 class="card-title text-center">{{demo.name}}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div class="col mt-2 mb-2">
                <div class="input-group">
                    <input v-model="searched" type="search" class="form-control" placeholder="Search by tag...">
                    <button v-on:click="search" v-bind:disabled="!searched" class="btn btn-outline-success" type="submit"><i class="fas fa-search"></i></button>
                    <button class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" data-keyboard="false" data-backdrop="static"><i class="fas fa-search-plus"></i></button>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Advance Search</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-secondary disabled"><i class="fas fa-tags"></i></button>
                            <select v-model="tags" class="form-select border border-secondary" aria-label="Category">
                                <option v-for="hmi in hmis" v-bind:key="hmi.name" v-bind:value="hmi.name">{{hmi.name}}</option>
                                <!-- <option v-for="hmi2 in hmis2" v-bind:key="hmi2.name" :value="hmi2.name">{{hmi2.name}}</option> -->
                            </select>
                        </div>
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-secondary disabled"><i class="fas fa-user"></i></button>
                            <select v-model="author" class="form-select border border-secondary" aria-label="Author">
                                <option value="albert-einstein">Albert Einstein</option>
                                <option value="a-p-j-abdul-kalam">A. P. J. Abdul Kalam</option>
                                <option value="buddha">Gautama Buddha</option>
                                <option value="elbert-hubbard">Elbert Hubbard</option>
                                <option value="paul-washer">Paul Washer</option>
                                <option value="napoleon">Napoleon</option>
                                <option value="thomas-jefferson">Thomas Jefferson</option>
                                <option value="larry-page">Larry Page</option>
                            </select>
                        </div>
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-secondary disabled"><i class="far fa-calendar-alt"></i></button>
                            <input type="date" class="form-control border border-secondary" max="2021-07-12">
                        </div>
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-secondary disabled"><i class="fas fa-minus-square"></i></button>
                            <input v-model="minLength" type="number" class="form-control border border-secondary" min="50" placeholder="Min Length">
                            <button class="btn btn-outline-secondary disabled"><i class="fas fa-plus-square"></i></button>
                            <input v-model="maxLength" type="number" class="form-control border border-secondary" min="500" placeholder="Max Length">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button v-on:click="advSearch" class="btn btn-danger" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
		data: function() {
			return {
                searched: null,
                author: 'albert-einstein',
                tags: 'History',
                minLength: '',
                maxLength: ''
			}
		},
		computed: {
			...mapGetters([
				'hmis', 'hmis2'
			])
		},
        methods: {
			hmiParse: function(value) {
				this.$store.commit('loader', true);
                fetch('https://api.quotable.io/random?tags='+value.toLowerCase())
                .then((response)=>  response.json())
                .then((data) => {
                    this.$store.commit('parsedResult', data.content+' ---'+data.author);
                    this.$store.commit('picked', '');
                })
                .catch((error) => {
                    this.$store.commit('parsedResult', `<span class="text-danger">UNFORTUNATELY API SERVER IS DOWN NOW</span>`);
                    console.log(error);
                })
                .then(() => {
                    // always executed
                    this.$store.commit('loader', false);
                });

                // fetch('https://api.quotable.io/random?tags='+value.toLowerCase())
                // .then(response => response.json())
                // .then(data => {
                //     this.$store.commit('parsedResult', data.content+' ---'+data.author);
                //     this.$store.commit('picked', '');
                //     this.$store.commit('loader', false);
                // });
			},
            search: function() {
                if(this.searched) {
                    this.$store.commit('loader', true);
                    fetch('https://api.quotable.io/random?tags='+this.searched.toLowerCase())
                    .then((response) => response.json())
                    .then((data) => {
                        if(data.content) {
                            this.$store.commit('parsedResult', data.content+' ---'+data.author);
                        } else {
                            // this.randomSearch();
                            this.$store.commit('parsedResult', `<span class="text-danger">NOTHING FOUND, PLEASE TRY WITH CORRECT KEYWORD</span>`);
                        }
                        this.$store.commit('picked', '');
                    })
                    .catch((error) => {
                        this.$store.commit('parsedResult', `<span class="text-danger">UNFORTUNATELY API SERVER IS DOWN NOW, PLEASE TRY LATER</span>`);
                        console.log(error);
                    })
                    .then(() => {
                        // always executed
                        this.$store.commit('loader', false);
                        this.searched = null;
                    });
                }
            },
            advSearch: function() {
                this.$store.commit('loader', true);
                fetch('https://api.quotable.io/random?author='+this.author+'&minLength='+this.minLengta+'&maxLength='+this.maxLengta)
                .then((response) => response.json())
                .then((data) => {
                    if(data.content) {
                        this.$store.commit('parsedResult', data.content+' ---'+data.author);
                    } else {
                        this.$store.commit('parsedResult', `<span class="text-danger">Nothing found, please try by correct kayword.</span>`);
                    }
                    this.$store.commit('picked', '');
                })
                .catch((error) => {
                    this.$store.commit('parsedResult', `<span class="text-danger">UNFORTUNATELY API SERVER IS DOWN NOW</span>`);
                    console.log(error);
                })
                .then(() => {
                    // always executed
                    this.$store.commit('loader', false);
                });
            },
            randomSearch: function() {
                fetch('https://api.quotable.io/random')
                .then((response) => response.json())
                .then((data) => {
                    this.$store.commit('parsedResult', data.content+' ---'+data.author);
                });
            }


		}
	}
</script>

<style scoped>
    .card {cursor: pointer;}
    .carousel-control-next, .carousel-control-prev{width: 10%;}
    .modal{top: 30px;}
    .modal-header, .modal-footer{padding: 0.5rem 1rem;}
</style>