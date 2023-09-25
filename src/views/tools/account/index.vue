<script lang="ts" setup>

import { Account, DateAccount, MODE } from '@/types/projects';
import { getAccount, setAccount } from '@/utils/cache/localStorage';
import { getDaysInMonth } from '@/utils/date';
import { useTheme } from '@/hooks/useTheme';

const { activeThemeName } = useTheme();

const today = new Date().getDate();

const curMonth = new Date().getMonth() + 1;

const curYear = new Date().getFullYear();

const days = getDaysInMonth(curYear, curMonth);

const selectedIndex = ref(0)

const selectedDay = computed(() => {
    return selectedIndex.value;
})
const selectedMonth = ref(curMonth);
const selectedYear = ref(curYear);
const accountDialog = ref(false);

const dateAccountsRef = ref<DateAccount[]>([]);

const selectedDate = computed(() => {
    return new Date(`${selectedYear.value} ${selectedMonth.value} ${selectedDay.value}`)
})

const selectedAccounts = computed(() => {
    return dateAccountsRef.value.find(i => new Date(i.date).toLocaleString() === selectedDate.value.toLocaleString()) as DateAccount;
})

const accounts = computed(() => {
    return selectedAccounts.value ? reactive(selectedAccounts.value.accounts as Account[]).filter(account => account.mode === 'day') : [];
})

const modeDayAccounts = computed(() => {
    return reactive(dateAccountsRef.value.flatMap(i => {
        return i.accounts?.filter(account => account.mode === 'day');
    }) as Account[]);
})

const modeWeekAccounts = computed(() => {
    return reactive((dateAccountsRef.value.flatMap(i => {
        return i.accounts?.filter(account => account.mode === 'week');
    }) as Account[]));
})

const modeMonthAccounts = computed(() => {
    return reactive((dateAccountsRef.value.flatMap(i => {
        return i.accounts?.filter(account => account.mode === 'month');
    }) as Account[]));
})

const modeYearAccounts = computed(() => {
    return reactive((dateAccountsRef.value.flatMap(i => {
        return i.accounts?.filter(account => account.mode === 'year');
    }) as Account[]));
})

const modeMoney = ref('year');

const yearMoney = computed(() => {
    return modeYearAccounts.value.reduce((sum, account) => {
        return sum + parseFloat(account.money.toString());
    }, 0) as number;
})
const monthMoney = computed(() => {
    return modeMonthAccounts.value.reduce((sum, account) => {
        return sum + parseFloat(account.money.toString());
    }, 0) as number;
})
const weekMoney = computed(() => {
    return modeWeekAccounts.value.reduce((sum, account) => {
        return sum + parseFloat(account.money.toString());
    }, 0) as number;
})
const dayMoney = computed(() => {
    return accounts.value.reduce((sum, account) => {
        return sum + parseFloat(account.money.toString());
    }, 0) as number;
})

const monthTotalMoney = computed(() => {
    return dateAccountsRef.value.flat().reduce((sum, i) => {
        if (new Date(i.date).getMonth() + 1 === curMonth) {
            return sum + (i.accounts as Account[]).reduce((sum, account) => {
                return sum + parseFloat(account.money.toString());
            }, 0) as number;
        } else {
            return sum;
        }
    }, 0) as number;

})

const totalMoney = computed(() => {
    let total = 0;
    if (modeMoney.value === 'year') {
        total += yearMoney.value;
        total += monthMoney.value;
        total += weekMoney.value;
        total += dayMoney.value;

    }
    else if (modeMoney.value === 'month') {
        total += monthMoney.value;
        total += weekMoney.value;
        total += dayMoney.value;
    }

    else if (modeMoney.value === 'week') {
        total += weekMoney.value;
        total += dayMoney.value;
    }

    else if (modeMoney.value === 'day') {
        total += dayMoney.value;
    }
    return total;
})

type AllAcounts = {
    money: number
    mode: string
    accounts: Account[]
}

