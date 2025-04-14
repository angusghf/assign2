import React, { useState } from "react";

function SignUp() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        fetch("http://localhost:3000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
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
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
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
