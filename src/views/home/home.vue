<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.home {
    .background {
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        pointer-events: none;

        &-name {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                color: $PrimaryColor-default;
                font-size: 16rem;
                letter-spacing: 2rem;
                opacity: 0.3;
                pointer-events: auto;
                user-select: none;
                transition: all .5s;
                z-index: inherit;

            }

            span:hover {
                opacity: 0.7;
            }
        }


    }

    .introduce {
        position: absolute;
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
        <div class="introduce">
            11
        </div>
    </div>
</template>