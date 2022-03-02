<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-hs">
		<div class="container">
			<router-link to="/" class="navbar-brand me-5 py-0"><img src="../assets/logo.jpg" height="40" alt="Logo"></router-link>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item"><router-link to="/" class="nav-link text-white" aria-current="page">Home</router-link></li>
					<li class="nav-item"><router-link to="/team" class="nav-link text-white">Team</router-link></li>
					<li class="nav-item"><router-link to="/about" class="nav-link text-white">About</router-link></li>
					<!-- <li class="nav-item"><router-link to="/documentation" class="nav-link text-white">Documentation</router-link></li> -->
				</ul>
			</div>
		</div>
	</nav>
</template>

<style>
	.bg-hs{background-color:#34495e; color:#fff;}
	a{cursor: pointer;}
	.nav-link{font-size:18px; font-weight:500;}
	.router-link-active{font-weight:700;}
	.navbar-brand img{border-radius:50%;}
</style>