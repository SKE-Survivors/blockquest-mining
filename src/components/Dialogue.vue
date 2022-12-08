<template>
  <div class="chatbox" @click="nextDialogue">
    {{ currentLog }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: -1,
      currentLog: "click to start the lesson!",
      dialogues: [
        // lock 1 block
        "bug: นายดูนี่นะ นี่คือแบบจำลอง blockchain อย่างง่ายล่ะ",
        "นี่คือหมายเลขของบล็อค",
        "นี่คือ nonce จุ๋ๆ เก็บเป็นความลับของเราไว้ก่อนนะ",
        "ส่วนนี่คือ data ที่ที่เราเก็บข้อมูลของเรา",
        "นี่คือ hash ซึ่ง เก็บค่า 3 อย่างที่บอกไปเมื่อตะกี้ไว้ ดูนั่นสิ hash นี้ เริ่มด้วย 0 4 ตัว ด้วยนะ แต่ hash ปกติเค้าไม่เป็นแบบนี้กันหรอกนะ hash นี้ดัน บังเอิ้ญ บังเอิญ เริ่มด้วย 0 4 ตัว",
        // unlock 1 block
        "นายเห็นเลข hash นั่นใช่มั้ย นายอยากรู้มั้ยว่าจะเกิดอะไรขึ้น ถ้านายเพิ่มข้อมูลลงไปใน data น่ะ? เอาเลยสิ เขียนอะไรก็ได้ลงไปตรงนั้น",
        // lock 1 block
        "โอ้ บล็อคของเรากลายสีแดงเลยอ่ะ ดูนั่นสิ เลข hash ของเราเปลี่ยนไปด้วย นั่นก็เป็นเพราะว่า เราไปเปลี่ยนค่าใน data ไงล่ะ hash ซึ่งเก็บ data เลยเปลี่ยนไปด้วย เห็นไหม ไม่ได้เริ่มด้วย 0 4 ตัวแล้ว",
        "งั้นก็ได้เวลาที่จะเอาความลับของเราออกมาใช้ละล่ะ nonce ยังไงล่ะ nonce น่ะนะ มันคือเลขอะไรก็ได้ที่นายจะใส่ลงไป เพื่อที่จะทำให้ hash เริ่มต้นด้วย 0 4ตัวเหมือนเดิม",
        // unlock 1 block
        "เรามาลองเดากันดีกว่า ว่าเราต้องใส่เลขอะไร hash ถึงจะกลับมาเริ่มต้นด้วย 0 4 ตัวเหมือนเดิม เอาเป็น... 19203",
        "เป็นไง? ลองใส่ลงไปดูสิ",
        "ไม่ใช่! งั้นถ้าเป็น 49212 ล่ะ ลองใส่ดู",
        "อู้ว ยังไม่ใช่",
        "เพนฯ: ฮืม แต่เลขมันเยอะมากเลยนะ แล้วอย่างงี้เมื่อไหร่จะเดาถูกล่ะ",
        "bug: ไม่ต้องห่วงไป ในเห็นปุ่มขุดนั่นมั้ย ปุ่มนั่นนะ มันจะช่วย ‘ขุด’ ให้เรา หรือก็คือ มันจะไล่ใส่เลข nonce ให้เราไปเรื่อยๆ จนกว่าจะเจออันที่ใช่ล่ะ นี่ล่ะ ที่เราเรียกว่า mining น่ะ ลองกดดูสิ",
        "โอ้ ดูนั่นสิ เราขุดเจอเลข nonce ที่ทำให้ hash ขึ้นต้นด้วย 0 4 ตัวแล้วล่ะ เจ๋งไปเลย ที่นี้บล็อคเราก็กลับมาทำงานได้เหมือนเดิม เวลานายจะเปลี่ยน data ใหม่ทุกครั้ง นายก็ต้องทำแบบนี้ทุกครั้งล่ะนะ",
        "แต่นนั่น่ะ แค่ block นะ แล้วถ้าเป็น blockchain ล่ะ",
        // unlock blocks
        "มันก็น่าตาเหมือนเดิมน่ะนะ แต่ว่าคราวนี้เรามี prev ด้วย ซึ่งมันคือค่า hash ของบล็อคก่อนหน้าล่ะ ทีนี้มันก็จะจำเพื่อนก่อนหน้ามันได้ แล้วก็ต่อแถวกันแบบขบวนรถไฟเลยล่ะ",
        "ทีนี้จะเกิดไรขึ้นถ้านายแก้ data ตรง บล็อคที่ 2 ล่ะ ลองดูสิ ใส่ไรก็ได้ลงไปเลย",
        // lock blocks [auto เปลี่ยนบล็อคให้ hash ถูกต้องเอง ไม่ได้ให้ user ทำ]
        "ว้าว บล็อคนั้นและบล็อคหลังจากนั้นทั้งหมดกลายเป็นสีแดงหมดเลยล่ะ เอาล่ะ ทีนี้นายก็ต้องมานั่งแก้ hash ของทุกบล็อคที่พัง ให้กลับมามี 0 4 ตัวนำหน้าเหมือนเดิมนะ แต่เรามี ปุ่มขุดช่วยอยู่นะ ชั้นกะกดปุ่มขุดทั้งหมดที่เป็นสีแดงนี่เลยนี่เลย",
        "เนี่ยนะ พอนายไปแก้บล็อคไหน บล็อคนั้นและหลังจากนั้นก็จะพังเลยล่ะ มันเป็นแบบนี้แหละ",
        "เห็นแล้วใช่ม้า นี่แหละคือการขุดล่ะ แต่ว่าในโลกแห่งความเป็นจริงมันไม่ได้ง่ายแบบนั้นอ่ะนะ แทนที่จะเป็นอะไร simple แบบนี้ นายต้องแก้โจทย์เลขย้ากยากแทน",
        "ส่วนแทนที่จะมีปุ่มขุดที่จะมาช่วยนาย มันก็จะเป็นเครื่องขุดแทนยังไงล่ะ",
        "นายก็ลองเล่นเองดูนะ เอาเลย!",
        // unlock blocks
      ],
    };
  },
  methods: {
    nextDialogue() {
      this.currentIndex++;
      switch (this.currentIndex) {
        case this.dialogues.length:
          // todo: emit end lesson, don't know what to do yet
          this.currentIndex--;
          break;
        case 0:
          this.$emit("event", "focusOn", ["block"]);
          break;
        case 1:
          this.$emit("event", "focusOn", ["id"]);
          break;
        case 2:
          this.$emit("event", "focusOn", ["nonce"]);
          break;
        case 3:
          this.$emit("event", "focusOn", ["data"]);
          break;
        case 4:
          this.$emit("event", "focusOn", ["hash"]);
          break;
        case 5:
          this.$emit("event", "focusOn", ["data", "hash"]);
          break;
        case 6:
          this.$emit("event", "focusOn", ["hash"]);
          break;
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
          this.$emit("event", "focusOn", ["nonce"]);
          break;
        case 13:
          this.$emit("event", "focusOn", ["mine"]);
          break;
        case 16:
          this.$emit("event", "displayChain", true);
          break;
        case 17:
          this.$emit("event", "focusOn", ["data"], 2);
          break;
        case 18:
          this.$emit("event", "focusOn", ["mine"]);
          break;
        default:
          this.$emit("event", "clear");
      }
      this.currentLog = this.dialogues[this.currentIndex];
    },
  },
};
</script>

<style scoped>
.chatbox {
  background-color: #ababab;
  border-radius: 0.5rem;
  margin: 2%;
  padding: 2%;
  font-size: 1.5vw;
  cursor: pointer;
}
</style>