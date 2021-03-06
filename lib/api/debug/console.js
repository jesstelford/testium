// Generated by CoffeeScript 2.0.0-beta7
void function () {
  var _, convertLogType, filterLogs, logMap;
  _ = require('underscore');
  logMap = {
    SEVERE: 'error',
    WARNING: 'warn',
    INFO: 'log',
    DEBUG: 'debug'
  };
  filterLogs = function (type) {
    return function (log) {
      return log.type !== type;
    };
  };
  convertLogType = function (log) {
    if (null != log.level) {
      log.type = logMap[log.level];
      delete log.level;
    }
    return log;
  };
  module.exports = {
    parseLogs: function (logs) {
      return _.map(logs, convertLogType);
    },
    filterLogs: function (logs, type) {
      if (!(null != type))
        return { matched: logs };
      return _.groupBy(logs, function (log) {
        if (log.type === type) {
          return 'matched';
        } else {
          return 'rest';
        }
      });
    }
  };
}.call(this);
