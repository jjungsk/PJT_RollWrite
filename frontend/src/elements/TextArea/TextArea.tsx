import React from "react";
import { TextAreaContainer } from "./style";

interface Props {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
}
export default function TextArea({ onChange, value }: Props) {
  return (
    <div>
      <TextAreaContainer onChange={onChange} value={value} />
    </div>
  );
}
