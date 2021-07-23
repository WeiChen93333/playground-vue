<template>
  <ul class="cards">
    <li class="card" v-for="(card, index) in pile"
      :class="{ 'big-king': card.cardCode === 17, 'stand-out': card.standOut }"
      :style="{ zIndex: Number(index) }"
      @click="standOut(card)">
      <div class="number">{{ card.cardDesc }}</div>
    </li>
  </ul>
</template>

<script setup lang="ts">

const props = defineProps ({
  pile: {
    type: Object,
    required: true
  }
})
type cardObj = object & {
  cardCode: number
  cardDesc: string
  standOut: boolean
}
const standOut = (card: cardObj): void => {
  card.standOut = !card.standOut
}
</script>

<style lang="less" scoped>
.cards{
  display: flex;
  .card{
    width: 60px;
    height: 100px;
    border: 1px solid #666;
    border-radius: 4px;
    box-shadow: 0 0 12px 2px rgb(0 0 0 / 10%);
    background-color: #fff;
    user-select: none;
    &:not(:first-child){
      margin-left: -36px;
    }
    &.big-king{
      color: red
    }
    &.stand-out{
      margin-top: -20px;
    }
    .number{
      width: 24px;
      padding: 2px;
      word-break: break-all;
    }
  }
}
</style>
