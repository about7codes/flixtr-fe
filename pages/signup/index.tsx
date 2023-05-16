import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Container,
  Fade,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Button,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";

import { styles as classes } from "../../styles/signup.styles";
// import { AppContext } from "../../context/app.context";
// import { useSignup } from "../../hooks/auth.hooks";
import CustomHead from "../../components/CustomHead/CustomHead";
import { useDispatch } from "react-redux";
import { setNotify } from "../../redux/notifySlice";
import { signupRequest } from "../../api/auth.api";
import { signIn } from "next-auth/react";

interface IFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: number;
}

const Signup = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [, dispatch] = useContext<any>(AppContext);

  // const { mutate: signup, isLoading, error } = useSignup();
  // console.log("Error2: ", error?.response?.data);

  const handleSubmit = async (values: IFormValues) => {
    console.log(values);
    // signup({ email: values.email, password: values.password });

    console.log(values);
    try {
      setIsLoading(true);
      const register = await signupRequest({
        name: values.name,
        email: values.email,
        password: values.password,
        propic: values.avatar,
      });

      let result;
      if (register.user) {
        result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
      }

      setIsLoading(false);

      if (result?.error) throw new Error(result.error);

      console.log("RegResult: ", register);
      console.log("LoginResult: ", result);

      dispatch(
        setNotify({
          isOpen: true,
          message: "Signup successfull",
          type: "success",
        })
      );
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
    avatar: Yup.number()
      .typeError("Avatar must be a number")
      .max(10, "Max is 10.")
      .required("Please enter your Avatar."),
    name: Yup.string()
      .max(25, "Max character is 25.")
      .required("Please enter your name."),
    email: Yup.string()
      .email("Enter a valid email.")
      .required("Please enter your email."),
    password: Yup.string()
      .min(4, "Too short.")
      .required("Please enter your password."),
    confirmPassword: Yup.string()
      .min(4, "Too short.")
      .required("Please enter your password.")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formik: FormikProps<IFormValues> = useFormik<IFormValues>({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: 1,
    },
    validationSchema: formikSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container sx={classes.sign}>
      <CustomHead title="Sign up with Flixtr" media_type={"movie"} />
      <Fade in={true}>
        <Grid container sx={classes.signInner}>
          <Grid item justifyContent="center" display="flex">
            <Image
              src="/assets/abstract-bg.png"
              alt="Threemax logo"
              width={36}
              height={36}
              style={classes.logo}
              className="1logo-img"
            />
          </Grid>
          <Grid item sx={classes.signInnerHeader}>
            <Typography variant="h2">Sign Up</Typography>
          </Grid>
          <Grid item>
            <Box>
              <Box sx={classes.formGroup}>
                <Grid container spacing={1} sx={classes.field}>
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item sx={classes.fieldInput}>
                    <TextField
                      fullWidth
                      id="avatar"
                      label="Avatar"
                      name="avatar"
                      variant="standard"
                      value={formik.values.avatar}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.avatar && Boolean(formik.errors.avatar)
                      }
                      helperText={formik.touched.avatar && formik.errors.avatar}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={classes.formGroup}>
                <Grid container spacing={1} sx={classes.field}>
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item sx={classes.fieldInput}>
                    <TextField
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
                    <EmailIcon />
                  </Grid>
                  <Grid item sx={classes.fieldInput}>
                    <TextField
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
              <Box sx={classes.formGroup}>
                <Grid container spacing={1} sx={classes.field}>
                  <Grid item>
                    <Lock />
                  </Grid>
                  <Grid item sx={classes.fieldInput}>
                    <TextField
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      variant="standard"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPassword((prev) => (prev ? false : true))
                              }
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={classes.formGroup}>
                <Grid container spacing={1} sx={classes.field}>
                  <Grid item>
                    <Lock />
                  </Grid>
                  <Grid item sx={classes.fieldInput}>
                    <TextField
                      fullWidth
                      id="confirmPassword"
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      variant="standard"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPassword((prev) => (prev ? false : true))
                              }
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <LoadingButton
                fullWidth
                // loading={isLoading}
                sx={classes.submit}
                variant="contained"
                onClick={() => formik.handleSubmit()}
              >
                Create account
              </LoadingButton>
              <Link href="/login" style={classes.altBtn}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={classes.submit}
                >
                  Already have an account ?
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Fade>
    </Container>
  );
};

export default Signup;
