<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme';
import { getDaysInMonth } from '@/utils/date';

const { activeThemeName } = useTheme();

const today = new Date().getDate();

const curMonth = new Date().getMonth() + 1;

const curYear = new Date().getFullYear();

const days = getDaysInMonth(curYear, curMonth);

const selectedDay = ref(today);

const scheduleDialog = ref(false);

const addSchedule = () => {

}


</script>
<template>
    <div class="schedule">
        <v-row>
            <v-col cols="12">
                {{ curYear }} {{ curMonth }}
            </v-col>
            <v-col cols="12">
                <v-tabs v-model="selectedDay" align-tabs="start" selected-class="active-type" hide-slider show-arrows
                    center-active :theme="activeThemeName">
                    <v-tab v-for="i, idx in days" :key="idx" :value="i">
                        {{ i }}
                    </v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12" flex flex-items-center>

                <v-spacer></v-spacer>

                <v-dialog v-model="scheduleDialog" persistent class="w-128" :theme="activeThemeName">
                    <template v-slot:activator="{ props }">
                        <v-btn icon variant="text" v-bind="props">
                            <v-icon>fas fa-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Schedule</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>

                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn variant="text" @click="scheduleDialog = false">
                                Close
                            </v-btn>
                            <v-btn variant="text" @click="addSchedule">
                                SAVE
                            </v-btn>
                        </v-card-actions>

                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </div>
</template>
<style lang="scss" scoped>
.schedule {
    width: 60vw;

    .active-type {
        font-size: 2rem;
        color: $SuccessColor-default;
        transition: all .3s;
    }

}
</style>