import { Dashboard } from "./components/dashboard/Dashboard";
import { Footer } from "./components/layout/Footer";

export function App() {
  return (
    <div className="p-6 space-y-4">
      <Dashboard />
      <Footer />
    </div>
  );
}
