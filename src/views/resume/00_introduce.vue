<script lang="ts" setup>

import { resume } from '@/assets/data/resume'

import { returnData } from '@/utils/resume'

const introduce = computed(() => {
  return resume.find(i => i.module === 'introduce')
})


const name = returnData(introduce, 'name');

const gender = returnData(introduce, 'gender');

const age = returnData(introduce, 'age');

const contact = returnData(introduce, 'contact');

const reside = returnData(introduce, 'reside');

const about = returnData(introduce, 'about');

const work_exp = returnData(introduce, 'work_exp');

const education = returnData(introduce, 'education');

const stacks = returnData(introduce, 'stacks');

// const projects = returnData('projects');

const languages = returnData(introduce, 'languages');

</script>
<template>
  <div class="resume-introduce" w-full flex m-y-16 m-x-64>
    <v-col cols="3" class="resume-introduce-base">
      <v-row class="avatar" mr-4>
        <v-avatar size="96" image="/avatar.png"></v-avatar>
      </v-row>

      <v-row class="name" flex flex-col>
        <span class="name-zh" font-size-8 font-bold>{{ name.data.zh }}</span>
        <span class="name-en" font-size-6 font-bold>{{ name.data.en }}</span>
      </v-row>
      <v-row pb-4>
        <span class="gender" pr-2>{{ gender.data }}</span>
        <span class="age">{{ age.data }}</span>
      </v-row>

      <v-row class="QQ">{{ contact.data.QQ }}</v-row>
      <v-row class="outlook">{{ contact.data.outlook }}</v-row>
      <v-row class="github" pb-4>{{ contact.data.github }}</v-row>

      <v-row class="reside">
        <span>{{ reside.data }}</span>
      </v-row>
    </v-col>

    <v-col cols="9" class="resume-introduce-body">
      <v-row class="about">
        <div class="resume-title">About</div>
      </v-row>
      <v-row p-2 flex-col>
        <div my-2 v-for="item, index in about.data" :key="index">
          {{ item }}
        </div>
      </v-row>
      <v-row class="work_exp">
        <div class="resume-title">Work Experience</div>
      </v-row>
      <v-row p-2 flex-col>
        <div my-2 v-for="item, index in work_exp.data" :key="index">
          {{ item }}
        </div>
      </v-row>
      <v-row class="education">
        <div class="resume-title">Education</div>
      </v-row>
      <v-row p-2 flex-col>
        <div my-2 v-for="item, index in education.data" :key="index">
          {{ item }}
        </div>
      </v-row>
      <v-row class="stacks">
        <div class="resume-title">Stacks</div>
      </v-row>
      <v-row p-2 flex-col>
        <div my-2 v-for="item, index in stacks.data" :key="index">
          {{ item }}
        </div>
      </v-row>
      <!-- <v-row class="projects">
        <div class="resume-title">Projects</div>
      </v-row>
      <v-row p-2 flex-col>
        <div my-2 v-for="item, index in projects.data" :key="index">
          {{ item }}
        </div>
      </v-row> -->
      <v-row class="languages">
        <div class="resume-title">Languages</div>
      </v-row>
      <v-row p-2>
        <span pr-2 v-for="item, index in languages.data" :key="index"> {{ item }} </span>
      </v-row>
    </v-col>
  </div>
</template>
<style lang="scss" scoped>
.resume-introduce-body {
  .resume-title {
    padding: 0.25rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
  }
}
</style>
