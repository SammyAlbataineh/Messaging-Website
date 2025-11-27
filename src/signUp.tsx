import "./index.css"; 
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
function SignUpPage(): JSX.Element {
    const navigate = useNavigate(); 
    async function submitted(e: React.FormEvent) {
        e.preventDefault(); 
        const form = e.target as HTMLFormElement; 
        const formData = new FormData(form); 
        const username = String(formData.get("username")); 
        const email = String(formData.get("email")); 
        const password = String(formData.get("password"));
        const confirmPassword = String(formData.get("confirmPassword")); 
        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            alert("Not all details are filled in"); 
            return; 
        }
        if (password != confirmPassword) {
            alert("Passwords do not match"); 
            return; 
        } 
        const salt = bcrypt.genSaltSync(10);
        const user = {
            username: username, 
            email: email, 
            password: bcrypt.hashSync(password,salt)
        };
        await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        });
        navigate("/home"); 
    }
    return (
        <div id="wrapper"> 
            <h2> Signup </h2>
            <form onSubmit={submitted} id="signup"> 
                <label htmlFor="username"> Username </label> <br/>
                <input type="text" id="username" name="username"/> <br/>
                <label htmlFor="email"> Email </label> <br/>
                <input type="email" id="email" name="email"/> <br/>
                <label htmlFor="password"> Password </label> <br/>
                <input type="password" id="password" name="password"/> <br/>
                <label htmlFor="confirmPassowrd"> Confirm Password </label> <br/>
                <input type="password" id="confirmPassword" name="confirmPassword"/> <br/>
                <input type="submit" value="Sign Up"/> <br/>
            </form>
        </div>
    )
}

export default SignUpPage;