const allAccounts = computed(() => {
    const tempAccount = reactive<AllAcounts[]>([]);
    modeYearAccounts.value.length > 0 ? tempAccount.push({ money: yearMoney.value, mode: 'Year', accounts: modeYearAccounts.value }) : [];
    modeMonthAccounts.value.length > 0 ? tempAccount.push({ money: monthMoney.value, mode: 'Month', accounts: modeMonthAccounts.value }) : [];
    modeWeekAccounts.value.length > 0 ? tempAccount.push({ money: weekMoney.value, mode: 'Week', accounts: modeWeekAccounts.value }) : [];
    accounts.value.length > 0 ? tempAccount.push({ money: dayMoney.value, mode: 'Day', accounts: accounts.value }) : [];
    return tempAccount;
})


onMounted(() => {
    initAccounts()
})

const initAccounts = () => {
    getAccount() && getAccount().length > 0 ? dateAccountsRef.value = getAccount() : [];

    selectedIndex.value = today;

    console.log(today, curMonth, curYear)
}

const thing = ref<string>();
const money = ref<string>();
const type = ref<accountType>();
const mode = ref<string>();

type accountType = {
    name: string
    icon: string
}
const types: accountType[] = [
    { name: 'game', icon: 'fas fa-gamepad' },
    { name: 'clothes', icon: 'fas fa-shirt' },
    { name: 'medical', icon: 'fas fa-briefcase-medical' },
    { name: 'study', icon: 'fas fa-book' },
    { name: 'sports', icon: 'fas fa-dumbbell' },
    { name: 'dinner party', icon: 'fas fa-utensils ' },
    { name: 'travel', icon: 'fas fa-map-location' },
    { name: 'network', icon: 'fas fa-wifi' },
    { name: 'food', icon: 'fas fa-bowl-food' },
    { name: 'commuting', icon: 'fas fa-bus-simple' },
    { name: 'rent', icon: 'fas fa-house' },
    { name: 'phone', icon: 'fas fa-mobile' }
]

const getTypeIcon = (name: string) => {
    const type = types.find(t => t.name === name);
    return type ? type.icon : 'fas fa-clipboard-question';
}

const modes = ['day', 'week', 'month', 'year'];

const rules = {
    required: (value: any) => !!value || 'Required.',
}

const addAccountDate = () => {
    if (dateAccountsRef.value.findIndex(i => new Date(i.date).toLocaleString() === selectedDate.value.toLocaleString()) === -1) {
        const tempDateAccounts = {
            date: selectedDate.value,
            accounts: []
        }

        dateAccountsRef.value.push(tempDateAccounts)
    }
}

const addAccount = async () => {
    const tempAccount = {
        thing: thing.value as string,
        money: parseFloat(money.value as string),
        type: (type.value as accountType).name as string,
        mode: mode.value as MODE
    }

    await addAccountDate();

    selectedAccounts.value.accounts?.unshift(tempAccount)

    setAccount(dateAccountsRef.value)

    thing.value = '';
    money.value = '';
    type.value = { name: '', icon: '' };
    mode.value = '';

    accountDialog.value = false;

    views.value = 'account';

}

const updateAccount = () => {

    setAccount(dateAccountsRef.value)

}


const delAccountdialog = ref(false);
const delAccount = (item: Account) => {

    const index = selectedAccounts.value.accounts?.indexOf(item) as number;

    if (index > -1) {
        selectedAccounts.value.accounts?.splice(index, 1);
    }

    setAccount(dateAccountsRef.value)

    delAccountdialog.value = false

};


const views = ref('account');

