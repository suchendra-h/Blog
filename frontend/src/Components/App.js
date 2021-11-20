import React, { Component } from "react";
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

class App extends Component {
  render() {
    return (
      <Router>
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
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
