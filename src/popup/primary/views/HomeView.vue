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
            <YtrTabs
                v-model="tab"
                class="justify-center"
            >
                <YtrTab
                    title="Daily"
                    value="day"
                >
                    <TimeSpentArticle
                        v-if="timeReport?.daily"
                        description="Average time you spent watching YouTube videos every day in the last 7 days"
                        :time="timeReport.daily.timeSpent || 0"
                    />
                </YtrTab>
                <YtrTab
                    title="Weekly"
                    value="week"
                >
                    <TimeSpentArticle
                        v-if="timeReport?.weekly"
                        description="Time you spent watching YoutTube videos in the last 7 days"
                        :time="timeReport.weekly.timeSpent || 0"
                    />
                </YtrTab>
                <YtrTab
                    title="Monthly"
                    value="month"
                >
                    <TimeSpentArticle
                        v-if="timeReport?.monthly"
                        description="Time you spent watching YoutTube videos in the last 30 days"
                        :time="timeReport.monthly.timeSpent || 0"
                    />
                </YtrTab>
            </YtrTabs>

            <div class="flex justify-center">
                <YtrButton prependIcon="insights">See insights</YtrButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { injectSafe } from '../infrastructure/dependency-injection';
import {
    LOGGER,
    TIME_REPORT_SERVICES
} from '../infrastructure/dependency-symbols';
import { TimeReportServices } from '../../domain/time-report/TimeReportServices';
import PopupHeader from '@/popup/primary/components/molecules/PopupHeader.vue';
import YtrTabs from '@/popup/primary/components/organisms/tabs/YtrTabs.vue';
import YtrTab from '@/popup/primary/components/organisms/tabs/YtrTab.vue';
import YtrButton from '@/popup/primary/components/atoms/YTRButton.vue';
import TimeSpentArticle from '@/popup/primary/components/molecules/TimeSpentArticle.vue';
import { PeriodicalTimeReport } from '../../domain/time-report/TimeReportInfo';
import { YTRLogger } from '../../../shared/logger/YTRLogger';

const tab = ref('day');
const timeReport = ref<PeriodicalTimeReport>();

const logger = injectSafe<YTRLogger>(LOGGER);
const timeReportServices = injectSafe<TimeReportServices>(TIME_REPORT_SERVICES);

timeReportServices
    .getTimeReport({ averages: [7], absolutes: [7, 30] })
    .then((result) => {
        logger.log('RESULT??????', result);
        timeReport.value = result;
    });
</script>

<style lang="scss"></style>
