import TestButton from './TestButton';

export default function TestPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-black mb-4">Test Page</h1>
            <p className="text-black mb-6">This is a test page to send data to data base.</p>
            <TestButton />
        </div>
    );
}