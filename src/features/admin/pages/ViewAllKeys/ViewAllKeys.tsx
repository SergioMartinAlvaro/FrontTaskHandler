import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../../store/store';
import { removeUser, setAllKeys, setAllTasks, setAllUsers } from '../../../../store/adminSlice';
import { setMenuMessage } from '../../../../store/userSlice';
import {ReactComponent as ModificarIcon} from '../../../../assets/icons/Modificar.svg';
import {ReactComponent as EliminarIcon} from '../../../../assets/icons/Eliminar.svg';
import {ReactComponent as VerUsuario} from '../../../../assets/icons/EyeOpen.svg'
import AdminList from '../../components/AdminList/AdminList';
import Modal from '../../../../components/Modal/Modal';
import Button, { EButtonSize, EButtonType } from '../../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import AdminFloatingButton from '../../components/AdminFloatingMenu/AdminFloatingMenu';
import { IKey, emptyKey } from '../../../../models/IKey';
import { deleteKey, getAllKeys } from '../../../../services/keyService';

const ViewAllKeys = () => {
    const stateAllKeys = useSelector((state: RootState) => state.admin.allKeys);
    const [keys, setKeys] = useState(stateAllKeys);
    const [itemList, setItemList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [keySelected, setKeySelected] = useState<IKey>(emptyKey);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(stateAllKeys.length > 0) {
            setKeys(stateAllKeys);
            const newItemList = []
            stateAllKeys.forEach((key, index) => {
                newItemList.push({
                    text: index,
                    icons: {
                      Ver: {icon: <VerUsuario />, action: () => navigate(`/keys/${key.id}`)},
                      Modificar: { icon: <ModificarIcon />, action: () => navigate(`/edit-key/${key.id}`) },
                      Eliminar: { icon: <EliminarIcon />, action: () => openModal(key) }
                    },
                })
            })
            setItemList(newItemList);
        }
    }, [stateAllKeys]);

    const openModal = (key: IKey) => {
        setKeySelected(key);
        setShowModal(true);
    }

    const deleteUserAsync = async () => {
        await deleteKey(keySelected.id).then(data => {
            dispatch(setMenuMessage('Llave borrada con éxito'));
            dispatch(removeUser(keySelected));
            setKeySelected(emptyKey);
        }).catch(() => {
            dispatch(setMenuMessage('Error borrando la llave'));
            setKeySelected(emptyKey);
        }).finally(() => {
            setShowModal(false);
        })
    }

    
    const buttons = [
        <Button
          key="button1"
          onClick={deleteUserAsync}
          text="Aceptar"
          buttonType={EButtonType.Main}
          buttonSize={EButtonSize.LargeButton}
        />,
      ];

    useEffect(() => {
        const getAllKeyData = async () => {
            await getAllKeys().then(data => {
                dispatch(setAllKeys(data));
            }).catch((e) => {
                console.log(e);
                dispatch(setMenuMessage('Error obteniendo llaves.'))
            })
        }

        dispatch(setAllKeys([]))
        getAllKeyData();
    }, [])

    const menuButtons = [
        {
            text: "Añadir Llave",
            action: () => {navigate('/add-key')}
        }
    ]

  return (
    <div>
        <AdminList items={itemList} />
        <AdminFloatingButton options={menuButtons} />
        {showModal &&        <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        buttons={buttons}
        title=""
      >
        <p style={{marginBottom: "24px"}}>¿Estás seguro de que quieres eliminar esta llave?</p>

      </Modal>}
    </div>
  )
}

export default ViewAllKeys