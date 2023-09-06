---
title: 正常人谁会写日记?
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

const yearRouteRegex = new RegExp(`^${import.meta.env.VITE_BASE_URL}/secret/diary/([^/]+)$`);

const router = useRouter()
const routes = router.getRoutes().filter(i => yearRouteRegex.test(i.path))

console.log(routes)
</script>

<div v-for="route, idx in routes" :key="route.path">
<button @click="router.push(route.path)"> 
 {{route.meta.frontmatter.title}}
</button>
</div>