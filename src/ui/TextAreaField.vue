<template>
  <div class="TextAreaField" v-bind:class="classObject">
    <textarea class="TextAreaField__input" v-on:keydown="adjustHeight" :name="name" v-model="value" :required="required" />
    <label class="TextAreaField__label">{{label}}</label>
  </div>
</template>

<script>
  export default {
    name: 'TextAreaField',
    props: ['name', 'label', 'required'],
    data() {
      return {
        value: '',
      }
    },
    computed: {
      classObject: function () {
        return {
          'TextAreaField--dirty': this.value !== '',
        }
      }
    },
    methods: {
      adjustHeight(event) {
        const element = event.target;
        element.style.height = '1px';
        element.style.height = `${1+element.scrollHeight}px`;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "variables";

  .TextAreaField {
    width: 100%;
    position: relative;
    font-size: 1.15rem;

    &__label {
      position: absolute;
      color: $input_text_color;
      left: 15px;
      top: 26px;
      transform: translate(0, -50%);
      font-size: 1em;
      transition: all 0.2s ease-in-out;
    }

    &__form-field {
      max-width: 100%;
    }

    &__input {
      width: 100%;
      max-width: 100%;
      max-height: 140px;
      background: transparent;
      border: 1px solid $input_border_color;
      border-top: none;
      border-left: none;
      border-right: none;
      background: $input_background_color;
      color: $input_text_color;
      outline: none;
      padding: 30px 15px 10px;
      font-size: 1em;
      resize: none;
      line-height: 1.5;
      overflow-x: hidden;
      height: 72px;

      &:focus + .TextAreaField__label {
        top: 15px;
        font-size: 0.8em;
      }
    }
  }

  .TextAreaField--dirty {
    .TextAreaField__label {
      top: 15px;
      font-size: 0.8em;
    }
  }
</style>