import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Formik, FormikProps } from "formik";
import { Button, Box, Card, CardContent } from "@mui/material";
import { Heading } from "../../components/Heading";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { loginSchema } from "./components/validationSchema";
import { onKeyDown } from "../../utils";
import { useLoginMutation } from "../../redux/api/authApiSlice";
import { setUser } from "../../redux/auth/authSlice";

interface ISLoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState<ISLoginForm>({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const hideShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const [loginUser, { isLoading }] = useLoginMutation();

  const LoginHandler = async (data: ISLoginForm) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      const user: any = await loginUser(payload);
      if (user?.data?.status) {
        dispatch(setUser(user?.data));
        localStorage.setItem("user", JSON.stringify(user?.data));
        navigate("/");
      }
      if (user?.error) {
        setToast({
          ...toast,
          message: user?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url('https://images.booking-wp-plugin.com/main/blog/Reduces-Patient-No-Shows.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <Card
          sx={{
            width: "400px",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Heading sx={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
              MediFusion Login
            </Heading>
            <Formik
              initialValues={formValues}
              onSubmit={(values: ISLoginForm) => {
                LoginHandler(values);
              }}
              validationSchema={loginSchema}
            >
              {(props: FormikProps<ISLoginForm>) => {
                const { values, touched, errors, handleBlur, handleChange } = props;

                return (
                  <Form onKeyDown={onKeyDown}>
                    <Box sx={{ marginBottom: "20px" }}>
                      <PrimaryInput
                        type="text"
                        name="email"
                        placeholder="Email id"
                        value={values.email}
                        helperText={errors.email && touched.email ? errors.email : ""}
                        error={errors.email && touched.email ? true : false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Box>
                    <Box sx={{ marginBottom: "20px" }}>
                      <PrimaryInput
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        helperText={errors.password && touched.password ? errors.password : ""}
                        error={errors.password && touched.password ? true : false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        endAdornment={
                          showPassword ? (
                            <AiOutlineEye onClick={hideShowPassword} />
                          ) : (
                            <AiOutlineEyeInvisible onClick={hideShowPassword} />
                          )
                        }
                      />
                    </Box>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isLoading}
                      sx={{ marginBottom: "10px", backgroundColor: "#1976d2", color: "#fff" }}
                    >
                      {isLoading ? "Logging in..." : "Log in"}
                    </Button>
                    <Link to="/signup" style={{ display: "block", textAlign: "center", color: "#1976d2", textDecoration: "none", marginTop: "10px" }}>
                      New here? Create an account
                    </Link>
                  </Form>
                );
              }}
            </Formik>
          </CardContent>
        </Card>
      </Box>
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default Login;