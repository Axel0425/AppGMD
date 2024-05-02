'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';



const schema = zod.object({
  password: zod.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  confirmPassword: zod.string().min(6, { message: 'La confirmación de la contraseña debe tener al menos 6 caracteres' }),
}).refine(data => data.password === data.confirmPassword, { message: 'Las contraseñas no coinciden' });

type Values = zod.infer<typeof schema>;

const defaultValues: Values = { password: '', confirmPassword: '' };

export function ResetPasswordForm(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      

      setIsPending(false);

      // Redirect to confirm password reset
    },
    [setError]
  );

  return (
    <Stack spacing={4}>
      <Typography variant="h5">RECUPERAR CONTRASEÑA</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Contraseña</InputLabel>
                <OutlinedInput {...field} label="Contraseña" type="password" />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormControl error={Boolean(errors.confirmPassword)}>
                <InputLabel>Confirmar Contraseña</InputLabel>
                <OutlinedInput {...field} label="Confirmar Contraseña" type="password" />
                {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            CAMBIAR
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}