<template>
  <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            scope="col"
            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 first:pl-4 first:sm:pl-6"
          >
            {{ col.label }}
          </th>
          <th v-if="$slots.actions" scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-if="!rows.length">
          <td
            :colspan="columns.length + ($slots.actions ? 1 : 0)"
            class="px-3 py-8 text-center text-sm text-gray-500"
          >
            {{ emptyText }}
          </td>
        </tr>
        <tr v-for="(row, i) in rows" :key="i" class="hover:bg-gray-50">
          <td
            v-for="col in columns"
            :key="col.key"
            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 first:pl-4 first:font-medium first:text-gray-900 first:sm:pl-6"
          >
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <slot name="actions" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
export interface TableColumn {
  key: string
  label: string
}

withDefaults(defineProps<{
  columns: TableColumn[]
  rows: Record<string, unknown>[]
  emptyText?: string
}>(), {
  emptyText: 'No records found.',
})
</script>
