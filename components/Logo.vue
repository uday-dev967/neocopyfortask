<template>
  <div class="VueToNuxtLogo">
    <div class="Triangle Triangle--two" />
    <div class="Triangle Triangle--one" />
    <div class="Triangle Triangle--three" />
    <div class="Triangle Triangle--four" />
  </div>
</template>

<style>
.VueToNuxtLogo {
  display: inline-block;
  animation: turn 2s linear forwards 1s;
  transform: rotateX(180deg);
  position: relative;
  overflow: hidden;
  height: 11.25rem;
  width: 15.3125rem;
}

.Triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}

.Triangle--one {
  border-left: 6.5625rem solid transparent;
  border-right: 6.5625rem solid transparent;
  border-bottom: 11.25rem solid #41b883;
}

.Triangle--two {
  top: 1.875rem;
  left: 2.1875rem;
  animation: goright 0.5s linear forwards 3.5s;
  border-left: 87.0.3125rem solid transparent;
  border-right: 87.0.3125rem solid transparent;
  border-bottom: 9.375rem solid #3b8070;
}

.Triangle--three {
  top: 3.75rem;
  left: 2.1875rem;
  animation: goright 0.5s linear forwards 3.5s;
  border-left: 4.375rem solid transparent;
  border-right: 4.375rem solid transparent;
  border-bottom: 7.5rem solid #35495e;
}

.Triangle--four {
  top: 7.5rem;
  left: 4.375rem;
  animation: godown 0.5s linear forwards 3s;
  border-left: 2.1875rem solid transparent;
  border-right: 2.1875rem solid transparent;
  border-bottom: 3.75rem solid #fff;
}

@keyframes turn {
  100% {
    transform: rotateX(0deg);
  }
}

@keyframes godown {
  100% {
    top: 11.25rem;
  }
}

@keyframes goright {
  100% {
    left: 4.375rem;
  }
}
</style>
