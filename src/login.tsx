import "./index.css";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
function Login(): JSX.Element {
    const navigate = useNavigate(); 
    async function submitted(e: React.FormEvent) {
        e.preventDefault(); 
        const form = e.target as HTMLFormElement; 
        const formData = new FormData(form); 
        const username = String(formData.get("username")); 
        const email = String(formData.get("email")); 
        const password = String(formData.get("password"));
        if (username === "" || email === "" || password === "") {
            alert("Not all details are filled in"); 
            return; 
        }
        const user = {
            username: username, 
            email: email, 
            password: password
        };
        console.log("logging in");
        const response: any = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).catch(err => console.log("Fetch failed:", err));
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("user",JSON.stringify(data.user)); 
            navigate("/home"); 
        } else {
            alert(data.message); 
        }
}
    return (
        <div id="wrapper"> 
            <h2> Login </h2>
            <form  onSubmit={submitted} id="login"> 
                <label htmlFor="username"> Username </label> <br/>
                <input type="text" id="username" name="username"/> <br/>
                <label htmlFor="email"> Email </label> <br/>
                <input type="email" id="email" name="email"/> <br/>
                <label htmlFor="password"> Password </label> <br/>
                <input type="password" id="password" name="password"/> <br/>
                <input type="submit" value="Login"/> <br/>
            </form>
            <GoogleLogin onSuccess={(credentialResponse: any) => {
                console.log(jwtDecode(credentialResponse.credential)); 
            }} onError={() => {console.log("login failed")}}/>
        </div>
    )
}
export default Login; 