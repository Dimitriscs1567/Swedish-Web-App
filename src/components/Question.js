import React from 'react'
import { Grid, Radio, Form } from 'semantic-ui-react';

const Question = (props) => {

    const radioButtons = props.question.words.map(word => {
        let color;
        if(+props.answered > -1 && +props.answered === word.id){
            if(+props.answered === props.question.rightWord){
                color = 'green';
            }
            else{
                color = 'red';
            }
        }
        else if(+props.answered > -1 && props.question.rightWord === word.id){
            color = 'green';
        }
        else{
            color = 'white';
        }

        return (
            <Form.Field >
                <Radio
                    style={{
                        fontSize: '1.5em', 
                        backgroundColor: color, 
                        padding: '10px 15px 10px 15px'}}
                    key={word.id}
                    label={word.translation}
                    name='radioGroup'
                    value={word.id.toString()}
                    checked={props.selectedValue === word.id.toString()}
                    onChange={props.handleChange} />
            </Form.Field>
        )
    });

    const rightWord = props.question.words.filter(word=>{
        return word.id === props.question.rightWord
    })[0];

    return (
        <Grid>
            <Grid.Row centered>
                <Grid.Column 
                    verticalAlign='bottom'
                    style={{fontSize: '2.2em'}}>
                    What {rightWord.word} means?
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column 
                    verticalAlign='top'
                    textAlign='center' >
                    <Form>
                        {radioButtons}
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Question;