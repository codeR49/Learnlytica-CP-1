import React ,{Component} from 'react';
import "./CSS/HeatMap.css"

// Import the calendarheatmap
import CalendarHeatmap from 'react-calendar-heatmap';

export default class HeatMapExample extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            // Some dates to render in the heatmap
            values: [
                { date: '2016-01-01', count: 4 },
                { date: '2016-01-22', count: 1 },
                { date: '2016-01-30', count: 3 },
                { date: new Date(2016, 0, 4)}
            ],
            // How many days should be shown
            numDays: 365
        }

        this.onClick = this.onClick.bind(this);
    }
 
    onClick(value) {
        console.log(value);
    }

    render() {
        return (
            <div style={{width: 700}}>
                <CalendarHeatmap
                    endDate={new Date('2017-01-01')}
                    numDays={this.state.numDays}
                    values={this.state.values}
                    onClick={this.onClick}
                />
            </div>
        );
    }
}