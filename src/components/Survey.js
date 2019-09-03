import React from 'react';
import { Link } from 'react-router-dom';
import surveyApi from '../apis/surveys';
import Question from './Question';
import history from '../history'

 
class Survey extends React.Component {
    
    state = { 
        survey: {},
        answers: []
    }

    componentDidMount() {
        (async () => {
            const response = await surveyApi.get(`/surveys/${this.props.match.params.id}`);
            this.setState({
                survey: response.data
            })            

            let possibleAnswers = [];
            this.state.survey.questions.map((answer => {
               return possibleAnswers = [...possibleAnswers, 0]
            }))
            this.setState({ answers: possibleAnswers});
            console.log(this.setState);        
            }
        )();
    }
    
    answerChange = (id, value) => {
        let possibleAnswers = this.state.answers;
        
        possibleAnswers[id-1] = value;
        this.setState({
            answers: possibleAnswers
        })
        return;
    }
    
    renderQuestions = () => {
        console.log(this.state)
        return(
            this.state.survey.questions.map((question) => {
                return <Question question={question} onAnswerChange={this.answerChange} />
            })            
        );
    }

    onSubmitSurvey = () => {
        let surveyResults = {
           surveyId: this.state.survey.id,
           survey: this.state.survey,
           answers: this.state.answers
        };

        (async () => {
            await surveyApi.post('/answers', surveyResults);
            history.push('/')
        })();


    }

    render() {
        if (!this.state.survey.id){
            return <div>Loading!</div>
        }        
        return (
            <div>
                <div className="ui large header">{this.state.survey.title}</div>
                <div className="ui items">
                    {this.renderQuestions()}
                </div>
                <button onClick={this.onSubmitSurvey} className="ui green button">Submit</button>
                <Link to='/' className="ui red button">Cancel</Link>
            </div>
              
        );
        //return <div>{this.state.survey.id}</div>
    }
}

export default Survey;