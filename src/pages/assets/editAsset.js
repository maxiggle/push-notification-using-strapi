import React, { useLayoutEffect, useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { generalContext } from '../../contexts/MainContext';
import { subscribeUser } from '../../subscription'

const EditAssets = () => {

  const StateManager = useContext(generalContext)
  const { id } = useParams();
  let navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null)
  const [state, setstate] = useState({
    name: null,
    description: null,
    model_number: null,	
    validity_period: null,
    category: null,
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
    StateManager?.endpoints.editAssets(state, (success, error) => {
      if(error){
        setError(error.response.data.error.message);
        alert(error.response.data.error.message);
      }
      if(success){
        setError(null)
        subscribeUser(success.data)
        StateManager?.endpoints.getSingleAsset(id)
        StateManager?.endpoints.getAssets()
        navigate('/assets');
      }
      setloading(false);
    })
  };


  const getAsset =  useCallback(()=>{
    console.log('location', id)
    setloading(true);
    return StateManager?.endpoints.getSingleAsset(id, (success, error) => {
      if(error){
        setError(error.response.data.error.message);
        alert(error.response.data.error.message);
      }
      if(success){
        setError(null)
        subscribeUser(success)
        setstate(()=> ({
          name: StateManager?.assets?.asset?.attributes?.name,
          description: StateManager?.assets?.asset?.attributes?.description,
          model_number: StateManager?.assets?.asset?.attributes?.model_number,	
          validity_period: StateManager?.assets?.asset?.attributes?.validity_period,
          category: StateManager?.assets?.asset?.attributes?.category,
          is_available: StateManager?.assets?.asset?.attributes?.is_available, 	
          logs: [],
          is_expired: StateManager?.assets?.asset?.attributes?.is_expired,
        }))
      }
      setloading(false);
    })
  },[StateManager.assets.asset, id]);

  
 
  useEffect(() => {
    getAsset()
  }, [StateManager.assets.asset, id])

  return (
    <div>
      {!loading &&  StateManager?.assets?.asset ? (
        <div className="px-4 md:px-8">
          <div className="md:w-10/12">
            <form className="px-6 py-10 md:py-0" onSubmit={handleSubmit}>
              <h6 color={"#112E46"} className="mb-8 " fontWeight="700">
                Edit an Asset
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
                  checked={state.is_available}
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
                  checked={state.is_expired}
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

              <div className="w-full flex items-center justify-center pt-10">
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
      ):!loading && error ?(
        <div className="flex items-center justify-center min-h-screen">
          <h1>{error}</h1>
        </div>
      ):(
        <div className="flex items-center justify-center min-h-screen">
          <h1>Loading...</h1>
        </div>
      )}
      
    </div>
  );
};

export default EditAssets;
