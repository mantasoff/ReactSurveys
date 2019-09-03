import React from 'react';
import ReactChart from './ReactChart';

class SurveyResultAnswer extends React.Component {
    
    getCategories = () => {
        console.log(this.props.question);
        let categories = this.props.question.answers.map((answer) => {
            return answer.description;
        })
        console.log(this.props.surveyResults);
        
        return categories;
    }

    render() {
        console.log('Cia');
        console.log(this.props.surveyResults);
        return (
            <div className="ui center aligned segment">

                <h3>{this.props.question.question}</h3>
                <div className="ui icon header">
                    <ReactChart categories={this.getCategories()} name={'Question'} data={this.props.surveyResults}  />
                </div>
                
            </div>
        );
    }
}

export default SurveyResultAnswer;