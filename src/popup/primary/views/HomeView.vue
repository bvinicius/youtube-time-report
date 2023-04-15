<template>
	<div class="w-80 bg-ytdark">
		<PopupHeader>
			<div class="flex justify-center">
				<span class="font-bold text-title text-base">
					Youtube Time Report
				</span>
			</div>
		</PopupHeader>

		<div class="px-6 pb-6">
			<Tabs v-model="tab" class="justify-center">
				<Tab title="Daily" value="day">
					<TimeSpentArticle
						description="Average time you spend watching YouTube videos every day"
						:time="1800"
					/>
				</Tab>
				<Tab title="Weekly" value="week">
					<TimeSpentArticle
						description="Time you spend watching YoutTube videos in the last 7 days"
						:time="1800"
					/>
				</Tab>
				<Tab title="Monthly" value="month">
					<TimeSpentArticle
						description="Time you spend watching YoutTube videos in the last 30 days"
						:time="1800"
					/>
				</Tab>
			</Tabs>

			<div class="flex justify-center">
				<button style="background-color: red">See insights</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PopupHeader from '@/popup/primary/components/molecules/PopupHeader.vue';
import Tabs from '@/popup/primary/components/organisms/tabs/Tabs.vue';
import Tab from '@/popup/primary/components/organisms/tabs/Tab.vue';
import TimeSpentArticle from '../components/molecules/TimeSpentArticle.vue';

const tab = ref('day');
</script>

<style lang="scss"></style>
