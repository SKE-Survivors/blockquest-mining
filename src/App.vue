<template>
  <div class="container">
    <div class="side bottom left">
      <img src="./assets/images/Nagisa_Sticker.png" alt="" />
    </div>

    <div class="side bottom right">
      <img src="./assets/images/Charon_Sticker.png" alt="" />
    </div>

    <div class="blocks">
      <Block
        :id="block.id"
        :nonce="block.nonce"
        :prev="block.prev"
        @updateHash="handleHashChanged"
        v-for="block in blocks"
        :key="block.id"
      />
    </div>
  </div>
</template>

<script>
import Block from "./components/Block.vue";

export default {
  name: "App",
  components: {
    Block,
  },
  data() {
    return {
      blocks: [
        { id: 1, nonce: "12345", prev: "000000000000000000000000000000000000" },
        { id: 2, nonce: "99876", prev: "" },
        { id: 3, nonce: "40675", prev: "" },
        { id: 4, nonce: "62137", prev: "" },
        { id: 5, nonce: "28699", prev: "" },
      ],
    };
  },
  methods: {
    handleHashChanged(blockID, newHash) {
      if (blockID != 5) {
        this.blocks[blockID].prev = newHash;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.blocks {
  background-color: #ababab;
  margin: auto;
  width: 50%;
  height: 100%;

  overflow: auto;
  white-space: nowrap;
}

.side {
  width: 25%;
}

.side img {
  width: 75%;
}
</style>
