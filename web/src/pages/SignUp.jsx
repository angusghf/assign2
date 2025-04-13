import React, { useState } from 'react';

function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();

    console.log(formData);

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
                                <input type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                onChange={ (event) => {

                                }}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" placeholder="Password" name="password" />
                            </div>
                            <div>
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input type="password" id="confirm-password" placeholder="Retype Password" name="confirm-password" />
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
