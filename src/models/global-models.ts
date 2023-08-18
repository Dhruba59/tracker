import { ReactNode, SetStateAction } from 'react';

export interface AppErrorType {
  error: {
    error: string;
    message: string[];
    statusCode: number;
  };
  message: string;
  statusCode: number;
  time: string;
}

export interface ResponseType {
  statusCode: number;
  error: boolean;
  message: string;
  payload?: any;
  timestamp?: string;
  path?: string;
}

export interface PaginationResponseType {
  total: number;
  page: number;
  limit: number;
}

export interface OptionType {
  value: number | string;
  label: ReactNode;
}

export interface GenericOptionType<T> {
  value: T;
  label: ReactNode;
}

export type MessageType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export interface CreationTabsProps {
  currentCampaignType: string;
  currentStep: number;
  setCurrentStep: (data: SetStateAction<number>) => void;
}

export interface CreationTabProps {
  line: number;
  text: string;
  tabStep: number;
}
