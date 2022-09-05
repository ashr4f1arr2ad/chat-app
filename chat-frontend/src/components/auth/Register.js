import React, {useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import BgImg from "../../images/bg-01.jpg";
import "./style.css";
import LoadingSpinner from "./LoadingSpinner";

export default function Register() {
    const navigate = useNavigate();

    const [errorList, setErrorList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [picture, setImage] = useState("");

    const [inputs, setInputs] = useState({
        fname: '',
        lname: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
		const {name, value} = e.target;
		// console.log({[name]: value});
		setInputs({...inputs, [name]: value});
	}

    const handleImage = (e) => {
        setImage(e.target.files[0]);
	}
    
    // console.log(picture);

    const handleSubmit = async (e) => {
		e.preventDefault();
        
        const fData = new FormData();
        fData.append('image', picture);
        fData.append('fname', inputs.fname);
        fData.append('lname', inputs.lname);
        fData.append('email', inputs.email);
        fData.append('password', inputs.password);

		// const data = {
        //     fname:inputs.fname,
        //     lname:inputs.lname,
		// 	email:inputs.email,
		// 	password:inputs.password,
        //     image:fData
		// }
        
		setLoading(true);
		const res = await axios.post('http://127.0.0.1:8000/api/register', fData);
		// console.log(res.data);
		if(res.data.status === 401) {
            setErrorList(res.data.validate_err);
            setLoading(false);
		} else {
            navigate('/login');
            setLoading(false);
        }
	}

    return (
        <div className="__div" style={{backgroundImage: `url(${BgImg})`}}>
            <div className="container">
                <form className="form" onSubmit={handleSubmit}>
                    <h3>Register</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" name="fname" className="form-control" placeholder="First name" onChange={handleChange} value={inputs.fname} />
                        <span style={{color: 'red', display: 'block', marginTop: '10px'}}>{errorList.fname}</span>
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" name="lname" className="form-control" placeholder="Last name" onChange={handleChange} value={inputs.lname} />
                        <span style={{color: 'red', display: 'block', marginTop: '10px'}}>{errorList.lname}</span>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter email" onChange={handleChange} value={inputs.email} />
                        <span style={{color: 'red', display: 'block', marginTop: '10px'}}>{errorList.email}</span>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={handleChange} value={inputs.password} />
                        <span style={{color: 'red', display: 'block', marginTop: '10px'}}>{errorList.password}</span>
                    </div>

                    <div className="form-group file">
                        <label>Profile Picture</label>
                        <input type="file" className="form-control" onChange={handleImage}/>
                        <span style={{color: 'red', display: 'block', marginTop: '10px'}}>{errorList.image}</span>
                    </div>

                    <button type="submit">{loading ? <LoadingSpinner/> : <span>Register</span> }</button>
                    <p className="forgot-password text-right">Already registered <Link to="/login">log in?</Link></p>
                </form>
            </div>
        </div>
    );
}