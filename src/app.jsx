import React, { Component } from 'react';
import reactDom from 'react-dom';
import './app.css';
import Habits from './components/habits';
import Navbar from './components/navbar';

class App extends Component {
  state = {
    habits: [
        {id: 1, name: 'Reading', count: 0}, 
        {id: 2, name: 'Running', count: 0}, 
        {id: 3, name: 'Coding', count: 0}
    ]
  }

  handleIncrement = (habit) => {
    const habits = this.state.habits.map(item => { // 새로운 로컬 변수인 habits는 state에 있는 habits을 빙글빙글 돌면서 기존에 있는 item을 다른 걸로 바꾼다
      if(item.id === habit.id) { // 만약 item의 id가 업데이트해야 되는 habit의 id와 동일하다면
        return { ...habit, count: habit.count + 1}; // 새로운 habit을 리턴. 다른 것은 다 똑같이 복사해 오고 count만 habit의 count + 1로 덮어 쓴다
      }
      return item; // id가 같지 않다면 기존에 받은 item을 리턴
    })
    this.setState({habits}); // state에 반영
  }

  handleDecrement = (habit) => {
    const habits = this.state.habits.map(item => { // 새로운 로컬 변수인 habits는 state에 있는 habits을 빙글빙글 돌면서 기존에 있는 item을 다른 걸로 바꾼다
      if(item.id === habit.id) { // 만약 item의 id가 업데이트해야 되는 habit의 id와 동일하다면
        const count = habit.count - 1; // count에 -1을 새로 저장해주고
        return { ...habit, count: count < 0 ? 0 : count}; // 새로운 habit을 리턴. 다른 것은 다 똑같이 복사해 오고 count만 0보다 작을 때는 0을, 그렇지 않을 땐 새로운 count로 덮어 쓴다
      }
      return item; // id가 같지 않다면 기존에 받은 item을 리턴
    })
    this.setState({habits}); // state에 반영
  }

  handleDelete = (habit) => {
    const habits = this.state.habits.filter(item => item.id !== habit.id); // 새로운 로컬변수 habits에 this.state에 있는 habits을 빙글빙글 돌면서 item을 전달받아 배열에 있는 item의 id가 habit의 아이디와 동일하지 않는 것만 뽑아서 복사
    this.setState({habits}); // state에 반영
  }

  handleAdd = name => {
    const habits = [...this.state.habits, {id: Date.now(), name, count: 0}]; // 기존 state의 배열을 복사해 오고, 주어진 이름을 이용해서 새로운 habit을 만든다. id는 밀리세컨드까지 입력되는 Date.now()로 받아옴
    this.setState({habits}); // state에 반영
  }

  handlleReset = () => { // 리셋은 아무것도 받지 않고 처리
    const habits = this.state.habits.map(habit => {
      if (habit.count !== 0) {
        return {...habit, count : 0};
      }
      return habit;
    })
    this.setState({habits});
  }

  render() {
    console.log('app');
    return (
      <>
        <Navbar totalCount={this.state.habits.filter(item => item.count > 0).length} /> 
        <Habits 
          habits = {this.state.habits}
          onIncrement={this.handleIncrement} 
          onDecrement={this.handleDecrement}
          onDelete={this.handleDelete}
          onAdd={this.handleAdd}
          onReset={this.handlleReset}
        />
      </>
    );
  }
}

export default App;
