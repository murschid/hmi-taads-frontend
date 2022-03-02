<template>
	<div class="app">
		<Navbar/>
		<Preloader/>
		<div class="container bg-light">
			<router-view/>
		</div>
		<Footer/>
	</div>
</template>

<script>
	import Navbar from '@/components/Navbar';
	import Footer from '@/components/Footer';
	import Preloader from '@/components/Preloader';

	export default {
		components: {
			Navbar, Footer, Preloader
		}
	}
</script>

<style scoped>
	.container{min-height: 88.1vh;}
</style>