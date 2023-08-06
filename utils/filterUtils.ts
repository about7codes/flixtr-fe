export interface IConutry {
  name: string;
  code: string;
  langCode: string;
}

export const countries: IConutry[] = [
  {
    name: "America",
    code: "US",
    langCode: "en",
  },
  {
    name: "Argentina",
    code: "AR",
    langCode: "es",
  },
  {
    name: "Austria",
    code: "AT",
    langCode: "de",
  },
  {
    name: "Australia",
    code: "AU",
    langCode: "en",
  },
  {
    name: "Azerbaijan",
    code: "AZ",
    langCode: "az",
  },
  {
    name: "Bangladesh",
    code: "BD",
    langCode: "bn",
  },
  {
    name: "Belgium",
    code: "BE",
    langCode: "nl",
  },
  {
    name: "Bolivia",
    code: "BO",
    langCode: "es",
  },
  {
    name: "Brazil",
    code: "BR",
    langCode: "pt",
  },
  {
    name: "Bhutan",
    code: "BT",
    langCode: "dz",
  },
  {
    name: "Canada",
    code: "CA",
    langCode: "en",
  },
  {
    name: "China",
    code: "CN",
    langCode: "zh",
  },
  {
    name: "Cuba",
    code: "CU",
    langCode: "es",
  },
  {
    name: "Czech Republic",
    code: "CZ",
    langCode: "cs",
  },
  {
    name: "Dubai",
    code: "AE",
    langCode: "ar",
  },
  {
    name: "Denmark",
    code: "DK",
    langCode: "da",
  },
  {
    name: "Estonia",
    code: "EE",
    langCode: "et",
  },
  {
    name: "Egypt",
    code: "EG",
    langCode: "ar",
  },

  {
    name: "Finland",
    code: "FI",
    langCode: "fi",
  },
  {
    name: "France",
    code: "FR",
    langCode: "fr",
  },
  {
    name: "Germany",
    code: "DE",
    langCode: "de",
  },
  {
    name: "Hong Kong",
    code: "HK",
    langCode: "zh",
  },
  {
    name: "Hungary",
    code: "HU",
    langCode: "hu",
  },
  {
    name: "Indonesia",
    code: "ID",
    langCode: "id",
  },
  {
    name: "Ireland",
    code: "IE",
    langCode: "ga",
  },
  {
    name: "Israel",
    code: "IL",
    langCode: "he",
  },
  {
    name: "India",
    code: "IN",
    langCode: "hi",
  },

  {
    name: "Iraq",
    code: "IQ",
    langCode: "ar",
  },
  {
    name: "Iran",
    code: "IR",
    langCode: "fa",
  },

  {
    name: "Italy",
    code: "IT",
    langCode: "it",
  },

  {
    name: "Japan",
    code: "JP",
    langCode: "ja",
  },
  {
    name: "Lebanon",
    code: "LB",
    langCode: "ar",
  },
  {
    name: "Luxembourg",
    code: "LU",
    langCode: "lb",
  },
  {
    name: "Morocco",
    code: "MA",
    langCode: "ar",
  },
  {
    name: "Mexico",
    code: "MX",
    langCode: "es",
  },
  {
    name: "Malaysia",
    code: "MY",
    langCode: "ms",
  },
  {
    name: "Netherlands",
    code: "NL",
    langCode: "nl",
  },
  {
    name: "Norway",
    code: "NO",
    langCode: "no",
  },
  {
    name: "Nepal",
    code: "NP",
    langCode: "ne",
  },
  {
    name: "New Zealand",
    code: "NZ",
    langCode: "en",
  },
  {
    name: "Philippines",
    code: "PH",
    langCode: "tl",
  },
  {
    name: "Pakistan",
    code: "PK",
    langCode: "ur",
  },
  {
    name: "Poland",
    code: "PL",
    langCode: "pl",
  },
  {
    name: "Portugal",
    code: "PT",
    langCode: "pt",
  },
  {
    name: "Romania",
    code: "RO",
    langCode: "ro",
  },
  {
    name: "Russia",
    code: "RU",
    langCode: "ru",
  },
  {
    name: "South Korea",
    code: "KR",
    langCode: "ko",
  },
  {
    name: "Spain",
    code: "ES",
    langCode: "es",
  },
  {
    name: "Switzerland",
    code: "CH",
    langCode: "de",
  },
  {
    name: "Sri Lanka",
    code: "LK",
    langCode: "si",
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    langCode: "ar",
  },
  {
    name: "Sweden",
    code: "SE",
    langCode: "sv",
  },
  {
    name: "South Africa",
    code: "ZA",
    langCode: "en",
  },
  {
    name: "Thailand",
    code: "TH",
    langCode: "th",
  },
  {
    name: "Turkey",
    code: "TR",
    langCode: "tr",
  },
  {
    name: "Taiwan",
    code: "TW",
    langCode: "zh",
  },
  {
    name: "United Kingdom",
    code: "GB",
    langCode: "en",
  },
  {
    name: "Ukraine",
    code: "UA",
    langCode: "uk",
  },
  {
    name: "Uganda",
    code: "UG",
    langCode: "en",
  },
  {
    name: "Uruguay",
    code: "UY",
    langCode: "es",
  },
  {
    name: "Uzbekistan",
    code: "UZ",
    langCode: "uz",
  },
  {
    name: "Vietnam",
    code: "VN",
    langCode: "vi",
  },
];

export const getYears = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 1950;
  const yearsArray = [];

  for (let year = currentYear; year >= startYear; year--) {
    yearsArray.push(year);
  }

  return yearsArray;
};
