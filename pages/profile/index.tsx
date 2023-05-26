import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";

import {
  Container,
  Fade,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import * as Yup from "yup";

import CustomHead from "../../components/CustomHead/CustomHead";
import AvatarSelector from "../../components/AvatarSelector/AvatarSelector";
import { styles as classes } from "../../styles/profile.styles";
import { useDispatch } from "react-redux";
import { setNotify } from "../../redux/notifySlice";
import { FormikProps, useFormik } from "formik";

interface IFormValues {
  name: string;
  email: string;
}

type ProfilePageProps = {};

function ProfilePage({}: ProfilePageProps) {
  const dispatch = useDispatch();
  const { data: sessionData } = useSession();
  const user = sessionData?.user.user;

  const [avatarPic, setAvatarPic] = useState(user?.propic || 1);
  const [isLoading, setIsLoading] = useState(false);

  console.log("first", sessionData);

  const handleSubmit = async (values: IFormValues) => {
    // console.log(values);
    try {
      setIsLoading(true);
      // const register = await signupRequest({
      //   name: values.name,
      //   email: values.email,
      //   propic: avatarPic,
      // });

      setIsLoading(false);

      // if (result?.error) throw new Error(result.error);

      // console.log("RegResult: ", register);
      // console.log("LoginResult: ", result);

      dispatch(
        setNotify({
          isOpen: true,
          message: "Signup successfull",
          type: "success",
        })
      );

      // customRedirect("/");
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);

      dispatch(
        setNotify({
          isOpen: true,
          message: error.message,
          type: "error",
        })
      );
    }
  };
  const formikSchema = Yup.object().shape({
    name: Yup.string()
      .max(20, "Max characters is of 20.")
      .required("Please enter your name."),
    email: Yup.string()
      .email("Enter a valid email.")
      .required("Please enter your email."),
  });

  const formik: FormikProps<IFormValues> = useFormik<IFormValues>({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
    validationSchema: formikSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container sx={classes.sign}>
      <CustomHead title="My Profile" media_type={"movie"} />
      <Fade in={true}>
        <Grid container sx={classes.signInner}>
          <Grid item sx={classes.signInnerHeader}>
            <Typography variant="h2">My Profile</Typography>
          </Grid>
          <Grid item>
            <Box>
              <Box sx={classes.formGroup}>
                <AvatarSelector
                  avatarPic={avatarPic}
                  setAvatarPic={setAvatarPic}
                />
              </Box>
              <Box sx={classes.formGroup}>
                <Grid container spacing={1} sx={classes.field}>
                  <Grid item>
                    <AccountCircle color="secondary" />
                  </Grid>
                  <Grid item sx={classes.fieldInput}>
                    <TextField
                      sx={classes.input}
                      color="secondary"
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      variant="standard"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={classes.formGroup}>
                <Grid container spacing={1} sx={classes.field}>
                  <Grid item>
                    <EmailIcon color="secondary" />
                  </Grid>
                  <Grid item sx={classes.fieldInput}>
                    <TextField
                      sx={classes.input}
                      color="secondary"
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      variant="standard"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                </Grid>
              </Box>

              <LoadingButton
                disabled={!formik.dirty}
                fullWidth
                loading={isLoading}
                sx={classes.submit}
                variant="contained"
                color="secondary"
                onClick={() => formik.handleSubmit()}
              >
                Update profile
              </LoadingButton>
              <Link href="/login" style={classes.altBtn}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  sx={classes.submit}
                >
                  Delete account
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Fade>
    </Container>
  );
}

export default ProfilePage;
