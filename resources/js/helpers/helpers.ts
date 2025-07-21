import { StatusPermohonanNikah, User } from "@/types";
import { usePage } from "@inertiajs/react";

interface FormErrors {
  [key: string]: string | string[];
}

export const useFormError = () => {
  const { errors } = usePage<{ errors: FormErrors }>().props;

  const pathToKey = (path: string | (string | number)[]): string =>
    Array.isArray(path) ? path.filter(Boolean).join('.') : path;

  const getError = (path: string | (string | number)[]): string | undefined => {
    const key = pathToKey(path);
    const err = errors[key];
    return Array.isArray(err) ? err[0] : err;
  };

  const getNestedError = (...segments: (string | number)[]): string | undefined =>
    getError(segments);

  const hasError = (path: string | (string | number)[]): boolean =>
    Boolean(errors[pathToKey(path)]);

  const hasNestedError = (...segments: (string | number)[]): boolean =>
    hasError(segments);

  return {
    errors,
    getError,
    getNestedError,
    hasError,
    hasNestedError,
  };
};


// export function hasRole(user: User, role: string): boolean {
//     return user.roles.includes(role);
// }

export function hasRole(user: User, roles: string[]) {
    return user.roles.some(r => roles.includes(r));
}

export const getStatusBadgeClass = (status: string): string => {
  if (status.startsWith('Menunggu')) {
    return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
  }

  if (status.startsWith('Diverifikasi')) {
    return 'bg-blue-100 text-blue-800 border border-blue-300';
  }

  if (status.startsWith('Ditolak')) {
    return 'bg-red-100 text-red-800 border border-red-300';
  }

  if (status === 'Selesai') {
    return 'bg-green-100 text-green-800 border border-green-300';
  }

  return '';
};
export const getStatusBadgeClassKecamatan = (status: string): string => {
  if (status.startsWith('Menunggu')) {
    return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
  }

  if (status.startsWith('Diverifikasi')) {
    return 'bg-green-100 text-green-800 border border-green-300';
  }

  if (status.startsWith('Ditolak')) {
    return 'bg-red-100 text-red-800 border border-red-300';
  }

  if (status === 'Selesai') {
    return 'bg-green-100 text-green-800 border border-green-300';
  }

  return '';
};

export const getProgressColor = (value: number) => {
        if (value <= 20) return 'bg-yellow-400';
        if (value <= 40) return 'bg-orange-400';
        if (value <= 60) return 'bg-amber-500';
        if (value <= 80) return 'bg-blue-500';
        return 'bg-green-500';
    };
