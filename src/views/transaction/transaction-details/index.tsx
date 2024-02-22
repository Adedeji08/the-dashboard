import React, { useEffect, useState } from 'react'
import Back from '../../../components/back'
import OrderTimeline from './order-timeline'
import OrderDetails from './order-details'
import { useParams } from 'react-router-dom'
import useRequest from '../../../components/hooks/use-request'

const TransactionDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams<{ id: string }>();

  const { makeRequest: getTransactions } = useRequest("/transactions", "GET");

  const selectedOrder = (data as any[]).find(
    (transactions) => transactions.id === id
  );

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getTransactions();
      setData(response?.data?.transactions || []);
    };
    fetchData();
  }, []);

  console.log('data', data)
  return (
    <>
      <div className="flex gap-5 mt-5">
        <Back />
        <h2 className="text-[24px] font-bold">Transaction Details</h2>
      </div>
      <div className='flex justify-between gap-10'>
          <OrderTimeline  transactions={selectedOrder}/>
          <OrderDetails  transactions={selectedOrder}/>
      </div>
    </>
  )
}

export default TransactionDetails