<template>
	<div v-show="isActive">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
	title: string;
	value: string | number;
}>();

const isActive = ref(false);
</script>
