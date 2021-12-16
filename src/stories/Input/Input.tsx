import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import './Input.scss';

export interface InputProps {
  id: string;
  type?: string;
}

export const Input: FC<InputProps> = ({ id, type = 'text' }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <input type={type} {...register(id)} />
      <br />
      {errors[id] && errors[id]?.message && (
        <span className='error'>{errors[id].message}</span>
      )}
    </div>
  );
};
