<template>
	<div class="w-80 bg-ytdark">
		<PopupHeader>
			<div class="flex justify-center">
				<span class="font-bold text-title text-base">
					Youtube Time Report
				</span>
			</div>
		</PopupHeader>

		<Tabs v-model="tab" class="justify-center">
			<Tab title="Daily" value="day">
				<div class="text-title">days</div>
			</Tab>
			<Tab title="Weekly" value="week">
				<div class="text-title">weeks</div>
			</Tab>
			<Tab title="Monthly" value="month">
				<div class="text-title">month</div>
			</Tab>
		</Tabs>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PopupHeader from '@/popup/primary/components/molecules/PopupHeader.vue';
import Tabs from '@/popup/primary/components/organisms/tabs/Tabs.vue';
import Tab from '@/popup/primary/components/organisms/tabs/Tab.vue';

const tab = ref('day');
</script>

<style lang="scss"></style>
