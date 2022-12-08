<template>
  <div class="container">
    <div class="side bottom left">
      <img src="./assets/images/Nagisa_Sticker.png" alt="" />
    </div>

    <div class="side bottom right">
      <img src="./assets/images/Charon_Sticker.png" alt="" />
    </div>

    <div class="side right">
      <Dialogue @event="handleEvent" />
    </div>

    <div v-if="!displayChain" class="blocks">
      <Block
        :id="blocks[0].id"
        :prev="blocks[0].prev"
        :focusOn="blocks[0].focusFields"
        @updateHash="handleHashChanged"
        :key="blocks[0].id"
      />
    </div>
    <div v-else class="blocks">
      <Block
        :id="block.id"
        :prev="block.prev"
        :focusOn="block.focusFields"
        @updateHash="handleHashChanged"
        v-for="block in blocks"
        :key="block.id"
      />
    </div>
  </div>
</template>

<script>
import Block from "./components/Block.vue";
import Dialogue from "./components/Dialogue.vue";

export default {
  name: "App",
  components: {
    Block,
    Dialogue,
  },
  data() {
    return {
      displayChain: false,
      blocks: [
        {
          id: 1,
          prev: "000000000000000000000000000000000000",
          focusFields: [],
        },
        { id: 2, prev: "", focusFields: [] },
        { id: 3, prev: "", focusFields: [] },
        { id: 4, prev: "", focusFields: [] },
        { id: 5, prev: "", focusFields: [] },
      ],
    };
  },
  methods: {
    clear() {
      this.blocks.forEach((block) => {
        block.focusFields = [];
      });
    },
    handleHashChanged(blockID, newHash) {
      if (blockID != 5) {
        this.blocks[blockID].prev = newHash;
      }
    },
    handleEvent(event, params, id) {
      switch (event) {
        case "focusOn":
          if (id) {
            this.blocks[id - 1].focusFields = params;
          } else {
            this.blocks.forEach((block) => {
              block.focusFields = params;
            });
          }
          break;
        case "displayChain":
          this.displayChain = params;
          break;
        default:
          this.clear();
          break;
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
