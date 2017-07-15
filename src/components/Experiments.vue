<template lang='pug'>
  .experiments
    .toolbox
      .filter
        a.filter-item #CSS
        a.filter-item #JS
        a.filter-item #WebVR
      .search-box
        input.search(type='search' name='search' v-model='search')
    .gallery
      .card(v-for='n in 3')
        .card-img(:style='{ backgroundImage: `url(${url})` }')
        .card-info
          h3.card-name Awesome experiment
          p.card-description Most awesome experiment description ever
</template>

<script>
export default {
  name: 'experiments',
  data() {
    return {
      search: '',
      url: 'https://www.dl.dropboxusercontent.com/s/rn26nu25g77swmm/nice_smile-wallpaper-1920x1080.jpg?dl=0',
    };
  },
};
</script>

<style lang='scss'>
@import '~global';

.experiments {
  background-color: $color-main;
  padding: 6rem 12rem;
}
.toolbox {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 6rem;
}
.filter {
  display: flex;
}
.filter-item {
  width: 12rem;
  height: 5rem;
  border-radius: 40px;
  background-color: $color-blue;
  margin-right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  color: $color-white;
  cursor: pointer;
}

// TODO: fix searcher
.search-box {
  position: relative;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5rem;
    height: 5rem;
    background: url('../assets/icons/search.svg') no-repeat center / 60%;
  }
}
.search {
  appearance: none;
  width: 5rem;
  height: 5rem;
  border-radius: 40px;
  border-style: none;
  outline-style: none;
  font-size: 1.6rem;
  transition: all .5s;
  &:focus {
    width: 30rem;
    padding: 0 3rem;
  }
}
.search--active {
  width: 30rem;
  padding: 0 3rem;
}
.gallery {
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.card {
  width: 30rem;
  height: 36rem;
}
.card-img {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
}
</style>
