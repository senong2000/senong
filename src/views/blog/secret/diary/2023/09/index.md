---
title: 2023/09
description: 
date: 2000-02-21
lang: en
duration: ∞
type: secret
tags: diary
---
[[toc]]

<script setup lang="ts">
import { useRouter,useRoutes } from 'vue-router'

const dayRouteRegex = new RegExp(`^${import.meta.env.VITE_BASE_URL}/blog/secret/diary/([^/]+)/([^/]+)/([^/]+)$`);

const router = useRouter()
const routes = router.getRoutes().filter(i => dayRouteRegex.test(i.path))

console.log(routes)
</script>

<div v-for="route, idx in routes" :key="route.path">
<button @click="router.push(route.path)"> 
 {{route.meta.frontmatter.title}}
</button>
</div>