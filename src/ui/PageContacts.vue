<template>
  <div class="PageContacts"  v-bind:class="classObject">
    <form class="PageContacts__form" v-on:submit.prevent="onSubmit">
      <div class="PageContacts__title">{{title}}</div>
      <div class="PageContacts__message" v-if="successMsg">
        <div class="PageContacts__row">
          <div class="PageContacts__form-field">
            {{successMsg}}
          </div>
        </div>
      </div>
      <div class="PageContacts__fields_wrap" v-if="!successMsg">
        <div class="PageContacts__row">
          <div class="PageContacts__form-field PageContacts__form-field-half">
            <TextField name="name" label="Name" type="text" required="true" />
          </div>
          <div class="PageContacts__form-field PageContacts__form-field-half">
            <TextField name="email" label="Email" type="email" required="true" />
          </div>
        </div>
        <div class="PageContacts__row">
          <div class="PageContacts__form-field">
            <TextAreaField label="Message" name="message" required="true" />
          </div>
        </div>
        <div class="PageContacts__row" style="margin-top: 30px">
          <div class="PageContacts__form-field">
            <ButtonComponent type="submit" block="false" mode="primary" text="Send" />
          </div>
      </div>
      </div>
    </form>
    <div class="PageContacts__footer">
      Or send me e-mail: <a :href="emailHref">{{page.data.email}}</a>
    </div>
  </div>
</template>

<script>
  import TextField from './TextField.vue';
  import TextAreaField from './TextAreaField.vue';
  import ButtonComponent from './ButtonComponent.vue';
  import Request from '../request';

  export default {
    name: 'PageContacts',
    props: ['page'],
    data() {
      return {
        title: this.page.data.title,
        successMsg: null,
      }
    },
    computed: {
      emailHref: function() {
        return `mailto:${this.page.data.email}`
      },
      classObject: function () {
        return {
          'PageContacts--active': this.page.active,
          'PageContacts--disabled': this.page.previous,
        }
      }
    },
    components: {
      TextField,
      TextAreaField,
      ButtonComponent
    },
    methods: {
      onSubmit(event) {
        const form = event.target;
        const data = {
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
          _replyto: form.email.value,
          _subject: 'New message from promo site',
        }

        Request('POST', 'https://formspree.io/sander.taranov@gmail.com', {}, data)
          .then(success => {
            form.name.value = '';
            form.email.value = '';
            form.message.value = '';
            this.title = this.page.data.successTitle;
            this.successMsg = this.page.data.successMsg;
          }, error => {
            console.error(error.error)
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "variables";

  .PageContacts {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: -100%;
    opacity: 0;
    background: rgba(0, 0, 0, 0);

    &__footer {
      position: absolute;
      width: 80%;
      bottom: 0;
      left: 10%;
      height: 50px;
      color: $button_primary_text_color;
      font-size: 1.2rem;

      a {
        color: $button_primary_text_color;
        cursor: pointer;
      }
    }

    &__title {
      font-size: 2.8rem;
      text-transform: uppercase;
      font-family: 'akzidenz-grotesk', sans-serif;
      color: $form_text_color;
      text-align: left;
      margin-bottom: 15px;
      padding: 0 15px;
      width: 100%;
    }

    &__message {
      font-size: 1.5rem;
      color: $form_text_color;
      margin-top: 30px;
    }

    &__form {
      border-top: none;
      width: 80%;
      max-width: 600px;
      position: absolute;
      left: 10%;
      top: calc(50% - 50px);
      transform: translate(0, -50%);
    }

    &__row {
      margin-bottom: 15px;
      display: flex;
      align-content: space-between;
      &:last-child {
        margin-bottom: 0;
      }
    }

    &__form-field {
      position: relative;
      padding: 0 15px;
      flex: 1;
    }

    &__form-field-label {
      position: absolute;
    }

    &__form-field-input {
      width: 100%;
    }
  }

  .PageContacts--active {
    animation: contactsAnimationIn 1s ease 0.5s forwards;
  }

  .PageContacts--disabled {
    animation: contactsAnimationOut 1s ease 0s forwards;
  }

  @keyframes contactsAnimationIn {
    from {
      bottom: -100%;
      opacity: 0;
    }
    to {
      bottom: 0;
      opacity: 1;
    }
  }

  @keyframes contactsAnimationOut {
    from {
      bottom: 0;
      opacity: 1;
    }
    to {
      bottom: -100%;
      opacity: 0;
    }
  }

</style>