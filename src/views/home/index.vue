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
        link: 'https://steamcommunity.com/profiles/76561198919128154/'
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

const language = 'zh';

</script>

<template>
    <div class="home mt-4 ">
        <div class="introduce slide-enter">
            <div class="preface zh" v-if="language === 'zh'">
                <div>你好，我是 <span font-size-8>Senong</span> , 一个普通的上班族。</div>
                <div>我的名字来源于一条名叫蜃的中国龙，它代表着海市蜃楼，一切都是空灵、飘渺、虚幻的。
                </div>
                <div>通常，我喜欢创造带我的思想的东西，体验新事物。</div>
                <div>最近，我想成为一名独立创作人，开发出有自己个性的作品，并可以流传到下一代。</div>
                <div>目前，我正在努力学习更多不同类型的领域，以扩大我的知识水平，积累知识，无怨无悔地向前迈进</div>
                <div>最后，我想表达的是，从现在起，这个网站将被用来记录我的成长，并与每一个需要它的梦想追求人分享有用的知识。</div>
            </div>
            <div class="preface en" v-else>
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
                <div font-size-4>其他平台</div>
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
    width: 50vw;

    .introduce {
        position: relative;
        width: 100%;
        font-size: 1.2rem;
        font-weight: 500;
        z-index: 100;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .preface {
            width: inherit;

            div {
                margin: 1.5rem 0;
            }
        }


        .platforms {
            width: inherit;
        }
    }


}
</style>
