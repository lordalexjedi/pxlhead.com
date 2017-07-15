<template lang='pug'>
  .experiments
    .toolbox
      .filter
        a.filter-item #CSS
        a.filter-item #JS
        a.filter-item #WebVR
      .search-box(@click='searchActive = true')
        input.search(type='search' name='search' v-model='search'
                    :class='{ "search--active": searchActive }'
                    @blur='searchActive = false')
    .gallery
      .card(v-for='n in 6' @click='experiment = n')
        .card-img(:style='{ backgroundImage: `url(${url})` }')
        .card-info
          h3.card-name Awesome name
          p.card-description The most awesome experiment description ever.

    .experiment
</template>

<script>
export default {
  name: 'experiments',
  data() {
    return {
      search: '',
      searchActive: false,

      url: 'https://www.dl.dropboxusercontent.com/s/f52afi28wevcs9z/smile.jpg?dl=0',
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
}
.search--active {
  width: 30rem;
  padding: 0 4rem;
}
.gallery {
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.card {
  width: 30rem;
  height: 34rem;
  position: relative;
  margin-bottom: 8rem;
  cursor: pointer;
  &:not(:nth-of-type(3n)) {
    margin-right: 8rem;
  }
}
.card-img {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 80%;
}
.card-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 2rem);
  height: calc(30% - 2rem);
  padding: 1rem;
  background-color: $color-blue;
  color: $color-white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.card-name {
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  text-transform: uppercase;
}
.card-description {
  font-size: 1.6rem;
  margin-top: 1rem;
}
</style>
