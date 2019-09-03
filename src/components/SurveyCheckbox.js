import React from 'react';

class SurveyCheckbox extends React.Component {  
    render() {
        return(
        <div>
            <div className="ui checkbox">
                <input checked={this.props.value} onChange={() => this.props.valueChange(this.props.answer.id)} type="checkbox"></input>
                <label>{this.props.answer.description}</label>
            </div>
        </div>
        );
    }
}

export default SurveyCheckbox;