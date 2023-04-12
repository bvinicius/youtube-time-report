<template>
	<div class="flex justify-center">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	modelValue: string | number;
}>();

defineEmits<{
	'update:modelValue': (value: string | number) => void;
}>();
</script>
