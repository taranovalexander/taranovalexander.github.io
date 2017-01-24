import { init, animate, moveCamera } from './scene.js';
import MobileDetect from 'mobile-detect';
import Content from './Content.js';
import Vue from 'vue';
import Layout from './ui/Layout.vue';
import './style.css'

let app;
const pages = Content.pages;
const md = new MobileDetect(window.navigator.userAgent);
const navItems = Content.pages.map((page, index) => ({
  pageId: index,
  name: page.name,
  progress: 0,
  inNav: page.inNav,
  active: false
})).filter((el) => el.inNav);

function updateState() {
  // size variables
  const documentHeight = document.body.clientHeight;
  const windowHeight = window.innerHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // page variables
  const pagesNumber = app.pages.length;
  const pages = app.pages;
  const navItems = app.navItems;
  let prevIndex = null;
  app.pages.forEach((page, index) => {
    if (page.active) {
      prevIndex = index;
    }
  })

  for (let i = 0; i < pagesNumber; i++) {
    // set active page
    if (scrollTop >= (i * windowHeight - windowHeight / 2) && scrollTop < (i * windowHeight + windowHeight - windowHeight / 2) && !pages[i].active) {
      pages.forEach((page) => {
        page.active = false;
        page.previous = false;
      });

      if (prevIndex !== null) {
        pages[prevIndex].previous = true;
      }

      pages[i].active = true;
      moveCamera(pages[i].spline_position, 0.05, pages[i].cameraOffset.x, pages[i].cameraOffset.y);
    }
    // set active nav item
    if (pages[i].active) {
      navItems.forEach(el => {
        if (el.pageId === i) {
          el.progress = (scrollTop - windowHeight * i) / windowHeight;
          el.active = true;
        } else if (el.pageId < i) {
          el.progress = 1;
          el.active = false;
        } else {
          el.progress = 0;
          el.active = false;
        }
      });
    }
  }
}

function scrollDetect() {
  updateState();
  requestAnimationFrame(scrollDetect);
}

function initUI() {
  app = new Vue({
    el: '#app',
    data: {
      pages,
      navItems,
    },
    components: {
      Layout,
    },
  });
  scrollDetect();
}

if (window.WebGLRenderingContext) {
  THREE.DefaultLoadingManager.onLoad = function () {
    document.body.className = 'loaded';
    initUI();

    if (md.phone() === null) {
      init(document.querySelector('#scene'));
      animate();
    }
  };
} else {
  document.body.className = 'loaded';
  initUI();
}