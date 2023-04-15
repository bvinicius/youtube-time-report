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
						v-if="timeReport?.daily"
						description="Average time you spend watching YouTube videos every day"
						:time="timeReport.daily.timeSpent"
					/>
				</Tab>
				<Tab title="Weekly" value="week">
					<TimeSpentArticle
						v-if="timeReport?.weekly"
						description="Time you spend watching YoutTube videos in the last 7 days"
						:time="timeReport.weekly.timeSpent"
					/>
				</Tab>
				<Tab title="Monthly" value="month">
					<TimeSpentArticle
						v-if="timeReport?.monthly"
						description="Time you spend watching YoutTube videos in the last 30 days"
						:time="timeReport.monthly.timeSpent"
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
import { injectSafe } from '../infrastructure/dependency-injection';
import { TIME_REPORT_SERVICES } from '../infrastructure/dependency-symbols';
import { TimeReportServices } from '../../domain/time-report/TimeReportServices';
import PopupHeader from '@/popup/primary/components/molecules/PopupHeader.vue';
import Tabs from '@/popup/primary/components/organisms/tabs/Tabs.vue';
import Tab from '@/popup/primary/components/organisms/tabs/Tab.vue';
import TimeSpentArticle from '@/popup/primary/components/molecules/TimeSpentArticle.vue';
import { PeriodicalTimeReport } from '../../domain/time-report/TimeReportInfo';

const tab = ref('day');
const timeReport = ref<PeriodicalTimeReport>();

const timeReportServices = injectSafe<TimeReportServices>(TIME_REPORT_SERVICES);

timeReportServices.getTimeReport().then((result) => {
	timeReport.value = result;
});
</script>

<style lang="scss"></style>
