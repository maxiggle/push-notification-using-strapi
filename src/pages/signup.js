import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { generalContext } from '../contexts/MainContext';

const Signup = ({token}) => {

  const StateManager = useContext(generalContext)
  const location = useLocation();
  let navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const [state, setstate] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    !StateManager?.token && StateManager?.endpoints.login(state, (success, error) => {
      setloading(false);
      // navigate('/assets');
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
              Signup
            </h6>

            <div className="w-full mb-6">
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
                {loading ? 'loading...': 'Signup'}
              </button>
            </div>


            <p
              className="mt-16 text-center"
            >
              to Login,  click {"      "}
              <Link to="/">here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
