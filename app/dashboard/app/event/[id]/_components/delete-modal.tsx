"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { useEventDelete } from "@/hooks/use-event-app"
import { DELETE_APPLICATION } from "../action"



export const DeleteEventAppModal = () => {
    const { open, appId, onClose } = useEventDelete()

    const { mutate: deleteApp, isPending } = useMutation({
        mutationFn: DELETE_APPLICATION,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-app"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-app"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Application deleting...", {
            id: "delete-app"
        })
        deleteApp(appId)
    }

    return (
        <AlertDialog open={open && !!appId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete application
                        and remove the data from your servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isPending}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}