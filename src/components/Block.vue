<template>
  <div class="block" :class="{ alert: isErr }">
    <label>Block:</label>
    <input type="text" :value="id" @change="id" readonly />

    <label>Nonce:</label>
    <input type="text" :value="nonce" @change="nonce" readonly />

    <label>Data:</label>
    <input type="text" v-model="data" />

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
  width: 30vh;
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: rgb(137, 255, 137);
  /* overflow: hidden; */
}

.alert {
  background-color: rgb(246, 162, 162);
}

label {
  float: left;
  margin: 4px;
}

input {
  width: calc(100% - 16px);
  margin: 2px;
  padding: 4px;
  border-radius: 4px;
  border-style: none;
}

.btn {
  margin-top: 21px;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 8px;
  border-style: none;
}
</style>