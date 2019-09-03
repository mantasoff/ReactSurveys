import React from 'react';
import Chart from 'react-apexcharts';

class ReactChart extends React.Component {




    constructor(props) {
        super(props);
        console.log('hi');
        console.log(props);

        
        
        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: this.props.categories
                }
            },
            series: [
                {
                    name: this.props.name,
                    data: this.props.data
                }
            ]
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            this.setState({
                options: {
                    chart: {
                        id: "basic-bar"
                    },
                    xaxis: {
                        categories: this.props.categories
                    }
                },
                series: [
                    {
                        name: this.props.name,
                        data: this.props.data
                    }
                ]
            });
        }
    }

    render() {
        console.log(this.state)
        return(
            <Chart options={this.state.options} series={this.state.series} type="bar" width="500" />
        )
    }
}

export default ReactChart;