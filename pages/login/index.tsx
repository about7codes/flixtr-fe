import React, { useState, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";
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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { styles as classes } from "../../styles/login.styles";
import { useRouter } from "next/router";
import CustomHead from "../../components/CustomHead/CustomHead";
import { signIn, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setNotify } from "../../redux/notifySlice";

export function getSafeCallbackUrl(
  callbackUrl: string | string[] | undefined
): string {
  try {
    const currentOrigin =
      typeof window !== "undefined" ? window.location.origin : "";
    const rawUrl = Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl;

    if (!rawUrl) return "/";

    const url = new URL(rawUrl);
    const relativePath = url.pathname + url.search + url.hash;
    return currentOrigin + relativePath;
  } catch {
    return "/";
  }
}

interface IFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const { callbackUrl } = router.query;
  const isLogged = status === "authenticated";
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLogged) {
      router.push(getSafeCallbackUrl(callbackUrl));
      return;
    }
  }, [isLogged]);

  const handleSubmit = async (values: IFormValues) => {
    // console.log(values);
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      setIsLoading(false);

      if (result?.error) throw new Error(result.error);

      dispatch(
        setNotify({
          isOpen: true,
          message: "Login successfull",
          type: "success",
        })
      );
      router.push(getSafeCallbackUrl(callbackUrl));
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
    email: Yup.string()
      .email("Enter a valid email.")
      .required("Please enter your email."),
    password: Yup.string()
      .min(4, "Too short.")
      .required("Please enter your password."),
  });

  const formik: FormikProps<IFormValues> = useFormik<IFormValues>({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formikSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container sx={classes.sign}>
      <CustomHead title="Login to Flixbaba" media_type={"movie"} />
      <Fade in={true}>
        <Grid container sx={classes.signInner}>
          <Grid item justifyContent="center" display="flex">
            {/* <Image
              src="/assets/flixtr.png"
              alt="Flixtr logo"
              width={36}
              height={36}
              style={classes.logo}
            /> */}

            <LazyLoadImage
              placeholderSrc="/assets/flixtr-placeholder.svg"
              effect="blur"
              src="/assets/flixtr.png"
              alt="Flixbaba logo"
              style={classes.logo}
            />
          </Grid>
          <Grid item sx={classes.signInnerHeader}>
            <Typography variant="h2">Sign In</Typography>
          </Grid>
          <Grid item>
            <Box>
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
                    <Lock color="secondary" />
                  </Grid>
                  <Grid item sx={classes.fieldInput}>
                    <TextField
                      sx={classes.input}
                      color="secondary"
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      variant="standard"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                        e.key === "Enter" && formik.handleSubmit()
                      }
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
                              color="secondary"
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
                loading={isLoading}
                sx={classes.submit}
                variant="contained"
                color="secondary"
                onClick={() => formik.handleSubmit()}
              >
                Sign In
              </LoadingButton>
              <Link href="/signup" style={classes.altBtn}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  sx={classes.submit}
                >
                  Don&rsquo;t have an account?
                </Button>
              </Link>
              {/* <Box sx={classes.links}>
                <Link href="/">
                  <MuiLink sx={classes.link}>Forgot password ?</MuiLink>
                </Link>
              </Box> */}
            </Box>
          </Grid>
        </Grid>
      </Fade>
    </Container>
  );
};

export default Login;
