import {forwardRef} from "react";

const TextBox = forwardRef((props, ref) => {

  const onChange = (e) => {
    props.onChange(e);
  }

  return (
    <>
      <input ref={ref} type='text' value={props.value} onChange={onChange}/>
    </>
  );
})

export default TextBox;