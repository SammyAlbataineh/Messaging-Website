import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate(); 
    const goToSignup = () => {
        navigate("/signup"); 
    }
    return (
        <div> 
            <h1> Messaging </h1>
            <button onClick={goToSignup}> Sign Up </button>
        </div>
    )
}
export default Home;