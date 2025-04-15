import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import OriginPage from "@/pages/OriginPage";
import TransportPage from "@/pages/TransportPage";
import CalculatorPage from "@/pages/CalculatorPage";
import ResultPage from "@/pages/ResultPage";
import PaymentPage from "@/pages/PaymentPage";
import SuccessPage from "@/pages/SuccessPage";
import { AppProvider } from "./context/AppContext";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/origem" component={OriginPage} />
      <Route path="/transporte" component={TransportPage} />
      <Route path="/calculo" component={CalculatorPage} />
      <Route path="/resultado" component={ResultPage} />
      <Route path="/pagamento" component={PaymentPage} />
      <Route path="/sucesso" component={SuccessPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router />
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
