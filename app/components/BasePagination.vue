<template>
  <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
    <div class="-mt-px flex w-0 flex-1">
      <button
        :disabled="currentPage <= 1"
        class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
        @click="$emit('update:currentPage', currentPage - 1)"
      >
        <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        Previous
      </button>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <button
        v-for="page in visiblePages"
        :key="page"
        class="inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium"
        :class="page === currentPage
          ? 'border-indigo-500 text-indigo-600'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'"
        @click="$emit('update:currentPage', page)"
      >
        {{ page }}
      </button>
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <button
        :disabled="currentPage >= totalPages"
        class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
        @click="$emit('update:currentPage', currentPage + 1)"
      >
        Next
        <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  currentPage: number
  totalPages: number
  windowSize?: number
}>()

defineEmits<{
  'update:currentPage': [page: number]
}>()

const visiblePages = computed(() => {
  const window = props.windowSize ?? 5
  const half = Math.floor(window / 2)
  let start = Math.max(1, props.currentPage - half)
  const end = Math.min(props.totalPages, start + window - 1)
  start = Math.max(1, end - window + 1)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
</script>
