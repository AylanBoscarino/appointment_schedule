import { FormControl, Input, InputLabel, InputProps } from '@material-ui/core';
import React from 'react';
import MaskedInput from 'react-text-mask';

interface Props extends InputProps {}

export default function PhoneInput(props: Props) {
  return (
    <>
      <FormControl>
        <InputLabel htmlFor="formatted-text-mask-input">
          Telefone com DDD
        </InputLabel>
        <Input
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom as any}
          {...props}
        />
      </FormControl>
    </>
  );
}

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        ')',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
    />
  );
}
