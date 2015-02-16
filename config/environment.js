'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    version : "1.3.0",
    mobileTouch : {
      useGesturesHash : false,
      alwaysTapOnPress : false,
      defaultTapOnPress : true
    }
  };
};
