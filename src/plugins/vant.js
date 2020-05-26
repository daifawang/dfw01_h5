import Vue from "vue";
import { Toast, Dialog, Loading, Skeleton } from "vant";

Toast.setDefaultOptions({ forbidClick: true });
Toast.setDefaultOptions("loading", {
  duration: 0,
  loadingType: "spinner"
});

Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Skeleton);
