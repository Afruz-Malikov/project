import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Input from "../../../components/Input/Input.jsx";
import Button from "../../../components/Button/Button.jsx";
import axios from "../../../utils/axios.js";


const Register = () => {
	const navigate = useNavigate();
	const [checkRegex, setCheckRegex] = useState(false);
	const [isUser, setIsUser] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(true);
	const [hidePassword, setHidePassword] = useState();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	useEffect(() => {
		setHidePassword(isPasswordVisible ? "text" : "password");
	}, [isPasswordVisible]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const changeStateEye = (e) => {
		setIsPasswordVisible(e);
	};

	// function checkUser() {

	// }

	const handleSumbit = async (e) => {
		e.preventDefault();

		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
		const validateRegex = emailRegex.test(formData.email) && passwordRegex.test(formData.password);
		const email = formData.email;

		//  find
		const findUser = false;

		if (validateRegex) {
			setCheckRegex(false);
			if (!findUser) {
				try {
					// await axios.post("register", formData);
					navigate("send", { state: { email } });
				} catch (error) {
					console.error(error);
				}
			} else {
				setIsUser(true);
			}
		} else {
			setCheckRegex(true);
		}
	};

	return (
		<div className={styles.register}>
			{/* <Title className={styles.register__title}>Регистрация</Title> */}
			<h1 className={styles.register__title}>Регистрация</h1>
			<form className={styles.form} onSubmit={handleSumbit}>
				<div className={styles.field}>
					<label htmlFor="email">
						<p className={styles.field__text}>Email</p>
						<Input
							required
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange} />
					</label>
				</div>

				<div className={styles.field}>
					<label htmlFor="password">
						<p className={styles.field__text}>Пароль</p>
						<Input
							required
							id="password"
							name="password"
							type={hidePassword}
							isEyeVisible={true}
							defaultEye={false}
							showPassword={changeStateEye}
							value={formData.password}
							onChange={handleChange} />
						<p className={styles.field__text__password}>Не менее 8 символов</p>
					</label>
				</div>

				<div className={styles.links}>
					{checkRegex ? (
						<div className={styles.reset__password}>
							Пароль должен содержать не менее 8 символов <br />и включать в себя хотя бы одну букву{" "}
							<br />и одну цифру.
						</div>
					) : (
						<></>
					)}

					{isUser ? (
						<div>
							<p className={styles.reset__password}>Такой аккаунт уже есть.</p>
							<Link to="/auth/reset/newpassword">Сбросьте пароль</Link>
						</div>
					) : (
						<></>
					)}

					<Button type="submit" title={"Зарегистрироваться"} />
					<div className={styles.links__login}>
						<p>Уже есть аккаунт ?</p>
						<Link to="/auth/login">Войдите</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Register;
