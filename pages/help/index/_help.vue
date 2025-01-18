<template>
    <section>
        <contactComponent class="" v-if="$route.params.help=='contact'"/>
        <tutorialComponent class="" v-if="$route.params.help=='tutorials'"/>
    </section>
</template>
<script>

import contactComponent from "@/components/contact"
import tutorialComponent from "@/components/tutorial"
export default {
    middleware: ["initAuth", "authReq"],
    components: {
        contactComponent,
        tutorialComponent,
    },
}
</script>
<style lang="scss" scoped>

</style>
