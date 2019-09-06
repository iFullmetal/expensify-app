import React from 'react';
//для манипуляций с датами вместо стандартного Date
import moment from 'moment';
//react-компонент для выбора дат
import { SingleDatePicker } from 'react-dates'
//стандартные стили для дэйтпикера
import 'react-dates/lib/css/_datepicker.css'

//для валидации на этапе ввода использую компонент со стейтом
class ExpenseForm extends React.Component {
    submitButtonText = 'Add expense';
    constructor(props){
        super(props);

        const { expense } = props;
        if(expense) this.submitButtonText = 'Save expense';
        this.state = {
            description: expense ? expense.description : '',
            note: expense ? expense.note : '',
            amount:  expense ? (expense.amount / 100).toString() : '',
            createdAt:  expense ? moment(expense.createdAt) : moment(),
            datePickerFocused: false,
            error: ''
        }


    }
    onDescriptionChange = (event)=>{
        //т.к. реакт оптимизирует вызов ивентов, то event'а из аргументом уже может не быть, когда реакт решил вызвать
        //мой коллбэк, так что в setState не выйдет его юзать, поэтому пихаю его в переменную
        const description = event.target.value;

        this.setState(()=>{
            return {
                description
            }
        })
    };
    onNoteChange = (event)=>{
        const note = event.target.value;
        this.setState(()=>({
            note
        }))
    };
    onAmountChange = (event)=>{
        const amount = event.target.value;

        //проверяю регулярным выражением, правильно ли юзер ввел свои шейкели
        if(amount.match(/^\d{1,}(\.\d{0,2})?$/) || amount === '') {
            this.setState(() => ({
                amount
            }));
        }
    };
    onDateChange = (createdAt)=>{

        if(!createdAt) return;

        this.setState(()=>({
            createdAt
        }))
    };

    onFocusChange = ({ focused })=>{
        this.setState(()=>({
            datePickerFocused: focused
        }))
    };

    onSubmit = (e)=>{
        e.preventDefault()

        if(!this.state.description || !this.state.amount){
            this.setState(()=>({
                error: 'Please provide description and amount'
            }));

            return;
        }
        this.setState(()=>({
            error: ''
        }));

        //вызываю сабмит, полученный из пэрент тега, отправляя в него заполненные поля
        this.props.onSubmit({
            description: this.state.description,
            amount: parseFloat(this.state.amount, 10) * 100, //парсю баксы и перевожу их в центы
            createdAt: this.state.createdAt.valueOf(), //передаю время в миллисекундах
            note: this.state.note
        })
    };

    render(){
        return (
            <form className='form' onSubmit={this.onSubmit}>
                {this.state.error ? <p className='form__error'>{this.state.error}</p> : undefined}
                <input
                    className='text-input'
                    type='text'
                    placeholder='Description'
                    //при переходе на эту страницу сразу поставит фокус на элемент
                    autoFocus={true}
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    className='text-input'
                    type='text'
                    placeholder='Amount'
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />

                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    //при клике на компонент
                    focused={this.state.datePickerFocused}
                    //вызывается при выходе из этого окошка
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    //чтобы можно было выбирать любой день
                    isOutsideRange={(day) => false}
                />

                {//textarea - многострочный инпут, типа текстбокса
                }
                <textarea
                    className='textarea'
                    placeholder='Add a note for your expense (optional)'
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                </textarea>
                {/*пихаю кнопку в отдельный див, чтобы она не флексмлась и не ставала во сю длину
                (т.е. content-container не применяется)*/}
                <div>
                    <button className='button'>{this.submitButtonText}</button>
                </div>
            </form>
        );
    };
};

export default ExpenseForm;