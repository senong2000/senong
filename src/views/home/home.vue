<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.home {
    .background {
        width: 100vw;

        &-name {
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: none;

            span {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                color: $PrimaryColor-default;
                font-size: 16rem;
                letter-spacing: .2rem;
                opacity: 0.3;
                pointer-events: auto;
                user-select: none;
                transition: all .5s;
            }

            span:hover {
                opacity: 0.7;
            }
        }


    }
}
</style>
<template>
    <div class="home">
        <div class="background">
            <div class="background-name" position-absolute font-semibold>
                <span>Senong</span>
            </div>
        </div>
        <div class="introduce"></div>
    </div>
</template>