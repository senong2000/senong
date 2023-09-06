<script lang="ts" setup>
import { Blog } from '@/types/blog';
import { formatDate } from '@/utils/date';

const props = defineProps<{
    type?: string
    blogs?: Blog[]
    extra?: Blog[]
}>()

const atype = ref(null)

const router = useRouter()
const routes: Blog[] = router.getRoutes()
    .filter(i => i.path.startsWith('/blog') && i.meta.frontmatter.date && !i.meta.frontmatter.draft)
    .filter(i => !i.path.endsWith('.html'))
    .map(i => ({
        path: i.meta.frontmatter.redirect || i.path,
        title: i.meta.frontmatter.title,
        date: i.meta.frontmatter.date,
        lang: i.meta.frontmatter.lang,
        duration: i.meta.frontmatter.duration,
        recording: i.meta.frontmatter.recording,
        upcoming: i.meta.frontmatter.upcoming,
        redirect: i.meta.frontmatter.redirect,
        type: i.meta.frontmatter.type
    }))

const types = ['All', ...new Set(routes.filter(i => i.type !== null).map(i => i.type))]
// console.log(routes, types)

const blogs = computed(() =>
    [...(props.blogs || routes), ...props.extra || []]
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
        .filter(i => i.lang !== 'zh')
        .filter(i => i.type === atype.value || atype.value === 'All'),
)

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isFuture = (a?: Date | string | number) => a && new Date(a) > new Date()
const isSameYear = (a?: Date | string | number, b?: Date | string | number) => a && b && getYear(a) === getYear(b)
function isSameGroup(a: Blog, b?: Blog) {
    return (isFuture(a.date) === isFuture(b?.date)) && isSameYear(a.date, b?.date)
}

function getGroupName(p: Blog) {
    if (isFuture(p.date))
        return 'Upcoming'
    return getYear(p.date)
}

</script>
<template>
    <div class="blog mt-16 ">
        <v-tabs v-model="atype" align-tabs="start" selected-class="active-atype" hide-slider>
            <v-tab v-for="item in types" :key="item" :value="item" variant="plain">
                {{ item }}
            </v-tab>
        </v-tabs>

        <ul>
            <template v-if="!blogs.length">
                <div py2 op50>
                    { nothing here yet }
                </div>
            </template>

            <template v-for="route, idx in blogs" :key="route.path">
                <div v-if="!isSameGroup(route, blogs[idx - 1])" select-none relative h20 pointer-events-none slide-enter
                    :style="{
                        '--enter-stage': idx - 2,
                        '--enter-step': '60ms',
                    }">
                    <span text-8em color-transparent absolute left--3rem top--2rem font-bold text-stroke-2
                        text-stroke-hex-aaa op10>{{ getGroupName(route) }}</span>
                </div>
                <div class="slide-enter" :style="{
                    '--enter-stage': idx,
                    '--enter-step': '60ms',
                }">
                    <component :is="route.path.includes('://') ? 'a' : 'RouterLink'" v-bind="route.path.includes('://') ? {
                        href: route.path,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                    } : {
                        to: route.path,
                    }
                        " class="item block font-normal mb-6 mt-2 no-underline">
                        <li class="no-underline" flex="~ col md:row gap-2 md:items-center">
                            <div class="title text-lg leading-1.2em" flex="~ gap-2 wrap">
                                <span v-if="route.lang === 'zh'" align-middle flex-none
                                    class="text-xs bg-zinc:15 text-zinc5 rounded px-1 py-0.5 ml--12 mr2 my-auto hidden md:block">中文</span>
                                <span align-middle class="blog-title">{{ route.title }}</span>
                            </div>

                            <div flex="~ gap-2 items-center">
                                <span v-if="route.redirect" align-middle op50 flex-none text-xs ml--1 mt--1
                                    i-carbon-arrow-up-right title="External" />
                                <span v-if="route.inperson" align-middle op50 flex-none i-ri:group-2-line
                                    title="In person" />
                                <span v-if="route.recording || route.video" align-middle op50 flex-none i-ri:film-line
                                    title="Provided in video" />
                                <span v-if="route.radio" align-middle op50 flex-none i-ri:radio-line
                                    title="Provided in radio" />

                                <div class="blog-tags">
                                    <span v-if="atype === 'All' && route.type !== null" text-sm op50 ws-nowrap>{{ route.type
                                    }} · </span>
                                    <span v-if="route.date" text-sm op50 ws-nowrap>{{ formatDate(route.date, true) }}</span>
                                    <span v-if="route.duration" text-sm op40 ws-nowrap> · {{ route.duration }}</span>
                                    <span v-if="route.platform" text-sm op40 ws-nowrap> · {{ route.platform }}</span>
                                </div>

                                <span v-if="route.lang === 'zh'" align-middle flex-none
                                    class="text-xs bg-zinc:15 text-zinc5 rounded px-1 py-0.5 my-auto md:hidden">中文</span>
                            </div>
                        </li>
                    </component>
                </div>
            </template>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
.blog {
    position: relative;
    // max-width: 48rem;
    width: 50vw;

    button {
        display: flex;
        align-items: end;
        transition: all .2s;
    }

    .active-atype {
        font-size: 2rem;
        opacity: 1;
    }

    &-title {
        view-transition-name: title
    }

    &-tags {
        view-transition-name: tags
    }

}
</style>