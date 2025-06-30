import { ReportData } from "@/types/report";

export const HandleSubmitReport = async (reportData: Partial<ReportData>) => {
    const reoortBody = JSON.stringify(reportData);

    try {
        const response = await fetch("/api/report", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: reoortBody
        })

        if (!response.ok) {
            throw new Error("Failed to submit report");
        }

        const result = await response.json();
        console.log("Report submitted successfully:", result);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}