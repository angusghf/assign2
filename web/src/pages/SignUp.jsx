// importing react library 
import React, { useState } from "react";

function SignUp() {

    // storing the user's input for email, password and confirm password
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // checking to see if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            // does a return if passwords dont match
            return;
        }

        fetch("http://localhost:3000/users/", {
            // sending data to server
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // converts response into readable json
            body: JSON.stringify(formData)
        })
        .then( response => response.json() )
        .then(returnedJSON => {
            console.log(returnedJSON);
        });

    };

    return (
        <main>
            <div>
                <div>
                    <div>
                        {/* again, our basic information...no fancy styling */}
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                // input for email
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    onChange={(event) => {
                                        setFormData({ ...formData, email: event.target.value });
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                // input for password
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    name="password"
                                    required
                                    onChange={(event) => {
                                        setFormData({ ...formData, password: event.target.value });
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input type="password"
                                // but also input for confirm password
                                    id="confirm-password"
                                    placeholder="Retype Password"
                                    name="confirm-password"
                                    onChange={(event) => {
                                        setFormData({ ...formData, confirmPassword: event.target.value });
                                    }}
                                />
                            </div>
                            <input type="submit" value="Register" />
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignUp;