</script>
<template>
    <div class="account">
        <v-row>
            <v-col cols="12">
                {{ curYear }} {{ curMonth }}
            </v-col>
            <v-col cols="12">
                <v-tabs v-model="selectedIndex" align-tabs="start" selected-class="active-type" hide-slider show-arrows
                    center-active :theme="activeThemeName">
                    <v-tab v-for="i, idx in days" :key="idx" :value="i">
                        {{ i }}
                    </v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12" flex flex-items-center>
                <v-tabs v-model="views">
                    <v-tab value="account">account</v-tab>
                    <v-tab value="chart">chart</v-tab>
                </v-tabs>
                <v-spacer></v-spacer>

                <v-dialog v-model="accountDialog" persistent class="w-128" :theme="activeThemeName">
                    <template v-slot:activator="{ props }">
                        <v-btn icon variant="text" v-bind="props">
                            <v-icon>fas fa-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Account</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="thing" variant="solo" label="THING" :rules="[rules.required]"
                                            clearable></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="money" variant="solo" label="MONEY" :rules="[rules.required]"
                                            clearable></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-select v-model="type" :items="types" variant="solo" label="TYPE">
                                            <template v-slot:selection="{ item }">
                                                <v-icon>
                                                    {{ item.props.value.icon }}
                                                </v-icon>
                                            </template>

                                            <template v-slot:item="{ index, props, item }">
                                                <div v-bind="props" :key="index" flex flex-justify-center flex-items-center
                                                    w-full>
                                                    <v-btn w-full>
                                                        <v-icon :icon="(item.raw as accountType).icon"
                                                            size="x-large"></v-icon>
                                                    </v-btn>
                                                </div>
                                            </template>
                                        </v-select>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-autocomplete v-model="mode" :items="modes" variant="solo"
                                            label="MODE"></v-autocomplete>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn variant="text" @click="accountDialog = false">
                                Close
                            </v-btn>
                            <v-btn variant="text" @click="addAccount">
                                SAVE
                            </v-btn>
                        </v-card-actions>

                    </v-card>
                </v-dialog>
            </v-col>
            <v-col cols="12" class="slide-enter-50" v-if="views === 'account'">
                <div class="accounts" v-for="accounts in allAccounts">
                    <div my-4 flex flex-items-center>
                        <span text-6 mr-4>{{ accounts.mode }}</span>
                        <v-icon mx-4>fas fa-coins</v-icon>
                        <span>{{ accounts.money }}</span>
                    </div>

                    <v-card rounded="0" v-for="item in accounts.accounts" :key="(item.index as number)"
                        :theme="activeThemeName">

                        <div class="thing-list-content-body px-4 py-2 flex flex-items-center">
                            <v-icon mx-4>{{ getTypeIcon(item.type as string) }}</v-icon>
                            <v-text-field v-model="item.thing" @input="updateAccount" variant="solo"
                                hide-details="auto"></v-text-field>
                            <v-icon mx-4>fas fa-coins</v-icon>
                            <v-text-field v-model="item.money" @input="updateAccount" variant="solo"
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
                                                <v-dialog v-model="delAccountdialog" activator="parent" width="auto">
                                                    <v-card flex flex-items-center flex-justify-center>
                                                        <v-card-text m-4>
                                                            确定删除?
                                                        </v-card-text>
                                                        <v-card-actions m-4>
                                                            <v-btn color="primary" variant="tonal"
                                                                @click="delAccountdialog = false">No</v-btn>
                                                            <v-btn color="primary" variant="tonal"
                                                                @click="delAccount(item)">
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
                </div>
            </v-col>

            <v-col cols="12" class="slide-enter-50" v-if="views === 'chart'">
                <v-icon mx-1>fas fa-coins</v-icon>
                <span mx-2>Month:</span>
                {{ monthTotalMoney }}
            </v-col>
        </v-row>
    </div>
</template>
<style lang="scss" >
.account {
    width: 60vw;

    .active-type {
        font-size: 2rem;
        color: $SuccessColor-default;
        transition: all .3s;
    }

    .thing-list-content-body {
        .v-field--variant-solo {
            background: none;
            box-shadow: none;
            transition: all .3s;

        }
    }
}
</style>