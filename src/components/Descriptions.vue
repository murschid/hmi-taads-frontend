<template>
    <div class="accordion accordion-flush my-4" id="accordionFlushExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">Project Description:</button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>This is a combined project for both HMI and TAaDS courses. This very simple project can do few major tasks. At first it takes input from users and then parse it into different entities based on the user's requeremtnts. Later it displays those parsed content in the News Ticker section which is in the bottom of this UI. It also can save all parsed data as a JSON file in user's local drive if users wnat to do it.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
	.accordion-button{padding: .7rem 1.25rem;}
</style>