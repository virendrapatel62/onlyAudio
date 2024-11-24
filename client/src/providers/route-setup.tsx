import { Navigate, Route, Routes } from "react-router-dom";
import {
  HOME_PAGE_URL,
  JOIN_STREAM,
  LOGIN_PAGE_URL,
  PROFILE_PAGE,
  REGISTRATION_PAGE_URL,
  RESET_PASSWORD_PAGE_URL,
  SEARCH_PAGE_URL,
} from "@/utils/constants";
import PageProviders from "./page-provider";
import HomePage from "@/pages/homepage";
import Playground from "@/pages/playground";
import MyCreators from "@/pages/my-creators";
import ResetPassword from "@/pages/auth/reset-password";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import ProfilePage from "@/pages/profile";
import SearchPage from "@/pages/search-page";
import JoinStream from "@/pages/join";
import SpeakPage from "@/pages/speak";

export default function RouteSetup() {
  return (
    <Routes>
      <Route
        path={HOME_PAGE_URL}
        element={<PageProviders Component={HomePage} authenticatedPage />}
      ></Route>
      <Route
        path="/speak"
        element={<PageProviders Component={SpeakPage} authenticatedPage />}
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
        path={JOIN_STREAM`:username`}
        element={<PageProviders Component={JoinStream} authenticatedPage />}
      ></Route>
      <Route
        path={SEARCH_PAGE_URL}
        element={<PageProviders Component={SearchPage} authenticatedPage />}
      ></Route>
      <Route
        path={PROFILE_PAGE`:username`}
        element={<PageProviders Component={ProfilePage} authenticatedPage />}
      ></Route>

      <Route path="/auth" element={<Navigate to={LOGIN_PAGE_URL} />}></Route>
      <Route path={LOGIN_PAGE_URL} Component={LoginPage}></Route>
      <Route path={RESET_PASSWORD_PAGE_URL} Component={ResetPassword}></Route>
      <Route path={REGISTRATION_PAGE_URL} Component={RegisterPage}></Route>
    </Routes>
  );
}
