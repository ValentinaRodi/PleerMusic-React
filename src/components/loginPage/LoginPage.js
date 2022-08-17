/* eslint-disable eqeqeq */
import  './loginPage.css'
import logo from  './logo.png'
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function LoginPage() {
    const navigate = useNavigate();

    const  reg_first_func = (e) =>{
        e.preventDefault();
        const reg_first = document.querySelector(".reg_first");
        const login_button = document.querySelector(".login_button");
        const password_next = document.querySelector(".password_next");
        const reg_next = document.querySelector(".reg_next");
        login_button.style = "display:none";
        reg_first.style = "display:none";
        password_next.style = "display:block";
        reg_next.style = "display:block";
    }

    const sendLogin = (e) =>{
        e.preventDefault();
        console.log(e);
        const inputs = [".login_input_login",".password_first"];
        const loginInputs = document.querySelectorAll(inputs);
        const login = document.querySelector(".login_input_login").value;
        const password = document.querySelector(".password_first").value;
        for(let inp of loginInputs){
            if(inp.value == ""){
                inp.style = "border:1px solid red;border-radius: 6px"
            }
        }
        if(login != "" && password != ""){
            localStorage.setItem('user', login);
            navigate('./MainPage', {replace: true})
            // const data = {
            //     email: login,
            //     password: password
            // }
            // axios.post('http://84.201.139.95:8000/user/login/',data)
            // .then(res => {
            // const resault = res.data;
            // console.log(resault);
            // })
            // .catch(err => {
            //     const errors = err.data;
            //     console.log(errors);
            //     })
        }
    }

    const inpClick = (e) =>{
        e.preventDefault();
        console.log(e);
        e.target.style = "border: none; border-bottom:1px solid #D0CECE"
    }

    return (
        <div className="form_wrap">
            <div className="form_box">
                <img className="logo_form" src={logo} alt="logo" />
                <form className="login_form" action="">
                    <input onClick={inpClick} className="login_input login_input_login" type="text" placeholder="Логин" />
                    <input onClick={inpClick} className="login_input login_input_password password_first" type="text" placeholder="Пароль" />
                    <input onClick={inpClick} className="login_input login_input_password password_next" type="text" placeholder="Повторите пароль" />
                    <div className="buttons_block">
                        <button onClick={sendLogin} className="login_button">Войти</button>
                        <button onClick={reg_first_func} className="reg_button reg_first">Зарегистрироваться</button>
                        <button className="reg_button reg_next">Зарегистрироваться</button>
                    </div>

                </form>
            </div>
            
        </div>
    )
  }
  