export const toJsonFile = (value: Record<string, unknown>, fileName = 'file') => {
  const blob = new Blob([JSON.stringify(value)], { type: 'application/json' });

  return new File([blob], fileName);
};

export const readFile = <R>(target: File | Blob, callback: (resutl: R | null) => void) => {
  const res = new FileReader();

  res.addEventListener('load', () => {
    callback(res.result as unknown as R | null);
  });

  res.readAsArrayBuffer(target);
};
