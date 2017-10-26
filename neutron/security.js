'use strict';

const Base = require('../base.js');
const driver = new Base();
const flag = (driver.noServices.indexOf('security_group') === -1);

driver.listSecurity = function (projectId, token, remote, callback, query) {
  if (flag) {
    return driver.getMethod(
      remote + '/v2.0/security-groups',
      token,
      callback,
      query
    );
  } else {
    callback(null, {
      body: {
        'security_groups': []
      }
    });
  }

};
driver.showSecurityDetails = function (projectId, securityId, token, remote, callback, query) {
  return driver.getMethod(
    remote + '/v2.0/security-groups/' + securityId,
    token,
    callback,
    query
  );
};
driver.createSecurityGroupRule = function (theBody, token, remote, callback) {
  return driver.postMethod(
    remote + '/v2.0/security-group-rules',
    token,
    callback,
    theBody
  );
};

/*** Promise ***/


driver.listSecurityAsync = function (projectId, token, remote, query) {
  if (flag) {
    return driver.getMethodAsync(
      remote + '/v2.0/security-groups',
      token,
      query
    );
  } else {
    return Promise.resolve({
      body: {
        'security_groups': []
      }
    });
  }

};
driver.showSecurityDetailsAsync = function (projectId, securityId, token, remote, query) {
  return driver.getMethodAsync(
    remote + '/v2.0/security-groups/' + securityId,
    token,
    query
  );
};
driver.createSecurityGroupRuleAsync = function (theBody, token, remote) {
  return driver.postMethodAsync(
    remote + '/v2.0/security-group-rules',
    token,
    theBody
  );
};

module.exports = driver;
