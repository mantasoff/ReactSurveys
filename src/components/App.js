import React from 'react';
import { Route, Router, Link, Switch } from 'react-router-dom';
import history from '../history';
import surveyApi from '../apis/surveys';

import SurveyList from './SurveyList';
import Survey from './Survey';
import SurveyCreate from './SurveyCreate';
import SurveyResults from './SurveyResults';




class App extends React.Component {

    state = {
        surveys: []
    }
    
    componentDidMount() {
        (async () => {
            const response = await surveyApi.get('/surveys');
            this.setState({
                surveys: response.data
            })            
        })();
    }

    addSurvey = toBeAddedSurvey => {
        this.setState({ surveys: [...this.state.surveys, toBeAddedSurvey]});
    }

    onDeleteSurvey = id => {
        
        let newSurveys = [];
        newSurveys = this.state.surveys.filter((survey) => {
            return survey.id !== id;
        });

        (async () => {
            await surveyApi.delete(`/surveys/${id}`);
            this.setState({
                surveys: newSurveys
            });
        })();

        

    }

    render() {
        return (
            <div className="ui container">
                <Router history={history}>
                    <div className="ui menu">
                        <Link to='/' className="header item">Mancio Survey</Link>
                        <Link to='/survey/create' className="item">Create</Link>
                    </div>
                    <div>
                        <Switch>
                            <Route exact path="/" render={(props) => <SurveyList {...props} surveys={this.state.surveys} onDeleteSurvey={this.onDeleteSurvey} />} />
                            <Route exact path="/survey/create" render={ props => <SurveyCreate {...props} addSurvey={this.addSurvey}/>} />
                            <Route exact path="/survey/:id" component={Survey} />
                            <Route exact path="/survey/:id/answers" component={SurveyResults} />
                        </Switch>

                    </div>
                </Router>

            </div>
        )
    }
}

export default App;