import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRequest from "../../../components/hooks/use-request";
import Icon from "../../../assets/icons";

interface UserTransactionDetailsProps {
  account: {
    id: string;
    email: string;
  };
}

interface TransactionData {
  orderId: string;
  email: string;
  status: string;
  amount: number;
  created_at: string;
}

const UserTransactionDetails: React.FC<UserTransactionDetailsProps> = ({
  account,
}) => {
  const [data, setData] = useState<TransactionData[]>([]);
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest("/transactions/user", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  useEffect(() => {
    fetchData();
  }, [account?.email]);

  const fetchData = async () => {
    if (account?.email) {
      const [response] = await makeRequest(undefined, {
        email: account.email,
      });
      setData(response.data?.transactions || []);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "#D1FFC9";
      case "pending":
        return "#FCCFCF";
      case "failed":
        return "#D9D9D9";
      default:
        return "transparent";
    }
  };

  return (
    <div className="bg-white border border-[#fff] mt-10 pt-7 px-6 rounded-lg w-full h-full ">
      <h3 className="text-[14px] font-semibold">Recent Transactions</h3>
      <section className="flex justify-between text-[10px] text-[#6A6A6A]">
        <p className="">Recent transactions</p>
        <Link to="/transactions" className="text-[#0979A1] font-semibold">
          see all
        </Link>
      </section>
      <div>
        {data.length > 0 ? (
          data.map((transaction, index) => (
            <div key={index} className="flex justify-between">
              <section>
                <div className="flex mt-5 gap-4">
                  <div className="w-2 bg-[#0979A1] h-2 rounded-full"></div>
                  <p className="-mt-1 text-[12px] font-semibold">
                    {transaction?.orderId}
                  </p>
                  <p
                    className="-mt-1 text-[12px] font-normal w-20 h-4 rounded-md"
                    style={{
                      backgroundColor: getStatusColor(
                        transaction?.status ? transaction?.status : "N/A"
                      ),
                    }}
                  >
                    {transaction?.status}
                  </p>
                </div>
                <p className="mt-2 text-[12px] font-normal pl-6">
                  {transaction?.email}
                </p>
              </section>
              <section className="flex mt-5 gap-4">
                <p className="-mt-1 text-[12px] font-normal">
                  {transaction?.amount}{" "}
                  <span className="block text-right pt-2">
                    {transaction?.created_at}
                  </span>
                </p>
                <Icon name="dotIcon" />
              </section>
            </div>
          ))
        ) : (
          <p className="text-center font-semibold text-[24px] mt-10 text-[#E9E9E9]">
            No recent transactions
          </p>
        )}
      </div>
    </div>
  );
};

export default UserTransactionDetails;
