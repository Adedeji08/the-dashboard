const Signout = (props: any) => {
    const { onYes, onNo } = props;
  
    return (
      <>
        <div className='mt-10 p-4 flex justify-center items-center  mx-auto flex-col gap-5'>
          <h1 className='text-[18px] md:text-[28px] text-[#040821] font-bold'>
            Sign Out
          </h1>
          <p className='text-[12px] font-normal md:text-[26px] text-center'>
            Are you sure you want to sign out?
          </p>
  
          <div className='flex flex-col gap-4 md:flex-row'>
            
            <button
              onClick={onNo}
              className='flex py-2 px-12 justify-center items-center gap-10 rounded-[10px] border border-[#0979A1] text-[#0979A1] text-center font-orbiter-fbs font-bold text-22'>
              No
            </button>

            <button
              onClick={onYes}
              className='py-2 px-12 justify-center items-center gap-10 rounded-[10px] border border-[#0979A1] bg-[#0979A1] text-white text-center font-orbiter-fbs font-bold text-22'>
              Yes
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default Signout;