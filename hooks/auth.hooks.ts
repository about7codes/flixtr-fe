import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { setNotify } from "../redux/notifySlice";
import { updateProfile } from "../apis/auth.api";

export const useUpdateProfile = () => {
  const dispatch = useDispatch();

  return useMutation(updateProfile, {
    onSuccess: (data) => {
      dispatch(
        setNotify({
          isOpen: true,
          message: "Profile updated, please login.",
          type: "success",
        })
      );
      // console.log("Successdata", data);
    },
    onError: (error: any) => {
      dispatch(
        setNotify({
          isOpen: true,
          message: error.message,
          type: "error",
        })
      );
      console.log("QueryError", error);
    },
  });
};
