import { useMutation } from "@tanstack/react-query";
import {
  loginClient,
  loginHotelier,
  resetPasswordHotelier,
  sendRecoveryEmailHotelier,
  resetPasswordClient,
  sendRecoveryEmailClient,
  registerClient,
  registerHotelier,
  updateClientData,
} from "../services";
import {
  RegisterClientFormInputsWithoutConfirmPassword,
  RegisterHotelierFormInputsWithoutConfirmPassword,
} from "../forms/register-form";
import { UpdateClientFormInputs } from "../forms/update-form";

export function useLoginClientMutation() {
  return useMutation({
    mutationFn: loginClient,
  });
}
export function useResetPasswordClientMutation() {
  return useMutation({
    mutationFn: resetPasswordClient,
  });
}

export function useSendRecoveryEmailClientMutation() {
  return useMutation({
    mutationFn: sendRecoveryEmailClient,
  });
}

export function useRegisterClientMutation() {
  return useMutation({
    mutationFn: (data: RegisterClientFormInputsWithoutConfirmPassword) =>
      registerClient(data),
  });
}

export function useLoginHotelierMutation() {
  return useMutation({
    mutationFn: loginHotelier,
  });
}

export function useResetPasswordHotelierMutation() {
  return useMutation({
    mutationFn: resetPasswordHotelier,
  });
}

export function useSendRecoveryEmailHotelierMutation() {
  return useMutation({
    mutationFn: sendRecoveryEmailHotelier,
  });
}

export function useRegisterHotelierMutation() {
  return useMutation({
    mutationFn: (data: RegisterHotelierFormInputsWithoutConfirmPassword) =>
      registerHotelier(data),
  });
}

//mutation para atualizar dados do cliente
export function useUpdateClientMutation() {
  return useMutation({
    mutationFn: ({ data, id }: { data: UpdateClientFormInputs; id: string }) =>
      updateClientData(data, id),
  });
}
