import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import StarLoader from "../core/loaders/StarLoader";
import { useGetStaffLoginData } from "../../service/api/base-api";

const App_Data_Provider = ({ children }) => {
  const { mutateAsync, isPending, isError } = useGetStaffLoginData();

  const { setCurrentUser } = useCurrentUser();

  const [searchParam] = useSearchParams();
  const token = searchParam.get("ctx");
  const company_id = searchParam.get("cid");
  const staff_id = searchParam.get("stid");
  const app_switcher = searchParam.get("from");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await mutateAsync({
          company_id,
          staff_id,
          token,
        });

        const reformedData = {
          data: resData?.data?.data,
          token: token,
          status: resData?.data?.status,
        };
        setCurrentUser(reformedData);
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
      }
    };
    if (app_switcher === "basement" && token) {
      fetchData();
    }
  }, [
    app_switcher,
    company_id,
    mutateAsync,
    navigate,
    setCurrentUser,
    staff_id,
    token,
  ]);

  if (isPending) {
    return (
      <main className="h-screen flex items-center justify-center">
        <StarLoader size={32} />
      </main>
    );
  }

  if (isError) {
    ("");
  }

  return <>{children}</>;
};

export default App_Data_Provider;
