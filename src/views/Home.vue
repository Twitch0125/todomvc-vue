<script setup lang="ts">
import { useStore } from "../store";
import TodoList from "../components/TodoList.vue";

const store = useStore();
</script>

<template>
  <TodoList v-if="store.items.length" :items="store.items" />
</template>
