<template>
    <div class="flex-col">
        <div class="flex justify-center select-none">
            <div
                v-for="(tab, index) in tabs"
                class="flex items-center"
                :key="tab.value"
            >
                <div
                    class="text-body cursor-pointer py-2 px-6"
                    :class="[
                        tab.value === props.modelValue
                            ? 'selected font-bold'
                            : ''
                    ]"
                    @click="$emit('update:modelValue', tab.value)"
                >
                    {{ tab.title }}
                </div>
                <YtrDivider
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
import YtrDivider from '@/popup/primary/components/atoms/YtrDivider.vue';

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
              value: tab.props?.value as number
          }))
        : []
);
</script>
