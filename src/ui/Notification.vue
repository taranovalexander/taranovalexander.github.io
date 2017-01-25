<template>
  <div class=Notification>
    <h3 class=Notification__title>Ooops! Mobile version is not available now!</h3>
    <p class=Notification__body>Please visit my personal site from desktop browser.</br> It's cool! Trust me :)</p>
  </div>
</template>

<script>
  export default {
    name: 'Notification',
  }

</script>

<style lang="scss" scoped>
  @import "variables";

  .Notification {
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    padding: 15px;
    transform: translate(-50%, -50%);
    color: #ffffff;
    border: 2px solid #ffffff;
    opacity: 0;
    animation: notificationAnimationIn 1s ease 1s forwards;

    &__title {
      font-family: 'akzidenz-grotesk', sans-serif;
      font-size: 18px;
      line-height: 1.5em;
    }

    &__body {
      font-family: "Open Sans", sans-serif;
      font-size: 16px;
      line-height: 1.5em;
    }
  }

  @keyframes notificationAnimationIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>