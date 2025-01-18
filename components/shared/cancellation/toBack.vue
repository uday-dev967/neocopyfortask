<template>
  <div class="to-back" @click="goBack()">
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M-2.53121e-05 4.99998C-2.53286e-05 5.18879 0.0731358 5.36752 0.199029 5.48623L4.84189 9.86122C5.07224 10.0781 5.40951 10.0362 5.59531 9.76774C5.78121 9.49918 5.74528 9.10562 5.51519 8.88874L1.38826 4.99998L5.51521 1.11125C5.74531 0.894372 5.78123 0.500791 5.59533 0.232249C5.48948 0.0793543 5.33453 -3.32002e-08 5.17819 -4.68678e-08C5.06005 -5.71962e-08 4.94103 0.0453758 4.84189 0.13875L0.199029 4.51373C0.0731358 4.63244 -2.52956e-05 4.81117 -2.53121e-05 4.99998Z" fill="#292929"/>
    </svg>
    <p>Back</p>
  </div>
</template>

<script>
export default {
  methods: {
    goBack(){
      console.log(window.history)
      window.history.back();
    }
  },
}
</script>

<style lang="scss">
.to-back {
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: grid;
  grid-template-columns: repeat(2,max-content);
  column-gap: 0.5rem;
  align-items: center;
  cursor: pointer;
  z-index: 10000;
  p {
    margin: 0;
    font-family: Montserrat !important;
    font-style: normal;
    font-weight: 500 !important;
    font-size: 1.1rem !important;
    line-height: 1.0625rem !important;
    color: #201F20;
  }
}
</style>
