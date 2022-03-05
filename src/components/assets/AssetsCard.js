import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { subscribeUser } from '../../subscription'
import { generalContext } from '../../contexts/MainContext';

const AssetsCard = () => {

  const StateManager = useContext(generalContext)
  const location = useLocation();
  let navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null)
  const [state, setstate] = useState({
    email: null,
    username: null,
    password: null,
  });

  const deleteAssets = ()=>{
    !StateManager?.token && StateManager?.endpoints.signup(state, (success, error) => {
      if(error){
        setError(error.response.data.error.message);
        return alert(error.response.data.error.message);
      }
      if(success){
        setError(null)
        subscribeUser(success.data)
        return;
      }
      setloading(false);
      // navigate('/assets');
    })
  }


  return (
    <div>
      <div className="card rounded-2xl relative">
        <div className="">
          <img src="https://picsum.photos/200/300" alt="" className="w-full h-auto" />
        </div>

        <div className="bg-acacac p-4">
          <h3>Picture</h3>

          <div className="flex flex-wrap">
            <div className="w-4/12">
              <p>1.5QTY</p>
            </div>

            <div className="w-4/12">
              <p>1.5QTY</p>
            </div>

            <div className="w-4/12">
              <p>1.5QTY</p>
            </div>
          </div>
        </div>

        <div className="card-overlay flex items-center justify-center">
          <div className="flex md:-mx-2 -mx-4">
            <div className="w-6/12 md:px-2 px-4">
              <Link to="/asset/create/:id" className="inline-block border-radius-50p bg-CA9140 md:p-4 p-10">
                &#10003;
              </Link>
            </div>
            <div className="w-6/12 md:px-2 px-4">
              <button onClick={deleteAssets} className="inline-block border-radius-50p bg-CA9140 md:p-4 p-10">
                &#10006;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsCard;
