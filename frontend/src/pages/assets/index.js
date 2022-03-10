import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AssetsCard from '../../components/assets/AssetsCard';
import { generalContext } from '../../contexts/MainContext';

const AssetsPage = (props) => {
  const StateManager = useContext(generalContext);

  useEffect(()=>{
    StateManager.endpoints.getAssets()
  }, [])

  return (
    <div>
      <div className="p-4 md:px-8 md:py-0">
        <div className="flex justify-center items-center md:block">
          <div className="w-full flex items-center md:justify-end pb-10">
            <Link to="/asset/+"
              className="inline-block w-auto border px-4 py-4"
            >
              Create a new asset
            </Link>
          </div>

          <div className="md:hidden pb-10">
            <div className="px-4 py-4">
              <p>{StateManager?.user?.email}</p>
              <button onClick={StateManager.endpoints.logout} className="text-capitalize c-CA9140">LOGOUT </button>
            </div>
          </div>
        </div>
        
        
        <div className="mt-8 md:flex md:flex-wrap my-2 md:-my-4">
          {
            StateManager?.assets?.allAssets ? StateManager.assets.allAssets.map((curr, idx)=>{
              return (
                <div className="md:w-4/12" key={idx}>
                  <div className="px-2 md:px-4 py-2 md:py-4">
                    <AssetsCard data={curr} />
                    {props.children}
                  </div>
                </div>
              )
            }):(
              <div className="md:w-3/12">
                <div className="px-2 md:px-4 py-2 md:py-4">
                 <h1> NO Asset </h1>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default AssetsPage;
