import { Dispatch, SetStateAction } from "react";

export interface ConfirmationCardProps {
  email: string;
}

export interface ValueType {
  step: number;
  email: string;
}

export interface ResetPasswordProps {
  setValues: Dispatch<SetStateAction<ValueType>>;
};