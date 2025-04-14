import { useState, useEffect } from 'react';
import {useNavigate} from "react-router";

function SignIn( {handleLogin} ) {

    const [loginSuccess, setLoginSucess] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        if(loginSuccess) {navigate("/books")}
    }, [loginSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(formData);

        fetch("http://localhost:3000/users/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json() )
            .then(returnedData => {
                localStorage.setItem("jwt-token", returnedData.jwt);
                setLoginSucess(true);
                console.log(returnedData);
            });
    };


    return (
        <main>
            <div>
                <div>
                    <div>
                        <h1>Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    onChange={(event) => {
                                        setFormData({ ...formData, email: event.target.value })
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    onChange={(event) => {
                                        setFormData({ ...formData, password: event.target.value })
                                    }}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Sign In"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignIn;
