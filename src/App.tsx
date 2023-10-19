// App.tsx
import React, { useState } from 'react';

import { RootState } from './store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import RenderRoutes from './routes';
import Menu from './components/Menu/Menu';
import { useDispatch, useSelector } from 'react-redux';
import Alert, { AlertType } from './components/Alert/Alert';
import { logout, setIsAdmin } from './store/userSlice';
import { cleanTasks } from './store/tasksSlice';
import { cleanKey } from './store/keysSlice';

const App: React.FC = () => {
  // Aquí puedes agregar la lógica para determinar si el usuario está logueado o no
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const [message, setMessage] = useState<string>('');
  const dispatch = useDispatch();

  const closeSession = () => {
    dispatch(logout());
    dispatch(cleanTasks());
    dispatch(cleanKey())
    dispatch(setIsAdmin(false))
    setMessage('Sesión cerrada con éxito');
    setTimeout(() => {
      setMessage('')
    }, 4000)
  }

  const devilUrls = [
    'https://www.youtube.com/watch?v=A_tcblaDKcQ',
    'https://www.youtube.com/watch?v=SmhIvur8xHg',
    'https://youtu.be/QrTfYItDDwA?si=GX1g--oTIK7KTlEF',
    'https://youtu.be/I8Yod8FFIZg?si=Bhu6UDQj6JKXADBk',
    'https://www.youtube.com/watch?v=pdyna2KXVdU',
    'https://www.youtube.com/watch?v=IVbbxBtF-lk',
    'https://youtu.be/mOgYucHnizU?si=k2cR3il2D97syzJZ',
    'https://youtu.be/cuT_b3XitTw?si=OzJ7ZbSg4IGaDdIq',
    'https://www.youtube.com/watch?v=stgdmw8PcRY&pp=ygUWcGlzdG9sZXJvcyBkZWwgZWNsaXBzZQ%3D%3D',
    'https://www.youtube.com/watch?v=NfhzHDVbkuA',
    'https://www.youtube.com/watch?v=vRSX_L5V_U8',
    'https://www.youtube.com/watch?v=CiLo0W-9ynk',
    'https://youtu.be/3Sq9jTG12Rc?si=cIXBThsz6WWufQ-w',
    'https://www.youtube.com/watch?v=gpWHUUqbEPI&pp=ygUPZnJhc2VzIGRlIHJham95',
    'https://youtu.be/Zcb8yPEItwA?si=fuFApk9i-UcFqmBM',
    'https://www.youtube.com/watch?v=upCraucUfAM',
    'https://youtu.be/ERIlqqedAAU?si=axLV8WupA-s6x9-2',
    'https://youtu.be/7KTnYKlfa3E?si=7ubW9ICj97Vqk1IX',
    'https://www.youtube.com/watch?v=RClyREiPfVE&pp=ygUcamFtb25lcyBhbCB2YXBvciBndWl0YXIgaGVybw%3D%3D',
    'https://www.youtube.com/watch?v=CQwKEm6Y1_8&pp=ygUZaW50cm8gbG9zIHNlcnJhbm8gamFwb25lcw%3D%3D',
    'https://youtu.be/RS4t_U3jfmg?si=-NUSoogkrQZWqLem',
    'https://youtu.be/FXruzug7A54?si=Ue_Fyi2PHzhnJpxv',
    'https://www.youtube.com/watch?v=fUHtp146Ks4&pp=ygUReSB0dSBwYSBxdWUgZnVtYXM%3D',
    'https://www.youtube.com/watch?v=UfQm1L4T1MA&pp=ygUPZmFuIGRlIHRvcnJlbnRl',
    'https://www.youtube.com/watch?v=HD8TWGR4DN0',
    'https://www.youtube.com/watch?v=Wav20T0p5qo',
    'https://www.youtube.com/watch?v=Q2u5GZy7jQg',
    'https://youtu.be/njYNixkaksI?si=tZTBtBQEsHdtpBJE',
    'https://youtu.be/A-qvBHjwhDs?si=OYONhKte4w7SrPRO',
    'https://www.youtube.com/watch?v=WQO-aOdJLiw',
    'https://www.youtube.com/watch?v=hCnY74nxEPs',
    'https://www.youtube.com/watch?v=zm0_1NJPtDg',
    'https://www.youtube.com/watch?v=xRdSSUCf8eU',
    'https://www.youtube.com/watch?v=tAmzDSYdNdw'

  ]

  const menuItems = [
    { label: 'Modo Diablo', action: () => window.location.href = devilUrls[Math.floor(Math.random() * devilUrls.length)] },
    { label: 'Cerrar Sesión', action: () => closeSession()  },
    // ... more items
  ];

  const adminMenuItems = [
    { label: 'Cerrar Sesión', action: () => closeSession()  },
  ]

  return (
    <Router>
      {isAuthenticated && <Menu mainIcon="your-main-icon" menuItems={!isAdmin  ? menuItems : adminMenuItems} />}
      {message && <Alert type={AlertType.Success} message={message} />}
      {RenderRoutes()}
    </Router>
  );
};

export default App;
