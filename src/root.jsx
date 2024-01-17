import { Routes, Route } from "react-router-dom";
import Logout from "./logout";
import App from "./app";

const Root = () => {
    return (
        <Routes>
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<App />} />
        </Routes>
    );
};

export default Root;
