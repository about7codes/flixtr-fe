import { SearchData } from "../types/apiResponses";

export const getSearchQuery = async (
  pageNum: number,
  searchValue?: string | string[]
): Promise<SearchData> => {
  console.log("API CALLED");
  try {
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&query=${searchValue}&page=${pageNum}`
    );
    const searchData = await searchRes.json();

    // console.log("SearchData", searchData);

    // failure if 'success' property exists
    if (searchData.hasOwnProperty("success"))
      throw new Error("Api call failed");

    return searchData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed");
  }
};
