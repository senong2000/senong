---
title: 动作明星
description: porn star
date: 2000-02-21 
lang: en
duration: ∞
type: secret
tags: porn
---
[[toc]]


<script setup lang="ts">
import { useRouter,useRoutes } from 'vue-router'

const router = useRouter()
const routes1 = router.getRoutes().filter(i => i.path.startsWith(`${import.meta.env.VITE_BASE_URL}/secret/porn/`))

console.log(routes1)
</script>

哟哟哟！这里是本人多年单身喜好的动作明星，在没找到女朋友之前都会更新，自己所见所闻，也会找到女朋友之后也会更新 nvn~ 

色即是空，空即是色。

请勿传播淫秽之物，这里只有性与艺术探讨。

### 北影教材

<div v-for="route, idx in routes1" :key="route.path">
<button @click="router.push(route.path)"> 
 {{route.meta.frontmatter.title}}
</button>
</div>