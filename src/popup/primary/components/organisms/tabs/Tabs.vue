<template>
	<div class="flex-col">
		<div class="flex justify-center select-none">
			<div class="flex items-center" v-for="(tab, index) in tabs">
				<div
					class="tab__header text-body cursor-pointer py-2 px-4"
					:class="{ selected: tab.value === props.modelValue }"
					@click="$emit('update:modelValue', tab.value)"
				>
					{{ tab.title }}
				</div>
				<TheDivider
					v-if="index !== tabs.length - 1"
					class="h-2/3 w-px"
				/>
			</div>
		</div>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { computed, provide, readonly, ref, useSlots } from 'vue';
import { TabInfo } from '../../../../domain/tabs/TabInfo';
import TheDivider from '@/popup/primary/components/atoms/TheDivider.vue';

const slots = useSlots();

const props = defineProps<{
	modelValue: TabInfo['value'];
}>();

defineEmits<{
	(e: 'update:modelValue', value: TabInfo['value']): void;
}>();

provide('currentTab', readonly(computed(() => props.modelValue)));

const tabs = ref<TabInfo[]>(
	slots.default
		? slots.default().map((tab) => ({
				title: tab.props?.title as string,
				value: tab.props?.value as number,
		  }))
		: []
);
</script>

<style lang="scss">
.tab__header {
	&.selected {
		font-weight: bold;
	}
}
</style>
