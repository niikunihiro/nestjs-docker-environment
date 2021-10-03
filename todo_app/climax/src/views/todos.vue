<template>
  <h2>TODO一覧</h2>
  <ul>
    <todo-item
      v-for="todo in todoStore.state.todos"
      :key="todo.id"
      :todo="todo"
      @click-title="clickTitle"
      @click-delete="clickDelete"
    >
    </todo-item>
  </ul>
  <router-link to="/new">新規作成</router-link>
</template>

<script lang="ts">
import { todoKey } from "@/store/todo";
import { defineComponent, inject } from "vue";
import { useRouter } from "vue-router";
import TodoItem from "../components/TodoItem.vue";

export default defineComponent({
  components: { TodoItem },
  setup() {
    const todoStore = inject(todoKey);
    if (!todoStore) {
      throw new Error("todoStore is not provided");
    }

    const router = useRouter();

    const clickDelete = (id: number) => {
      todoStore.deleteTodo(id);
    };

    const clickTitle = (id: number) => {
      router.push(`/edit/${id}`);
    };

    return {
      todoStore,
      clickDelete,
      clickTitle,
    };
  },
});
</script>

