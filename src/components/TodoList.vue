<script lang="ts" setup>
import { Item } from "../types";
import TodoItem from "./TodoItem.vue";

const props = defineProps<{ items: Item[] }>();

const handleDestroy = (item: Item) => {
  const index = props.items.findIndex((curItem) => curItem.id === item.id);
  props.items.splice(index, 1);
};

const updateItem = (index: number, item: Item) => {
  props.items[index] = item;
};

</script>
<template>
  <ul class="todo-list">
    <TodoItem
      v-for="(item, index) in items"
      :key="item.id"
      :model-value="item"
      @update:model-value="(value) => updateItem(index, value)"
      @destroy="handleDestroy"
    />
  </ul>
</template>
