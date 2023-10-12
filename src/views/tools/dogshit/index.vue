<script lang="ts" setup>

const random = () => {
    const date = new Date();
    const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    const random = Math.sin(seed) * 10000;
    const randomNumber = Math.floor((random - Math.floor(random)) * 100) + 1;

    alert(randomNumber);

    // return randomNumber;
}

</script>
<template>
    <div class="dogshit">
        <v-btn @click="random" w-full h-full>
            dogshit
        </v-btn>
    </div>
</template>
<style lang="scss" scoped></style>