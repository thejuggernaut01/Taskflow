import { useForm } from 'react-hook-form';
import { loginSchema, LoginType } from '@/validations/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { login as loginUser } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import InputErrorWrapper from '@/components/custom/input-error-wrapper';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/custom/password-input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUserState } from '@/stores/user.store';
import { useAuth } from '@/guard/auth-guard';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
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
        const { accessToken, createdAt, updatedAt, ...user } =
          response.data.data;
        sessionStorage.setItem('session-token', accessToken);
        setCurrentUser(user);
        login();
        toast.success('Success', {
          description: response?.data.message,
        });
        reset();
        navigate(`/dashboard`);
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
      <main className="lg:w-full lg:flex">
        <div className="relative flex-1 hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1339&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Log in to your account"
            width={500}
            height={500}
            className="absolute object-cover w-full h-screen"
          />
        </div>

        <div className="flex flex-col justify-center flex-1 h-screen">
          <div className="w-[90%] mx-auto">
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
        </div>
      </main>
    </>
  );
};

export default Login;
