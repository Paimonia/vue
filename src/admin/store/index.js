import Vue from "vue";
import Vuex from "vuex";
import 'es6-promise/auto';
Vue.use(Vuex);

import categories from "./modules/categories";
import skills from "./modules/skills";
import tooltips from "./modules/tooltips";

export default new Vuex.Store({
  modules: { categories, skills, tooltips }
});
