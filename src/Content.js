const Content = {
  pages: [
    {
      name: 'Intro',
      component: 'PageIntro',
      inNav: true,
      active: false,
      previous: false,
      spline_position: 0,
      cameraOffset: {
        x: 0,
        y: 0,
      },
      data: {
        title: 'Siberian code',
        sub_title: 'by Alexander Taranov',
      }
    },
    {
      name: 'About',
      component: 'PageContent',
      inNav: true,
      active: false,
      previous: false,
      spline_position: 0.15,
      cameraOffset: {
        x: 0,
        y: 0,
      },
      data: {
        title: 'About me',
        content: `Hi, My name is Alexander, and I'm a Front End Engineer from Siberia.
         My goal is to provide my clients with outstanding quality of work and also build long lasting professional
         relationships. I can assure you that whatever is your idea it will be turned into
         awesome looking app.`,
      }
    },
    {
      name: 'Experience',
      component: 'PageContent',
      active: false,
      previous: false,
      inNav: true,
      spline_position: 0.32,
      cameraOffset: {
        x: -1.1,
        y: 0,
      },
      data: {
        title: 'My experience',
        content: `I have 3 years of professional experience working with clients from around the world, and developing
        mid to large-scale applications which operate with big data. I worked under applications for
        different platforms: for mobile  (Ionic), desktop (Electron), and web applications.`,
      }
    },
    {
      name: 'Skills',
      component: 'PageContent',
      active: false,
      previous: false,
      inNav: true,
      spline_position: 0.708,
      cameraOffset: {
        x: -1.1,
        y: 0,
      },
      data: {
        title: 'My skills',
        content: `I'm Expert at work with ECMAScript 6, and I love to use progressive technologies.
Have wide and strong experience of work with JavaScript frameworks such as React.js, Angular.js, Vue.js.`,
      }
    },
    {
      name: 'Contacts',
      component: 'PageContacts',
      active: false,
      previous: false,
      inNav: true,
      spline_position: 1,
      cameraOffset: {
        x: -1.1,
        y: 0,
      },
      data: {
        title: 'Contact me',
        successTitle: 'Done',
        successMsg: 'Alex will answer you asap!',
        email: 'sander.taranov@gmail.com',
      }
    },
  ]
};

export default Content;