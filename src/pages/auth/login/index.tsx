import { useForm } from 'react-hook-form';
import { loginSchema, LoginType } from '@/validations/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { login as loginUser } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import InputErrorWrapper from '@/components/custom/input-error-wrapper';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/custom/password-input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useCurrentUserState } from '@/stores/user.store';
import { useAuth } from '@/guard/auth-guard';

const Login = () => {
  const { setCurrentUser } = useCurrentUserState();
  const { login } = useAuth();

  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const { accessToken, ...data } = response.data;
        sessionStorage.setItem('session-token', accessToken);
        setCurrentUser(data);
        login();
        reset();
      }
    },
  });

  const onSubmit = async (formValues: LoginType) => {
    const data = {
      email: formValues.email,
      password: formValues.password,
    };

    mutateAsync(data);
  };

  return (
    <>
      <main className="md:w-full md:flex lg:gap-5">
        <div className="relative flex-1 hidden md:block">
          <img
            src="/images/login.jpg"
            alt="Log in to your account"
            width={500}
            height={500}
            className="absolute object-cover w-full h-screen"
          />
        </div>

        <div className="flex flex-col justify-center flex-1 h-screen md:px-10 xl:px-12 2xl:px-16">
          <h1 className="sm:text-[24px] font-bold text-lg">
            Login in to your account
          </h1>
          <p className="text-sm font-semibold sm:text-base">
            {"Don't have an account?"}{' '}
            <Link to="/signup" className="font-medium text-blue-600">
              Sign Up
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
            <InputErrorWrapper error={errors.email?.message}>
              <Input
                type="email"
                placeholder="Email address"
                {...register('email')}
              />
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
              Login
            </Button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
