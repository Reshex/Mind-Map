import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Loading from "@/components/loading/Loading";

type LoadingAlertProps = {
    isOpen: boolean;
    onClose: () => void;
};

function LoadingAlert({ isOpen, onClose }: LoadingAlertProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent >
                <AlertDialogHeader >
                    <AlertDialogTitle></AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className="text-center mb-4">
                </AlertDialogDescription>
                <div className="flex justify-center mb-4">
                    <Loading />
                </div>
                <AlertDialogFooter>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default LoadingAlert;
