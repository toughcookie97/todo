list: [{
      id: 0,
      name: '吃饭',
      status: 0
    }, {
      id: 1,
      name: '睡觉',
      status: 0
    }, {
      id: 2,
      name: '打豆豆',
      status : 0
    }]

import React, { Component } from 'react';
import ListItem from './listItem';
import Dialog from './dialog';
import './main.css';
 
class TodoList extends Component {
  constructor (props) {
    super(props);
     
    //初始任务列表
    this.state = {
      list: [{
        id: 0,
        name: '吃饭',
        status: 0
      }, {
        id: 1,
        name: '睡觉',
        status: 0
      }, {
        id: 2,
        name: '科研',
        status : 0
      }],
      finished: 0
    };
  }
   

  addTask (newitem) {
    var allTask = this.state.list;
    allTask.push(newitem);
    this.setState({
      list: allTask
    });
  }
  
  updateFinished (todoItem) {
    var sum = 0;
    this.state.list.forEach( (item) => {
      if (item.id === todoItem.id) {
        item.status = todoItem.status;
      }
      if (item.status === 1) {
        sum++;
      }
    });
    this.setState({
      finished: sum
    });
  }
 

  updateTotal (todoItem) {
    var obj = [], sum = 0;
    this.state.list.forEach((item) => {
      if (item.id !== todoItem.id) {
        obj.push(item);
        if (item.status === 1 ) {
          sum++;
        }
      }
    });
    this.setState({
      list: obj,
      finished: sum
    });
  }
 
  render () {
    return (
      <div className="container">
        <h1>TodoList</h1>
        <ul>
          { this.state.list.map ((item, index) =>
            <ListItem 
              item={item} 
              finishedChange={this.updateFinished.bind(this)} 
              totalChange={this.updateTotal.bind(this)}
              key={index}
            />
          )}
          <li>{this.state.finished}已完成 / {this.state.list.length}总数</li>
        </ul>
        <Dialog addNewTask={this.addTask.bind(this)} nums={this.state.list.length}/>
      </div>
    );
  }
}
 
export default TodoList;

import React, { Component } from 'react';
 
class ListItem extends Component {
  constructor (props) {
    super(props);
 
    this.handleFinished = this.handleFinished.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  } 
 
  handleFinished () {
    var status = this.props.item.status;
 
    status = (status === 0 ? 1 : 0);
 
    var obj = {
      id: this.props.item.id,
      name: this.props.item.name,
      status: status
    }
     
    this.props.finishedChange(obj); 
  }
 
  handleDelete () {
    this.props.totalChange(this.props.item); 
  }
 
  render () {
    const item = this.props.item;
 
    const unfinish = {
      backgroundColor: '#DFFCB5',
      color: '#2EB872',
    };
 
    const finish = {
      backgroundColor: '#FFFA9D',
      color: '#FF9A3C',
      textDecoration: 'line-through'
    }
 
    var itemStyle = item.status === 0 ? unfinish : finish;
     
    return (
      <li key={item.id} style={itemStyle}>
        <span 
          onClick={this.handleFinished} 
          id={item.id}
          className="check-btn"
          style={{backgroundColor: item.status === 0 ? '#fff' : '#A1EAFB'}}
        ></span>
        <span>{ item.name }</span>
        <span onClick={this.handleDelete} className="delete-btn">删除</span>
      </li>
    );
  }
}
 
export default ListItem;