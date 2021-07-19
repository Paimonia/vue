<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="editmode === false">
      <div class="text">{{value}}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="editmode = true"></icon>
        <icon symbol="trash" grayscale @click="$emit('remove', title)"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <app-input
          v-model="title"
          placeholder="Название новой группы"
          :value="value"
          :errorMessage="validation.firstError('title')"
          @input="$emit('input', $event)"
          @keydown.native.enter="onApprove"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
        ></app-input>
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click="onApprove"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross"  @click="editmode = false"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import icon from "../icon";
  import appInput from "../input";
  import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
export default {
  mixins: [ValidatorMixin],
  validators: {
    "title": (value) => {
      return Validator.value(value).required("Не может быть пустым");
    },
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    errorText: {
      type: String,
      default: "",
    },
    editModeByDefault: Boolean,
    blocked: Boolean,
  },
  data() {
    return {
      editmode: this.editModeByDefault,
      title: this.value,
    };
  },
  methods: {
    async onApprove() {
      if (await this.$validate() === false) return;
      if (this.value.trim() === "") return false;
      if (this.title.trim() === this.value.trim()) {
        this.editmode = false;
      } else {
        this.$emit("approve", this.value);
      }
    },
  },
  components: {
    icon,
    appInput
  },
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>