<template> 
    <div class="global-message-container" :class="{ 'show-global-message':changeRight.global,'global-error':changeRight.error}">
      <div class="global-message" >
        <p v-html="changeRight.value"></p>
      </div>
    </div>
</template>
<script>
export default {
    props:{
        changeRight :Object
    },
    data(){
        return{
        } 
    },
}
</script>

