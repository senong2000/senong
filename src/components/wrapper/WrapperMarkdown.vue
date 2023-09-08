<script lang="ts" setup>
import { formatDate } from '@/utils/date'

const baseUrl = `/`

const { frontmatter } = defineProps({
    frontmatter: {
        type: Object,
        required: true,
    },
})

const router = useRouter()
const route = useRoute()
const content = ref<HTMLDivElement>()

onMounted(() => {
    // const navigate = () => {
    //     if (location.hash) {
    //         const el = document.querySelector(decodeURIComponent(location.hash))
    //         if (el) {
    //             const rect = el.getBoundingClientRect()
    //             const y = window.scrollY + rect.top - 40
    //             // console.log(y)
    //             window.scrollTo({
    //                 top: y,
    //                 behavior: 'smooth',
    //             })
    //             return true
    //         }
    //     }
    // }

    const handleAnchors = (
        event: MouseEvent & { target: HTMLElement },
    ) => {
        const link = event.target.closest('a')

        if (
            !event.defaultPrevented
            && link
            && event.button === 0
            && link.target !== '_blank'
            && link.rel !== 'external'
            && !link.download
            && !event.metaKey
            && !event.ctrlKey
            && !event.shiftKey
            && !event.altKey
        ) {
            const url = new URL(link.href)
            if (url.origin !== window.location.origin)
                return

            event.preventDefault()
            const { pathname, hash } = url
            if (hash && (!pathname || pathname === location.pathname)) {
                window.history.replaceState({}, '', hash)
                // navigate()
            }
            else {
                router.push({ path: pathname, hash })
            }
        }
    }

    // useEventListener(window, 'hashchange', navigate)
    useEventListener(content.value!, 'click', handleAnchors, { passive: false })

    // --enter-stage 渐入
    content.value!.childNodes.forEach((node) => {
        if (node.nodeType === 1) { // 过滤掉非元素节点
            node.childNodes.forEach((node, index) => {
                if (node.nodeType === 1) { // 过滤掉非元素节点
                    (node as HTMLElement).style.setProperty('--enter-stage', index.toString());
                }
            })
        }
    })

    // setTimeout(() => {
    //     if (!navigate())
    //         setTimeout(navigate, 1000)
    // }, 1)
})

</script>
<template>
    <div class="blog-post">
        <div v-if="frontmatter.display ?? frontmatter.title" class="m-auto mb-8" :class="[frontmatter.wrapperClass]">
            <h1 class="blog-post-title" slide-enter-50 mb-0>
                {{ frontmatter.display ?? frontmatter.title }}
            </h1>
            <p v-if="frontmatter.date" class="opacity-50 !mt-6 slide-enter-50">
                <span v-if="frontmatter.type">{{ frontmatter.type }} · </span>
                {{ formatDate(frontmatter.date, false) }}
                <span v-if="frontmatter.duration">· {{ frontmatter.duration }}</span>
            </p>
            <p v-if="frontmatter.subtitle" class="opacity-50 !-mt-6 italic slide-enter">
                {{ frontmatter.subtitle }}
            </p>
            <p v-if="frontmatter.draft" class="slide-enter" bg-orange-4:10 text-orange-4 border="l-3 orange-4" px4 py2>
                This is a draft post, the content may be incomplete. Please check back later.
            </p>
        </div>
        <article ref="content" :class="[frontmatter.tocAlwaysOn ? 'toc-always-on' : '', frontmatter.class]">
            <slot />
        </article>
        <div v-if="frontmatter.paged ?? route.path !== '/'"
            class="prose mt-8 mb-8 slide-enter animate-delay-500 print:hidden flex">
            <div class="return">
                <v-icon size="small" op50 mr-2>fas fa-angle-right</v-icon>
                <RouterLink :to="route.path.split('/').slice(0, -1).join('/') || baseUrl" class="font-mono op50 hover:op75"
                    v-text="'cd ..'"></RouterLink>
            </div>

        </div>
    </div>
</template>
<style lang="scss" scoped>
.blog-post {
    position: relative;
    // max-width: 48rem;
    width: 50vw;
    z-index: 999;

    &-title {
        view-transition-name: title-0;
    }

}
</style>