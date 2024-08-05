<template>
  <div class="max-w-md w-full mx-auto bg-white rounded-lg shadow-sm px-8 py-8 mt-24 text-center">
    <img class="mx-auto h-12 w-auto mb-6" :src="'/vite.svg'" alt="Vite logo" />
    <h1 class="text-3xl font-bold">
      {{ title }}
    </h1>
    <p class="mt-4">This is a project with Vite + Hono + Vue.</p>

    <pre v-if="message" class="mt-4 bg-gray-100 whitespace-pre-line text-left p-4 rounded-lg">
      {{ message }}
    </pre>

    <p class="mt-4 flex gap-4 justify-center">
      <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded" @click="getData('/api/home')">Home</button>
      <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded" @click="getData('/api/about')">About</button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const title = "The App";
const message = ref("");

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  message.value = data;
}
</script>
