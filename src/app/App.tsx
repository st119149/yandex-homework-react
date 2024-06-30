import React, { useEffect } from "react";
import "./App.css";
import { Header } from "../widget/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "./store";
import MovieList from "../pages/MovieList";
import MovieDetails from "../pages/MovieDetails";
import { checkAuthToken } from "../features/auth/authSlice";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthToken());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/:movieId" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
