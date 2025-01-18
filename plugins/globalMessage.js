import Vue from 'vue'
import MessageComponent from '@/components/shared/globalMessage.vue';
Vue.component("MessageComponent",MessageComponent);
Vue.directive('demo', function (el, binding) {
    el.children[0].children[0].innerText = binding.value.message
    console.dir();
    if(binding.value.show)
        el.style.right = 25 +'px';
    else
        el.style.right = -100 +'%';
})