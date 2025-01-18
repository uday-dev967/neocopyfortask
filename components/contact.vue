<template>
    <section>
        <div id="zsfeedbackwidgetdiv">loading...</div>
        
    </section>
</template>
<script>
export default {
    head () {
        return {
        script: [
            { src: 'https://desk.zoho.com/portal/api/feedbackwidget/208621000000426037?orgId=651053781&displayType=embeded' }
        ],
        }
    },
    mounted(){
        // setTimeout(() => {
        //     amplitude.getInstance().logEvent("contact");
        // }, 1000);
    }
}
</script>
<style lang="scss" scoped>
#zsfeedbackwidgetdiv{
    width: max-content;
    
}
#advwebForm{
    background: none;
}
.previewPopFlex{
    background: none;
    border: none;
}

</style>
