import React, { useEffect, useState } from 'react'
import Back from '../../../components/back';
import useRequest from '../../../components/hooks/use-request';
import { useParams } from 'react-router-dom';
import Details from './details';
import PreviousReport from './previous-reports';

const Blacklist = () => {
    const [blacklists, setBlacklists] = useState([]);
    const { makeRequest } = useRequest("/reports/blacklist", "GET");
    const { id } = useParams<{ id: string }>();
  
  
  
    useEffect(() => {
      const fetchData = async () => {
        const [response] = await makeRequest();
        setBlacklists(response?.data?.blacklists || []);
      };
      fetchData();
    }, []);

    console.log('blacklists', blacklists)
  
    const selectedReport = (blacklists as any[]).find(
      (blacklist) => blacklist.id === id
    );
  
  return (
    <>
      <Back />
      <div className=" bg-white border border-[#fff] mt-10 pt-7 rounded-lg w-full flex">
        <Details blacklist={selectedReport} />
       <PreviousReport/>
      </div>
    </>
  )
}

export default Blacklist