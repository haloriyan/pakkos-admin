import React from "react";
import { BrowserRouter } from "react-router-dom";
import AdminRouter from "./Admin";
import './App.css';

export default function App() {
	return (
		<BrowserRouter>
			<AdminRouter />
		</BrowserRouter>
	)
}