<template>
	<div class="flex flex-col text-body text-center py-6 px-2 gap-2">
		<div class="text-title font-bold text-xl">{{ timeSpent }}</div>
		<div>{{ description }}</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
	description: string;
	time: number;
}>();

const timeSpent = computed(() => {
	return props.time + ' seconds';
});
</script>
