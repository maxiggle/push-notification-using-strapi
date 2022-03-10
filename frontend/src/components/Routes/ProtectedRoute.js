import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { generalContext } from '../../contexts/MainContext'

const ProtectedRoute = () => {
  const StateManager = useContext(generalContext);

  console.log('statemanager route2', StateManager);

  if(StateManager?.token){
    return(
      <div>
        <Navbar/>
        <div className="md:flex">
          <div className="md:w-9/12">
            <Outlet/>
          </div>

          <div className="hidden md:block md:w-3/12 bg-acacac min-h-screen p-4">
            <div className="flex items-center md:px-2 px-4">
              <div className="px-2">
                <img src="https://picsum.photos/50/50" alt="" className="w-auto h-auto inline-block border-radius-50p bg-CA9140"/>
              </div>
              <div className="px-2">
                <div className="">
                  <p>{StateManager?.user?.email}</p>
                  <button onClick={StateManager.endpoints.logout} className="text-capitalize c-CA9140">LOGOUT </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    )
  }else{
    return(
      <Navigate to="/" />
    )
  }
};


export default ProtectedRoute;
