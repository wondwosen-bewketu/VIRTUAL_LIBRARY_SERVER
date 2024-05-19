import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CssBaseline, ThemeProvider, CircularProgress } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { setUser } from "./redux/slice/userSlice";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import enMessages from "./locales/en.json";
import amMessages from "./locales/am.json";
import { IntlProvider } from "react-intl";

const Login = React.lazy(() => import("./scenes/user/loginPage"));
const LandingPage = React.lazy(() => import("./scenes/LandingPage"));
const RegisterForm = React.lazy(() => import("./scenes/user/RegisterForm"));

const UploadBook = React.lazy(() => import("./components/UploadBook"));
const UserPage = React.lazy(() => import("./scenes/user/UserPage"));

function PrivateRoutes() {
  const user = useSelector((state) => state.user);

  if (user && user.token) {
    return (
      <Routes>
        {user.user.role === "Admin" ? (
          <>
            <Route path="/uploadbook" element={<UploadBook />} />
            <Route path="*" element={<Navigate to="/uploadbook" />} />
          </>
        ) : (
          <>
            <Route path="/userpage" element={<UserPage />} />
            <Route path="*" element={<Navigate to="/userpage" />} />
          </>
        )}
      </Routes>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

function App() {
  const [theme, colorMode] = useMode();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          dispatch(setUser({ user: parsedUser, token: storedToken }));
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "white", // Change background color to white
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  const messages = {
    en: enMessages,
    am: amMessages,
  };

  return (
    <IntlProvider locale="en" messages={messages.en}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app" style={{ backgroundColor: "white" }}>
            {" "}
            {/* Change background color to white */}
            {user && user.token ? (
              <>
                <Sidebar userRole={user.user.role} />
                <main className="content">
                  <Topbar />
                  <Suspense
                    fallback={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100vh",
                        }}
                      >
                        Loading..
                        <CircularProgress />
                      </div>
                    }
                  >
                    <PrivateRoutes />
                  </Suspense>
                </main>
              </>
            ) : (
              <Suspense
                fallback={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100vh",
                    }}
                  >
                    Loading..
                    <CircularProgress />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
              </Suspense>
            )}
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </IntlProvider>
  );
}

export default App;
