export default function Page({ params: { username }}: {
    params: { username: string }
}){
    return (
        <div>
            Hello {username}
        </div>
    )
}