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
    'https://youtu.be/g2m8bYG37ms?si=nvdlZ0qKRS-AryCV',
    'https://youtu.be/Xc-C3GJgP2A?si=QgTiLf0FPVZTQC88',
    'https://www.youtube.com/watch?v=nftMxlKUgFM',
    'https://www.youtube.com/watch?v=wL8A2yB5tAU',
    'https://youtu.be/aizXQfR4JfY?si=Ry_uJ3UKVluRpOUq',
    'https://www.youtube.com/watch?v=U3CTQR_c3Xs&pp=ygUaYWJ1ZWxvIGNhZ2FuZG8gZW4gZWwgY2FtcG8%3D',
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
    'https://www.youtube.com/watch?v=tAmzDSYdNdw',
    'https://youtu.be/COwu9Kh_H30?si=ykWU2QChk34qfjVw',
    'https://www.youtube.com/watch?v=7SLNMUS-d5Y&pp=ygUYbWVqb3JlcyBtb21lbnRvcyBtYXJpYW5v',
    'https://www.youtube.com/watch?v=_idwF9qYBSA&pp=ygUMY2FuaSBiYXJyb2Nv',
    'https://www.youtube.com/watch?v=Q8Oz-zwcsCk&pp=ygUWcGltIHBhbSB0b21hIGxhY2FzaXRvcw%3D%3D',
    'https://youtu.be/FLTqt4zFbHg?si=7GzCFqh7iNzAVyE5',
    'https://www.youtube.com/watch?v=Rzf18zhb_14',
    'https://www.youtube.com/watch?v=xLlVYbTq9g0&t=663s',
    'https://youtu.be/TyFUO8YXjMc?si=16wODrFwEJo2RdFo',
    'https://www.youtube.com/watch?v=vWD-TOlkDUE',
    'https://www.youtube.com/watch?v=u08NGTmxp-E',
    'https://www.youtube.com/watch?v=jBDu2cC11N0',
    'https://www.youtube.com/watch?v=eYJKOmleeiw',
    'https://youtu.be/Hq2SlCja3zo?si=zvYTrKk5ZUcO6sPo',
    'https://youtu.be/DxNFpBsxXZo?si=4wlVItjx7NvZS6ab',
    'https://youtube.com/shorts/VV8pJUhbfqE?si=dT924Jm8tJL14Vkc',
    'https://youtu.be/3Yj5SZ3FmyQ?si=AEWk5fH_JAyvQTpq',
    'https://youtu.be/vFtoZd8fv-Y?si=4M2DYWfXCgeGlsB4',
    'https://youtu.be/b92-CkhD5ds?si=uxyxcYD_xPoaMSPw',
    'https://www.youtube.com/watch?v=ajccHRfjvXU&pp=ygUGaWNhcmx5',
    'https://www.youtube.com/watch?v=tgx0fYFq7i8',
    'https://www.youtube.com/watch?v=WeV8nX5VLGw',
    'https://www.youtube.com/watch?v=VeXMPTgE_pM&pp=ygUSbWkgcGFkcmUgZXMgZWwgcmV5',
    'https://www.youtube.com/watch?v=NL7kuZjel2U',
    'https://www.youtube.com/watch?v=4-3zq1tIkSE&pp=ygUMbHVjaW8gaHVldm9z',
    'https://www.youtube.com/watch?v=-u15N3dff1s&pp=ygUPYWx2YXJvIGNsZW1lbnRl',
    'https://www.youtube.com/watch?v=LX18L4QXmVo&pp=ygUVbGEgY3VjYcOxYSBncmFuZCBwcml4',
    'https://www.youtube.com/watch?v=YxcNY5bVdN0',
    'https://www.youtube.com/watch?v=IadimkuZZro&pp=ygUQamFtb25lcyBhbCB2YXBvcg%3D%3D',
    'https://www.youtube.com/watch?v=zc6jMxllpG8&pp=ygUQamFtb25lcyBhbCB2YXBvcg%3D%3D',
    'https://www.youtube.com/watch?v=i9EZp8ZGhak&pp=ygUYZWx4b2thcyBtZWpvcmVzIG1vbWVudG9z',
    'https://www.youtube.com/watch?v=RoHKjdvC-c0',
    'https://www.youtube.com/watch?v=kaO-bGvHzV0&pp=ygUSY2FsbGVqZXJvcyBlc3Bhw7Fh',
    'https://www.youtube.com/watch?v=5tYkECE8i7c&pp=ygUTbWFub2xvIGVsIGRlbCBib21ibw%3D%3D',
    'https://www.youtube.com/shorts/kzRnDPmB7jE',
    'https://www.youtube.com/watch?v=mrCwRiuL8Cg&pp=ygUUZW4gZWwgY2FtcG8gZGUgbmFib3M%3D'
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
