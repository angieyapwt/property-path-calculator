import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
const sans=DM_Sans({variable:'--font-sans',subsets:['latin']});
const serif=Playfair_Display({variable:'--font-serif',subsets:['latin']});
export const metadata:Metadata={title:'Property Path Calculator | Estate Basics',description:'Estimate what your first HDB, first condo, or HDB-to-condo move may require.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>}
