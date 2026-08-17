import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useCheckStatus } from "../auth/hook/useCheckStatus";
import { AppRouter } from "./app.router";

const queryClient = new QueryClient();

const AppStatusGate = () => {
  useCheckStatus();
  return <AppRouter />;
};

export const AdminApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppStatusGate />
    </QueryClientProvider>
  );
};
