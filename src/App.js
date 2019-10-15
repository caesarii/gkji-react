import React from 'react';
import './App.css';
import { open } from './components/modal-base';
import 'antd/dist/antd.css';

function App() {

  const handleOpenModal = () => {
    open({
      title: '弹窗测试',
      content: 'this is content',
      width: 500
    })
  }

  return (
    <div className="App">
      <button onClick={handleOpenModal}>弹窗</button>
    </div>
  );
}

export default App;
