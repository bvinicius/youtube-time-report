<template>
    <slot v-if="currentTab === value"></slot>
</template>
<script setup lang="ts">
import { ComputedRef, inject } from 'vue';
import { TabInfo } from '../../../../domain/tabs/TabInfo';

defineProps<{
    title: TabInfo['title'];
    value: TabInfo['value'];
}>();

const currentTab = inject<ComputedRef<TabInfo['value']>>('currentTab');
</script>
