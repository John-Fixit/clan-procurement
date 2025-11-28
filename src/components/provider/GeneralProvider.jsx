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
          <div className="fixed top-0 left-0 w-full pointer-events-none z-9999">
            <ToastProvider placement="top-right" />
          </div>
          {children}
        </QueryClientProvider>
      </HeroUIProvider>
    </>
  );
};

export default GeneralProvider;
