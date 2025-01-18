<template>
  <div class="observer"></div>
</template>

<script>
export default {
    mounted() {
        this.observer = new IntersectionObserver(([entry]) => {
            if (entry && entry.isIntersecting) {
                this.$emit("scrolledToEnd");
            }
        });
        this.observer.observe(this.$el);
    },
    data() {
        return {
            observer: null,
            page: 0,
        };
    },
};
</script>

<style>
.observer {
    height: 1px;
}
</style>