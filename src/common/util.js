

const util = {

  alert: (message, okCallback) => {
    const okClick = (e) => {
      ReactDOM.unmountComponentAtNode(document.getElementById('alert-div'));
      if (okCallback) {
        okCallback();
      }
    }

    const alert = (
      <div>
        <h1>NOTIFICATION</h1>
        <span>{message}</span>
        <button onClick={okClick}></button>
      </div>
    );

    ReactDOM.render(alert, document.getElementById('alert-div'));
  },

}