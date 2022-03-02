<template>
    <div class="team">
        <div class="card">
            <div class="card-header text-center">
                <h2 class="py-2"><u>About The Team</u></h2>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li v-for="team in teams" v-bind:key="team.name" class="list-group-item d-flex justify-content-between align-items-start">
                        <img v-bind:src="team.photo" class="img-thumbnail" width="90" alt="Team">
                        <div class="ms-4 me-auto">
                            <h4 class="fw-bold">{{team.name}}</h4>
                            <h6>{{team.title}}</h6>
                            <p>{{team.description}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
	import axios from 'axios';
	export default {
		data: function() {
			return {
				teams: null,
			}
		},
		mounted: function() {
			axios.get('http://localhost:3000/api/team')
			.then(response => response)
			.then(data => {
				this.teams = data.data;
			})
		}
	}
</script>