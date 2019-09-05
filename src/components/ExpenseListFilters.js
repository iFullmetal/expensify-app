import React from 'react'
import { connect } from 'react-redux'
import { setTextFilter } from '../actions/filters'
import { sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters'
import {DateRangePicker, SingleDatePicker} from "react-dates";

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    onDateChange = ({ startDate, endDate })=>{
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };

    onFocusChange = (calendarFocused)=>{
        this.setState(()=>({
            calendarFocused
        }))
    };

    render(){
        return (
            <div className='content-container'>
                <div className='input-group'>
                    <div className='input-group__item'>
                        <input
                            className='text-input'
                            placeholder='Search expenses'
                            type='text'
                            value={this.props.filter.text}
                            onChange={(event)=>{
                                //диспатчу новый текстовый фильтер в стор
                                this.props.dispatch(setTextFilter(event.target.value))
                            }}
                        />
                    </div>
                    <div className='input-group__item'>
                        <select
                            className='select'
                            value={this.props.filter.sortBy}
                            onChange={(event)=>{
                                if(event.target.value === 'date'){
                                    this.props.dispatch(sortByDate())
                                }
                                else{
                                    this.props.dispatch(sortByAmount())
                                }
                            }}>
                            <option value='date'>Date</option>
                            <option value='amount'>Amount</option>
                        </select>
                    </div>
                    <div className='input-group__item'>
                        <DateRangePicker
                            startDate={this.props.filter.startDate}
                            startDateId='start_date'
                            endDate={this.props.filter.endDate}
                            endDateId='end_date'
                            onDatesChange={this.onDateChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            isOutsideRange={(day) => false}
                            numberOfMonths={1}
                            //кнопка очистки дат
                            showClearDates={true}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


//размечаю, к каким редюсерам у компонента будет доступ
const mapStateToProps = (state)=> {
    return {
        filter: state.filter
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);