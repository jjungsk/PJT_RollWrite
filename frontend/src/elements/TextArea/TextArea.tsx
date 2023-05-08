import React from "react";
import { TextAreaContainer } from "./style";

interface Props {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
}
export default function TextArea({ onChange, value }: Props) {
  return (
    <TextAreaContainer onChange={onChange} value={value}></TextAreaContainer>
  );
}
