export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => (state.data = categories),
    ADD_CATEGORY: (state, category) => state.data.unshift(category),
    REMOVE_CATEGORY: (state, categoryToRemove) => {
      state.data = state.data.map(categories => {
        if (category.id === categoryToRemove.id) {
          categories = category.skills.filter(skill => skill.id !== skillToRemove.id)
        }
        return category;
      })
    },
    EDIT_CATEGORY: (state, categoryToEdit) => {
      state.data.edit(category)
    },
    ADD_SKILL: (state, newSkill) => {
      state.data = state.data.map(category => {
        if (category.id === newSkill.category) {
          category.skills.push(newSkill);
        }
        return category;
      })
    },
    REMOVE_SKILL: (state, skillToRemove) => {
      state.data = state.data.map(category => {
        if (category.id === skillToRemove.category) {
          category.skills = category.skills.filter(skill => skill.id !== skillToRemove.id)
        }
        return category;
      })
    },
    EDIT_SKILL: (state, skillToEdit) => {
      const editSkillInCategory = category => {
        category.skills = category.skills.map(skill => {
          return skill.id === skillToEdit.id ? skillToEdit : skill
        });
      }

      const findCategory = category => {
        if (category.id === skillToEdit.category) {
          editSkillInCategory(category);
        }

        return category;
      }
      state.data = state.data.map(findCategory);
    }
  },
  actions: {
    async create({ commit }, title) {
      try {
        const { data } = await this.$axios.post('/categories', { title })
        commit("ADD_CATEGORY", data);
      } catch (error) {
        throw new Error("произошла ошибка");
      }
    },
    async fetch({ commit }) {
      try {
        const {data: {user}} = await this.$axios.get('/user')
        const { data } = await this.$axios.get(`/categories/${user.id}`)
        commit("SET_CATEGORIES", data)
      } catch (error) {
        console.log(error);
      }
    },
    async remove({commit}, categoryToRemove) {
      try {
        const { data } = await this.$axios.delete(`/categories/${categoryToRemove.id}`);
        commit("REMOVE_CATEGORY", categoryToRemove, { root: true })
      } catch (error) {
        console.log(error);
        throw new Error("Ошибка")
      }
    },
    async edit({commit}, categoryToEdit) {
      try {
        const { data } = await this.$axios.post(`/categories/${categoryToEdit.id}`, categoryToEdit);
        commit("EDIT_CATEGORY", data.category, { root: true })
      } catch (error) {
        console.log(error);
        throw new Error("Ошибка")
      }
    }
  }
}