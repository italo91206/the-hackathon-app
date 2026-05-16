<template>
  <div class="mx-auto max-w-3xl">
    <div class="mb-8">
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight">
        About
      </h2>
    </div>

    <div class="prose prose-indigo max-w-none">
      <p>
        This is the <strong>The Hackathon App</strong> boilerplate, built with:
      </p>
      <ul>
        <li>Nuxt 3 with Composition API</li>
        <li>Vue Router (built-in via Nuxt)</li>
        <li>Tailwind CSS + Tailwind UI free components</li>
        <li>Knex.js for database migrations and query building</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'About',
})
</script>
