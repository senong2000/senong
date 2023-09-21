<script lang="ts" setup>

import { YearAccount, MonthAccount, Account } from '@/types/projects';
import { getAccount } from '@/utils/cache/localStorage';

const today = new Date();

const selectedDate = ref();

const accountsRef = ref<YearAccount[]>([]);

const accounts = computed(() => {
    return accountsRef.value;
})

onMounted(() => {
    initAccounts()
})

const initAccounts = () => {
    if (getAccount() && getAccount().length > 0) accountsRef.value = getAccount();
}

const addAccount = () => {

}


</script>
<template>
    <div class="account">
        {{ accounts }}
    </div>
</template>
<style lang="scss" scoped></style>