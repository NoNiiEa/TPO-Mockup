'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ReportData } from '@/types/report';

type ReportFormContextType = {
  reportData: Partial<ReportData>;
  updateReport: (updates: Partial<ReportData>) => void;
  resetReport: () => void;
};

const ReportFormContext = createContext<ReportFormContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'report_form_data';

export const ReportFormProvider = ({ children }: { children: React.ReactNode }) => {
    const [reportData, setReportData] = useState<Partial<ReportData>>({});

    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            setReportData(JSON.parse(stored));
        };
    }, []);

    const deepMerge = (target: any, source: any): any => {
        if (typeof target !== 'object' || typeof source !== 'object') return source;

        const result = { ...target };
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = deepMerge(target[key], source[key]);
            } else {
                result[key] = source[key];
            }
        }
        return result;
    };

    const updateReport = (updates: Partial<ReportData>) => {
        setReportData((prevData) => {
            const newData = deepMerge(prevData, updates);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
            return newData;
        });
    };


    const resetReport = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setReportData({});
    };

    return (
        <ReportFormContext.Provider value={{ reportData, updateReport, resetReport }}>
            {children}
        </ReportFormContext.Provider>
    );
};

export const useReportForm = () => {
    const context = useContext(ReportFormContext);
    if (!context) {
        throw new Error('useReportForm must be used within a ReportFormProvider');
    }
    return context;
};