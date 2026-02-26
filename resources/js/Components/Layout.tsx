import Navbar from './Navbar';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#111315] text-white">
            <Navbar />
            {children}
        </div>
    );
}
