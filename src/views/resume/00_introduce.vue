<script lang="ts" setup></script>
<template>
  <div class="resume-introduce" w-full flex m-y-16 m-x-64>
    <v-col cols="3" class="resume-introduce-base">
      <v-row class="avatar" mr-4>
        <v-avatar size="96" image="/avatar.png"></v-avatar>
      </v-row>

      <v-row class="name" flex flex-col>
        <span class="name-zh" font-size-8 font-bold>黄俊丰</span>
        <span class="name-en" font-size-6 font-bold>Josenong</span>
      </v-row>
      <v-row pb-4>
        <span class="gender" pr-2>BOY</span>
        <span class="age">23</span>
      </v-row>

      <v-row class="QQ">1120659490@qq.com</v-row>
      <v-row class="outlook">senong2000@outlook.com</v-row>
      <v-row class="github" pb-4>https://github.com/senong2000</v-row>

      <v-row class="reside">
        <span>深圳市龙华区</span>
      </v-row>
    </v-col>

    <v-col cols="9" class="resume-introduce-body">
      <v-row class="about">
        <div class="resume-title">About</div>
      </v-row>
      <v-row p-2>
        <div my-2>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
          voluptate est corporis sapiente illo repellendus, iure eaque hic ad
          consequatur dolorem quisquam omnis nobis asperiores excepturi? Nam
          natus itaque dicta at? Corrupti rerum delectus ad dignissimos est
          cupiditate, quos esse odit, quasi eius fugit? Libero neque vel nam
          quas incidunt?
        </div>
        <div my-2>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias,
          temporibus? Nam dignissimos placeat repellendus fugit reprehenderit
          unde. Ullam dolorem adipisci, possimus amet esse suscipit voluptatem.
        </div>
      </v-row>
      <v-row class="work-experience">
        <div class="resume-title">Work Experience</div>
      </v-row>
      <v-row p-2>
        <div my-2>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
          voluptate est corporis sapiente illo repellendus, iure eaque hic ad
          consequatur dolorem quisquam omnis nobis asperiores excepturi? Nam
          natus itaque dicta at? Corrupti rerum delectus ad dignissimos est
          cupiditate, quos esse odit, quasi eius fugit? Libero neque vel nam
          quas incidunt?
        </div>
        <div my-2>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias,
          temporibus? Nam dignissimos placeat repellendus fugit reprehenderit
          unde. Ullam dolorem adipisci, possimus amet esse suscipit voluptatem.
        </div>
      </v-row>
      <v-row class="education">
        <div class="resume-title">Education</div>
      </v-row>
      <v-row p-2>
        <div my-2>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
          voluptate est corporis sapiente illo repellendus, iure eaque hic ad
          consequatur dolorem quisquam omnis nobis asperiores excepturi? Nam
          natus itaque dicta at? Corrupti rerum delectus ad dignissimos est
          cupiditate, quos esse odit, quasi eius fugit? Libero neque vel nam
          quas incidunt?
        </div>
        <div my-2>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias,
          temporibus? Nam dignissimos placeat repellendus fugit reprehenderit
          unde. Ullam dolorem adipisci, possimus amet esse suscipit voluptatem.
        </div>
      </v-row>
      <v-row class="stacks">
        <div class="resume-title">Stacks</div>
      </v-row>
      <v-row p-2>
        <div my-2>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
          voluptate est corporis sapiente illo repellendus, iure eaque hic ad
          consequatur dolorem quisquam omnis nobis asperiores excepturi? Nam
          natus itaque dicta at? Corrupti rerum delectus ad dignissimos est
          cupiditate, quos esse odit, quasi eius fugit? Libero neque vel nam
          quas incidunt?
        </div>
        <div my-2>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias,
          temporibus? Nam dignissimos placeat repellendus fugit reprehenderit
          unde. Ullam dolorem adipisci, possimus amet esse suscipit voluptatem.
        </div>
      </v-row>
      <v-row class="projects">
        <div class="resume-title">Projects</div>
      </v-row>
      <v-row p-2>
        <div my-2>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
          voluptate est corporis sapiente illo repellendus, iure eaque hic ad
          consequatur dolorem quisquam omnis nobis asperiores excepturi? Nam
          natus itaque dicta at? Corrupti rerum delectus ad dignissimos est
          cupiditate, quos esse odit, quasi eius fugit? Libero neque vel nam
          quas incidunt?
        </div>
        <div my-2>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias,
          temporibus? Nam dignissimos placeat repellendus fugit reprehenderit
          unde. Ullam dolorem adipisci, possimus amet esse suscipit voluptatem.
        </div>
      </v-row>
      <v-row class="languages">
        <div class="resume-title">Languages</div>
      </v-row>
      <v-row p-2>
        <span pr-2> Cantonese </span>
        <span pr-2> Chinese </span>
        <span pr-2> English </span>
      </v-row>
    </v-col>
  </div>
</template>
<style lang="scss" scoped>
.resume-introduce-body {
  .resume-title {
    padding: 0.25rem 0.75rem ;
    font-size: 1rem;
    border-radius: 0.25rem;
  }
}
</style>
