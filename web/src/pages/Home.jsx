import { Link } from 'react-router';


function Home() {
    return (
        <main>
            <div>
                <div>
                    <h1>Welcome!</h1>
                    <h3>Sign up and share your library</h3>
                    <div>
                        <Link to="/sign-up">Sign Up</Link>
                        <Link to="/sign-in">Sign In</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;
