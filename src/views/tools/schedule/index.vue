<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme';
import { getDaysInMonth } from '@/utils/date';
import { getSchedule, setSchedule } from '@/utils/cache/localStorage';
import { Schedule } from '@/types/projects';

const { activeThemeName } = useTheme();

const today = new Date().getDate();

const curMonth = new Date().getMonth() + 1;

const curYear = new Date().getFullYear();

const days = getDaysInMonth(curYear, curMonth);

const selectedDay = ref(today);

const scheduleDialog = ref(false);

const schedulesRef = ref<Schedule[]>([]);

const schedules = computed(() => {
    return schedulesRef.value
})

onMounted(() => {
    initSchedule();
})

const initSchedule = () => {
    getSchedule() && getSchedule().length > 0 ? schedulesRef.value = getSchedule() : [];
}

const rules = {
    required: (value: any) => !!value || 'Required.',
}

const schedule = ref<string>('');
const startTime = ref<string>();
const endTime = ref<string>();

const addSchedule = () => {
    const tempSchedule = {
        schedule: schedule.value,
        createdDate: new Date(),
        startTime: startTime.value as string,
        endTime: endTime.value as string,
    }

    schedulesRef.value.unshift(tempSchedule)

    console.log(schedulesRef.value)
    // setSchedule(schedulesRef.value)

    schedule.value = '';
    startTime.value = '';
    endTime.value = '';

    scheduleDialog.value = false;
}

const updateSchedule = () => {
    setSchedule(schedulesRef.value)
}

const delScheduledialog = ref(false);
const delSchedule = (item: Schedule) => {
    const index = schedules.value.indexOf(item) as number;

    if (index > -1) {
        schedules.value.splice(index, 1);
    }

    setSchedule(schedulesRef.value)

    delScheduledialog.value = false

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
                                    <v-col cols="12">
                                        <v-text-field v-model="schedule" variant="solo" label="Schedule"
                                            :rules="[rules.required]" clearable></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field label="Start Time" v-model="startTime" variant="solo"
                                            type="time"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field label="End Time" v-model="endTime" variant="solo"
                                            type="time"></v-text-field>
                                    </v-col>

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
            <v-col cols="12">
                <v-card rounded="0" v-for="item in schedules" :key="(item.index as number)" :theme="activeThemeName">
                    <div class="thing-list-content-body px-4 py-2 flex flex-items-center">
                        <v-icon mx-4>fas fa-clock</v-icon>
                        <span>{{ item.startTime }} - {{ item.endTime }}</span>
                        <v-icon mx-4>fa-solid fa-calendar</v-icon>
                        <v-text-field v-model="item.schedule" @input="updateSchedule" variant="solo"
                            hide-details="auto"></v-text-field>
                        <v-menu location="bottom" transition="slide-y-transition">
                            <template v-slot:activator="{ props }">
                                <v-btn variant="plain" v-bind="props">
                                    <v-icon size="x-large">fas fa-ellipsis</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item value="delete">
                                    <v-list-item-title>
                                        <v-btn variant="plain">
                                            <v-icon>fas fa-trash</v-icon>
                                            <v-dialog v-model="delScheduledialog" activator="parent" width="auto">
                                                <v-card flex flex-items-center flex-justify-center>
                                                    <v-card-text m-4>
                                                        确定删除?
                                                    </v-card-text>
                                                    <v-card-actions m-4>
                                                        <v-btn color="primary" variant="tonal"
                                                            @click="delScheduledialog = false">No</v-btn>
                                                        <v-btn color="primary" variant="tonal" @click="delSchedule(item)">
                                                            Yes</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-btn>
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                    <v-divider></v-divider>
                </v-card>
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