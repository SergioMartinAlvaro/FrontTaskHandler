import React, { useEffect, useState } from "react";
import Title, { ETitleSize } from "../../components/Title/Title";
import UserAvatarCarousel from "../../features/user/components/UserAvatarCarousel/UserAvatarCarousel";
import peep1 from "../../assets/images/peeps/peep1.svg";
import peep2 from "../../assets/images/peeps/peep2.svg";
import peep3 from "../../assets/images/peeps/peep3.svg";
import peep4 from "../../assets/images/peeps/peep4.svg";
import peep5 from "../../assets/images/peeps/peep5.svg";
import peep6 from "../../assets/images/peeps/peep6.svg";
import peep7 from "../../assets/images/peeps/peep7.svg";
import peep8 from "../../assets/images/peeps/peep8.svg";
import peep9 from "../../assets/images/peeps/peep9.svg";
import peep10 from "../../assets/images/peeps/peep10.svg";
import peep11 from "../../assets/images/peeps/peep11.svg";
import peep12 from "../../assets/images/peeps/peep12.svg";
import peep13 from "../../assets/images/peeps/peep13.svg";
import peep14 from "../../assets/images/peeps/peep14.svg";
import loadingImage from "../../assets/images/peeps/loading.svg";
import store from "../../store/store";
import Form, { IFieldConfig } from "../../components/Form/Form";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import Alert, { AlertType } from "../../components/Alert/Alert";
import { useDispatch } from "react-redux";
import { logout, setIsAdmin, stateLogin } from "../../store/userSlice";
import "./Login.scss";
import Loading from "../../components/Loading/Loading";

const peeps = [
  peep1,
  peep2,
  peep3,
  peep4,
  peep5,
  peep6,
  peep7,
  peep8,
  peep9,
  peep10,
  peep11,
  peep12,
  peep13,
  peep14,
];

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const changeUserName = (value) => {
    setUsername(value);
  };

  const changePassword = (value) => {
    setPassword(value);
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);

  const handleLogin = async () => {
    setMessage("");
    setIsLoading(true);
    try {
      await login(username, password)
        .then(async (userData) => {
          userData.user.role === "ADMIN" && dispatch(setIsAdmin(true));
          dispatch(
            stateLogin({
              id: userData.user.id,
              name: userData.user.name,
              password: userData.user.password,
              role: userData.user.role,
            })
          );
          localStorage.setItem(
            "userData",
            JSON.stringify({
              username: userData.user.name,
              password: userData.user.password,
            })
          );
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
          setMessage(e.message);
        });
    } catch (error) {
      // Si hay un error en el inicio de sesión, maneja el error y muestra un mensaje
      console.log(error);
      setIsLoading(false);
      setMessage(error.message);
    }
  };

  const fieldsConfig: IFieldConfig[] = [
    {
      type: "input",
      name: "name",
      placeholder: "Nombre",
      onChange: changeUserName,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Contraseña",
      onChange: changePassword,
    },
  ];

  return (
    <div className="loginPage">
      {isLoading ? (
        <Loading
          text="Verificando... ¿Sabías que el kiwi, además de una fruta es un pájaro?"
          image={loadingImage}
        />
      ) : (
        <>
          {message && <Alert message={message} type={AlertType.Success} />}
          <div className="titleContainer">
            <Title text="Escape Room" size={ETitleSize.Large} />
          </div>
          <div className="userAvatarContainer">
            <UserAvatarCarousel images={peeps}></UserAvatarCarousel>
          </div>
          <div className="formContainer">
            <Form fields={fieldsConfig} submitAction={handleLogin}></Form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
