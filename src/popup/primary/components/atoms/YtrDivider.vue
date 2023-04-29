<template>
    <div :class="color ? `bg-${color}` : 'bg-ytgray3f'"></div>
</template>

<script setup lang="ts">
defineProps<{
    color?: string;
}>();
</script>
