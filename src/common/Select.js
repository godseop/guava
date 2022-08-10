const Select = (props) => {

  const onChange = (e) => {
    props.onChange(e.target.value);
  }

  return (
    <>
      <select onChange={onChange}
              defaultValue={props.defaultValue}>
        <option key={''} value={''}>''</option>
        {
          props.dataSource.map(data => {
            return (
              <option key={data.value} value={data.value}>{data.name}</option>
            );
          })
        }
      </select>
    </>
  );
}

export default Select;