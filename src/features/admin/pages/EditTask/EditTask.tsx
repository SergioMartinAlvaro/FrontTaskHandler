import React, { useEffect, useState } from 'react'
import Form, { IFieldConfig, IOptionSelect } from '../../../../components/Form/Form';
import { useParams } from 'react-router-dom';
import { IUser, emptyUser } from '../../../../models/IUser';
import { RootState } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import './EditTask.scss';
import { getAllUsers, updatedUser } from '../../../../services/userService';
import { setMenuMessage } from '../../../../store/userSlice';
import { editTask, editUser, setAllUsers } from '../../../../store/adminSlice';
import loadingImage from "../../../../assets/images/peeps/loading.svg";
import Loading from '../../../../components/Loading/Loading';
import { getAllTasksByUserId, getTaskInfoById, updateTask } from '../../../../services/tasksService';
import { ITask, emptyTask } from '../../../../models/ITask';

const EditTask = () => {

    const { value } = useParams<{ value: string }>();
    const dispatch = useDispatch();
    const [selectedUser, setSelectedUser] = useState<IUser>(emptyUser);
    const allTasks = useSelector((state: RootState) => state.admin.allTasks);
    const [currentTask, setCurrentTask] = useState<ITask>(emptyTask);
    const [completed, setCompleted] = useState<boolean>(false);
    const [taskText, setTaskText] = useState<string>('');

    useEffect(() => {
        const getTaskInfo = async () => {
            await getTaskInfoById(value).then(data => {
                setCurrentTask(data);
                setCompleted(data.completed);
                setTaskText(data.taskText);
            }).catch((e) => {
                console.log(e);
                dispatch(setMenuMessage('Error obteniendo tarea.'))
            })
        }
       
        getTaskInfo();
    }, [])


    const handleEdit = async () => {
      /*  const newTask: ITask = {
            id: currentTask.id,
            completed: completed,
            text: taskText,
            description: '',
            userAssigned: currentTask.userAssigned,
            userImplicated: currentTask.userImplicated
        }

        setCurrentTask(newTask);
        await updateTask(selectedUser.id, newTask).then(data => {
            dispatch(editTask(newTask))
            dispatch(setMenuMessage('Tarea modificada!'))
        }).catch(() => {
            dispatch(setMenuMessage('Error modificando tarea!'))
        }) */
    }

    const changeTaskText = (e) => {
        setTaskText(e);
    }

    const changeCompleted = (e) => {
        e === "true" ? setCompleted(true) : setCompleted(false);
    }

    const options:IOptionSelect[] = [{
        id: "true",
        text: "Completada"
      },
      {
        id: "false",
        text: "No completada"
      }]
    
      const fieldsConfig: IFieldConfig[] = [
        { type: 'input', name: 'username', placeholder: 'Texto de la tarea', onChange: (e) => changeTaskText(e), value: `${currentTask.text}`},
        { type: 'select', name: 'completed', placeholder: 'Tarea completada', onChange: (e) => changeCompleted(e), options: options, value: `${currentTask.completed}`},
      ];
      
  return (
    <div className='editUser'>
        {currentTask.id !== '' ? <Form fields={fieldsConfig} submitAction={handleEdit}></Form>
        : <Loading text='Cargando... ¿Sabías que el kiwi, además de una fruta es un pájaro?' image={loadingImage} />}
    </div>

  )
}

export default EditTask;