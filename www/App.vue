<template>
  <div class="max-w-md w-full mx-auto bg-white rounded-lg shadow-sm px-8 py-8 mt-24 text-center">
    <h1 class="text-3xl font-bold">
      {{ message }}
    </h1>
    <p class="mt-4">This is a project with Vite + Hono + Vue.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const message = ref("Hello World");
</script>
