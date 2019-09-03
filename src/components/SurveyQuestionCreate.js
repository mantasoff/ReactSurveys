import React from 'react';
import SurveyAnswer from './SurveyAnswer';

class SurveyQuestionCreate extends React.Component {

    state = {
        id: '',
        question: '',
        answers: [
            {
                id: 1,
                description: ""
            }, 
            {
                id: 2,
                description: ""
            }]
    }



    componentDidMount() {
        this.setState({
            id: this.props.question.id,
            question: this.props.question.question,
            answers: this.props.question.answers
        })
    }

    renderAnswers = () => {
        return this.state.answers.map( answer => {
            return <SurveyAnswer onAnswerChange={this.onAnswerChange} answer={answer}/>
        })
    }


    onAnswerChange = (id, answer) => {
        let currentAnswers = this.state.answers;
        currentAnswers = currentAnswers.map((oldAnswer) => {
            if(oldAnswer.id === id) oldAnswer.description = answer;
            return {...oldAnswer}; 
        })
        
        this.setState( {answers: currentAnswers },() => {
            this.props.onQuestionChange({...this.state});
        });
        
        
    }

    onQuestionChange = (e) => {
        this.setState({ question: e.target.value}, () => this.props.onQuestionChange ( {...this.state }));
    }

    addAnswer = () => {
        let answerId = 0;
        this.state.answers.map( answer => answerId = answer.id )
        
        answerId++;
        this.setState( {answers: [...this.state.answers, {id: answerId, description: ''}]})
        this.props.onQuestionChange({...this.state}, () => {
            this.props.onQuestionChange({...this.state});
        });
    }

    deleteAnswer = () => {
        let answerArray = [...this.state.answers];
        answerArray.pop();
        this.setState({ answers: answerArray}, () => {
            this.props.onQuestionChange({...this.state});
        });
        
    }

    render() {
        return(
            <div className="ui segment">
                 <div className="field">                  
                    <label>Question</label>
                    <input value={this.state.question}  onChange={this.onQuestionChange} type="text" placeholder="What is the question?" />
                    
                 </div>
                 {this.renderAnswers()}

                 <button className="ui basic button green" onClick={this.addAnswer}>Add an answer</button>
                 <button className="ui basic button grey" onClick={this.deleteAnswer}>Delete answer</button>
            </div> 
        );
    }
}

export default SurveyQuestionCreate;