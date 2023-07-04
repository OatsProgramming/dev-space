import type { RefObject, PointerEvent } from "react"

export default function toggleDialog(dialogRef: RefObject<HTMLDialogElement>, e?: PointerEvent) {
    // Prevent accidental submission
    e?.preventDefault()

    const dialog = dialogRef.current
    if (!dialog) return
    else if (dialog.open) dialog.close()
    else dialog.showModal()
}
