<template>
  <div class="min-h-full">
    <nav class="bg-indigo-600">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <NuxtLink to="/" class="text-white font-bold text-xl">
                {{ appName }}
              </NuxtLink>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  class="rounded-md px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-500 hover:text-white"
                  active-class="bg-indigo-700 text-white"
                >
                  {{ item.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const appName = 'The Hackathon App'

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
]
</script>
