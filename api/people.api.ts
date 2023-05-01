import { PeopleData, PeopleResult } from "../types/apiResponses";

export const getPeople = async (): Promise<PeopleResult[]> => {
  try {
    const peopleRes = await fetch(
      `https://api.themoviedb.org/3/trending/person/day?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );
    const peopleData: PeopleData = await peopleRes.json();

    if (peopleData.hasOwnProperty("success"))
      throw new Error("Api call failed");

    return peopleData.results;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed");
  }
};
