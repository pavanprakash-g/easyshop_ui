var React = require('react');

var AppDefaults = {
  loaderOpts: function() {
    return {
      lines: 15, // The number of lines to draw
      length: 15, // The length of each line
      width: 2, // The line thickness
      radius: 10, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#CC5200', // #rgb or #rrggbb
      speed: 2, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      zIndex: 2e9 // The z-index (defaults to 2000000000)
    };
  }
};

module.exports = AppDefaults;
