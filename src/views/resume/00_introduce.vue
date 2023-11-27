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
  <div class="resume-introduce" w-full mx-8 my-16>
    <div class="resume-introduce-base" pr-16>
      <v-row class="avatar" pb-2>
        <v-avatar size="80" image="/avatar.png"></v-avatar>
      </v-row>

      <v-row class="name" flex pb-2>
        <span class="name-zh" mr-2 font-size-6 font-bold>{{ name.data.zh }}</span>
        <span class="name-en" font-size-6 font-bold>{{ name.data.en }}</span>
      </v-row>
      <v-row pb-2>
        <span class="gender" pr-2>{{ gender.data }}</span>
        <span class="age">{{ age.data }}</span>
      </v-row>

      <v-row flex flex-col pb-2>
        <span class="QQ" font-size-4>{{ contact.data.email.qq }}</span>
        <span class="outlook" font-size-4>{{ contact.data.email.outlook }}</span>
        <span class="github" font-size-4 underline underline-dashed underline-offset-4>
          <a :href="contact.data.github" target="_blank">
            {{ contact.data.github }}
          </a>
        </span>
      </v-row>

      <v-row class="reside" pb-2>
        <span>{{ reside.data }}</span>
      </v-row>
    </div>

    <div class="resume-introduce-body">

      <v-row class="about">
        <div class="resume-title">About</div>
      </v-row>
      <v-row p-2 flex-col>
        <div my-2 v-for="item, index in about.data" :key="index">
          {{ item }}
        </div>
      </v-row>
      <v-row class="workExp">
        <div class="resume-title">Work Experience</div>
      </v-row>
      <v-row p-2 flex-col>
        <div my-2 v-for="item, index in work_exp.data" :key="index">
          <div>
            <span class="workExp-where">{{ item.where }}</span>
            <span class="career">{{ item.career }}</span>
          </div>
          <div>
            <span class="time">{{ item.start }} - {{ item.end }}</span>
            <span class="location">| {{ item.location }}</span>
          </div>
          <li v-for="x, index in item.work" :key="index">{{ x }}</li>
        </div>
      </v-row>
      <v-row class="education">
        <div class="resume-title">Education</div>
      </v-row>
      <v-row p-2 flex-col>
        <div my-2 v-for="item, index in education.data" :key="index">
          <div>
            <span class="school">{{ item.school }}</span>
            <span class="edu">{{ item.edu }}</span>

          </div>
          <div>
            <span class="time">{{ item.start }} - {{ item.end }}</span>
            <span class="major">| {{ item.major }}</span>
            <span class="gpa">GPA:{{ item.gpa }}</span>
          </div>
          <div>

          </div>
        </div>
      </v-row>
      <v-row class="stacks">
        <div class="resume-title">Stacks</div>
      </v-row>
      <v-row p-2 class="stack-table">
        <div my-2 v-for="item, index in stacks.data" :key="index" flex>
          <div class="stack">{{ item.class }}</div>
          <span v-for="x, index in item.data" :key="index" class="stack-item">
            {{ x }}
            <span v-if="index !== item.data.length - 1">,</span>
          </span>
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
        <span font-bold pr-2 v-for="item, index in languages.data" :key="index"> {{ item }} </span>
      </v-row>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@media (min-width:64rem) {
  /* 在宽度大于等于 1024px 的设备上应用的样式 */
}

@media (min-width: 48rem) and (max-width: 64rem) {
  /* 在宽度介于 768px 和 1023px 之间的设备上应用的样式 */
}

@media (min-width:64rem) {

  /* 在宽度大于 768px */
  .resume-introduce {
    display: flex;
    justify-content: center;
    min-width: 8rem;

    .resume-introduce-base {
      min-width: 16rem;
    }

    .resume-introduce-body {
      max-width: 36rem;
      min-width: 18rem;
    }
  }

}

@media (max-width: 64rem) {

  /* 在宽度小于等于 767px 的设备上应用的样式 */
  .resume-introduce {

    display: flex;
    flex-direction: column;
    align-items: center;

    .resume-introduce-base {
      margin-bottom: 2rem;

    }

    .resume-introduce-body {}
  }
}

.resume-introduce-body {
  .resume-title {
    padding: .25rem .75rem;
    font-size: 1rem;
    border-radius: .25rem;
  }

  .workExp-where {
    text-decoration: dashed underline;
    text-underline-offset: .25rem;
    margin-right: .5rem;
    margin-bottom: .25rem;
    font-weight: 600;
  }

  .career {
    color: grey;
  }

  .time {
    margin-right: .5rem;
    color: grey;
    font-size: .875rem;
  }

  .location {
    color: grey;
    font-size: .875rem;
  }

  .school {
    text-decoration: dashed underline;
    text-underline-offset: .25rem;
    margin-right: .5rem;
    margin-bottom: .25rem;
    font-weight: 600;
  }

  .edu {
    color: grey;
    margin-right: .5rem;
  }

  .major {
    margin-right: .5rem;
    color: grey;
    font-size: .875rem;
  }

  .gpa {
    color: grey;
    font-size: .875rem;
  }

  .time {
    margin-right: .5rem;
    color: grey;
    font-size: .875rem;
  }

  .stack-table {
    display: flex;
    flex-direction: column;
  }

  .stack {
    width: 7rem;
    font-weight: 600;
    text-align: right;
    margin-right: .5rem;
  }

  .stack-item {
    margin-right: .5rem;
  }
}
</style>
