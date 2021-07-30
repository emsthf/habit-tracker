import React, { memo } from 'react';

const HabitAddForm = memo(props => {
    const formRef = React.createRef(); // 함수 안이라서 const로 지역변수를 설정해준다
    const inputRef = React.createRef(); // 함수 안이라서 const로 지역변수를 설정해준다

    const onSubmit = event => { // 함수 안이라서 const로 지역변수를 설정해준다
        event.preventDefault(); // submit될 때 페이지의 리프레시 막는다
        const name = inputRef.current.value; // inputRef 안에 있는 value를 받아온다
        name && props.onAdd(name); // name이 있다면 props에 전달된 onAdd라는 함수에 name을 전달해 준다
        // this.inputRef.current.value = '';
        formRef.current.reset();
    };

    return (
        <form ref={formRef} className="add-form" onSubmit={onSubmit}>
            <input 
                ref={inputRef} 
                type="text" 
                className="add-input" placeholder="Habit" 
            />
            <button className="add-button">Add</button>
        </form>
    );
});

export default HabitAddForm;