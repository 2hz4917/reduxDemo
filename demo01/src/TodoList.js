import React, { Component } from 'react';
import 'antd/dist/antd.css'
import moment from 'moment';
import { DatePicker } from 'antd';

const { MonthPicker, RangePicker } = DatePicker;

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    range=(start, end)=> {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    disabledDate=(current)=> {
        // Can not select days before today and today
        console.log(moment().endOf('day').subtract(1, 'days'));
        return (current && current > moment().endOf('day').subtract(1, 'days')) || (current && current < moment().endOf('day').subtract(366, 'days'));
    }

    disabledDateTime=()=> {
        return {
            disabledHours: () => this.range(0, 24).splice(4, 20),
            disabledMinutes: () => this.range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }

    disabledRangeTime=(_, type)=> {
        if (type === 'start') {
            return {
                disabledHours: () => this.range(0, 60).splice(4, 20),
                disabledMinutes: () => this.range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => this.range(0, 60).splice(20, 4),
            disabledMinutes: () => this.range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    }
    render() {
        return (
            <div>
                <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={this.disabledDate}
                    disabledTime={this.disabledDateTime}
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                />
                <br />
                <MonthPicker disabledDate={this.disabledDate} placeholder="Select month" />
                <br />
                <RangePicker
                    disabledDate={this.disabledDate}
                    disabledTime={this.disabledRangeTime}
                    showTime={{
                        hideDisabledOptions: true,
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                    }}
                    format="YYYY-MM-DD HH:mm:ss"
                />
            </div>
        );
    }
}