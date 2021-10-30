import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUpload);
Vue.component("vue-fontawesome", FontAwesomeIcon);

axios.defaults.baseURL =
    process.env.VUE_APP_BASE_URL || "http://localhost:3000";

Object.defineProperty(Vue.prototype, "$axios", { value: axios });

import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy, {
    defaultIconComponent: "vue-fontawesome",
    defaultIconPack: "fas",
});

new Vue({
    el: "#app",
    render: (h) => h(App),
});
