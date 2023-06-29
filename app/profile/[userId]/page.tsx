export default function Page({ params: { userId }}: {
    params: { userId: string }
}){
    return (
        <div>
            User: {userId}
        </div>
    )
}