import { useState, useEffect } from 'react';

function SignIn() {
    const handleSubmit = (e) => {
        e.preventDefault();
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
                                <input type="email" id="email" name="email" />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" />
                            </div>
                            <input type="submit" value="Sign In" />
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignIn;
