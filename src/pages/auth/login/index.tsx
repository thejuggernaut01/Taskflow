import { useForm } from 'react-hook-form';
import { loginSchema, LoginType } from '@/validations/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { login as loginUser } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import InputErrorWrapper from '@/components/custom/input-error-wrapper';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/custom/password-input';
import { Button } from '@/components/ui/button';
// import { useCurrentUserState } from '@/stores/user.store';

const Login = () => {
  // const { setCurrentUser } = useCurrentUserState();

  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
    // reset,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginUser,
    // onSuccess: (response) => {
    //   if (response.status === 200 || response.status === 201) {
    //     // Success logic goes here
    //     reset();
    //   }
    // },
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
    </>
  );
};

export default Login;
