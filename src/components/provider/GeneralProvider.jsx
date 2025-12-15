import GeneralDrawer from "../core/drawer/GeneralDrawer";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";

const GeneralProvider = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <HeroUIProvider>
        {" "}
        {/* HeroUI provider */}
        <QueryClientProvider client={queryClient}>
          {/* Tanstack query provider */}
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#4f39f6",
              },
            }}
          >
            {" "}
            <GeneralDrawer />
            <div className="fixed top-0 left-0 w-full pointer-events-none z-9999">
              <ToastProvider placement="top-right" />
            </div>
            {children}
          </ConfigProvider>
        </QueryClientProvider>
      </HeroUIProvider>
    </>
  );
};

export default GeneralProvider;
