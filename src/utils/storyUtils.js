export const formatRating = (rate) => {
  return Number.isInteger(rate ?? 0) ? rate ?? 0 : (rate ?? 0).toFixed(1);
};

export const shouldShowHotBadge = (totalView, threshold) => {
  return totalView >= threshold;
};

export const getDisplayCategories = (categories, maxCount) => {
  return categories?.slice(0, maxCount) || [];
}; 