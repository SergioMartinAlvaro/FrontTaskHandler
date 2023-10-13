import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../../store/store';
import './KeyPage.scss';
import allPeeps from '../../../../assets/images/peeps/allPeeps.svg';
import Tooltip from '../../../../components/Tooltip/Tooltip';
import { IKey, emptyKey } from '../../../../models/IKey';
import { getKeyByUSerID } from '../../../../services/keyService';
import { setMenuMessage } from '../../../../store/userSlice';

const KeyPage = () => {
  const navigate = useNavigate();
  const key = useSelector((state: RootState) => state.keys.keyAssigned);
  const user = useSelector((state: RootState) => state.user.user);
  const [selectedKey, setSelectedKey] = useState<IKey>(emptyKey);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMenuMessage('¿Para que coj... sirve una llave?'))
    const getKeysOfUser = async () => {
      await getKeyByUSerID(user.id).then((data) => {
        setSelectedKey(data[0]);
      }).catch(() => {
        dispatch(setMenuMessage('Error obteniendo la key :('))
      })
    }
    if(key.length) {
      if(key[0].assignedTo.id !== user.id) {
        navigate('/')
      } else {
        setSelectedKey(key[0]);
      }
    } else {
      getKeysOfUser()
    }
  }, []);

  useEffect(() => {
    setSelectedKey(key[0])
  }, [key])

  return (
    <div className="keyContainer">
      <div className='keyContainer__titleContainer'>
        <h2 className='keyContainer__title'>La llave!</h2>
      </div>
      <div className='keyContainer__textContainer'>
        <Tooltip position='top' type='main'>
          <p className='keyContainer__text'>{selectedKey && selectedKey.text}</p>
        </Tooltip>
        <img src={allPeeps} alt="all-peeps" className='keyContainer__image' />
      </div>
    </div>
  );
}

export default KeyPage