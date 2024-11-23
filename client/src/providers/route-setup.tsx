import { Navigate, Route, Routes } from "react-router-dom";
import {
  HOME_PAGE_URL,
  LOGIN_PAGE_URL,
  PROFILE_PAGE,
  REGISTRATION_PAGE_URL,
  RESET_PASSWORD_PAGE_URL,
} from "@/utils/constants";
import PageProviders from "./page-provider";
import HomePage from "@/pages/homepage";
import CreatorGoLivePage from "@/pages/creator-go-live";
import Playground from "@/pages/playground";
import MyCreators from "@/pages/my-creators";
import JoinTheLive from "@/pages/join-live";
import ResetPassword from "@/pages/auth/reset-password";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import ProfilePage from "@/pages/profile";

export default function RouteSetup() {
  return (
    <Routes>
      <Route
        path={HOME_PAGE_URL}
        element={<PageProviders Component={HomePage} authenticatedPage />}
      ></Route>
      <Route
        path="/go-live"
        element={
          <PageProviders Component={CreatorGoLivePage} authenticatedPage />
        }
      ></Route>
      <Route
        path="/playground"
        element={<PageProviders Component={Playground} authenticatedPage />}
      ></Route>
      <Route
        path="/my-creators"
        element={<PageProviders Component={MyCreators} authenticatedPage />}
      ></Route>
      <Route
        path="/join-live/:creator"
        element={<PageProviders Component={JoinTheLive} authenticatedPage />}
      ></Route>

      <Route path="/auth" element={<Navigate to={LOGIN_PAGE_URL} />}></Route>
      <Route path={LOGIN_PAGE_URL} Component={LoginPage}></Route>
      <Route path={RESET_PASSWORD_PAGE_URL} Component={ResetPassword}></Route>
      <Route path={REGISTRATION_PAGE_URL} Component={RegisterPage}></Route>
      <Route path={PROFILE_PAGE`:username`} Component={ProfilePage}></Route>
    </Routes>
  );
}
