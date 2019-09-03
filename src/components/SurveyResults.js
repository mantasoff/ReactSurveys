import React from 'react';
import surveyApi from '../apis/surveys';
import SurveyResultAnswer from './SurveyResultAnswer';


class SurveyResults extends React.Component {

    state = {
        survey: {},
        answers: [],
        answerCount: [[]]
    }

    componentDidMount() {
        console.log(this);
        (async () => {
            let response = await surveyApi.get(`/surveys/${this.props.match.params.id}`);
            this.setState({
                survey: response.data
            }) 
            
            response = await surveyApi.get(`/answers?surveyId=${this.props.match.params.id}`);
            this.setState({
                answers: response.data
            },this.countAnswers)
        })();

    }

    countAnswers = () => {
        let answersResults = [[]];
        
        //Initializing Multi-Dimensional Array
        let answerCount = this.state.answers.map( answer => {
            answer.answers.map( (result,i) => {
                answersResults[i] = [0];
                answersResults[i][result-1] = 0;
            })
        })
        
        answerCount = this.state.answers.map( answer => {
            answer.answers.map( (result,i) => {
                answersResults[i][result-1]++;
            })
        })

        this.setState({
            answerCount: answersResults
        })
    }

    renderSurveyResults = () => {
        return this.state.survey.questions.map((question,i) => {
            return <SurveyResultAnswer question={question} surveyResults={this.state.answerCount[i]}/>
        });
    }

    render() {
        
        if(!this.state.survey.id) {
            console.log('Loading')
            return <div>Loading!</div>
            
        }
        return (
        <div>     
            {this.renderSurveyResults()}
        </div>
        );
    }
}


export default SurveyResults;