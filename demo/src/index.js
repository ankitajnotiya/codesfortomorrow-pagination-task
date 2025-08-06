import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Login from "./pages/login";
import FeedbackForm from "./pages/feedbackform";
import FeedbackDashboard from "./pages/feedbackdashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="feedbackform" element={<FeedbackForm />} />
          <Route path="feedbackdashboard" element={<FeedbackDashboard />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
