import GeneralDrawer from "../core/drawer/GeneralDrawer";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const GeneralProvider = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <HeroUIProvider>
        {" "}
        {/* HeroUI provider */}
        <QueryClientProvider client={queryClient}>
          {" "}
          {/* Tanstack query provider */}
          <GeneralDrawer />
          <ToastProvider />
          {children}
        </QueryClientProvider>
      </HeroUIProvider>
    </>
  );
};

export default GeneralProvider;
