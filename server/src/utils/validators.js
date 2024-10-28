exports.validateDateRange = (from, to) => {
  const diff = new Date(to) - new Date(from);
  const maxRange = 30 * 24 * 60 * 60 * 1000;
  return diff <= maxRange;
};
