import React from 'react';
import { Link } from 'react-router-dom';
import surveysApi from '../apis/surveys';
import history from '../history';
import SurveyQuestionCreate from './SurveyQuestionCreate';



class SurveyCreate extends React.Component {

    state = {
        title: '',
        questions: [ 
            {   
                id: 1,
                question: '',
                answers: [ 
                    {
                        id: 1,
                        description: ""
                    }, 
                    {
                        id: 2,
                        description: ""
                    }
                ]
            }, 
            {
                id: 2,
                question: '',
                answers: [
                    {
                        id: 1,
                        description: ""
                    }, 
                    {
                        id: 2,
                        description: ""
                    }
                ]
            }
        ]
    }

    addQuestion = () => { 
        let questionId = 0;

        let questions = this.state.questions;
        questions.forEach(question => {
            if(questionId <= question.id) questionId = question.id;
        });
       
        questionId++;

        this.setState({
           questions: [...this.state.questions, { question: '', id: questionId, answers:[{id: 1, description: ''}, {id: 2, description: ''}]}]
       }) 
    }

    deleteQuestion = () => {
        let questionArray = this.state.questions;
        questionArray.pop();
        this.setState({ questions: questionArray })
    }

    onQuestionChange = changedQuestion => {
        let currentQuestions = this.state.questions;
        currentQuestions = currentQuestions.map( question => {
            console.log(question);
            if(question.id === changedQuestion.id) question = changedQuestion;
            return question;    
        })

        this.setState({ questions: currentQuestions}, () => console.log(this.state));
    }

    renderQuestions = () => {
        return this.state.questions.map(question => {
            return <SurveyQuestionCreate onQuestionChange={this.onQuestionChange} question={question} />
        });

    }

    onCreateClick = async () => {
        console.log(this.state);
        let response = await surveysApi.post('/surveys',this.state);
        this.props.addSurvey(response.data);
        history.push('/');
    }

    render() {
        return(
            <div className="ui form">
                <div className="ui large header">New Survey</div>
                <div className="field">
                    <label>Title</label>
                    <input value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} type="text" placeholder="Survey Title" />
                </div>
                <div>
                    <button className="ui basic button green" onClick={this.addQuestion}>Add a New Question</button>
                    <button className="ui basic button red" onClick={this.deleteQuestion}>Delete Last Question</button>
                </div>

                {this.renderQuestions()}

                <div>
                    <button className="ui basic button primary" onClick={this.onCreateClick}>Create</button>
                    <Link to='/' className="ui basic button red">Cancel</Link>
                </div>                  
            </div>
        )
    }
}

export default SurveyCreate;