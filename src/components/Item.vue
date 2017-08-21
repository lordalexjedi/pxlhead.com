<template lang='pug'>
  .item
    .item-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
    .item-text
      router-link.item-name(:to='`/item/${item.id}`') {{ item.title }}
      p.item-description {{ item.description }}
      .item-info
        span.item-views 1001
        span.item-comment 21
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

<style lang='scss'>
@import '~style';
.item {
  flex-basis: 20vw;
  height: 33rem;
  position: relative;
  margin-bottom: 4rem;
  transition: 0.3s ease-in-out;
}
.item:hover .item-text{
  background-color: darken(#6E97C4, 10%);
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.25);
  transition: 0.3s ease-in-out;
}
.item--off {
  .item-text {
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
  }
}
.item-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  height: 70%;
  background-color: $color-pink;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
  z-index: 10;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.25);
  transition: 0.3s ease-in-out;
}
.item-text {
  position: absolute;
  bottom: -3rem;
  left: 5rem;
  width: 80%;
  height: 70%;
  color: $color-white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #6E97C4;
  transition: 0.3s ease-in-out;
}
.item-name {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 9rem;
  width: 80%;
  max-height: 3.6rem;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  color: $color-white;
  text-transform: uppercase;
}
.item-description {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 1rem;
  font-weight: 500;
  width: 80%;
  height: 3rem;
  opacity: 0.8;
}
.item-info {
  flex-basis: 0.5rem;
  width: 80%;
  padding: 1rem 0rem 0rem 0rem;
  display: flex;
  justify-content: space-between;
}
.item-views {
  position: relative;
  margin-left: 2rem;
  font-size: 1.1rem;
  color: $color-white;
  &::before {
    display: block;
    position: absolute;
    content: '';
    width: 1.2rem;
    height: 1.2rem;
    top: calc(50% - 0.3rem / 2);
    left: -2rem;
    background: url('../assets/icons/eye.svg') no-repeat center / 100%;
  }
}
.item-comment {
  position: relative;
  font-size: 1.1rem;
  color: $color-white;
  &::before {
    display: block;
    position: absolute;
    content: '';
    width: 1.2rem;
    height: 1.2rem;
    top: calc(50% - 0.3rem / 2);
    left: -2rem;
    background: url('../assets/icons/comment.svg') no-repeat center / 100%;
  }
}
</style>
