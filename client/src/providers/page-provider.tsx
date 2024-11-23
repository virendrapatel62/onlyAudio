import { useIsAuthenticated } from "@/stores/auth-store";
import { LOGIN_PAGE_URL } from "@/utils/constants";
import React, {
  Fragment,
  PropsWithChildren,
  ReactComponentElement,
  ReactNode,
} from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IPageProviderProps {
  authenticatedPage?: boolean;
  element?: ReactNode;
  Component?: () => JSX.Element;
}

// Wrapper of all the pages
export default function PageProviders(props: IPageProviderProps) {
  const isAuthenticated = useIsAuthenticated();
  const { pathname, hash, search } = useLocation();
  const authenticatedPage = props.authenticatedPage || false;
  const children = props.Component ? <props.Component /> : props.element;

  let page = <Fragment>{children}</Fragment>;
  const currentFullUrl = `${pathname}${search}${hash}`;
  const loginPageUrl = `${LOGIN_PAGE_URL}?return_to=${currentFullUrl}`;

  if (authenticatedPage && !isAuthenticated) {
    return <Navigate to={loginPageUrl}></Navigate>;
  }

  return page;
}
