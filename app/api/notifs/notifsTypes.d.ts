type NotifProps = {
    title: string,
    body: string,
    createdAt: Date | 'now'
}

type NotifsReq = {
    notifs?: NotifProps[]
}