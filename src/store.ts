import { defineStore } from "pinia";
import { Item } from "./types";

export type RootState = {
  items: Item[];
};

export const useStore = defineStore("main", {
  state() {
    return {
      items: [],
    } as RootState;
  },
  getters: {
    completedItems: ({ items }) => items.filter((item) => item.isDone),
    activeItems: ({ items }) => items.filter((item) => !item.isDone),
  },
});
