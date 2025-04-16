// importing react hooks and navigation functions
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

function SignIn() {

    // tracking tosee if the user is logged in
    const [loginSuccess, setLoginSucess] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    // setting up function to let users navigate
    const navigate = useNavigate();

    useEffect(() => {
        // if login successful, navigate to the books page
        if (loginSuccess) { navigate("/books") }
    }, [loginSuccess]);

    const handleSubmit = (e) => {
        // prevent refresh
        e.preventDefault();

        // console.log(formData);

        fetch("http://localhost:3000/users/sign-in", {
            // sending data
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // convert info into readable JSON
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(returnedData => {
                // save login token to local storage
                localStorage.setItem("jwt-token", returnedData.jwt);
                setLoginSucess(true);
                // logging what the server sent back
                console.log(returnedData);
            });
    };

    return (
        <main>
            <div>
                <div>
                    <div>
                        {/* inserting some basic headers */}
                        <h1>Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                {/* nothing really flashy, just the barebones functionality */}
                                <label htmlFor="email">Email</label>
                                <input
                                // our input field for email
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
                                // input field for password
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
                            // adding a signin button
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
