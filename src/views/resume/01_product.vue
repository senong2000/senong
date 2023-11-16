<script lang="ts" setup>

import { resume } from '@/assets/data/resume'

import { returnData } from '@/utils/resume'

const product = computed(() => {
  return resume.find(i => i.module === 'product')
})

const cognitions = returnData(product, 'cognitions')

const projects = returnData(product, 'projects')

</script>
<template>
  <div class="resume-product" w-full flex m-y-16 m-x-64>
    <v-col>
      <v-row class="cognitions">
        <div class="title">{{ cognitions }}</div>
        <span></span>
      </v-row>
      <v-row class="projects">
        <div class="title">{{ projects }}</div>
        <span></span>
      </v-row>
    </v-col>
  </div>
</template>
<style lang="scss" scoped>
</style>
