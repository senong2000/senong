<script lang="ts" setup>

import { YearAccount, MonthAccount, Account, DayAccount } from '@/types/projects';
import { getAccount } from '@/utils/cache/localStorage';
import { formatDate, getDaysInMonth } from '@/utils/date';

const today = ref(formatDate(new Date(), 'diy', 'DD'))

const curMonth = ref(formatDate(new Date(), 'diy', 'MM'))

const curYear = ref(formatDate(new Date(), 'diy', 'YYYY'))

const days = getDaysInMonth(parseInt(curYear.value as string), parseInt(curMonth.value as string))

const selectedDate = ref(1);

const yearAccountsRef = ref<YearAccount[]>([]);

const yearAccounts = computed(() => {
    return yearAccountsRef.value.filter(i => i.year === curYear.value)
})

const monthAccounts: Ref<MonthAccount[]> = computed(() => {
    return yearAccounts.value ? yearAccounts.value[0].month.filter(i => i.month === curMonth.value) : [];
})

const dayAccounts: Ref<DayAccount[]> = computed(() => {
    return monthAccounts.value ? monthAccounts.value[0].day.filter(i => i.day === today.value) : [];
})

const accounts: Ref<Account[]> = computed(() => {
    return dayAccounts.value ? dayAccounts.value[0].account.map((i, idx) => ({
        index: idx,
        thing: i.thing,
        moneny: i.money,
        type: i.type
    })) : [];
})


onMounted(() => {
    initAccounts()
})

const initAccounts = () => {
    getAccount() && getAccount().length > 0 ? yearAccountsRef.value = getAccount() : [];
}

const addAccount = () => {

}


</script>
<template>
    <div class="account">
        <v-row>
            <v-col cols="12">
                {{ curYear }} {{ curMonth }}
            </v-col>
            <v-tabs v-model="selectedDate" align-tabs="start" selected-class="active-type" hide-slider show-arrows
                center-active>
                <v-tab v-for="i, idx in days" :key="idx" :value="i">
                    {{ i }}
                </v-tab>
            </v-tabs>
        </v-row>
    </div>
</template>
<style lang="scss" scoped>
.account {
    width: 60vw;
}
</style>