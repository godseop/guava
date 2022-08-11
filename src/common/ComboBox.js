import {forwardRef} from "react";

const ComboBox = forwardRef((props, ref) => {

  const onChange = (e) => {
    props.onChange(e);
  };

  return (
    <select ref={ref}
            defaultValue={props.defaultValue}
            onChange={onChange}>
      <option key={0} value={''}>{''}</option>
      {props.dataSource.map((option, index) => (
        <option key={index + 1} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
});

export default ComboBox;