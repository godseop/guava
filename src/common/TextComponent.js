import {forwardRef} from "react";

const TextComponent = forwardRef((props, ref) => {

  const onChange = (e) => {
    props.onChange(e.target.value);
  }

  return (
    <>
      <input ref={ref} type='text' value={props.value} onChange={onChange}/>
    </>
  );
})

export default TextComponent;