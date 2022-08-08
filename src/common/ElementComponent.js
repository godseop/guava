import React, {useEffect, useState} from 'react';


const ElementComponent = (props) => {

  const {field, value, headerText, edit, editType, onChangeElement} = props;

  const [data, setData] = useState({
    [field]: '',
  });

  useEffect(() => {
    setData({
      [field]: value,
    });
  }, []);


  const onChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setData({
      [name]: value,
    });
  }

  const onBlur = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    onChangeElement({
      [name]: value,
    });
  }

  return (
    <tr>
      <td>{headerText}</td>
      {edit
        ?
        <td>
          <input type={editType} name={field} value={data[field]} onChange={onChange} onBlur={onBlur}/>
        </td>
        :
        <td>
          {data[field]}
        </td>
      }
    </tr>
  );
}

export default ElementComponent;

