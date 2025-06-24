import { redirect } from "next/navigation";

export default function TrackStatusPage() {
    return (
        redirect("/report/step-one")
    );
}