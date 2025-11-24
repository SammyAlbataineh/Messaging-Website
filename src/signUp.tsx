import "./index.css"; 
function SignUpPage() {
    return (
        <div id="wrapper"> 
            <h2> Signup Form </h2>
            <form id="signup"> 
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