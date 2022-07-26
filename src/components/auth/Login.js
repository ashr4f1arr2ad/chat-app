import React, {useState} from "react";
import { Link } from "react-router-dom";
import BgImg from "../../images/bg-01.jpg";
import "./style.css";
import AuthUser from "./AuthUser";
import LoadingSpinner from "./LoadingSpinner";

export default function Login() {
	const { http, setToken } = AuthUser();

	const [loading, setLoading] = useState(false);
	const [errorList, setErrorList] = useState([]);
	const [error, setError] = useState();

	// console.log(getToken());

	const [inputs, setInputs] = useState({
		email: "",
		password: ""
	});

	const handleChange = (e) => {
		const {name, value} = e.target;
		// console.log({[name]: value});
		setInputs({...inputs, [name]: value});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			email:inputs.email,
			password:inputs.password
		}

		setLoading(true);
		http.post('/login', data).then((res) => {
		console.log(res);
		console.log(res.data.users);
			if(res.data.status === 404) {
				setErrorList(res.data.validate_err);
				// console.log(res.data.validate_err);
				setLoading(false);
			} else if(res.data.status === 401) {
				setError(res.data.error);
				// console.log(res.data.error);
				setLoading(false);
			} else {
				setToken(res.data.access_token, res.data.user, res.data.users, res.data.messages);
				setLoading(false);
			}
		})
	}

	return (
		<div className="__div" style={{ backgroundImage: `url(${BgImg})` }}>
			<div className="container">
				<form className="form" onSubmit={handleSubmit}>
					<h3>Log in</h3>
					<div className="form-group">
						<label>Email</label>
						<input type="email" className="form-control" name="email" placeholder="Enter email" onChange={handleChange} value={inputs.email} />
						<span style={{color: 'red', display: 'block', marginTop: '5px'}}>{errorList.email}</span>
					</div>

					<div className="form-group">
						<label>Password</label>
						<input type="password" className="form-control" name="password" placeholder="Enter password" onChange={handleChange} value={inputs.password} />
						<span style={{color: 'red', display: 'block', marginTop: '5px'}} className="text-slate-200">{errorList.password}</span>
					</div>

					{/* <div className="form-group">
						<div className="custom-control custom-checkbox">
							<input type="checkbox" id="customCheck1" />
							<label htmlFor="customCheck1">Remember me</label>
						</div>
					</div> */}

					<button type="submit">{loading ? <LoadingSpinner/> : <span>Log In</span> }</button>
					<span style={{color: 'red', display: 'block', marginTop: '10px'}} className="text-slate-200">{error}</span>
					{/* <p className="forgot-password text-right">Forgot <a href="#">password?</a></p> */}
					<p className="forgot-password text-right">Don't have an account <Link to="/register">Register?</Link></p>
				</form>
			</div>
		</div>
	);
}