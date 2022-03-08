import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { generalContext } from '../contexts/MainContext';
import { subscribeUser } from '../subscription'

const Login = () => {

  const StateManager = useContext(generalContext)
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null)
  const [state, setstate] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    !StateManager?.token && StateManager?.endpoints.login(state, async(success, error)=>{
      if(error){
        setError(error.response.data.error.message);
        return alert(error.response.data.error.message);
      }
      if(success){
        setError(null)
        subscribeUser(success.data)
        StateManager.endpoints.getAssets()
        return;
      }
      setloading(false);
    })
  };

  if (StateManager?.token) {
    console.log('token-login', StateManager?.token)
    return <Navigate to="/assets" />;
  }

  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <div className="md:w-6/12">
          <form className="px-6 py-10" onSubmit={handleSubmit}>
            <h6 color={"#112E46"} className="mb-8 text-center" fontWeight="700">
              Login
            </h6>

            <div className="w-full mb-6">
              <input
                className="inline-block w-full p-6 c-black"
                placeholder="Email address"
                type="text"
                name="identifier"
                onChange={handleChange}
                value={state.email}
                required
              />
            </div>

            <div className="w-full mb-2">
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

            <p
              className="mt-10 text-center"
            >
              <Link to="/forgotPassword">Forgot password?</Link>
            </p>

            <div className="w-full flex items-center justify-center pt-10">
              <button
                className="inline-block w-auto border px-4 py-4"
                onClick={handleSubmit}
              >
                {loading ? 'loading...': 'Login'}
              </button>
            </div>

            {error ? (
              <p
                style={{color: "red"}}
                className="mt-5 text-center"
              >
                {error}
              </p>
             ) : null}


            <p
              className="mt-16 text-center"
            >
              to Signup,  click {" "}
              <Link to="/signup">here</Link>
            </p>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
