<template>
	<div class="flex justify-center">
		<div v-for="tab in tabs"></div>
	</div>
</template>

<script setup lang="ts">
import { ref, useSlots, onBeforeMount } from 'vue';

interface TabInfo {
	title: string;
	content: string;
}

const slots = useSlots();

const selectedIndex = ref(0);
const tabs = ref<TabInfo>();

onBeforeMount(() => {
	const defaultSlot = slots.default ? slots.default() : undefined;

	console.log(defaultSlot);

	defaultSlot?.forEach((slot, index) => {
		if (slot.props?.selected) {
			selectedIndex.value = index;
		}
	});
});
</script>
