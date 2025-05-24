import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupType, signupSchema } from '@/validations/auth.validation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/custom/password-input';
import InputErrorWrapper from '@/components/custom/input-error-wrapper';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Signup = () => {
  const navigate = useNavigate();

  const defaultValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      toast.success('Success', {
        description: response?.data.message,
      });
      reset();
      navigate(`/login`);
    },
  });

  const onSubmit = async (formValues: SignupType) => {
    const data = {
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      password: formValues.password,
    };

    mutate(data);
  };

  return (
    <>
      <main className="lg:w-full lg:flex">
        <div className="relative flex-1 hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Signup in to your account"
            width={500}
            height={500}
            className="absolute object-cover w-full h-screen"
          />
        </div>

        <div className="flex flex-col justify-center flex-1 h-screen">
          <div className="w-[90%] mx-auto">
            <h1 className="sm:text-[24px] font-bold text-lg">
              Create your account
            </h1>
            <p className="text-sm font-semibold sm:text-base">
              Have an account?{' '}
              <Link
                to="/"
                className="font-medium text-primary focus-visible:outline-primary"
              >
                Login
              </Link>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
              <InputErrorWrapper error={errors.firstName?.message}>
                <Input placeholder="First name" {...register('firstName')} />
              </InputErrorWrapper>

              <InputErrorWrapper error={errors.lastName?.message}>
                <Input placeholder="Last name" {...register('lastName')} />
              </InputErrorWrapper>

              <InputErrorWrapper error={errors.email?.message}>
                <Input placeholder="Email address" {...register('email')} />
              </InputErrorWrapper>

              <InputErrorWrapper error={errors.password?.message}>
                <PasswordInput {...register('password')} />
              </InputErrorWrapper>

              <Button
                type="submit"
                layout={'full'}
                isSubmitting={isPending}
                disabled={isPending}
              >
                Create your account
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
