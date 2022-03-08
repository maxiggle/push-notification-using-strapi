import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import { subscribeUser } from '../../subscription'
import { generalContext } from '../../contexts/MainContext';

const AssetsCard = (props) => {

  const StateManager = useContext(generalContext)
  const { id } = useParams();
  let navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null)

  const deleteAssets = ()=>{
    StateManager?.token && StateManager?.endpoints.deleteSingleAsset(props.data.id, (success, error) => {
      if(error){
        setError(error.response.data.error.message);
        return alert(error.response.data.error.message);
      }
      if(success){
        setError(null)
        subscribeUser(success.data)
        StateManager?.endpoints.getAssets()
        return;
      }
      setloading(false);
      // navigate('/assets');
    })
  }

  useEffect(() => {
    console.log('data', props.data)
  }, [])

  return (
    <div>
      <div className="card box-shadow-default rounded-2xl relative">
        <div className="">
          <img src="https://picsum.photos/200/300" alt="" className="w-full h-auto" />
        </div>

        <div className="bg-b ">
          <div className="p-2">
            <p className="c-CA9140">name</p>
            <h6>{props?.data?.attributes?.name}</h6>
          </div>

          <div className="p-2">
            <p className="c-CA9140">description</p>
            <h6>{props?.data?.attributes?.description}</h6>
          </div>

          <div className="flex flex-wrap py-2 px-2">
            <div className="w-6/12 py-1">
              <p className="c-CA9140">model number</p>
              <p className="w-9/12 break-words">{props?.data?.attributes?.model_number}</p>
            </div>

            <div className="w-6/12 py-1">
              <p className="c-CA9140">is asset available?</p>
              <p>{props?.data?.attributes?.is_available ? 'yes': 'no'}</p>
            </div>

            <div className="w-6/12 pb-2">
              <p className="c-CA9140">is asset expired?</p>
              <h6>{props?.data?.attributes?.is_expired ? 'yes': 'no'}</h6>
            </div>
          </div>
        </div>

        <div className="card-overlay flex items-center justify-center">
          <div className="flex md:-mx-2 -mx-4">
            <div className="w-6/12 md:px-2 px-4">
              <Link to={"/asset/edit/" + props?.data?.id} className="inline-block border-radius-50p bg-CA9140 md:p-4 p-10">
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
