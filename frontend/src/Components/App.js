// TODO: Things to fix:
// 1. navbar doesn't update when a user signs up unless he goes to the user info
// page
//
// 2. Error handling in email verification code page
//
// 3. Findig a way to update user state and token state at the same time in
// useToken hook
//
// 4. Update the useUsr hook to update the global user context insteead

import React, { useState } from "react";
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
import { useUser } from "../auth/useUser";
import { EmailVerificationCodePage } from "../pages/EmailVerificationCodePage";
import { PleaseVerifyEmailPage } from "../pages/PleaseVerifyEmailPage";

const App = () => {
  const [user, setUser] = useState(useUser());
  return (
    <Router>
      <div className="App">
        <NavBar user={user} />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articles-list" element={<ArticlesList />} />
            <Route path="/article/:name" element={<ArticlePage />} />
            <Route
              path="/login"
              element={<UserLogInPage user={user} setUser={setUser} />}
            />
            <Route path="/signup" element={<UserSignUpPage />} />
            <Route
              path="/verify-email"
              element={<EmailVerificationCodePage setUser={setUser} />}
            />
            <Route path="/please-verify" element={<PleaseVerifyEmailPage />} />
            <Route
              path="/user"
              element={<UserInfoPage user={user} setUser={setUser} />}
            />
            <Route path="*" element={<NotFoundPage />} /> */
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
