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
  <div class="resume-product" w-full mx-8 my-16>
    <div class="resume-product-base" pr-16>
      Product
    </div>
    <div class="resume-product-body" flex flex-col>
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
      <div class="pdf">
        <a href="">PDF Version</a>
      </div>
    </div>

  </div>
</template>
<style lang="scss" scoped>
@media (min-width:64rem) {

  /* 在宽度大于 768px */
  .resume-product {
    display: flex;
    justify-content: center;

    // align-items: center;
    .resume-product-body {
      max-width: 36rem;
      min-width: 18rem;
    }

  }

}


@media (max-width: 64rem) {

  /* 在宽度小于等于 767px 的设备上应用的样式 */
  .resume-product {

    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.resume-product {}

.pdf {
  text-decoration: dashed underline;
  text-underline-offset: .25rem;
}
</style>


