<template>
    <div
        class="ytr-button flex items-center gap-2 px-4 py-2 bg-ytrgray28 font-bold text-title select-none rounded-full cursor-pointer"
    >
        <YtrIcon
            v-if="prependIcon"
            :name="prependIcon"
        />
        <slot></slot>
        <YtrIcon
            v-if="appendIcon"
            :name="appendIcon"
        />
    </div>
</template>

<script setup lang="ts">
import YtrIcon from './YtrIcon.vue';

defineProps<{
    prependIcon?: string;
    appendIcon?: string;
}>();
</script>

<style lang="scss">
.ytr-button {
    &:hover {
        background-color: #404040;
    }
}
</style>
