export default function Home() {
    return (
        <>
            <h1> Hello {localStorage.getItem("userName")} </h1>
        </>
    )
}