<template>
    <div class="subs" v-cloak>
        <navigator ref="navigate"></navigator>

        <router-view></router-view>

    </div>
</template>

<script>
import navigator from "@/components/common/navigator";
import bus from "./bus.js";

export default {
  name: "subs",
  components: {
    navigator
  },
  data() {
    return {};
  },
  created() {
    bus.$on("refreshN", () => {
      //监听传值--机构名称
      this.$refs.navigate.queryvediolist();
    });
  }
};
</script>
<style>
[v-cloak] {
  display: none;
}
</style>
