import React, { ChangeEvent, useState } from 'react';

type UseInputState<T> = [
  data: T,
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  setFormData: React.Dispatch<React.SetStateAction<T>>
];

export const useInputState = <T>(initialState: T): UseInputState<T> => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value: string | number | boolean | File | undefined;

    switch (e.target.type) {
      case 'checkbox':
        value = (e.target as HTMLInputElement).checked;
        break;
      case 'file':
        value = (e.target as HTMLInputElement).files ? (e.target as HTMLInputElement).files?.[0] : undefined;
        break;
      default:
        value = e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
    }

    setFormData(cs => ({ ...cs, [e.target.name]: value }));
  };

  return [formData, handleChange, setFormData];
};
