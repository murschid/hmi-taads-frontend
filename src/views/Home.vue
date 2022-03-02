<template>
	<div class="home py-3">
		<div class="col">
			<Slider/>
		</div>
        <div class="row">
            <div class="col-lg-2 col-sm-3">
                <Options/>
            </div>
            <div class="col-lg-10 col-sm-9">
                <UserInput/>
            </div>
        </div>
    </div>
</template>

<script>
	import Options from '@/components/Options';
	import UserInput from '@/components/UserInput';
	import Slider from '@/components/Slider';

	export default {
		name: 'Home',
		data: function() {
			return {
				
			}
		},
		components: {
			Options, UserInput, Slider,
		}
	}
</script>