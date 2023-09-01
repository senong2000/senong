<script lang="ts" setup>
const platformsArray = [
    {
        icon: 'fab fa-github',
        name: 'Github',
        link: 'https://github.com/senong2000?tab=repositories'
    },
    {
        icon: 'fab fa-x-twitter',
        name: 'Twitter',
        link: 'https://twitter.com/senong0221'
    },
    {
        icon: 'fab fa-instagram',
        name: 'Instagram',
        link: 'https://www.instagram.com/senong0221/'
    },
    {
        icon: 'fab fa-youtube',
        name: 'Youtube',
        link: 'https://www.youtube.com/channel/UCXE1CZ9CVMvLG3ohizQq-IA'
    },
    {
        icon: 'fab fa-discord',
        name: 'Discord',
        link: 'https://discord.gg/nWBZuN4Ay6'
    },
    {
        icon: 'fab fa-steam',
        name: 'steam',
        link: ''
    },
    {
        icon: 'fab fa-zhihu',
        name: '知乎',
        link: 'https://www.zhihu.com/people/huang-xiao-yao-6-54'
    },
    {
        icon: 'fab fa-weibo',
        name: '微博',
        link: 'https://weibo.com/u/2735539575'
    },
    {
        icon: 'fab fa-bilibili',
        name: 'Bilibili',
        link: 'https://space.bilibili.com/100638063?spm_id_from=333.999.0.0'
    },


]
</script>

<template>
    <div class="home">
        <div class="background">
            <div class="background-name" position-absolute font-semibold>
                <span>Senong</span>
            </div>
        </div>
        <div class="introduce">
            <div class="preface">
                <div>Hi, I'm <span font-size-8>Senong</span> , an ordinary office worker.</div>
                <div>My name comes from a Chinese dragon named Shen Long, which represents a mirage and everything is
                    ethereal.
                </div>
                <div>Usually, I enjoy creating things that belong to me and experiencing new things.</div>
                <div>Recently, I want to become an independent game developer, developing works that have my own personality
                    and can be passed down to this generation.</div>
                <div>At present, I am working hard to learn more different types of fields to expand my knowledge level,
                    accumulating knowledge and striving forward without any regrets.</div>
                <div>Finally, what I want to express is that this website will be used from now on to record my growth and
                    share
                    useful knowledge with every dream builder who needs it.</div>
            </div>
            <div class="platforms">
                <div font-size-4>other platforms :</div>
                <v-item-group>
                    <v-item v-for="item, index in  platformsArray " :key="index">
                        <v-btn :prepend-icon="item.icon" variant="plain" :href="item.link" target="_blank" size="x-large">
                            <v-tooltip :text="item.name" activator="parent" location="bottom"></v-tooltip>
                        </v-btn>
                    </v-item>
                </v-item-group>

            </div>
        </div>
    </div>
</template>

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
                opacity: 0.1;
                pointer-events: auto;
                user-select: none;
                transition: all .5s;
                z-index: 10;

            }

            span:hover {
                opacity: 0.5;
            }
        }


    }

    .introduce {
        position: absolute;
        width: 100%;
        // background: grey;
        font-size: 20px;
        font-weight: 500;
        padding: 2rem;
        z-index: 100;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .preface {
            max-width: 48rem;
            div {
                margin: 1.5rem 0;
            }
        }


        .platforms {
            max-width: 48rem;
            margin-top: 2rem;
        }
    }


}
</style>