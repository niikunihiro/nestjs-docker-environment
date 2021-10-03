<template>
  <h2>TODOを作成する</h2>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="title">タイトル</label>
      <input type="text" name="title" id="title" v-model="data.title" />
    </div>
    <div>
      <label for="content">説明</label>
      <input type="text" name="content" id="content" v-model="data.content" />
    </div>
    <div>
      <label for="status">ステータス</label>
      <select name="status" id="status" v-model="data.status">
        <option value="waiting">waiting</option>
        <option value="working">working</option>
        <option value="completed">completed</option>
        <option value="pending">pending</option>
      </select>
    </div>
    <button @click="onSubmit">作成する</button>
  </form>
</template>

<script lang="ts">
import { todoKey } from "@/store/todo";
import { Params } from "@/store/todo/types";
import { defineComponent, inject, reactive } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const todoStore = inject(todoKey);
    if (!todoStore) {
      throw new Error("todoStore is not provided");
    }
    const router = useRouter();
    const data = reactive<Params>({
      title: "",
      content: "",
      status: "waiting",
    });

    const onSubmit = () => {
      const { title, content, status } = data;
      todoStore.addTodo({
        title,
        content,
        status,
      });

      router.push("/");
    };

    return {
      data,
      onSubmit,
    };
  },
});
</script>
