import { toast } from "sonner";

export const successNotify = (message) => toast.success(message);
export const failureNotify = (message) => toast.error(message);