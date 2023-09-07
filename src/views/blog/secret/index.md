---
title: 秘密基地
description: 
date: 2000-02-21
lang: en
duration: ∞
type: secret
---
[[toc]]


<script setup lang="ts">
import { useRouter} from 'vue-router'

const router = useRouter()

const secretRouteRegex = new RegExp(`^${import.meta.env.VITE_BASE_URL}/blog/secret/[^/]+$`);

const routes = router.getRoutes().filter(i => secretRouteRegex.test(i.path) && i.meta.frontmatter.date && !i.meta.frontmatter.draft)
// console.log(routes)

</script>

<div v-for="route, idx in routes" :key="route.path">
<button @click="router.push(route.path)"> 
 {{route.meta.frontmatter.title}}
</button>
</div>