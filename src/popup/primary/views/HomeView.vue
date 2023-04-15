<template>
	<div class="w-80 bg-ytdark">
		<PopupHeader>
			<div class="flex justify-center">
				<span class="font-bold text-title text-base">
					Youtube Time Report
				</span>
			</div>
		</PopupHeader>

		<Tabs>
			<Tab title="tab 1">Tab content 1</Tab>
			<Tab title="tab 2">Tab content 2</Tab>
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
