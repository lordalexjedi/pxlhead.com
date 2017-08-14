<template lang='pug'>
  .experiments
    .header
      .toolbox
        .filter
          a.filter-item.filter-css #CSS
          a.filter-item.filter-js #JS
          a.filter-item.filter-webvr #WebVR
        .search-box(@click='searchActive = true')
          input.search(type='search' name='search' v-model='search'
                      :class='{ "search--active": searchActive }'
                      @blur='searchActive = false')
    .gallery
      .card(v-for='n in 12' @click='experiment = n')
        .card-img(:style='{ backgroundImage: `url(${url})` }')
        .card-info
          h3.card-name AWESOME NAME
          p.card-description The most awesome experiment description ever.
    .nav-scroll
      .scroll-btn
    a.btn-back
    .experiment-modal.experiment-modal--on
      .modal-body
        .modal-content
          .modal-text
            h2.modal-title AWESOME NAME
            p.modal-description The most awesome experiment description ever. The most awesome experiment description ever. The most awesome experiment description ever. The most awesome experiment description ever.
        .modal-img(:style='{ backgroundImage: `url(${url})` }')
        a.experiment-link
        .modal-social
          a.social-link.link-facebook
          a.social-link.link-twitter
          a.social-link.link-dribbble
      a.nav-arrow.arrow--prev
      a.nav-arrow.arrow--next
      a.nav-esc
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

<style lang='scss' scoped>
@import '~global';

.experiments {
  background-color: $color-white;
}
.header {
  background-color: $color-main;
  padding: 5rem 12rem;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
}
.toolbox {
  display: flex;
  justify-content: flex-end;
}
.filter {
  display: flex;
}
.filter-item {
  width: 12rem;
  height: 5rem;
  border-radius: 40px;
  margin-right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  color: $color-white;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.filter-item--on {
  opacity: 0.2;
  transition: 0.3s ease-in-out;
}
.filter-css {
  background-color: $color-green;
  &:hover {
    background-color: darken($color-green, 10%);
  }
}
.filter-js {
  background-color: $color-pink;
  &:hover {
    background-color: darken($color-pink, 10%);
  }
}
.filter-webvr {
  background-color: $color-blue;
  &:hover {
    background-color: darken($color-blue, 10%);
  }
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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 6rem 12rem;
}
.card {
  flex-basis: 20vw;
  height: 40rem;
  position: relative;
  margin-bottom: 4rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.card:hover .card-info{
  background-color: #6E97C4;
  transition: 0.3s ease-in-out;
}
.card--off {
  .card-info {
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
  }
}
.card-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 75%;
  height: 60%;
  background-color: $color-pink;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 10;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.25);
  transition: 0.3s ease-in-out;
}
.card-info {
  position: absolute;
  bottom: 2rem;
  left: 5rem;
  width: 75%;
  height: 60%;
  color: $color-white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: $color-blue;
  transition: 0.3s ease-in-out;
}
.card-name {
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  margin-top: 10rem;
  text-transform: uppercase;
}
.card-description {
  font-size: 1.6rem;
  margin-top: 1rem;
  opacity: 0.8;
}
.nav-scroll {
  position: absolute;
  display: block;
  right: 7rem;
  top: calc(50% - 20rem / 2);
  height: 35rem;
  width: 1.3rem;
  border-radius: 50px;
  background-color: #c4c4c4;
  box-shadow: inset 0px 4px 20px rgba(0, 0, 0, 0.25);
  @include screen-style(iphoneSE) { display: none;};
  @include screen-style(iphone7) { display: none;};
  @include screen-style(ipadAir) { display: none;};
  @include screen-style(ipadPro) { display: none;};
}
.scroll-btn {
  position: absolute;
  left: calc(50% - 4rem / 2);
  top: 10%;
  width: 4rem;
  height: 4rem;
  border-radius: 50px;
  background-color: $color-blue;
  cursor: pointer;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  &::after {
    position: absolute;
    display: block;
    content: '';
    left: calc(50% - 2rem / 2);
    top: calc(50% - 2rem / 2);
    width: 2rem;
    height: 2rem;
    border-radius: 50px;
    background-color: $color-white;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  }
}
.btn-back {
  position: absolute;
  display: none;
  bottom: 2rem;
  right: 5rem;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: $color-pink;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  @include screen-style(iphoneSE) { display: block;};
  @include screen-style(iphone7) { display: block;};
  @include screen-style(ipadAir) { display: block;};
  @include screen-style(ipadPro) { display: block;};
  &:after {
    position: absolute;
    display: block;
    content: '';
    width: 50%;
    height: 50%;
    top: 25%;
    left: 25%;
    transform: rotate(-90deg);
    background: url('../assets/icons/Arrow.svg') no-repeat center / 50%;
  }
}

