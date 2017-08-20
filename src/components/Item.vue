<template lang='pug'>
  .item
    .item-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
    .item-text
      router-link(:to='`/item/${item.id}`') {{ item.title }}
      p {{ item.description }}
</template>

<script>
import { timeAgo } from '../util/filters'

export default {
  name: 'news-item',
  props: ['item'],
  serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
    return `${id}::${__lastUpdated}::${timeAgo(time)}`
  }
}
</script>

<style lang='scss'></style>
