export const normalizeArabicNumbers = (str) => {
  if (!str) return '';
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const persianNumerals = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  let result = String(str);
  arabicNumerals.forEach((num, index) => {
    result = result.split(num).join(index);
  });
  persianNumerals.forEach((num, index) => {
    result = result.split(num).join(index);
  });
  return result.trim();
};
