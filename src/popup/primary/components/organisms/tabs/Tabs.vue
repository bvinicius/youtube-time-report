<template>
	<div class="flex justify-center">
		<div class="flex items-center" v-for="(tab, index) in tabs">
			<div class="tab__header text-body cursor-pointer py-2 px-4">
				{{ tab.title }}
			</div>
			<TheDivider v-if="index !== tabs.length - 1" class="h-2/3 w-px" />
		</div>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue';
import TheDivider from '../../atoms/TheDivider.vue';

interface TabInfo {
	title: string;
}

const slots = useSlots();

const tabs = ref<TabInfo[]>(
	slots.default
		? slots.default().map((tab) => ({
				title: tab.props?.title as string,
		  }))
		: []
);
</script>

<style lang="scss">
.tab__header {
	position: relative;

	&.selected {
		font-weight: bold;
	}
}
</style>
