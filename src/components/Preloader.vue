<template>
    <div v-if="loader" class="loader">
        <div class="preloader"></div>
    </div>
</template>

<script>
	export default{
		computed: {
			loader() {
				return this.$store.state.loader;
			}
		}
	}
</script>

<style scoped>
	.loader{
		width: 100%;
		min-height: 100vh;
		background: #fff;
		position: absolute;
		z-index: 9;
		opacity: 0.9;
	}
	.preloader {
		position: absolute;
		border: 15px solid #012d5c;
		border-radius: 50%;
		border-top: 15px solid #fff;
		width: 80px;
		height: 80px;
		-webkit-animation: spin 1s linear infinite;
		animation: spin 1s linear infinite;
		left: 48%;
		top: 40%;
		z-index: 99;
	}

	@-webkit-keyframes spin {
		0% { -webkit-transform: rotate(0deg);}
		100% { -webkit-transform: rotate(360deg);}
	}

	@keyframes spin {
		0% { transform: rotate(0deg);}
		100% { transform: rotate(360deg);}
	}
</style>