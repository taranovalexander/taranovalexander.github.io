<template>
  <div class="TextField" v-bind:class="classObject">
    <input class="TextField__input" :name="name" type="text" v-model="value" v-if="type === 'text'" :required="required">
    <input class="TextField__input" :name="name" type="email" v-model="value" v-if="type === 'email'" :required="required">
    <input class="TextField__input" :name="name" type="number" v-model="value" v-if="type === 'number'" :required="required">
    <label class="TextField__label">{{label}}</label>
  </div>
</template>

<script>
  export default {
    name: 'TextField',
    props: ['name', 'label', 'type', 'required'],
    data() {
      return {
        value: '',
      }
    },
    computed: {
      classObject: function () {
        return {
          'TextField--dirty': this.value !== '',
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "variables";

  .TextField {
    width: 100%;
    position: relative;
    font-size: 1.15rem;

    &__label {
      position: absolute;
      color: $input_text_color;
      left: 15px;
      top: 22px;
      font-size: 1em;
      transition: all 0.2s ease-in-out;
    }

    &__input {
      width: 100%;
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

      &:focus + .TextField__label {
        top: 10px;
        font-size: 0.8em;
      }
    }
  }

  .TextField--dirty {
    .TextField__label {
      top: 10px;
      font-size: 0.8em;
    }
  }
</style>