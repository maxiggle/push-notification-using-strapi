import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AssetsCard from '../../components/assets/AssetsCard';
import { generalContext } from '../../contexts/MainContext';

const AssetsPage = (props) => {
  const StateManager = useContext(generalContext);

  useEffect(()=>{
    StateManager.endpoints.getAssets()
  }, [StateManager, StateManager.endpoints, StateManager.endpoints.getAssets])

  return (
    <div>
      <div className="p-4 md:px-8 md:py-0">
        <div className="w-full flex items-center justify-end pb-10">
          <Link to="/asset/+"
            className="inline-block w-auto border px-4 py-4"
          >
            Create a new asset
          </Link>
        </div>
        
        <div className="mt-8 md:flex md:flex-wrap my-2 md:-my-4">
          {
            [1,2,3,4,5,6].map((curr, idx)=>{
              return (
                <div className="md:w-3/12" key={idx}>
                  <div className="px-2 md:px-4 py-2 md:py-4">
                    <AssetsCard/>
                    {props.children}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default AssetsPage;
