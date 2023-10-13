import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form, { IFieldConfig, IOptionSelect } from "../../../../components/Form/Form";
import { IUser, emptyUser } from "../../../../models/IUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { createUser, getAllUsers } from "../../../../services/userService";
import { addTask, setAllKeys, setAllUsers } from "../../../../store/adminSlice";
import { setMenuMessage } from "../../../../store/userSlice";
import './AddKey.scss'
import { createTask } from "../../../../services/tasksService";
import { createKey, getAllKeys } from "../../../../services/keyService";


/**
 *   public id: string;
  public name: string;
  public email: string;
  public dateAssigned: Date; // Nueva propiedad

 */

const AddKey = () => {
  const dispatch = useDispatch();
  const allKeys = useSelector((state: RootState) => state.admin.allKeys);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const loadKeyInfo = async () => {
      if (allKeys.length === 0) {
        try {
          const data = await getAllKeys();
          dispatch(setAllKeys(data));
        } catch (error) {
          console.error(error);
          dispatch(setMenuMessage("Error obteniendo llaves."));
          return;
        }
      } 
    };
    
    loadKeyInfo();
  }, [allKeys, dispatch]);

  const handleSubmit = async () => {
    submitNewKey();
  }

  const submitNewKey = async () => {
        await createKey({
            id: '',
            text: name,
            dateAssigned: null,
            assignedTo: emptyUser
        }).then(data => {
            console.log(data)
            dispatch(setMenuMessage('Key creada con éxito!'))
        }).catch(() => {
            dispatch(setMenuMessage('Error al crear la key!'))
        })
  }

  const changeKeyName = (e) => {
    setName(e)
  }

  const fieldsConfig: IFieldConfig[] = [
    { type: 'input', name: 'keyName', placeholder: 'Texto de la llave', onChange: (e) => changeKeyName(e)},
  ];

  return (<div className="addKey">
    <div className="addKey__titleContainer">
        <h2 className="addKey__title">Añadir llave</h2> 
    </div>
    <Form fields={fieldsConfig} submitAction={async () => await handleSubmit()}></Form>
  </div>)
};

export default AddKey;
