import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";

interface ConfirmDialogProps{
	message: string;
	onConfirm: () => void;	
}

const ConfirmDialog = ({ message, onConfirm, ...props }: ConfirmDialogProps & React.ComponentProps<typeof AlertDialog>) => {
	return (
		<AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
					<VisuallyHidden><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle></VisuallyHidden>
          <AlertDialogDescription>
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-custom text-secondary hover:bg-custom/80" onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
	)
}
export default ConfirmDialog;