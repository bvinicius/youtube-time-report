<template>
	<div class="w-80 bg-ytdark">
		<PopupHeader>
			<div class="flex justify-center">
				<span class="font-bold text-font-title text-base">
					Youtube Time Report
				</span>
			</div>
		</PopupHeader>

		<TabsWrapper v-model="tab">
			<TabHeader value="day">Daily</TabHeader>
			<TabHeader value="week">Weekly</TabHeader>
			<TabHeader value="month">Monthly</TabHeader>
		</TabsWrapper>
		<TabContentWrapper v-model="tab">
			<TabContent value="day">Daily Content</TabContent>
			<TabContent value="week">Weekly Content</TabContent>
			<TabContent value="month">Monthly Content</TabContent>
		</TabContentWrapper>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PopupHeader from '@/popup/primary/components/molecules/PopupHeader.vue';
import TabsWrapper from '@/popup/primary/components/organisms/tabs/TabsWrapper.vue';
import TabHeader from '@/popup/primary/components/organisms/tabs/TabHeader.vue';
import TabContentWrapper from '@/popup/primary/components/organisms/tabs/TabContentWrapper.vue';
import TabContent from '@/popup/primary/components/organisms/tabs/TabContent.vue';

const tab = ref('day');
</script>

<style lang="scss"></style>
