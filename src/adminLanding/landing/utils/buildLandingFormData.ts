/**
 * Arma un FormData a partir de un objeto de campos de texto (ignora
 * valores undefined/null) y, opcionalmente, uno o más archivos.
 */
export const buildLandingFormData = (
  fields: Record<string, string | number | undefined | null>,
  files?: Record<string, File | File[] | undefined | null>,
): FormData => {
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    formData.append(key, String(value));
  });

  if (files) {
    Object.entries(files).forEach(([key, value]) => {
      if (!value) return;
      if (Array.isArray(value)) {
        value.forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, value);
      }
    });
  }

  return formData;
};

/** Query string con ?targetEmail=... solo si el admin está editando a otro asesor. */
export const targetEmailParams = (email: string, editandoOtro: boolean) =>
  editandoOtro ? { targetEmail: email } : undefined;
