<template>
	<span
		class="material-icons text-title"
		:class="[variant ? `material-icons-${variant}` : '']"
		>{{ name }}</span
	>
</template>

<script setup lang="ts">
type IconVariant = 'outlined' | 'round' | 'sharp' | 'two-tone';
defineProps<{
	name: string;
	variant?: string;
}>();
</script>
