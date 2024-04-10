import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/theme/theme-provider";
import Login from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import NotFound from "./pages/NotFound";
import { TaskContext } from "./state/contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Toaster />
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} exact />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/register" element={<Register />} /> */}
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
