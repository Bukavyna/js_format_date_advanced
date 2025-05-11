'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromStep = fromFormat[fromFormat.length - 1];
  const toStep = toFormat[toFormat.length - 1];

  const fromKeys = fromFormat.slice(0, -1);
  const toKeys = toFormat.slice(0, -1);

  const parts = date.split(fromStep);
  const map = {};

  for (let i = 0; i < fromKeys.length; i++) {
    map[fromKeys[i]] = parts[i];
  }

  if (map['YYYY'] && !map['YY']) {
    map['YY'] = map['YYYY'].slice(-2);
  }
  if (map['YY'] && !map['YYYY']) {
    const yy = parseInt(map['YY'], 10);
    map['YYYY'] = yy < 30 ? '20' + map['YY'] : '19' + map['YY'];
  }

  const result = toKeys.map((key) => map[key]);
  return result.join(toStep);
}

module.exports = formatDate;
