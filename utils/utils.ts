export const removeSpecialCharacters = (phrase: string) => {
  return phrase.replace(/[&#,+()$~%'.":!*?<>{}]/g, "");
};

export const replaceSpacesWithDash = (phrase: string) => {
  return phrase.replace(/\s+/g, "-");
};

export const toUrlFriendly = (phrase: string) => {
  const withoutSpecialChar = removeSpecialCharacters(phrase);
  const withDashes = replaceSpacesWithDash(withoutSpecialChar);
  return withDashes.toLowerCase();
};

export const formatMinutes = (minutes?: number): string => {
  if (!minutes || isNaN(minutes)) {
    return "";
  }

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMinutes} min`;
};

export const formatToUSD = (num?: number): string => {
  if (!num) {
    return "N/A";
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(num);
};

export const formatImgSrc = (urlLink: string, path?: string): string => {
  if (!path) return "/assets/img-na.png";

  return urlLink + path;
};

export const toPercent = (num: number): number => Math.round(num * 10);

// export function toPercent(num: number, decimals: number = 0): string {
//   return (num * 10).toFixed(decimals) + "%";
// }
