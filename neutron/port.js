'use strict';

const Base = require('../base.js');
const driver = new Base();
const flag = (driver.noServices.indexOf('port') === -1);

driver.listPorts = function (token, remote, callback, query) {
  if (flag) {
    return driver.getMethod(
      remote + '/v2.0/ports',
      token,
      callback,
      query
    );
  } else {
    callback(null, {
      body: {
        ports: []
      }
    });
  }
};
driver.showPortDetails = function (portId, token, remote, callback, query) {
  return driver.getMethod(
    remote + '/v2.0/ports/' + portId,
    token,
    callback,
    query
  );
};

/*** Promise ***/

driver.listPortsAsync = function (token, remote, query) {
  if (flag) {
    return driver.getMethodAsync(
      remote + '/v2.0/ports',
      token,
      query
    );
  } else {
    return Promise.resolve({
      body: {
        ports: []
      }
    });
  }

};
driver.showPortDetailsAsync = function (portId, token, remote, query) {
  return driver.getMethodAsync(
    remote + '/v2.0/ports/' + portId,
    token,
    query
  );
};

module.exports = driver;
