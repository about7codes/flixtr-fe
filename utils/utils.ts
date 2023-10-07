export const disableAds = process.env.NEXT_PUBLIC_DISABLE_ADS == "true";

export const removeSpecialCharacters = (phrase: string) => {
  return phrase.replace(/[&#,+()$~%'."!:*?<>{}\/\\]/g, "");
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
    return "N/A min";
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

// export const blurData =
//   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNce8f0KQAGoQKlpcmuHQAAAABJRU5ErkJggg==";

export const convertToNumber = (
  arg: string | string[] | undefined
): number | undefined => {
  if (arg === undefined) {
    return undefined;
  }
  if (Array.isArray(arg)) {
    return undefined;
  }

  if (typeof arg === "string") {
    const parsedNumber = parseFloat(arg);
    if (isNaN(parsedNumber)) {
      return undefined;
    }
    return parsedNumber;
  }

  return undefined;
};
