<template>
	<div v-show="isActive">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
	title: string;
}>();

const isActive = ref(false);
</script>
