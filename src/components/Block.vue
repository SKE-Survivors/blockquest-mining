<template>
  <div class="block" :class="{ alert: isErr, highlight: isFocused('block') }">
    <label>Block:</label>
    <input
      :class="{ highlight: isFocused('id') }"
      type="text"
      :value="id"
      @change="id"
      readonly
    />

    <label>Nonce:</label>
    <input
      :class="{ highlight: isFocused('nonce') }"
      type="text"
      v-model="nonce"
    />

    <label>Data:</label>
    <textarea
      :class="{ highlight: isFocused('data') }"
      v-model="data"
    ></textarea>

    <label>Prev:</label>
    <input
      :class="{ highlight: isFocused('prev') }"
      type="text"
      :value="prev"
      @change="prev"
      readonly
    />

    <label>Hash:</label>
    <input
      :class="{ highlight: isFocused('hash') }"
      type="text"
      v-model="hash"
      readonly
    />

    <button class="btn" :class="{ highlight: isFocused('mine') }" @click="mine">
      Mine
    </button>
  </div>
</template>

<script>
export default {
  props: ["id", "prev", "focusOn"],
  data() {
    return {
      nonce: "",
      data: "",
      hash: "",
      minedData: null,
    };
  },
  computed: {
    secret() {
      return this.id + this.nonce + this.prev + this.data;
    },
    isErr() {
      if (this.minedData && this.minedData.secret === this.secret) {
        this.hash = this.minedData.hash;
      }
      return !this.hash.startsWith("0000", 0);
    },
  },
  methods: {
    updateHash() {
      this.hash = this.$CryptoJS.AES.encrypt(this.secret, "").toString();
    },
    mine() {
      // there is a fucking hardcode here!
      if (this.isErr) {
        this.hash = "0000" + this.hash;
        this.nonce = Math.round(Math.random() * 1000000).toString();
      }
      this.minedData = {
        secret: this.secret,
        hash: this.hash,
      };
    },
    isFocused(field) {
      return this.focusOn.includes(field);
    },
  },
  watch: {
    secret() {
      this.updateHash();
    },
  },
  mounted() {
    setTimeout(() => {
      this.updateHash();
      this.mine();
    }, this.id * 10);
  },
  updated() {
    this.$emit("updateHash", this.id, this.hash);
  },
};
</script>

<style scoped>
.block {
  height: calc(100% - 4vw);
  width: 70%;
  margin: 1vw;
  padding: 1vw;
  border-radius: 1vw;
  background-color: rgb(137, 255, 137);

  display: inline-block;
  white-space: normal;

  font-size: 1.5vw;
}

.alert {
  background-color: rgb(246, 162, 162);
}

label {
  float: left;
  margin: 0.5vw;
}

input,
textarea,
.btn {
  width: calc(100% - 2vw);
  padding: 0.3vw;
  border-radius: 0.25vw;
  border-style: none;
  font-size: 1.5vw;
}

textarea {
  height: 25%;
}

.highlight {
  box-shadow: 0 0 2px crimson, 0 0 4px rgb(255, 0, 0), 0 0 8px rgb(255, 35, 35);
  /* animation: led-light 2s;
  animation-iteration-count: infinite; */
}

@keyframes led-light {
  0%,
  100% {
    box-shadow: 0 0 2px crimson, 0 0 4px rgb(255, 0, 0), 0 0 8px rgb(45, 31, 31);
  }
  50% {
    box-shadow: none;
  }
}

.btn {
  width: 20%;
  padding: 0.5vw;
  margin-top: 8%;
  border-radius: 0.5vw;
}

.btn:hover {
  cursor: pointer;
  background-color: #ababab;
}
</style>