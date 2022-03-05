import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { generalContext } from '../../contexts/MainContext';
import { subscribeUser } from '../../subscription'

const CreateAssets = ({token}) => {

  const StateManager = useContext(generalContext)
  const location = useLocation();
  let navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null)
  const [state, setstate] = useState({
    name: '',
    description: '',
    model_number: '',	
    validity_period: '',
    category: '',
    is_available: false, 	
    logs: [],
    is_expired: false,
  });

  const handleChange = (e) => {
    switch (e.target.type) {
      case "number":
        setstate({ ...state, [e.target.name]: parseFloat(e.target.value) });
        break;
      case "checkbox":
        setstate({ ...state, [e.target.name]: e.target.checked });
        break;
      default:
        setstate({ ...state, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    StateManager?.endpoints.createAssets(state, (success, error) => {
      if(error){
        setError(error.response.data.error.message);
        alert(error.response.data.error.message);
      }
      if(success){
        setError(null)
        subscribeUser(success.data)
        StateManager?.endpoints.getAssets()
        navigate('/assets');
      }
      setloading(false);
    })
  };

  return (
    <div>
      <div className="px-4 md:px-8">
        <div className="md:w-10/12">
        <form className="px-6 py-10 md:py-0" onSubmit={handleSubmit}>
            <h6 color={"#112E46"} className="mb-8 " fontWeight="700">
              Create a new Asset
            </h6>

            <div className="w-full mb-6">
              <p>Asset Name</p>
              <input
                className="inline-block w-full p-6 c-black"
                placeholder="Asset name"
                type="text"
                name="name"
                onChange={handleChange}
                value={state.name}
                required
              />
            </div>

            <div className="w-full mb-6">
              <p>Asset description</p>
              <input
                className="inline-block w-full p-6 c-black"
                placeholder="Asset name"
                type="text"
                name="description"
                onChange={handleChange}
                value={state.description}
                required
              />
            </div>

            <div className="w-full mb-2">
              <p>Asset model number</p>
              <input
                className="inline-block w-full p-6 c-black"
                placeholder="Asset model number"
                type="text"
                name="model_number"
                onChange={handleChange}
                value={state.model_number}
                required
              />
            </div>

            <div className="w-full mb-2">
              <p>Asset validity period</p>
              <input
                className="inline-block w-full p-6 c-black"
                placeholder="Asset validity period"
                type="date"
                name="validity_period"
                onChange={handleChange}
                value={state.validity_period}
                required
              />
            </div>

            <div className="w-full mb-2">
              <p>Asset category</p>
              <select 
                value={state.category} 
                className="inline-block w-full p-6 c-black" 
                onChange={(e)=> setstate({...state, category: e.target.value})}
              >
                <option value="perishable">perishable</option>
                <option value="nonperishable">nonperishable</option>
              </select>
            </div>

            <div className="w-full mb-2">
              <p>is Asset available?</p>
              <input
                className="p-6 c-black"
                type="checkbox"
                name="is_available"
                onChange={handleChange}
                value={state.is_available}
                required
              />
            </div>

            <div className="w-full mb-2">
              <p>is Asset expired?</p>
              <input
                className="p-6 c-black"
                type="checkbox"
                name="is_expired"
                onChange={handleChange}
                value={state.is_expired}
                required
              />
            </div>

            {/* <div className="w-full mb-2">
              <p>logs</p>
              <input
                className="inline-block w-full p-6 c-black"
                placeholder="logs"
                type="text"
                name="logs"
                onChange={handleChange}
                value={state.logs}
                required
              />
            </div> */}

            <div className="w-full flex items-center justify-center py-10">
              <button
                className="inline-block w-auto border px-4 py-4"
                onClick={handleSubmit}
              >
                {loading ? 'loading...': 'edit asset'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssets;
