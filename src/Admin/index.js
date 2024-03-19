import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import AdminMiddleware from "../Middleware/Admin";
import Dashboard from "./Dashboard";
import Listing from "./Listing";
import Facility from "./Facility";
import Template from "./Template";
import User from "./User";
import Admin from "./Admin";
import Home from "./Home";
import Reservation from "./Reservation";
import City from "./City";
const AdminRouter = () => {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/dashboard" element={<AdminMiddleware><Dashboard /></AdminMiddleware>} />

            <Route path="/user" element={<AdminMiddleware><User /></AdminMiddleware>} />
            <Route path="/city" element={<AdminMiddleware><City /></AdminMiddleware>} />
            <Route path="/administrator" element={<AdminMiddleware><Admin /></AdminMiddleware>} />
            <Route path="/listing" element={<AdminMiddleware><Listing /></AdminMiddleware>} />
            <Route path="/facility" element={<AdminMiddleware><Facility /></AdminMiddleware>} />
            <Route path="/template" element={<AdminMiddleware><Template /></AdminMiddleware>} />
            <Route path="/reservation" element={<AdminMiddleware><Reservation /></AdminMiddleware>} />
        </Routes>
    )
}

export default AdminRouter;