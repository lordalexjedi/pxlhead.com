<template lang='pug'>
  .item
    .item-img(:style='{ backgroundImage: `url(${item.imageURL})` }')
    .item-text
      router-link.item-name(:to='`/${item.type}/${item.id}`') {{ item.title }}
      p.item-description {{ item.description }}
      .item-info
        span.item-views {{ item.views }}
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
  height: 33rem;
  position: relative;
  margin: 0 2% 7% 2%;
  transition: 0.3s ease-in-out;
  @include screen-style(fullHd) {
    flex-basis: 20%;
  };
  @include screen-style(iMac) {
    height: 38rem;
    flex-basis: 29%;
    .item-name {
      margin-top: 9rem;
    }
  };
  @include screen-style(ipadPro) {
    height: 38rem;
    flex-basis: 45%;
    margin-bottom: 10%;
    .item-name {
      margin-top: 9rem;
    }
  };
  @include screen-style(ipadAir) {
    height: 30rem;
    flex-basis: 45%;
    margin-bottom: 10%;
    .item-name {
      margin-top: 7rem;
    }
  };
  @include screen-style(iphone7) {
    flex-basis: 100%;
    margin-bottom: 18%;
    .item-name {
      margin-top: 7rem;
    }
  };
  @include screen-style(iphoneSE) {
    height: 30rem;
    flex-basis: 100%;
    margin-bottom: 22%;
    .item-name {
      margin-top: 7rem;
    }
  };
}
.item:hover .item-text {
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
  @extend %img;
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  height: 70%;
  cursor: pointer;
  z-index: 10;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.25);
  transition: 0.3s ease-in-out;
  @include screen-style(iphone7) {
    width: 90%;
  }
  @include screen-style(iphoneSE) {
    width: 90%;
  }
}
.item-text {
  position: absolute;
  bottom: -3rem;
  left: 10%;
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
  @include screen-style(iphone7) {
    width: 90%;
  }
  @include screen-style(iphoneSE) {
    width: 90%;
  }
}
.item-name {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 7rem;
  width: 80%;
  max-height: 1.8rem * 2 + 1rem / 2;
  overflow: hidden;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  color: $color-white;
  text-transform: uppercase;
}
.item-description {
  overflow: hidden;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 1rem;
  font-weight: 500;
  width: 80%;
  max-height: 1.2rem * 2 + 1rem / 2;
  opacity: 0.8;
}
.item-info {
  position: absolute;
  height: 0.5rem;
  width: 80%;
  bottom: 2rem;
  left: 10%;
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
