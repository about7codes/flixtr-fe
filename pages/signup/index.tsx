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
import Lock from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";

import { styles as classes } from "../../styles/signup.styles";
// import { AppContext } from "../../context/app.context";
// import { useSignup } from "../../hooks/auth.hooks";
import CustomHead from "../../components/CustomHead/CustomHead";

interface IFormValues {
  email: string;
  password: string;
}

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [, dispatch] = useContext<any>(AppContext);

  // const { mutate: signup, isLoading, error } = useSignup();
  // console.log("Error2: ", error?.response?.data);

  const handleSubmit = (values: IFormValues) => {
    console.log(values);
    // signup({ email: values.email, password: values.password });
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
