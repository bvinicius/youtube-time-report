<template>
	<div class="px-6 py-2 bg-whatsapp relative">
		<div class="bg-primary absolute top-0 left-0 right-0 h-12 z-0"></div>
		<div class="relative text-font text-lg text-center">WhatsTimer</div>

		<PhotoCard class="relative" />
	</div>
</template>

<script setup lang="ts">
import PhotoCard from '../components/molecules/PhotoCard.vue';
</script>

<style lang="scss">
.home__container {
	&::before {
		content: '';
		height: 30px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
}
</style>
