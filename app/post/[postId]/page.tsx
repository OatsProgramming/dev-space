export default function Page({ params: { postId }}: {
    params: { postId: string }
}) {
    return (
        <div>
            {postId}
        </div>
    )
}