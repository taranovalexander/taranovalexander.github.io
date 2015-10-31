(function($) {
  var frontBootstrap = {},
      links = {};

  frontBootstrap.events = eventEmitter();
  frontBootstrap.services = {
    noop: function () {}
  };

  frontBootstrap.run = function(fn) {
    fn(frontBootstrap.services, frontBootstrap.events);
  };

  frontBootstrap.link = function(name, selector, handler) {
    links[name] = {
      name: name,
      selector: selector,
      handler: handler
    };
  };

  frontBootstrap.compile = function(element) {
    $.each(links, function(name, link) {
      $(link.selector, element).each(function() {
        attachLink($(this), link);
      });
    });
  };

  window.frontBootstrap = frontBootstrap;

  function attachLink($element, link) {
    var attached = $element.data('front-bootstrap-links') || {};

    if (!attached[link.name]) {
      attached[link.name] = new link.handler($element, frontBootstrap.services, frontBootstrap.events);
    }

    $element.data('front-bootstrap-links', attached);
  }

  function detachLink($element, link) {
    var attached = $element.data('front-bootstrap-links') || {};

    if (attached[link.name]) {
      $element.trigger('destroy');
      delete attached[link.name];
    }

    $element.data('front-bootstrap-links', attached);
  }

  /**
   * Special event emitter for the links functions.
   */
  function eventEmitter() {
    var element = $(this);

    return {
      emit: function(evt, data) {
        element.trigger(evt, data);
      },
      once: function(evt, handler) {
        element.one(evt, handler);
      },
      on: function(evt, handler) {
        element.on(evt, handler);
      },
      off: function(evt, handler) {
        element.off(evt, handler);
      }
    }
  }

  // Global controllers.

  // Avoid `console` errors in browsers that lack a console.
  frontBootstrap.run(function(services) {
    var method;

    var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
      method = methods[length];

      // Only stub undefined methods.
      if (!console[method]) {
        console[method] = services.noop;
      }
    }
  });

  // Initialize images preload.
  frontBootstrap.run(function(services) {
    services.imagesPreLoad = function(images) {
      for (var id in images) {
        $('<img/>')[0].src = images[id];
      }
    };
  });
}) (jQuery);