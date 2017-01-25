<template>
  <div class="PageContent" v-bind:class="classObject">
    <div class="PageContent__container">
      <div class="PageContent__container-inner">
        <div class="PageContent__title">
          {{page.data.title}}
        </div>
        <div class="PageContent__content">
          {{page.data.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageContent',
    props: ['page'],
    computed: {
      classObject: function () {
        return {
          'PageContent--active': this.page.active,
          'PageContent--disabled': this.page.previous && !this.page.active,
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "variables";

  .PageContent {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    &__container {
      width: 35%;
      max-width: 550px;
      background: $content_overlay_color;
      position: absolute;
      left: -100%;
      top: 45%;
      transform: translate(0, -50%);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;

      @media (max-width: 768px) {
        max-width: none;
        width: 80%;
      }
    }

    &__container-inner {
      width: 100%;
      color: $content_text_color;
      font-weight: 700;
      text-align: left;
      position: relative;
    }

    &__title {
      font-size: 2.4rem;
      margin-bottom: 20px;
      letter-spacing: 0.1em;
      font-family: 'akzidenz-grotesk', sans-serif;
      text-transform: uppercase;
      white-space: nowrap;
      position: relative;
      left: -300%;

      @media (max-width: 768px) {
        white-space: normal;
      }
    }

    &__content {
      font-size: 1rem;
      line-height: 1.5;
      position: relative;
      left: -300%;
    }
  }

  .PageContent--active {
    z-index: 10;

    .PageContent__container {
      left: 10%;
    }

    .PageContent__container .PageContent__title {
      animation: contentAnimationIn 1s ease 0.5s forwards;
    }

    .PageContent__container .PageContent__content {
      animation: contentAnimationIn 1s ease 0.75s forwards;
    }
  }

  .PageContent--disabled {
    .PageContent__container {
      left: 10%;
      animation: contentAnimationContainerOut 0s ease 1s forwards;
    }

    .PageContent__container .PageContent__title {
      left: 0;
      opacity: 1;
      animation: contentAnimationOut 1s ease 0.75s forwards;
    }

    .PageContent__container .PageContent__content {
      left: 0;
      opacity: 1;
      animation: contentAnimationOut 1s ease 0.5s forwards;
    }
  }

  @keyframes contentAnimationContainerOut {
    from {
      left: 10%;
    }
    to {
      left: -100%;
    }
  }

  @keyframes contentAnimationIn {
    from {
      left: -300%;
      opacity: 0;
    }
    to {
      left: 0;
      opacity: 1;
    }
  }

  @keyframes contentAnimationOut {
    from {
      left: 0;
      opacity: 1;
    }
    to {
      left: -300%;
      opacity: 0;
    }
  }

</style>