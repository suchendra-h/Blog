// TODO: Things to fix:
// 1. writing two app.js files for AWS solution and housebrew solution,

// Also keep in mind that it should be almost similar from the frontend view if we are using aws or homebrew, it is backend's problem

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ArticlesList from "../pages/ArticlesList";
import ArticlePage from "../pages/ArticlePage";
import "./App.css";
import NavBar from "./NavBar";
import NotFoundPage from "../pages/NotFoundPage";
import UserLogInPage from "../pages/UserLoginPage";
import UserSignUpPage from "../pages/UserSignUpPage";
import { UserInfoPage } from "../pages/UserInfoPage";
import { EmailVerificationCodePage } from "../pages/EmailVerificationCodePage";
import { PleaseVerifyEmailPage } from "../pages/PleaseVerifyEmailPage";
import { AwsForgotPasswordPage } from "../pages/AwsForgotPasswordPage";

// import { ForgotPasswordPage } from "../pages/ForgotPasswordPage";
import { AwsPasswordResetLandingPage } from "../pages/AwsPasswordResetLandingPage";

import UserProviderComponent from "../contexts/UserContextProvider";

const App = () => {
  return (
    <Router>
      <UserProviderComponent>
        <div className="App">
          <NavBar />
          <div id="page-body">
            <Routes>
              <Route path="/" element={<HomePage />} exact />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/articles-list" element={<ArticlesList />} />
              <Route path="/article/:name" element={<ArticlePage />} />
              <Route path="/login" element={<UserLogInPage />} />
              <Route path="/signup" element={<UserSignUpPage />} />
              <Route path="/user" element={<UserInfoPage />} />
              <Route
                path="/forgot-password"
                element={<AwsForgotPasswordPage />}
              />
              <Route
                path="/reset-password"
                element={<AwsPasswordResetLandingPage />}
              />
              <Route
                path="/please-verify"
                element={<PleaseVerifyEmailPage />}
              />
              <Route
                path="/verify-email"
                element={<EmailVerificationCodePage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </UserProviderComponent>
    </Router>
  );
};

export default App;
