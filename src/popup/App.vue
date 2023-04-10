<template>
	<PopupHeader>
		<div class="flex justify-center">
			<span class="font-bold text-font-title text-base">
				Youtube Time Report
			</span>
		</div>
	</PopupHeader>
	<HomeView />
</template>

<script setup lang="ts">
import '@/popup/index.css';
import HomeView from './primary/views/HomeView.vue';
import PopupHeader from './primary/components/molecules/PopupHeader.vue';
</script>
