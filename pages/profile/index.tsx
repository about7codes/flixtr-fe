import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import CustomHead from "../../components/CustomHead/CustomHead";

type ProfilePageProps = {};

function ProfilePage({}: ProfilePageProps) {
  const { data: sessionData } = useSession();

  console.log("first", sessionData);

  return (
    <>
      <CustomHead title="My profile" media_type={"movie"} />
      <div>Profile page</div>
    </>
  );
}

export default ProfilePage;
