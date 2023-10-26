import React, { ChangeEvent, FormEvent, memo, useCallback, useMemo, useState } from 'react';

import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { ContactView } from '~/modules/Auth/views/Contact/ContactView';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
};

export const ContactContainer = memo(() => {
  const { contactVisible, contactControls } = useModalsContext();

  const [state, setState] = useState(initialState);

  const disabled = useMemo(() => {
    return !state.firstName || !state.lastName || !state.email || !state.message;
  }, [state]);

  const handleInputChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget;

    setState((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleTextareaChange = useCallback(({ currentTarget }: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = currentTarget;

    setState((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleClosed = useCallback(() => {
    setState(initialState);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (disabled) return;
    },
    [disabled]
  );

  return (
    <ContactView
      {...state}
      disabled={disabled}
      loading={false}
      visible={contactVisible}
      handleInputChange={handleInputChange}
      handleTextareaChange={handleTextareaChange}
      handleClose={contactControls.close}
      handleClosed={handleClosed}
      handleSubmit={handleSubmit}
    />
  );
});
