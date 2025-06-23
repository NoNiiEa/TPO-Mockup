import StepNavigator from "@/components/ReportPage/StepNavigator";

export default function TrackStatusPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            {/* StepNavigator full width at the top */}
            <div className="w-full bg-white">
                <div className="mx-auto w-full p-6">
                    <StepNavigator />
                </div>
            </div>
            {/* Content below */}
            <div className="w-full max-w-4xl p-6 flex flex-col items-center">
                <h1 className="text-3xl font-bold text-black mb-4">Report Crime</h1>
                <h1 className="text-black">Report page</h1>
                <p className="text-black">This page will allow users to report the crime.</p>
            </div>
        </div>
    );
}