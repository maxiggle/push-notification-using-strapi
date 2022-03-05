import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { generalContext } from '../../contexts/MainContext';
import { subscribeUser } from '../../subscription'

const EditAssets = ({token}) => {

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

  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    StateManager?.endpoints.createAssets(state, (success, error) => {
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
  };

  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <div className="md:w-6/12">
          <form className="px-6 py-10" onSubmit={handleSubmit}>
            <h6 color={"#112E46"} className="mb-8 text-center" fontWeight="700">
              Signup
            </h6>

            <div className="w-full mb-6">
              <p>Asset Name</p>
              <input
                className="inline-block w-full p-6 c-black"
                placeholder="Email address"
                type="text"
                name="email"
                onChange={handleChange}
                value={state.email}
                required
              />
            </div>

            <div className="w-full mb-6">
              <p>Asset Name</p>
              <input
                className="inline-block w-full p-6 c-black"
                placeholder="Username"
                type="text"
                name="username"
                onChange={handleChange}
                value={state.username}
                required
              />
            </div>

            <div className="w-full mb-2">
              <p>Asset Name</p>
              <input
                className="inline-block w-full p-6 c-black"
                placeholder="password"
                type="password"
                name="password"
                onChange={handleChange}
                value={state.password}
                required
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAssets;
