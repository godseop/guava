import {v4 as uuid} from 'uuid';

const ComboBox = (props) => {

  const onChange = (e) => {
    console.log(e);
    console.log(props);
    props.onChange(e);
  };

  return (
    <select onChange={onChange}>
      <option key={uuid()} value={''} defaultValue={props.defaultValue === 'undefined'}></option>
      {props.dataSource.map((option) => (
        <option
          key={uuid()}
          value={option.value}
          defaultValue={props.defaultValue === option.value}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default ComboBox;