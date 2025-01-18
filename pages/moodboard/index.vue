<template>
    <div></div>
</template>
<script>
export default{
    created(){
        console.log("moodboard")
        this.$router.push({
					path: '/moodboard/dashboard',
				});
    }
}
</script>