<script lang="ts" setup>
import { computed, ref, unref } from "vue";
import { useStore } from "./store";
import { Item } from "./types";

const store = useStore();
const newItem = ref<Item>({ id: crypto.randomUUID(), name: "", isDone: false });

const addItem = () => {
  if (!newItem.value.name?.trim()) {
    return;
  }
  store.items.push(unref(newItem));
  newItem.value = { id: crypto.randomUUID(), name: "", isDone: false };
};

const allDone = computed({
  get() {
    return store.completedItems.length === store.items.length;
  },
  set(value: boolean) {
    store.items.forEach((item) => (item.isDone = value));
  },
});

const clearCompleted = () => {
  store.items = store.items.filter((item) => !item.isDone);
};
</script>

<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        @keyup.enter="addItem"
        v-model="newItem.name"
        class="new-todo"
        placeholder="What needs to be done?"
        autofocus
      />
    </header>
    <section v-if="store.items.length > 0" class="main">
      <input
        v-model="allDone"
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
      />
      <label for="toggle-all">Mark all as complete</label>
      <router-view />
    </section>
    <footer v-if="store.items.length" class="footer">
      <span class="todo-count"
        ><strong>{{ store.items.length }}</strong> item left</span
      >
      <ul class="filters">
        <li>
          <router-link exact-active-class="selected" to="/">All</router-link>
        </li>
        <li>
          <router-link exact-active-class="selected" to="/active">Active</router-link>
        </li>
        <li>
          <router-link exact-active-class="selected" to="/completed">Completed</router-link>
        </li>
      </ul>
      <button
        v-if="store.completedItems.length > 0"
        @click="clearCompleted"
        class="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>
      Created by <a href="https://github.com/Twitch0125">Kaleb Ercanbrack</a>
    </p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>
