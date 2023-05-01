import React from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import { PeopleQueryKey, usePersonById } from "../../../../hooks/people.hooks";
import { getPersonById } from "../../../../api/people.api";

type PersonInfoProps = {};

function PersonInfo() {
  const router = useRouter();
  const { data: singlePersonData, isLoading } = usePersonById(router.query.id);

  console.log("singlePersonData: ", singlePersonData);

  return <div>Person</div>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const { id } = ctx.query;

  try {
    // fetching single person details
    await queryClient.fetchQuery([PeopleQueryKey.SinglePersonData, id], () =>
      getPersonById(id)
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default PersonInfo;
