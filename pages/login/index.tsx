import React, { useState, useEffect } from "react";
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
import Lock from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";

import { styles as classes } from "../../styles/login.styles";
// import { useLogin } from "../../hooks/auth.hooks";
// import HeaderInfo from "../../components/HeaderInfo/HeaderInfo";
import { useRouter } from "next/router";
import CustomHead from "../../components/CustomHead/CustomHead";
import { signIn, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setNotify } from "../../redux/notifySlice";
// import { parseCookies } from "nookies";
// import { useCheckLogin } from "../../hooks/app.hooks";

interface IFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { data: sessionData, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  // const isLogged = useCheckLogin();
  const isLogged = false;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLogged) {
      console.log("Lredirect to /all");
      router.push("/");
      return;
    }
  }, []);

  // const { mutate: login, isLoading, error } = useLogin();

  const handleSubmit = async (values: IFormValues) => {
    console.log(values);
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      setIsLoading(false);

      if (result?.error) throw new Error(result.error);

      // console.log("LoginResult: ", result);

      dispatch(
        setNotify({
          isOpen: true,
          message: "Login successfull",
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

    // login({ email: values.email, password: values.password });
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
      <CustomHead title="Login to Flixtr" media_type={"movie"} />
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
            <Typography variant="h2">Sign In</Typography>
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
              <LoadingButton
                fullWidth
                loading={isLoading}
                // loading={status === "loading"}
                sx={classes.submit}
                variant="contained"
                onClick={() => formik.handleSubmit()}
              >
                Sign In
              </LoadingButton>
              <Link href="/signup" style={classes.altBtn}>
                <Button
                  variant="outlined"
                  color="primary"
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
