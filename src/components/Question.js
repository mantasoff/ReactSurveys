import React from 'react';
import SurveyCheckbox from './SurveyCheckbox';

class Question extends React.Component {
   
    state = {
        values: []
    }

    componentDidUpdate() {
        console.log(this.state.values)
    }

    renderCheckboxes = () => {
        return(
            this.props.question.answers.map((answer) => {
                return(
                    <SurveyCheckbox id={answer.id} value={this.state.values[answer.id-1]} valueChange={this.valueChange} answer={answer} />                    
                )                  
            })
        );
    }


    valueChange = id => {
        let checkBoxValues = this.state.values;
        checkBoxValues = checkBoxValues.map( value => {
            return false
        })
        checkBoxValues[id-1] = !checkBoxValues[id-1];
        this.setState({ values: checkBoxValues});

        this.props.onAnswerChange(this.props.question.id, id)
    }

    componentDidMount() {
        let checkboxValues = [];
        this.props.question.answers.map((answer) => {
            return checkboxValues = [...checkboxValues, false]
        })   
        this.setState({ values: checkboxValues })
        
    }

    render() {
        return(
            <div className="ui segment">
                <div className="item">
                    <div className="content">
                        <div className="header">
                            <h3 className="header">{this.props.question.question}</h3>
                        </div>
                        <div className="meta">
                            <span>Select one option</span>
                        </div>
                        <div className="description">
                            <div className="ui form">
                                {this.renderCheckboxes()}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Question;