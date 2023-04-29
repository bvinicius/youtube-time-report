<template>
    <span
        class="material-icons text-title"
        :class="[variant ? `material-icons-${variant}` : '']"
        :style="{ fontSize: `${size}px` }"
        >{{ name }}</span
    >
</template>

<script setup lang="ts">
type IconVariant = 'outlined' | 'round' | 'sharp' | 'two-tone';

interface IconProps {
    name: string;
    variant?: IconVariant;
    size?: number;
}

withDefaults(defineProps<IconProps>(), {
    size: 20
});
</script>
