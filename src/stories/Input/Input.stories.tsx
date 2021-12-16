import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from './Input';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormInputs {
  firstName: string;
  password: string;
}

const FormComponent = () => {
  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required('First name is a required field')
      .max(4, 'First name must be at most 4 characters'),
    password: yup
      .string()
      .required('Password is a required field')
      .min(2, 'Password must be at least 2 characters')
      .max(4, 'Password must be at most 4 characters'),
  });

  const methods = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.log('data', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
        {/* The id has to be the same as present in IFormInputs interface and yup validation schema */}
        Input with text: <Input id='firstName'></Input>
        <br />
        Input with password: <Input id='password' type='password'></Input>
        <br />
        <input type='submit' value='Submit' />
      </form>
    </FormProvider>
  );
};

const Template: ComponentStory<typeof FormComponent> = () => <FormComponent />;

export const Default = Template.bind({});

export default {
  title: 'Form elements/Input',
  component: Input,
} as ComponentMeta<typeof Input>;
