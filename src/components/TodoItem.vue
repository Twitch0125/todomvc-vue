<script lang="ts" setup>
import { computed, ref, unref } from "vue";
import { Item } from "../types";

const props = defineProps<{ modelValue: Item }>();
const emit = defineEmits<{
  (event: "destroy", item: Item): void;
  (event: "update:modelValue", item: Item): void;
}>();

const isEditing = ref(false);
const itemClass = computed(
  () => props.modelValue.isDone === true && "completed"
);
const editingClass = computed(() => isEditing.value === true && "editing");

const itemModel = computed({
  get(): Item {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const tempItem = ref<Item>({ ...unref(itemModel.value) });
const setupEditing = () => {
  tempItem.value = { ...unref(itemModel.value) };
  isEditing.value = true;
};
const finishEditing = () => {
  isEditing.value = false;
  itemModel.value = { ...unref(tempItem) };
};
</script>

<template>
  <li @dblclick="setupEditing" :class="[itemClass, editingClass]">
    <div class="view">
      <input
        v-model="itemModel.isDone"
        class="toggle"
        type="checkbox"
        checked
      />
      <label>{{ itemModel.name }}</label>
      <button @click="emit('destroy', itemModel)" class="destroy"></button>
    </div>
    <input @keyup.enter="finishEditing" class="edit" v-model="tempItem.name" />
  </li>
</template>
