'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newFromFormat = fromFormat[fromFormat.length - 1];
  const newToFormat = toFormat[toFormat.length - 1];

  const dateParts = date.split(newFromFormat);
  const formatLabels = fromFormat.slice(0, -1);
  const result = {};

  for (let i = 0; i < formatLabels.length; i++) {
    result[formatLabels[i]] = dateParts[i];
  }

  const formatTo = toFormat.slice(0, -1);

  const newDateParts = formatTo.map((toKey) => {
    if (toKey === 'YY' && result['YYYY']) {
      return result['YYYY'].slice(-2);
    }

    if (toKey === 'YYYY' && result['YY']) {
      const yy = parseInt(result['YY'], 10);

      return yy < 30 ? '20' + result['YY'] : '19' + result['YY'];
    }

    return result[toKey];
  });

  return newDateParts.join(newToFormat);
}

module.exports = formatDate;
