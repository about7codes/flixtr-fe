import { useQuery } from "@tanstack/react-query";
import { getPeople, getPersonById } from "../apis/people.api";

export enum PeopleQueryKey {
  PeopleData = "PeopleData",
  SinglePersonData = "SinglePersonData",
}

export const usePeople = () => {
  return useQuery([PeopleQueryKey.PeopleData], getPeople);
};

export const usePersonById = (personId?: string | string[]) => {
  return useQuery([PeopleQueryKey.SinglePersonData, personId], () =>
    getPersonById(personId)
  );
};
