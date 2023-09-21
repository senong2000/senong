<script lang="ts" setup>

import { YearAccount, MonthAccount, Account } from '@/types/projects';
import { getAccount } from '@/utils/cache/localStorage';
import { formatDate } from '@/utils/date';

const today = new Date();

const selectedDate = ref();

const yearAccountsRef = ref<YearAccount[]>([]);

const yearAccounts = computed(() => {
    return yearAccountsRef.value.map((i, idx) => ({
        index: idx,
        year: i.year,
        month: i.month
    }))
})

const yearAccount = computed(() => {
    return yearAccounts.value.find(i => i.year === formatDate(new Date(), 'diy', 'YYYY') as string);
})

const monthAccounts: Ref<MonthAccount[]> = computed(() => {
    return yearAccount.value ? yearAccount.value.month.filter(i => i.month === formatDate(new Date(), 'diy', 'MM') as string).map((i, idx) => ({
        index: idx,
        month: i.month,
        day: i.day,
    })) : [];
})

const accounts: Ref<Account[]> = computed(() => {
    return monthAccounts.value.length > 0 ? monthAccounts.value[0].day.map((i, idx) => ({
        index: idx,
        thing: i.thing,
        day: i.day,
        money: i.money,
        type: i.type
    })) as Account[] : [];
})


onMounted(() => {
    initAccounts()
})

const initAccounts = () => {
    if (getAccount() && getAccount().length > 0) yearAccountsRef.value = getAccount();
}



</script>
<template>
    <div class="account">
        {{ accounts }}
    </div>
</template>
<style lang="scss" scoped></style>