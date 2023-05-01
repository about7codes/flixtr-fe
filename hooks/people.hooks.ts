import { useQuery } from "@tanstack/react-query";
import { getPeople } from "../api/people.api";

export enum PeopleQueryKey {
  PeopleData = "PeopleData",
  SinglePersonData = "SinglePersonData",
}

export const usePeople = () => {
  return useQuery([PeopleQueryKey.PeopleData], getPeople);
};
