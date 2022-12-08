<template>
  <div class="block" :class="{ alert: isErr }">
    <label>Block:</label>
    <input type="text" :value="id" @change="id" readonly />

    <label>Nonce:</label>
    <input type="text" :value="nonce" @change="nonce" readonly />

    <label>Data:</label>
    <textarea v-model="data"></textarea>

    <label>Prev:</label>
    <input type="text" :value="prev" @change="prev" readonly />

    <label>Hash:</label>
    <input type="text" v-model="hash" readonly />

    <button class="btn" @click="mine">Mine</button>
  </div>
</template>

<script>
export default {
  props: ["id", "nonce", "prev"],
  data() {
    return {
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
      if (this.isErr) {
        this.hash = "0000" + this.hash;
      }
      this.minedData = {
        secret: this.secret,
        hash: this.hash,
      };
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
      console.log(this.hash);
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