// modal

.experiment-modal {
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $color-main;
  overflow: hidden;
  z-index: 1000;
}

.experiment-modal--on {
  display: block;
}
.modal-body {
  position: absolute;
  top: 15%;
  left: 10%;
  width: 73%;
  height: 70%;
}
.modal-img {
  position: absolute;
  top: 7%;
  right: -7%;
  width: 55%;
  height: 80%;
  background: $color-pink;
  background-position: center;
  background-size: cover;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.25);
}
.modal-content {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  top: 17%;
  left: 2%;
  width: 90%;
  height: 80%;
  background: $color-blue;
}
.modal-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 84%;
  height: 100%;
  padding: 5%;
}
.modal-title {
  flex-basis: 50%;
  font-size: 80px;
  max-width: 55rem;
  font-family: 'Montserrat', sans-serif;
  color: $color-white;
}
.modal-description {
  flex-basis: 40%;
  font-size: 25px;
  margin-left: 7rem;
  max-width: 50rem;
  color: darken($color-grey, 20%);
}
.experiment-link {
  position: absolute;
  display: block;
  top: 90%;
  left: 30%;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background: $color-pink;
  transition: 0.3s ease-in-out;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.25);
  &:hover {
    background: darken($color-pink, 10%);
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 5rem;
    height: 5rem;
    top: calc(50% - 5rem / 2);
    left: calc(50% - 5rem / 2);
    background: url('../assets/icons/Arrow.svg') no-repeat center / 50%;
  }
}
.modal-social {
  position: absolute;
  display: flex;
  justify-content: space-around;
  width: 25rem;
  height: 6rem;
  top: 2rem;
  left: 93rem;
}
.social-link {
  position: relative;
  flex-basis: 6rem;
  height: 6rem;
  top: calc(50% - 6rem / 2);
  left: calc(50% - 6rem / 2);
  border-radius: 50%;
  background: $color-pink;
  transition: 0.3s ease-in-out;
  &:hover {
    background: darken($color-pink, 10%);
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    top: calc(50% - 2rem / 2);
    left: calc(50% - 2rem / 2);
    width: 2rem;
    height: 2rem;
  }
}
.link-twitter {
  &::after {
    background: url(../assets/icons/Twitter.svg) no-repeat;
    background-size: 100%;
  }
}
.link-facebook {
  &::after {
    background: url(../assets/icons/Facebook.svg) no-repeat;
    background-size: 100%;
  }
}
.link-dribbble {
  &::after {
    background: url(../assets/icons/Dribbble.svg) no-repeat;
    background-size: 100%;
  }
}
.nav-arrow {
  position: absolute;
  display: block;
  width: 5rem;
  height: 15rem;
  background: $color-grey;
  opacity: 0.5;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    opacity: 0.7;
    transition: 0.3s ease-in-out;
  }
}
.arrow--prev {
  top: calc(50% - 15rem / 2);
  left: 5rem;
}
.arrow--next {
  top: calc(50% - 15rem / 2);
  right: 5rem;
}
.nav-esc {
  position: absolute;
  display: block;
  top: 4rem;
  right: 4rem;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: $color-grey;
  cursor: pointer;
  opacity: 0.5;
  transition: 0.3s ease-in-out;
  &:hover {
    opacity: 0.7;
    transition: 0.3s ease-in-out;
  }
  &::before {
    position: absolute;
    content: '';
    display: block;
    top: 25%;
    left: calc(50% - 5px / 2);
    width: 5px;
    height: 50%;
    transform: rotate(45deg);
    background: $color-white;
  }
  &::after {
    position: absolute;
    content: '';
    display: block;
    top: 25%;
    left: calc(50% - 5px / 2);
    width: 5px;
    height: 50%;
    transform: rotate(-45deg);
    background: $color-white;
  }
}
</style>
