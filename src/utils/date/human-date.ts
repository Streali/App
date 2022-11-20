export const HumanDate = (date: string) => {
  const toDate = new Date(date);
  const delta = Math.round((+new Date() - toDate.getTime()) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  let fuzzy;

  if (delta < 30) {
    fuzzy = 'now';
  } else if (delta < minute) {
    fuzzy = delta + ' s';
  } else if (delta < 2 * minute) {
    fuzzy = '1m';
  } else if (delta < hour) {
    fuzzy = Math.floor(delta / minute) + 'm';
  } else if (Math.floor(delta / hour) == 1) {
    fuzzy = '1h';
  } else if (delta < day) {
    fuzzy = Math.floor(delta / hour) + 'h';
  } else if (delta < day * 2) {
    fuzzy = '1d';
  } else if (delta < week) {
    fuzzy = Math.floor(delta / day) + 'd';
  } else if (Math.floor(delta / week) == 1) {
    fuzzy = '1w';
  } else if (delta < month) {
    fuzzy = Math.floor(delta / week) + 'w';
  } else if (Math.floor(delta / month) == 1) {
    fuzzy = '1mo';
  } else if (delta < year) {
    fuzzy = Math.floor(delta / month) + 'mo';
  } else if (Math.floor(delta / year) == 1) {
    fuzzy = '1y';
  } else {
    fuzzy = Math.floor(delta / year) + 'y';
  }
  return fuzzy;
};
