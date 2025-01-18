<template>
<div>
    <packageNewComponent :user="user"/>
</div>
</template>
<script>
import { mapActions } from "vuex";
import packageNewComponent from "@/components/package_new";

export default {
  components: {
    packageNewComponent
  },
  props : {
     user: Object
  },
  data() {
      return {

      };
  },
  mounted() {
  },
  computed: {
  },
  methods: {
   
    }
};
</script>

