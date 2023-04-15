<template>
	<div v-if="currentTab === value">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { ComputedRef, inject, watch } from 'vue';
import { TabInfo } from '../../../../domain/tabs/TabInfo';

defineProps<{
	title: TabInfo['title'];
	value: TabInfo['value'];
}>();

const currentTab = inject<ComputedRef<TabInfo['value']>>('currentTab');

watch(
	() => currentTab,
	(newTab) => {
		console.log('new tab', newTab);
	}
);
</script>
